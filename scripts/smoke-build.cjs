// Exercise the actual production bundle against generated HTML, without a live API.
require('./register-source.cjs');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { TextEncoder, TextDecoder } = require('node:util');
const { JSDOM, VirtualConsole } = require('jsdom');
const { SEO_PAGES, SITE_URL } = require('../src/seo/site');
const buildDir = path.resolve(__dirname, '../build');
const manifest = JSON.parse(fs.readFileSync(path.join(buildDir, 'asset-manifest.json'), 'utf8'));
const scripts = manifest.entrypoints.filter(name => name.endsWith('.js')).map(name => fs.readFileSync(path.join(buildDir, name), 'utf8'));
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const car = { id: 1, name: 'Verified API cart', description: 'A real API response', seat: '4 Seats', images: [] };

async function checkRoute(route, filename, failedApi = false) {
  const errors = [];
  const requests = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('error', error => errors.push(String(error)));
  virtualConsole.on('jsdomError', error => errors.push(String(error)));
  const dom = new JSDOM(fs.readFileSync(path.join(buildDir, filename), 'utf8'), {
    url: `${SITE_URL}${route}`, runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole,
  });
  const { window } = dom;
  window.TextEncoder = TextEncoder;
  window.TextDecoder = TextDecoder;
  window.scrollTo = () => {};
  window.addEventListener('error', event => errors.push(String(event.error)));
  window.XMLHttpRequest = class {
    constructor() { this.onloadend = null; this.upload = { addEventListener() {} }; }
    open(method, url) { this.method = method; this.url = url; }
    setRequestHeader() {}
    getAllResponseHeaders() { return 'content-type: application/json\r\n'; }
    addEventListener() {}
    removeEventListener() {}
    abort() {}
    send() {
      requests.push(this.url);
      const endpoint = new URL(this.url).pathname;
      const response = endpoint.endsWith('/cars') ? [car] : endpoint.endsWith('/seats') ? [{ id: 1, value: '4 Seats' }] : [];
      setTimeout(() => {
        this.status = failedApi ? 503 : 200;
        this.statusText = failedApi ? 'Unavailable' : 'OK';
        this.responseText = JSON.stringify(response);
        this.readyState = 4;
        if (this.onloadend) this.onloadend();
      }, 0);
    }
  };
  for (const script of scripts) window.eval(script);
  await pause(250);
  const document = window.document;
  assert.equal(errors.length, 0, `${route}: hydration/runtime errors: ${errors.join('; ')}`);
  assert.equal(document.querySelectorAll('h1').length, 1);
  if (SEO_PAGES[route]) {
    assert.equal(document.title, SEO_PAGES[route].title);
    assert.equal(document.querySelectorAll('link[rel="canonical"]').length, 1);
    const book = [...document.querySelectorAll('button')].find(button => /Book Now|Request Availability|Send a Booking Request/.test(button.textContent));
    assert(book, `${route}: booking action exists`);
    book.click();
    await pause(100);
    assert(document.querySelector('input[name="fullName"], input[placeholder="John Doe"]') || [...document.querySelectorAll('h2')].some(node => /book|reserv/i.test(node.textContent)), `${route}: booking modal opens`);
    const bookingForm = document.querySelector('input[placeholder="John Doe"]').closest('form');
    bookingForm.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
    await pause(100);
    assert(document.body.textContent.includes(failedApi ? 'Failed to send booking request' : "We've received your request"), `${route}: booking response is handled`);
  }
  if (route === '/cars') {
    assert(document.body.textContent.includes(failedApi ? 'Contact us for current availability' : car.name));
  }
  if (failedApi) {
    assert(!document.body.textContent.includes('The Executive 4-Seater'));
    assert(!document.body.textContent.includes('Sarah M.'));
  }
  if (route === '/') {
    const reviewButton = [...document.querySelectorAll('button')].find(button => button.textContent.includes('Write a Review'));
    reviewButton.click();
    await pause(50);
    const reviewForm = document.querySelector('textarea[placeholder="Tell us about your experience..."]').closest('form');
    reviewForm.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
    await pause(100);
    assert(document.body.textContent.includes(failedApi ? 'Your review could not be saved' : 'Thank you for your review!'), `${route}: reviews report real save status`);
  }
  // Check client navigation updates native React 19 head metadata once.
  if (SEO_PAGES[route]) {
    const destination = route === '/contact' ? '/about' : '/contact';
    const link = document.querySelector(`a[href="${destination}"]`);
    link.dispatchEvent(new window.MouseEvent('click', { bubbles: true, button: 0 }));
    await pause(300); // head metadata commits asynchronously after navigation
    assert.equal(window.location.pathname, destination);
    assert.equal(document.title, SEO_PAGES[destination].title);
    assert.equal(document.querySelectorAll('link[rel="canonical"]').length, 1);
    assert.equal(document.querySelector('link[rel="canonical"]').href, `${SITE_URL}${destination}`);
  }
  assert.equal(errors.length, 0, `${route}: interaction errors: ${errors.join('; ')}`);
  dom.window.close();
  console.log(`Production hydration and interaction checks passed: ${route}${failedApi ? ' (API unavailable)' : ''}`);
}

(async () => {
  for (const route of Object.keys(SEO_PAGES)) await checkRoute(route, route === '/' ? 'index.html' : `${route.slice(1)}/index.html`);
  await checkRoute('/cars', 'cars/index.html', true);
  await checkRoute('/', 'index.html', true);
  await checkRoute('/missing-page', '404.html');
  await checkRoute('/admin/login', 'admin/index.html');
  await checkRoute('/admin/cars', 'admin/index.html');
})().catch(error => { console.error(error); process.exitCode = 1; });

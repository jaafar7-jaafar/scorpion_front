require('./register-source.cjs');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { JSDOM } = require('jsdom');
const { SEO_PAGES, SITE_URL } = require('../src/seo/site');
const buildDir = path.resolve(__dirname, '../build');
const sitemap = fs.readFileSync(path.join(buildDir, 'sitemap.xml'), 'utf8');
const titles = new Set();

for (const [route, page] of Object.entries(SEO_PAGES)) {
  const filename = path.join(buildDir, route === '/' ? 'index.html' : `${route.slice(1)}/index.html`);
  const dom = new JSDOM(fs.readFileSync(filename, 'utf8'));
  const document = dom.window.document;
  assert.equal(document.querySelectorAll('title').length, 1, `${route}: one title`);
  assert.equal(document.title, page.title);
  assert(!titles.has(page.title), `${route}: unique title`);
  titles.add(page.title);
  assert.equal(document.querySelectorAll('meta[name="description"]').length, 1);
  assert.equal(document.querySelector('meta[name="description"]').content, page.description);
  assert.equal(document.querySelectorAll('link[rel="canonical"]').length, 1);
  assert.equal(document.querySelector('head link[rel="canonical"]').href, `${SITE_URL}${route}`);
  assert.equal(document.querySelector('meta[property="og:url"]').content, `${SITE_URL}${route}`);
  assert(!document.querySelector('meta[name="robots"]').content.includes('noindex'));
  assert.equal(document.querySelectorAll('h1').length, 1, `${route}: one visible heading`);
  assert(document.querySelector('main').textContent.trim().length > 250, `${route}: readable initial HTML`);
  assert.equal(document.querySelector('#splash'), null);
  assert(sitemap.includes(`<loc>${SITE_URL}${route}</loc>`));
  const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].map(node => JSON.parse(node.textContent));
  assert.equal(schemas.length, 1, `${route}: one schema graph`);
  assert(schemas[0]['@graph'].some(node => node['@type'] === 'LocalBusiness'));
  assert(!JSON.stringify(schemas).includes('AggregateRating'), `${route}: no self-serving review markup`);
  for (const link of document.querySelectorAll('a[href^="/"]')) {
    const pathname = new URL(link.href, SITE_URL).pathname;
    assert(SEO_PAGES[pathname], `${route}: internal destination exists: ${pathname}`);
  }
  for (const image of document.querySelectorAll('img[src^="/"]')) {
    assert(image.hasAttribute('alt'), `${route}: image has alt text`);
    assert(fs.existsSync(path.join(buildDir, image.getAttribute('src'))), `${route}: image exists`);
  }
  dom.window.close();
  console.log(`SEO checks passed: ${route}`);
}

for (const file of ['404.html', 'admin/index.html']) {
  const dom = new JSDOM(fs.readFileSync(path.join(buildDir, file), 'utf8'));
  assert(dom.window.document.querySelector('meta[name="robots"]').content.includes('noindex'), `${file}: excluded from index`);
  assert.equal(dom.window.document.querySelector('link[rel="canonical"]'), null);
  dom.window.close();
}
assert(!sitemap.includes('/admin'));
assert(!sitemap.includes('lastmod'));
assert(fs.existsSync(path.join(buildDir, '.htaccess')));
console.log('All public pages, structured data, images, links, sitemap, and noindex checks passed.');

require('./register-source.cjs');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { JSDOM } = require('jsdom');
const { SEO_PAGES, SITE_URL } = require('../src/seo/site');
const buildDir = path.resolve(__dirname, '../build');
const sitemap = fs.readFileSync(path.join(buildDir, 'sitemap.xml'), 'utf8');
const htaccess = fs.readFileSync(path.join(buildDir, '.htaccess'), 'utf8');
const titles = new Set();

for (const [route, page] of Object.entries(SEO_PAGES)) {
  const filename = path.join(buildDir, route === '/' ? 'index.html' : `${route.slice(1)}/index.html`);
  const dom = new JSDOM(fs.readFileSync(filename, 'utf8'));
  const document = dom.window.document;
  assert.equal(document.querySelectorAll('title').length, 1, `${route}: one title`);
  assert.equal(document.title, page.title);
  assert(!titles.has(page.title), `${route}: unique title`);
  titles.add(page.title);
  assert(page.title.length <= 65, `${route}: title fits in search results (${page.title.length} chars)`);
  assert(page.description.length >= 120 && page.description.length <= 170, `${route}: description length (${page.description.length} chars)`);
  assert.equal(document.querySelectorAll('meta[name="description"]').length, 1);
  assert.equal(document.querySelector('meta[name="description"]').content, page.description);
  assert.equal(document.querySelectorAll('link[rel="canonical"]').length, 1);
  assert.equal(document.querySelector('head link[rel="canonical"]').href, `${SITE_URL}${route}`);
  assert.equal(document.querySelector('meta[property="og:url"]').content, `${SITE_URL}${route}`);
  assert(!document.querySelector('meta[name="robots"]').content.includes('noindex'));
  assert.equal(document.querySelectorAll('h1').length, 1, `${route}: one visible heading`);
  const mainText = document.querySelector('main').textContent;
  assert(mainText.trim().length > 1500, `${route}: substantial readable initial HTML`);
  assert.equal(document.querySelector('#splash'), null);
  assert(sitemap.includes(`<loc>${SITE_URL}${route}</loc>`));
  if (route !== '/') assert(htaccess.includes(route.slice(1)), `${route}: served by .htaccess`);

  const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].map(node => JSON.parse(node.textContent));
  assert.equal(schemas.length, 1, `${route}: one schema graph`);
  const graph = schemas[0]['@graph'];
  assert(graph.some(node => node['@type'] === 'AutoRental' && node['@id'] === `${SITE_URL}/#business`), `${route}: business entity`);
  assert(!JSON.stringify(schemas).includes('AggregateRating'), `${route}: no self-serving review markup`);
  if (page.article) assert(graph.some(node => node['@type'] === 'Article'), `${route}: Article schema`);
  if (page.faqs) {
    const faq = graph.find(node => node['@type'] === 'FAQPage');
    assert(faq && faq.mainEntity.length === page.faqs.length, `${route}: FAQPage schema`);
    // Structured data must only describe answers that are visible on the page.
    for (const { q, a } of page.faqs) assert(mainText.includes(q) && mainText.includes(a), `${route}: FAQ is visible: ${q}`);
  }

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
assert.equal((sitemap.match(/<loc>/g) || []).length, Object.keys(SEO_PAGES).length, 'sitemap lists exactly the public pages');
for (const [, date] of sitemap.matchAll(/<lastmod>([^<]*)<\/lastmod>/g)) assert(/^\d{4}-\d{2}-\d{2}$/.test(date), `sitemap lastmod is a date: ${date}`);

const robots = fs.readFileSync(path.join(buildDir, 'robots.txt'), 'utf8');
assert(!/^Disallow:\s*\/\s*$/m.test(robots), 'robots.txt does not block the site');
assert(robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`), 'robots.txt points to the sitemap');

const llms = fs.readFileSync(path.join(buildDir, 'llms.txt'), 'utf8');
for (const route of Object.keys(SEO_PAGES)) assert(llms.includes(`(${SITE_URL}${route})`), `llms.txt lists ${route}`);

const indexNowKey = fs.readFileSync(path.join(__dirname, 'indexnow.cjs'), 'utf8').match(/const KEY = '([0-9a-f]{32})'/)[1];
assert.equal(fs.readFileSync(path.join(buildDir, `${indexNowKey}.txt`), 'utf8').trim(), indexNowKey, 'IndexNow key file is published');

const fontName = fs.readFileSync(path.join(buildDir, 'index.html'), 'utf8').match(/fonts\/(material-symbols-[\w-]+\.woff2)/)[1];
assert(fs.statSync(path.join(buildDir, 'fonts', fontName)).size < 150 * 1024, 'icon font is subset (run npm run icons)');

// The intro animation is decorative: outside the React root, hidden from
// assistive tech, no headings, and short enough not to frustrate visitors.
const homeHtml = fs.readFileSync(path.join(buildDir, 'index.html'), 'utf8');
const intro = new JSDOM(homeHtml).window.document.getElementById('intro');
if (intro) {
  assert.equal(intro.getAttribute('aria-hidden'), 'true', 'intro is hidden from assistive tech');
  assert.equal(intro.querySelector('h1, h2, h3, a, button'), null, 'intro has no headings or controls');
  assert(!intro.contains(new JSDOM(homeHtml).window.document.getElementById('root')), 'intro is outside the React root');
  const [, duration, delay] = homeHtml.match(/animation:\s*intro-out\s+([\d.]+)s[^;]*?\s([\d.]+)s\s+forwards/) || [];
  assert(duration && Number(duration) + Number(delay) <= 2, 'intro finishes within 2 seconds');
}

assert(fs.existsSync(path.join(buildDir, '.htaccess')));
console.log('All public pages, structured data, images, links, sitemap, robots, llms.txt, IndexNow, and noindex checks passed.');

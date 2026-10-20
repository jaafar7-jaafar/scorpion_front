process.env.NODE_ENV = 'production';
require('react-scripts/config/env');
require('./register-source.cjs');
const fs = require('node:fs');
const path = require('node:path');
const React = require('react');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const { JSDOM } = require('jsdom');
const App = require('../src/App').default;
const { SEO_PAGES, SITE_URL } = require('../src/seo/site');

const buildDir = path.resolve(__dirname, '../build');
const template = fs.readFileSync(path.join(buildDir, 'index.html'), 'utf8');

function renderPage(route, output) {
  const html = renderToString(React.createElement(App, { Router: StaticRouter, routerProps: { location: route } }));
  const dom = new JSDOM(template);
  const document = dom.window.document;
  const root = document.getElementById('root');
  root.innerHTML = html;
  root.dataset.prerendered = 'true';
  // React 19 hoists metadata on the client. Put those same nodes in the HTML head.
  // JSON-LD stays in the rendered tree so hydration can match its script nodes.
  root.querySelectorAll('title, meta, link').forEach(node => document.head.appendChild(node));
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, dom.serialize());
  dom.window.close();
  console.log(`Rendered ${route} -> ${path.relative(buildDir, output)}`);
}

for (const route of Object.keys(SEO_PAGES)) {
  renderPage(route, path.join(buildDir, route === '/' ? 'index.html' : `${route.slice(1)}/index.html`));
}
renderPage('/not-found', path.join(buildDir, '404.html'));
// Admin content depends on authentication and the requested child route.
// Keep its root client-rendered; initial noindex is independent of JavaScript.
const adminDom = new JSDOM(template);
const adminRobots = adminDom.window.document.createElement('meta');
adminRobots.name = 'robots';
adminRobots.content = 'noindex, follow';
adminRobots.dataset.adminRobots = 'true';
adminDom.window.document.head.appendChild(adminRobots);
fs.mkdirSync(path.join(buildDir, 'admin'), { recursive: true });
fs.writeFileSync(path.join(buildDir, 'admin/index.html'), adminDom.serialize());
adminDom.window.close();

// Omit lastmod rather than publishing an invented update date.
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.keys(SEO_PAGES).map(route => `  <url><loc>${SITE_URL}${route}</loc></url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(buildDir, 'sitemap.xml'), sitemap);

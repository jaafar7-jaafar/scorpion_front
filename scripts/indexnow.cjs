// Tells Bing (which also feeds ChatGPT search, Copilot, and DuckDuckGo), Yandex,
// Seznam, Naver, and other IndexNow engines that the site's pages changed.
// Run `npm run indexnow` AFTER the new build is live on the server: the engines
// fetch the key file from the live site to verify ownership.
const fs = require('node:fs');
const path = require('node:path');

const SITE = 'https://www.scorpiongolfcarts.com';
const KEY = '4962261d2c5ff276a64f1aa93c9265b5';
const sitemap = fs.readFileSync(path.resolve(__dirname, '../build/sitemap.xml'), 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);

(async () => {
  const keyCheck = await fetch(`${SITE}/${KEY}.txt`);
  if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) {
    throw new Error(`The key file ${SITE}/${KEY}.txt is not live yet. Deploy the build first.`);
  }
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
  });
  // 200 = accepted, 202 = accepted and key validation pending.
  console.log(`IndexNow responded ${response.status} for ${urlList.length} URLs.`);
  if (response.status >= 300) { console.error(await response.text()); process.exitCode = 1; }
})().catch(error => { console.error(error.message); process.exitCode = 1; });

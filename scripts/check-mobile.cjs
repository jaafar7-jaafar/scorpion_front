// Mobile-first guard: loads every built page in real Chrome at phone width (390px)
// and fails if anything makes the page wider than the screen (which makes phones
// zoom the whole site out). Swipe rows inside their own scroll containers are fine.
// Usage: npm run build && npm run check:mobile   (needs Google Chrome installed)
const http = require('node:http');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawn } = require('node:child_process');

const BUILD = path.resolve(__dirname, '../build');
const PORT = 5099;
const DEBUG_PORT = 9399;
const ROUTES = ['/', '/cars', '/san-pedro-golf-cart-rental-guide', '/things-to-do-in-san-pedro-by-golf-cart', '/about', '/contact', '/rental-terms', '/privacy', '/missing-page'];
const WIDTHS = [360, 390];
const CHROME = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].find((p) => p && fs.existsSync(p));
const TYPES = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Static server that mirrors the .htaccess routing.
const server = http.createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = path.join(BUILD, p);
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) file = p.startsWith('/admin') ? path.join(BUILD, 'admin/index.html') : path.join(BUILD, '404.html');
  res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

(async () => {
  if (!CHROME) { console.log('check:mobile skipped: Google Chrome not found (set CHROME_PATH).'); return; }
  await new Promise((r) => server.listen(PORT, r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'mobile-check-'));
  const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${DEBUG_PORT}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });
  let failures = 0;
  try {
    let target;
    for (let i = 0; i < 60 && !target; i++) { try { target = (await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/list`)).json()).find((t) => t.type === 'page'); } catch { await sleep(200); } }
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((r) => ws.addEventListener('open', r, { once: true }));
    let id = 0; const pending = new Map();
    ws.addEventListener('message', ({ data }) => { const m = JSON.parse(data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
    const send = (method, params = {}) => new Promise((r) => { const n = ++id; pending.set(n, r); ws.send(JSON.stringify({ id: n, method, params })); });
    await send('Page.enable');
    await send('Page.addScriptToEvaluateOnNewDocument', { source: "sessionStorage.setItem('scorpion-intro','1')" });
    for (const width of WIDTHS) {
      await send('Emulation.setDeviceMetricsOverride', { width, height: 800, deviceScaleFactor: 1, mobile: true });
      for (const route of ROUTES) {
        await send('Page.navigate', { url: `http://localhost:${PORT}${route}` });
        await sleep(1500);
        const { result } = await send('Runtime.evaluate', { returnByValue: true, expression: `(() => {
          const vw = document.documentElement.clientWidth;
          const inScroller = (el) => { for (let p = el.parentElement; p; p = p.parentElement) { const o = getComputedStyle(p).overflowX; if (o !== 'visible') return true; } return false; };
          const wide = [...document.querySelectorAll('body *')].filter((el) => {
            const b = el.getBoundingClientRect();
            return b.width > 0 && getComputedStyle(el).position !== 'fixed' && !inScroller(el) && (b.right > vw + 1 || b.left < -1);
          });
          return { overflow: document.documentElement.scrollWidth - vw,
            culprits: wide.filter((el) => !wide.includes(el.parentElement)).slice(0, 3).map((el) => el.tagName.toLowerCase() + '.' + String(el.className).split(' ').slice(0, 3).join('.')) };
        })()` });
        const { overflow, culprits } = result.result.value;
        if (overflow > 0) { failures++; console.error(`✗ ${width}px ${route}: page is ${overflow}px wider than the screen. ${culprits.join(', ')}`); }
      }
    }
    ws.close();
  } finally {
    chrome.kill();
    server.close();
  }
  if (failures) { process.exitCode = 1; return; }
  console.log(`Mobile layout checks passed: ${ROUTES.length} pages at ${WIDTHS.join(' and ')}px, no horizontal overflow.`);
})().catch((e) => { console.error(e); process.exitCode = 1; });

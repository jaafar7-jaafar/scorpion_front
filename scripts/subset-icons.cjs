// Rebuilds the self-hosted Material Symbols font with only the icons the app uses.
// The full font is ~4 MB; the subset is ~25 KB, which matters for mobile speed.
// Run `npm run icons` after adding a new icon name anywhere in src/.
//
// Every lowercase token in src/ that matches an official icon name is included,
// so icons chosen dynamically (e.g. `icon: 'chair'`) are covered too.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const root = path.resolve(__dirname, '..');
const CODEPOINTS = 'https://raw.githubusercontent.com/google/material-design-icons/master/variablefont/MaterialSymbolsOutlined%5BFILL%2CGRAD%2Copsz%2Cwght%5D.codepoints';
// The CSS uses weight 400, grade 0, optical size 24, and FILL 0 or 1.
const AXES = 'opsz,wght,FILL,GRAD@24,400,0..1,0';
const BROWSER_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';

function sourceTokens(dir, tokens = new Set()) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) sourceTokens(file, tokens);
    else if (/\.(jsx?|html)$/.test(entry.name)) {
      for (const [token] of fs.readFileSync(file, 'utf8').matchAll(/[a-z][a-z0-9_]{1,40}/g)) tokens.add(token);
    }
  }
  return tokens;
}

(async () => {
  const known = new Set((await (await fetch(CODEPOINTS)).text()).split('\n').map(line => line.split(' ')[0]).filter(Boolean));
  const icons = [...sourceTokens(path.join(root, 'src'))].filter(token => known.has(token)).sort();
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:${AXES}&icon_names=${icons.join(',')}&display=block`, { headers: { 'User-Agent': BROWSER_UA } })).text();
  const fontUrl = css.match(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/)?.[1];
  if (!fontUrl) throw new Error(`Unexpected Google Fonts response:\n${css.slice(0, 500)}`);
  const font = Buffer.from(await (await fetch(fontUrl)).arrayBuffer());

  // Content-hashed name: .htaccess caches woff2 files as immutable for a year.
  const name = `material-symbols-${crypto.createHash('sha256').update(font).digest('hex').slice(0, 8)}.woff2`;
  const fontsDir = path.join(root, 'public/fonts');
  for (const old of fs.readdirSync(fontsDir)) if (old.startsWith('material-symbols-')) fs.rmSync(path.join(fontsDir, old));
  fs.writeFileSync(path.join(fontsDir, name), font);

  const indexFile = path.join(root, 'public/index.html');
  const html = fs.readFileSync(indexFile, 'utf8').replace(/material-symbols-[\w-]+\.woff2/g, name);
  fs.writeFileSync(indexFile, html);
  console.log(`Wrote public/fonts/${name} (${(font.length / 1024).toFixed(1)} KB, ${icons.length} icons).`);
})().catch(error => { console.error(error); process.exitCode = 1; });

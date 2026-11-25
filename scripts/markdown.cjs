// Converts a prerendered page's <main> into compact Markdown for AI agents
// (served for `Accept: text/markdown` and at /<page>/index.md).
// Skips UI chrome: buttons, forms, icons, decorative and data-md-skip elements.
const SKIP = new Set(['SCRIPT', 'STYLE', 'SVG', 'IFRAME', 'BUTTON', 'FORM', 'INPUT', 'SELECT', 'TEXTAREA', 'IMG', 'NOSCRIPT']);
const BLOCK = new Set(['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'UL', 'OL', 'DL', 'TABLE', 'DETAILS', 'SECTION', 'ARTICLE', 'HEADER', 'FOOTER', 'DIV', 'ADDRESS', 'MAIN', 'NAV', 'ASIDE', 'LI', 'BLOCKQUOTE']);

function skipped(el) {
  return SKIP.has(el.tagName.toUpperCase()) || el.getAttribute('aria-hidden') === 'true' || el.hasAttribute('data-md-skip')
    || el.classList.contains('material-symbols-outlined') || el.classList.contains('sr-only') || el.classList.contains('eyebrow')
    || el.getAttribute('aria-label') === 'Breadcrumb';
}

const hasBlockChild = (el) => [...el.children].some((c) => !skipped(c) && BLOCK.has(c.tagName.toUpperCase()));

function inline(node, base) {
  let out = '';
  for (const child of node.childNodes) {
    if (child.nodeType === 3) out += child.textContent;
    else if (child.nodeType === 1 && !skipped(child)) {
      const tag = child.tagName.toUpperCase();
      const inner = inline(child, base).trim();
      if (!inner) continue;
      if (tag === 'A') {
        const href = child.getAttribute('href') || '';
        out += href && !href.startsWith('#') ? ` [${inner}](${new URL(href, base).href}) ` : inner;
      } else if (tag === 'STRONG' || tag === 'B') out += `**${inner}**`;
      else if (tag === 'EM' || tag === 'I') out += `_${inner}_`;
      else if (tag === 'BR') out += '\n';
      else out += ` ${inner} `;
    }
  }
  return out.replace(/[ \t\n]+/g, ' ').replace(/\s+([,.;:!?])/g, '$1').trim();
}

function blocks(el, base, out) {
  for (const child of el.children) {
    if (skipped(child)) continue;
    const tag = child.tagName.toUpperCase();
    const heading = /^H([1-6])$/.exec(tag);
    if (heading) { const t = inline(child, base); if (t) out.push(`${'#'.repeat(Number(heading[1]))} ${t}`); }
    else if (tag === 'P' || tag === 'BLOCKQUOTE') { const t = inline(child, base); if (t) out.push(tag === 'P' ? t : `> ${t}`); }
    else if (tag === 'UL' || tag === 'OL') {
      const items = [...child.children].filter((li) => !skipped(li));
      if (items.some(hasBlockChild)) { items.forEach((li) => blocks(li, base, out)); continue; }
      const lines = items.map((li, i) => `${tag === 'OL' ? `${i + 1}.` : '-'} ${inline(li, base)}`).filter((l) => !/^(-|\d+\.)\s*$/.test(l));
      if (lines.length) out.push(lines.join('\n'));
    } else if (tag === 'DL') {
      const lines = [];
      child.querySelectorAll('dt').forEach((dt) => {
        let dd = dt.nextElementSibling; while (dd && dd.tagName.toUpperCase() !== 'DD') dd = dd.nextElementSibling;
        lines.push(`- **${inline(dt, base)}:** ${dd ? inline(dd, base) : ''}`);
      });
      if (lines.length) out.push(lines.join('\n'));
    } else if (tag === 'TABLE') {
      const rows = [...child.querySelectorAll('tr')].map((tr) => [...tr.children].map((c) => inline(c, base).replace(/\|/g, '\\|')));
      if (rows.length) out.push([`| ${rows[0].join(' | ')} |`, `| ${rows[0].map(() => '---').join(' | ')} |`, ...rows.slice(1).map((r) => `| ${r.join(' | ')} |`)].join('\n'));
    } else if (tag === 'DETAILS') {
      const summary = child.querySelector('summary');
      if (summary) { const q = inline(summary, base); if (q) out.push(`### ${q}`); }
      [...child.children].filter((c) => c !== summary).forEach((c) => { const t = inline(c, base); if (t) out.push(t); });
    } else if (hasBlockChild(child)) blocks(child, base, out);
    else { const t = inline({ childNodes: [child] }, base); if (t) out.push(t); }
  }
  return out;
}

module.exports = function pageToMarkdown(document, url) {
  const description = document.querySelector('meta[name="description"]')?.content;
  const body = blocks(document.querySelector('main'), url, []);
  const header = [`Source: ${url}`, description && `> ${description}`].filter(Boolean);
  // Put the page H1 first, then the summary, then the page body.
  const h1 = body.findIndex((b) => b.startsWith('# '));
  const lead = h1 >= 0 ? body.splice(h1, 1) : [`# ${document.title}`];
  return `${[...lead, ...header, ...body].join('\n\n').replace(/\n{3,}/g, '\n\n')}\n`;
};

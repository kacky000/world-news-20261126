// tape.mjs — a small "tape" that SVG pieces are pushed onto, plus text fitting.
// Everything on the page goes through one Tape, so the page is one flat list of shapes.

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const NARROW = new Set([...'iljtfrI.,:;\'!|()[]-· ']);
const WIDE = new Set([...'mwMW@%']);

// Rough advance width of a string in a humanist sans (Segoe UI), in pixels.
export function widthOf(str, size, bold = false) {
  let em = 0;
  for (const ch of String(str)) {
    if (NARROW.has(ch)) em += 0.3;
    else if (WIDE.has(ch)) em += 0.86;
    else if (ch >= 'A' && ch <= 'Z') em += 0.64;
    else if (ch >= '0' && ch <= '9') em += 0.55;
    else em += 0.53;
  }
  return em * size * (bold ? 1.06 : 1);
}

// Break a sentence into lines no wider than maxW; the last allowed line gets an ellipsis if cut.
export function fold(str, size, maxW, maxLines = 9, bold = false) {
  const words = String(str).split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    const tryLine = cur ? cur + ' ' + w : w;
    if (widthOf(tryLine, size, bold) <= maxW || !cur) cur = tryLine;
    else {
      lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = kept[maxLines - 1].replace(/[\s,;:]+\S*$/, '') + '…';
    return kept;
  }
  return lines;
}

export class Tape {
  constructor() {
    this.bits = [];
  }
  raw(s) {
    this.bits.push(s);
    return this;
  }
  box(x, y, w, h, fill, extra = '') {
    return this.raw(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`);
  }
  line(x1, y1, x2, y2, stroke, sw = 1, extra = '') {
    return this.raw(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}" ${extra}/>`);
  }
  dot(cx, cy, r, fill, extra = '') {
    return this.raw(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${extra}/>`);
  }
  // One line of text. opts: size, fill, bold, anchor, family, fit (max width → squeezed with textLength), spacing
  say(x, y, str, opts = {}) {
    const { size = 12, fill = '#111', bold = false, anchor = 'start', family = 'body', fit = 0, spacing = 0, extra = '' } = opts;
    const fam = family === 'head' ? "Bahnschrift,'Segoe UI',Arial,sans-serif" : "'Segoe UI',Arial,sans-serif";
    let squeeze = '';
    if (fit && widthOf(str, size, bold) + spacing * String(str).length > fit) squeeze = ` textLength="${fit}" lengthAdjust="spacingAndGlyphs"`;
    return this.raw(
      `<text x="${x}" y="${y}" font-family="${fam}" font-size="${size}" fill="${fill}"` +
        (bold ? ' font-weight="700"' : '') +
        (anchor !== 'start' ? ` text-anchor="${anchor}"` : '') +
        (spacing ? ` letter-spacing="${spacing}"` : '') +
        squeeze +
        (extra ? ' ' + extra : '') +
        `>${esc(str)}</text>`,
    );
  }
  // Several lines; returns the y of the line after the last one.
  para(x, y, lines, lead, opts = {}) {
    lines.forEach((ln, i) => this.say(x, y + i * lead, ln, opts));
    return y + lines.length * lead;
  }
  // Draw a sub-picture in its own coordinate frame.
  at(x, y, scale, inner) {
    return this.raw(`<g transform="translate(${x} ${y}) scale(${scale})">${inner}</g>`);
  }
  join() {
    return this.bits.join('\n');
  }
}

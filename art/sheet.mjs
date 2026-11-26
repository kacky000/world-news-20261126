// sheet.mjs — lays the day's stories out on one 1024 x 1024 sheet and writes art/front-page.html.
//   node art/sheet.mjs      (then art/snap.sh photographs the sheet into entry.png)
import { writeFileSync } from 'node:fs';
import { Tape, fold, widthOf, esc } from './tape.mjs';
import { drawIcon } from './icons.mjs';
import { makeAtlas } from './atlas.mjs';
import { DAY, STORIES, LEFT_OUT, REGIONS, SURE } from './desk.mjs';

const W = 1024;
const INK = '#14213a';
const PAPER = '#f6f1e4';
const RULE = '#c9bfa6';
const HOT = '#c8102e';
const GOLD = '#f2b632';

// Number the stories in reading order: leads, then cards, then briefs.
const leads = STORIES.filter((s) => s.slot === 'lead');
const cards = STORIES.filter((s) => s.slot === 'card');
const briefs = STORIES.filter((s) => s.slot === 'brief');
[...leads, ...cards, ...briefs].forEach((s, i) => (s.no = i + 1));
const all = [...leads, ...cards, ...briefs];
for (const s of all) {
  if (!REGIONS[s.region]) throw new Error(`story "${s.head}" has unknown region ${s.region}`);
  if (!SURE[s.sure]) throw new Error(`story "${s.head}" has unknown certainty ${s.sure}`);
}
const fields = new Set(all.map((s) => s.field));
const regionsUsed = new Set(all.map((s) => s.region));

const t = new Tape();
t.box(0, 0, W, W, PAPER);

// A certainty chip: coloured lozenge with the tag word, then the source in plain text. Returns its width.
function chip(x, y, sure, src, size = 9, maxW = 300) {
  const tag = SURE[sure];
  const tw = widthOf(tag.word, size, true) + size * 1.0;
  t.box(x, y - size + 0.5, tw, size + 3, tag.colour, `rx="${(size + 3) / 2}"`);
  t.say(x + tw / 2, y + 1, tag.word, { size, fill: '#fff', bold: true, anchor: 'middle' });
  if (src) t.say(x + tw + 4, y + 1, src, { size, fill: '#4a4a4a', fit: Math.max(20, maxW - tw - 4) });
  return tw;
}

function numberDisc(cx, cy, r, no, colour) {
  t.dot(cx, cy, r, colour, 'stroke="#fff" stroke-width="1.2"');
  t.say(cx, cy + r * 0.38, String(no), { size: r * 1.15, fill: '#fff', bold: true, anchor: 'middle', family: 'head' });
}

// ───────────────────────── masthead ─────────────────────────
const HEAD_H = 132;
t.box(0, 0, W, HEAD_H, INK);
t.box(0, HEAD_H, W, 5, HOT);
t.say(18, 28, 'THE WORLD IN ONE DAY', { size: 15, fill: GOLD, bold: true, family: 'head', spacing: 3 });
t.say(W - 18, 28, DAY.edition, { size: 12.5, fill: '#cfd6e6', anchor: 'end', family: 'head', spacing: 0.6 });
t.say(W / 2, 104, DAY.big, { size: 90, fill: '#fff', bold: true, anchor: 'middle', family: 'head', fit: W - 40, spacing: 1 });
const strap = `${all.length} STORIES · ${regionsUsed.size} REGIONS · ${fields.size} FIELDS · EVERY ONE FROM THIS ${DAY.weekday}`;
t.say(W / 2, 125, strap, { size: 15.5, fill: GOLD, bold: true, anchor: 'middle', family: 'head', spacing: 1.6, fit: W - 60 });

// ───────────────────────── the day in UTC ─────────────────────────
const STRIP_Y = HEAD_H + 5;
const STRIP_H = 50;
t.box(0, STRIP_Y, W, STRIP_H, '#e9e1cc');
t.say(12, STRIP_Y + 15, 'THE DAY', { size: 11.5, fill: INK, bold: true, family: 'head', spacing: 1 });
t.say(12, STRIP_Y + 29, 'IN UTC', { size: 11.5, fill: HOT, bold: true, family: 'head', spacing: 1 });
t.say(12, STRIP_Y + 42, DAY.short, { size: 8.5, fill: '#555' });
const AX0 = 84;
const AX1 = W - 14;
const axisY = STRIP_Y + 25;
const hourX = (h) => AX0 + (h / 24) * (AX1 - AX0);
t.line(AX0, axisY, AX1, axisY, INK, 2);
for (let h = 0; h <= 24; h += 1) {
  const big = h % 3 === 0;
  t.line(hourX(h), axisY - (big ? 5 : 3), hourX(h), axisY + (big ? 5 : 3), INK, big ? 1.4 : 0.8);
}
// Stories with a clock time and a short tick label, most prominent first (the list is already in that order),
// so a lead never loses its place on the strip to a brief.
const timed = all.filter((s) => s.utc && s.tick).map((s) => ({ s, h: Number(s.utc.slice(0, 2)) + Number(s.utc.slice(3, 5)) / 60 }));
const taken = { up: [], down: [] };
const free = (side, a, b) => taken[side].every(([p, q]) => b < p || a > q);
for (const { s, h } of timed) {
  const x = hourX(h);
  const label = `${s.utc} ${s.tick}`;
  const lw = widthOf(label, 8.6, true) + 8;
  const lx = Math.max(AX0 + lw / 2, Math.min(AX1 - lw / 2, x));
  const side = ['up', 'down'].find((sd) => free(sd, lx - lw / 2, lx + lw / 2));
  if (!side) continue; // no room on either side: the story still carries its time in its own text
  taken[side].push([lx - lw / 2, lx + lw / 2]);
  const ty = side === 'up' ? axisY - 10 : axisY + 17;
  t.dot(x, axisY, 3.6, SURE[s.sure].colour, 'stroke="#fff" stroke-width="1"');
  t.line(x, axisY, lx, side === 'up' ? axisY - 8 : axisY + 8, SURE[s.sure].colour, 1);
  t.say(lx, ty, label, { size: 8.6, fill: INK, bold: true, anchor: 'middle' });
}

// ───────────────────────── leads ─────────────────────────
const LEAD_Y = STRIP_Y + STRIP_H + 8;
const LEAD_H = 168;
const leadW = (W - 24 - (leads.length - 1) * 8) / leads.length;
leads.forEach((s, i) => {
  const x = 12 + i * (leadW + 8);
  const reg = REGIONS[s.region];
  t.box(x, LEAD_Y, leadW, LEAD_H, '#fff', `rx="8" stroke="${RULE}" stroke-width="1"`);
  t.box(x, LEAD_Y, leadW, 6, reg.colour, 'rx="3"');
  const pic = 104;
  t.raw(drawIcon(s.icon, x + 8, LEAD_Y + 14, pic, { ink: INK, accent: reg.colour, pale: '#fff7e0', tile: reg.tint }));
  numberDisc(x + 14, LEAD_Y + 20, 11, s.no, reg.colour);
  const tx = x + pic + 16;
  const tw = leadW - pic - 24;
  t.say(tx, LEAD_Y + 22, `${reg.name} · ${s.place.toUpperCase()}`, { size: 9.5, fill: reg.colour, bold: true, spacing: 0.5, fit: tw });
  const headLines = fold(s.head, 17, tw, 4, true);
  let yy = t.para(tx, LEAD_Y + 41, headLines, 18, { size: 17, fill: INK, bold: true, family: 'head' });
  const sumLines = fold(s.sum, 11, tw, Math.max(2, 8 - headLines.length), false);
  t.para(tx, yy - 2, sumLines, 13, { size: 11, fill: '#222' });
  // caption under the picture: what the drawing is
  t.say(x + 8 + pic / 2, LEAD_Y + 14 + pic + 13, s.caption, { size: 9.5, fill: INK, bold: true, anchor: 'middle', fit: pic });
  t.say(x + 8 + pic / 2, LEAD_Y + 14 + pic + 25, s.utc ? `${s.utc} UTC` : s.when, { size: 9.5, fill: HOT, bold: true, anchor: 'middle', fit: pic });
  chip(tx, LEAD_Y + LEAD_H - 10, s.sure, s.src, 9.5, tw);
});

// ───────────────────────── picture cards ─────────────────────────
const CARD_Y = LEAD_Y + LEAD_H + 8;
const perRow = Math.ceil(cards.length / 2);
const cardW = (W - 24 - (perRow - 1) * 6) / perRow;
const CARD_H = 104;
cards.forEach((s, i) => {
  const col = i % perRow;
  const row = Math.floor(i / perRow);
  const x = 12 + col * (cardW + 6);
  const y = CARD_Y + row * (CARD_H + 6);
  const reg = REGIONS[s.region];
  t.box(x, y, cardW, CARD_H, '#fff', `rx="6" stroke="${RULE}" stroke-width="1"`);
  t.box(x, y, 5, CARD_H, reg.colour, 'rx="2"');
  const pic = 46;
  t.raw(drawIcon(s.icon, x + 10, y + 6, pic, { ink: INK, accent: reg.colour, pale: '#fff7e0', tile: reg.tint }));
  numberDisc(x + 13, y + 9, 8.5, s.no, reg.colour);
  const tx = x + pic + 15;
  const tw = cardW - pic - 20;
  t.say(tx, y + 15, s.place.toUpperCase(), { size: 8.6, fill: reg.colour, bold: true, fit: tw, spacing: 0.3 });
  const hl = fold(s.head, 12.2, tw, 3, true);
  t.para(tx, y + 28, hl, 12.8, { size: 12.2, fill: INK, bold: true, family: 'head' });
  const sy = Math.max(y + 28 + hl.length * 12.8, y + pic + 16) - 3;
  const room = Math.floor((y + CARD_H - 16 - sy) / 10.6) + 1;
  const sl = fold(s.sum, 9.4, cardW - 18, Math.max(1, room), false);
  t.para(x + 10, sy + 2, sl, 10.6, { size: 9.4, fill: '#222' });
  chip(x + 10, y + CARD_H - 6, s.sure, s.src, 8.2, cardW - 18);
});

// ───────────────────────── lower half: map + date check (left), briefs (right) ─────────────────────────
const LOW_Y = CARD_Y + 2 * CARD_H + 6 + 10;
const FOOT_Y = W - 22;
const LEFT_W = 366;

// map
const MAP_H = 174;
t.box(12, LOW_Y, LEFT_W, MAP_H + 18, '#dfe9f0', `rx="6" stroke="${RULE}" stroke-width="1"`);
t.say(20, LOW_Y + 13, 'WHERE IT HAPPENED', { size: 10.5, fill: INK, bold: true, family: 'head', spacing: 1 });
t.say(12 + LEFT_W - 8, LOW_Y + 13, 'numbers match the stories', { size: 8.6, fill: '#445', anchor: 'end' });
const atlas = makeAtlas(16, LOW_Y + 18, LEFT_W - 8, MAP_H - 4);
t.raw(atlas.land('#8ea889', 2.5));
const pins = atlas.placePins(
  all.filter((s) => s.lon !== undefined).map((s) => ({ lon: s.lon, lat: s.lat, no: s.no, colour: REGIONS[s.region].colour })),
  6.2,
);
for (const p of pins) if (Math.hypot(p.cx - p.ox, p.cy - p.oy) > 1) t.line(p.ox, p.oy, p.cx, p.cy, p.colour, 0.8);
for (const p of pins) {
  t.dot(p.cx, p.cy, 6.2, p.colour, 'stroke="#fff" stroke-width="0.9"');
  t.say(p.cx, p.cy + 2.8, String(p.no), { size: 7.6, fill: '#fff', bold: true, anchor: 'middle' });
}

// region tally under the map
const TALLY_Y = LOW_Y + MAP_H + 18 + 6;
const regionKeys = Object.keys(REGIONS).filter((k) => regionsUsed.has(k));
const tallyW = LEFT_W / regionKeys.length;
regionKeys.forEach((k, i) => {
  const n = all.filter((s) => s.region === k).length;
  const x = 12 + i * tallyW;
  t.box(x + 1, TALLY_Y, tallyW - 2, 24, REGIONS[k].colour, 'rx="4"');
  t.say(x + tallyW / 2, TALLY_Y + 10, REGIONS[k].short, { size: 7.4, fill: '#fff', bold: true, anchor: 'middle', fit: tallyW - 6 });
  t.say(x + tallyW / 2, TALLY_Y + 21, String(n), { size: 11, fill: '#fff', bold: true, anchor: 'middle', family: 'head' });
});

// how sure legend
const SURE_Y = TALLY_Y + 30;
const SURE_H = 54;
t.box(12, SURE_Y, LEFT_W, SURE_H, '#fff', `rx="6" stroke="${RULE}" stroke-width="1"`);
t.say(20, SURE_Y + 13, 'HOW SURE', { size: 10.5, fill: INK, bold: true, family: 'head', spacing: 1 });
t.say(84, SURE_Y + 13, 'every story carries one of these tags and its source', { size: 8.6, fill: '#445' });
{
  // three tags on the first row, the rest on the second
  const keys = Object.keys(SURE);
  let x = 20;
  keys.forEach((key, i) => {
    if (i === 3) x = 20;
    const y = SURE_Y + (i < 3 ? 29 : 45);
    const n = all.filter((s) => s.sure === key).length;
    const words = `${SURE[key].means} (${n})`;
    const w = chip(x, y, key, '', 8.4);
    t.say(x + w + 4, y + 1, words, { size: 8.2, fill: '#333' });
    x += w + 4 + widthOf(words, 8.2) + 12;
  });
}

// date check
const CHECK_Y = SURE_Y + SURE_H + 6;
const CHECK_H = FOOT_Y - CHECK_Y - 6;
t.box(12, CHECK_Y, LEFT_W, CHECK_H, '#fff', `rx="6" stroke="${HOT}" stroke-width="1.4"`);
t.box(12, CHECK_Y, LEFT_W, 17, HOT, 'rx="6"');
t.say(20, CHECK_Y + 12.5, 'DATE CHECK', { size: 10.5, fill: '#fff', bold: true, family: 'head', spacing: 1 });
t.say(12 + LEFT_W - 8, CHECK_Y + 12.5, `left out: not from ${DAY.short}`, { size: 8.8, fill: '#fff', anchor: 'end' });
{
  const rowH = (CHECK_H - 21) / LEFT_OUT.length;
  LEFT_OUT.forEach((o, i) => {
    const y = CHECK_Y + 17 + 4 + i * rowH + rowH * 0.62;
    t.say(20, y, '✕', { size: 9, fill: HOT, bold: true });
    t.say(31, y, o.what, { size: 8.9, fill: '#222', fit: LEFT_W - 100 });
    t.say(12 + LEFT_W - 8, y, o.when, { size: 8.9, fill: HOT, bold: true, anchor: 'end' });
  });
}

// briefs
const BX = 12 + LEFT_W + 10;
const BW = W - 12 - BX;
t.say(BX, LOW_Y + 11, 'ALSO THIS ' + DAY.weekday, { size: 11.5, fill: INK, bold: true, family: 'head', spacing: 1 });
t.say(W - 12, LOW_Y + 11, 'time in UTC · tag · source', { size: 8.6, fill: '#445', anchor: 'end' });
t.line(BX, LOW_Y + 16, W - 12, LOW_Y + 16, INK, 1.5);
{
  const cols = 2;
  const rows = Math.ceil(briefs.length / cols);
  const colW = (BW - 10) / cols;
  const top = LOW_Y + 20;
  const rowH = Math.min(25, (FOOT_Y - 4 - top) / rows);
  briefs.forEach((s, i) => {
    const col = Math.floor(i / rows);
    const row = i % rows;
    const x = BX + col * (colW + 10);
    const y = top + row * rowH;
    const reg = REGIONS[s.region];
    if (row % 2 === 0) t.box(x - 2, y, colW + 4, rowH, '#efe8d6');
    numberDisc(x + 8, y + rowH / 2, 7, s.no, reg.colour);
    const tx = x + 19;
    const one = rowH < 21;
    const line1 = `${s.utc ? s.utc + ' ' : ''}${s.head}`;
    t.say(tx, y + (one ? rowH / 2 + 3.4 : 10.2), line1, { size: 9.9, fill: INK, bold: true, fit: colW - 21 - (one ? 78 : 0) });
    if (one) {
      const tag = SURE[s.sure];
      t.say(x + colW, y + rowH / 2 + 3, `${tag.word.slice(0, 4)}·${s.src}`, { size: 7.4, fill: tag.colour, bold: true, anchor: 'end', fit: 74 });
    } else {
      const tag = SURE[s.sure];
      const tagText = `${tag.word} · ${s.src}`;
      const tagW = Math.min(110, widthOf(tagText, 7.6, true) + 2);
      t.say(tx, y + 20.6, s.sum, { size: 8.5, fill: '#333', fit: colW - 21 - tagW - 5 });
      t.say(x + colW, y + 20.6, tagText, { size: 7.6, fill: tag.colour, bold: true, anchor: 'end', fit: 110 });
    }
  });
}

// foot
t.box(0, FOOT_Y, W, 22, INK);
t.say(12, FOOT_Y + 14.5, DAY.foot, { size: 9.6, fill: '#e8ecf5', fit: W - 24 });

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${W}" viewBox="0 0 ${W} ${W}">\n${t.join()}\n</svg>`;
const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(DAY.big)}</title><style>html,body{margin:0;padding:0;background:${PAPER};overflow:hidden}svg{display:block}</style></head><body>${svg}</body></html>`;
writeFileSync(new URL('./front-page.html', import.meta.url), html);
console.log(`${all.length} stories (${leads.length} leads, ${cards.length} cards, ${briefs.length} briefs), ${regionsUsed.size} regions, ${fields.size} fields, ${timed.length} timed`);
for (const k of Object.keys(SURE)) console.log(' ', k, all.filter((s) => s.sure === k).length);

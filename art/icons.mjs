// icons.mjs — small drawn pictures, one per kind of story. Each is drawn in a 100 x 100 frame
// from three colours: k = ink, a = accent, l = pale. drawIcon() places one on the page.

const P = (d, fill, more = '') => `<path d="${d}" fill="${fill}" ${more}/>`;
const S = (d, stroke, sw = 5, more = '') => `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" ${more}/>`;
const C = (cx, cy, r, fill, more = '') => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${more}/>`;
const R = (x, y, w, h, fill, more = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${more}/>`;

const ICONS = {
  turkey: (k, a, l) =>
    [0, 1, 2, 3, 4, 5, 6].map((i) => `<ellipse cx="50" cy="26" rx="8" ry="24" fill="${i % 2 ? a : l}" stroke="${k}" stroke-width="2" transform="rotate(${-66 + i * 22} 50 62)"/>`).join('') +
    C(50, 66, 22, k) + C(50, 40, 11, k) + P('M50 42l11 4-11 4z', l) + P('M47 48q-5 8 1 13z', a) + C(46, 37, 2.4, l) + S('M42 86v9M58 86v9', k, 4),
  balloon: (k, a, l) => `<ellipse cx="50" cy="36" rx="30" ry="28" fill="${a}" stroke="${k}" stroke-width="3"/>` + S('M36 20q14-10 28 0', l, 4) + S('M30 58L46 88M70 58L54 88M50 64v24', k, 2) + R(43, 86, 14, 9, k),
  gridiron: (k, a, l) => `<ellipse cx="50" cy="50" rx="40" ry="24" fill="${a}" stroke="${k}" stroke-width="4" transform="rotate(-28 50 50)"/>` + S('M34 58L66 42M42 48l5 9M50 44l5 9M58 40l5 9', l, 4),
  soccer: (k, a, l) => C(50, 50, 36, l, `stroke="${k}" stroke-width="4"`) + P('M50 34l15 11-6 18H41l-6-18z', k) + S('M50 34V16M65 45l18-6M59 63l11 16M41 63L30 79M35 45l-18-6', k, 3),
  cricket: (k, a, l) => P('M58 8l12 6-30 62-12-6z', l, `stroke="${k}" stroke-width="3"`) + S('M32 72L22 92', k, 7) + C(74, 70, 12, a, `stroke="${k}" stroke-width="3"`) + S('M66 62q10 6 16 16', l, 2),
  tennis: (k, a, l) => `<ellipse cx="42" cy="36" rx="24" ry="28" fill="${l}" stroke="${k}" stroke-width="5"/>` + S('M30 20v32M42 10v52M54 20v32M20 30h44M20 44h44', k, 1.5) + S('M52 62L72 92', k, 7) + C(78, 30, 9, a),
  hoop: (k, a, l) => C(50, 52, 34, a, `stroke="${k}" stroke-width="4"`) + S('M16 52h68M50 18v68M26 28q24 24 0 48M74 28q-24 24 0 48', k, 3),
  puck: (k, a, l) => S('M70 8L46 70q-4 10-16 10H14', k, 8) + `<ellipse cx="72" cy="82" rx="16" ry="7" fill="${a}" stroke="${k}" stroke-width="3"/>`,
  trophy: (k, a, l) => P('M30 14h40v22q0 24-20 26-20-2-20-26z', a, `stroke="${k}" stroke-width="3"`) + S('M30 22H16q0 20 16 22M70 22h14q0 20-16 22', k, 4) + R(45, 62, 10, 14, k) + R(32, 76, 36, 10, k),
  racecar: (k, a, l) => P('M6 62h14l10-14h30l12 10h20v10H6z', a, `stroke="${k}" stroke-width="3"`) + R(80, 40, 12, 6, k) + C(26, 70, 11, k) + C(74, 70, 11, k) + C(26, 70, 4, l) + C(74, 70, 4, l),
  rocket: (k, a, l) => P('M50 6q18 20 14 54H36q-4-34 14-54z', l, `stroke="${k}" stroke-width="3"`) + C(50, 34, 7, a, `stroke="${k}" stroke-width="2"`) + P('M36 46L22 66h14zM64 46l14 20H64z', k) + P('M42 62h16l-8 30z', a),
  satellite: (k, a, l) => R(38, 38, 24, 24, l, `stroke="${k}" stroke-width="3" transform="rotate(45 50 50)"`) + R(4, 40, 26, 20, a, `stroke="${k}" stroke-width="2" transform="rotate(45 50 50)"`) + R(70, 40, 26, 20, a, `stroke="${k}" stroke-width="2" transform="rotate(45 50 50)"`) + S('M70 78q10-2 12-12M76 90q20-4 22-24', k, 3),
  moon: (k, a, l) => C(50, 50, 34, l, `stroke="${k}" stroke-width="3"`) + C(38, 40, 7, a) + C(60, 58, 9, a) + C(58, 32, 4, a) + P('M12 14l3 7 7 3-7 3-3 7-3-7-7-3 7-3zM86 70l2 5 5 2-5 2-2 5-2-5-5-2 5-2z', k),
  quake: (k, a, l) => S('M4 54h18l6-14 8 34 8-58 8 72 8-48 6 22 6-8h18', a, 4.5) + S('M4 88h92', k, 3) + S('M40 88l6-10 6 6 8-12', k, 2.5),
  cyclone: (k, a, l) => S('M50 50m-8 0a8 8 0 1 1 16 0q0 22-26 22M58 50q0-22 26-22', k, 6) + S('M50 28q-24 0-30 22M50 72q24 0 30-22', a, 6) + C(50, 50, 5, a),
  rain: (k, a, l) => P('M24 52a16 16 0 0 1 4-31 22 22 0 0 1 42 4 14 14 0 0 1 4 27z', l, `stroke="${k}" stroke-width="3"`) + S('M30 64l-6 14M48 64l-6 14M66 64l-6 14M40 82l-4 10M58 82l-4 10', a, 4.5),
  flood: (k, a, l) => P('M28 52V30l22-18 22 18v22z', l, `stroke="${k}" stroke-width="3"`) + R(44, 36, 12, 16, k) + S('M4 62q12-10 23 0t23 0 23 0 23 0M4 78q12-10 23 0t23 0 23 0 23 0', a, 5.5),
  snow: (k, a, l) => S('M50 8v84M14 29l72 42M14 71l72-42', a, 5) + S('M40 14l10 10 10-10M40 86l10-10 10 10M14 42l14-2-4-14M86 58l-14 2 4 14M14 58l14 2-4 14M86 42l-14-2 4-14', k, 3),
  fire: (k, a, l) => P('M50 6q8 20 22 32 12 12 8 30-6 24-30 24T20 68q-4-16 10-30 4 12 10 12-2-26 10-44z', a, `stroke="${k}" stroke-width="3"`) + P('M50 52q12 12 8 24-2 10-8 10t-9-10q-2-10 9-24z', l),
  volcano: (k, a, l) => P('M6 92l30-50h28l30 50z', k) + P('M36 42l6 12 8-8 8 10 6-14z', a) + S('M50 34V14M38 30l-8-14M62 30l8-14', a, 5) + C(28, 10, 5, l, `stroke="${k}" stroke-width="2"`) + C(72, 10, 5, l, `stroke="${k}" stroke-width="2"`),
  bank: (k, a, l) => P('M8 36l42-26 42 26z', k) + R(16, 42, 10, 34, a) + R(36, 42, 10, 34, a) + R(54, 42, 10, 34, a) + R(74, 42, 10, 34, a) + R(8, 78, 84, 10, k),
  percent: (k, a, l) => C(50, 50, 40, l, `stroke="${k}" stroke-width="4"`) + S('M34 68l32-36', k, 7) + C(34, 36, 8, a, `stroke="${k}" stroke-width="3"`) + C(66, 64, 8, a, `stroke="${k}" stroke-width="3"`),
  chartUp: (k, a, l) => S('M10 10v80h82', k, 4) + S('M18 74l18-18 14 10 34-40', a, 7) + P('M72 22h18v18z', a),
  chartDown: (k, a, l) => S('M10 10v80h82', k, 4) + S('M18 26l18 18 14-10 34 40', a, 7) + P('M72 78h18V60z', a),
  bars: (k, a, l) => S('M8 90h86', k, 4) + R(16, 56, 14, 32, l, `stroke="${k}" stroke-width="2"`) + R(36, 40, 14, 48, a, `stroke="${k}" stroke-width="2"`) + R(56, 48, 14, 40, l, `stroke="${k}" stroke-width="2"`) + R(76, 20, 14, 68, a, `stroke="${k}" stroke-width="2"`),
  coins: (k, a, l) => [78, 66, 54].map((y) => `<ellipse cx="38" cy="${y}" rx="26" ry="9" fill="${a}" stroke="${k}" stroke-width="3"/>`).join('') + [78, 66, 54, 42, 30].map((y) => `<ellipse cx="68" cy="${y}" rx="22" ry="8" fill="${l}" stroke="${k}" stroke-width="3"/>`).join(''),
  closed: (k, a, l) => R(10, 26, 80, 48, l, `stroke="${k}" stroke-width="4" rx="6"`) + S('M30 26L50 8l20 18', k, 3) + `<text x="50" y="60" font-family="Bahnschrift,Arial" font-size="24" font-weight="700" text-anchor="middle" fill="${a}">CLOSED</text>`,
  gavel: (k, a, l) => R(30, 14, 44, 22, a, `stroke="${k}" stroke-width="3" rx="4" transform="rotate(38 52 25)"`) + S('M46 40L16 78', k, 8) + R(48, 78, 44, 10, k, 'rx="3"'),
  scales: (k, a, l) => S('M50 12v70M22 26h56M30 86h40', k, 5) + S('M22 26L10 54h24zM78 26L66 54h24z', k, 3) + P('M8 54h28q-2 12-14 12T8 54zM64 54h28q-2 12-14 12T64 54z', a),
  ballot: (k, a, l) => R(14, 46, 72, 44, a, `stroke="${k}" stroke-width="3"`) + R(34, 46, 32, 6, k) + P('M38 8h30v38H38z', l, `stroke="${k}" stroke-width="3" transform="rotate(8 53 27)"`) + S('M46 24l6 7 11-13', k, 4),
  dome: (k, a, l) => P('M24 52q0-28 26-30 26 2 26 30z', a, `stroke="${k}" stroke-width="3"`) + S('M50 22V6', k, 4) + P('M50 6l12 5-12 5z', k) + R(12, 52, 76, 8, k) + R(18, 60, 8, 24, l, `stroke="${k}" stroke-width="2"`) + R(38, 60, 8, 24, l, `stroke="${k}" stroke-width="2"`) + R(56, 60, 8, 24, l, `stroke="${k}" stroke-width="2"`) + R(74, 60, 8, 24, l, `stroke="${k}" stroke-width="2"`) + R(8, 84, 84, 8, k),
  summit: (k, a, l) => S('M22 20v66M50 12v74M78 20v66', k, 4) + P('M22 20h20v14H22z', a) + P('M50 12h22v15H50z', l, `stroke="${k}" stroke-width="2"`) + P('M78 20h18v14H78z', a) + R(8, 84, 86, 8, k),
  podium: (k, a, l) => C(50, 22, 12, k) + P('M30 62q0-24 20-24t20 24z', k) + P('M20 56h60l-8 36H28z', a, `stroke="${k}" stroke-width="3"`) + S('M50 56V44', l, 3),
  megaphone: (k, a, l) => P('M14 40h18l36-22v60L32 58H14z', a, `stroke="${k}" stroke-width="3"`) + S('M26 58l6 26h10', k, 5) + S('M78 34q10 14 0 28M86 24q18 24 0 48', k, 4),
  placards: (k, a, l) => R(10, 12, 34, 24, a, `stroke="${k}" stroke-width="3"`) + S('M27 36v24', k, 4) + R(56, 20, 34, 24, l, `stroke="${k}" stroke-width="3"`) + S('M73 44v20', k, 4) + C(27, 68, 9, k) + C(73, 72, 9, k) + C(50, 64, 9, k) + P('M10 96q4-18 17-18t17 18zM33 96q4-20 17-20t17 20zM56 96q4-16 17-16t17 16z', k),
  missile: (k, a, l) => P('M88 12q-2 22-18 38L42 78 22 58l28-28Q66 14 88 12z', l, `stroke="${k}" stroke-width="3"`) + P('M22 58L8 62l10-18zM42 78l-4 14 18-10z', k) + P('M24 76L6 94l4-16z', a) + C(66, 34, 6, a),
  drone: (k, a, l) => S('M24 24l52 52M76 24L24 76', k, 5) + R(38, 38, 24, 24, a, `stroke="${k}" stroke-width="3" rx="5"`) + [[24, 24], [76, 24], [24, 76], [76, 76]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="18" ry="6" fill="${l}" stroke="${k}" stroke-width="2.5"/>`).join(''),
  shield: (k, a, l) => P('M50 8l36 12v26q0 30-36 46Q14 76 14 46V20z', a, `stroke="${k}" stroke-width="4"`) + S('M34 48l12 13 22-26', l, 7),
  blast: (k, a, l) => P('M50 4l10 26 24-14-10 26 24 8-24 10 12 24-26-10-10 24-10-24-26 10 12-24L2 50l24-8-10-26 24 14z', a, `stroke="${k}" stroke-width="3"`) + C(50, 50, 12, l),
  dove: (k, a, l) => P('M12 50q20-8 32 4 6-30 34-40-6 22-4 34 10 2 16 10-14 0-20 10-10 16-30 14 8-8 6-18-14-10-34-14z', l, `stroke="${k}" stroke-width="3"`) + S('M70 62q10 14 4 30M80 78l10-4M78 86l-10 2', a, 3.5),
  cross: (k, a, l) => C(50, 50, 40, l, `stroke="${k}" stroke-width="4"`) + P('M40 20h20v20h20v20H60v20H40V60H20V40h20z', a),
  syringe: (k, a, l) => R(30, 34, 46, 18, l, `stroke="${k}" stroke-width="3" transform="rotate(-40 50 50)"`) + R(42, 34, 20, 18, a, 'transform="rotate(-40 50 50)"') + S('M22 78L8 92M76 16l10 12M70 22l12-10', k, 5) + S('M34 58l8 8', k, 3),
  virus: (k, a, l) => C(50, 50, 24, a, `stroke="${k}" stroke-width="4"`) + [0, 45, 90, 135, 180, 225, 270, 315].map((d) => `<g transform="rotate(${d} 50 50)"><line x1="50" y1="26" x2="50" y2="12" stroke="${k}" stroke-width="4"/><circle cx="50" cy="10" r="5" fill="${k}"/></g>`).join('') + C(42, 44, 5, l) + C(58, 56, 4, l),
  chip: (k, a, l) => R(24, 24, 52, 52, k, 'rx="6"') + R(36, 36, 28, 28, a, 'rx="3"') + S('M34 24V10M50 24V10M66 24V10M34 90V76M50 90V76M66 90V76M24 34H10M24 50H10M24 66H10M90 34H76M90 50H76M90 66H76', k, 4),
  phone: (k, a, l) => R(28, 6, 44, 88, k, 'rx="8"') + R(33, 16, 34, 60, l) + C(50, 85, 4, l) + R(38, 26, 24, 8, a) + R(38, 40, 24, 5, k) + R(38, 50, 16, 5, k),
  atom: (k, a, l) => [0, 60, 120].map((d) => `<ellipse cx="50" cy="50" rx="42" ry="15" fill="none" stroke="${k}" stroke-width="3.5" transform="rotate(${d} 50 50)"/>`).join('') + C(50, 50, 9, a),
  flask: (k, a, l) => P('M40 8h20v28l22 46q4 10-8 10H26q-12 0-8-10l22-46z', l, `stroke="${k}" stroke-width="4"`) + P('M30 62h40l10 20q2 6-4 6H24q-6 0-4-6z', a) + S('M36 8h28', k, 5),
  film: (k, a, l) => R(10, 38, 80, 50, k, 'rx="4"') + P('M10 22l78-12 3 14-78 14z', a, `stroke="${k}" stroke-width="3"`) + S('M26 20l8 13M44 17l8 13M62 14l8 13', k, 5) + P('M42 52l22 11-22 11z', l),
  book: (k, a, l) => P('M50 22Q30 10 8 16v64q22-6 42 6z', l, `stroke="${k}" stroke-width="3"`) + P('M50 22q20-12 42-6v64q-22-6-42 6z', a, `stroke="${k}" stroke-width="3"`) + S('M18 32q12-2 22 4M18 46q12-2 22 4M18 60q12-2 22 4', k, 2.5),
  music: (k, a, l) => S('M36 74V20l44-10v54', k, 6) + `<ellipse cx="26" cy="76" rx="14" ry="10" fill="${a}" stroke="${k}" stroke-width="3"/><ellipse cx="70" cy="66" rx="14" ry="10" fill="${a}" stroke="${k}" stroke-width="3"/>` + S('M36 34l44-10', k, 6),
  candle: (k, a, l) => R(38, 44, 24, 46, l, `stroke="${k}" stroke-width="3"`) + P('M50 8q12 14 6 24-2 6-6 6t-6-6q-6-10 6-24z', a, `stroke="${k}" stroke-width="2.5"`) + S('M50 44v-6', k, 3) + R(26, 88, 48, 6, k),
  crown: (k, a, l) => P('M12 76L8 28l22 20 20-32 20 32 22-20-4 48z', a, `stroke="${k}" stroke-width="4"`) + R(12, 76, 76, 10, k) + C(50, 16, 5, k) + C(8, 28, 5, k) + C(92, 28, 5, k),
  ship: (k, a, l) => P('M8 62h84l-12 22H20z', k) + R(26, 44, 16, 16, a, `stroke="${k}" stroke-width="2"`) + R(44, 36, 16, 24, l, `stroke="${k}" stroke-width="2"`) + R(62, 46, 14, 14, a, `stroke="${k}" stroke-width="2"`) + S('M52 36V18', k, 4) + S('M4 92q12-8 23 0t23 0 23 0 23 0', a, 4),
  plane: (k, a, l) => P('M92 14q6 6-6 18L70 48l8 36-8 8-18-28-16 14 2 14-6 6-8-16-16-8 6-6 14 2 14-16L14 36l8-8 36 8 16-16q12-12 18-6z', a, `stroke="${k}" stroke-width="3"`),
  train: (k, a, l) => R(22, 8, 56, 66, a, `stroke="${k}" stroke-width="4" rx="12"`) + R(30, 18, 40, 22, l, `stroke="${k}" stroke-width="2"`) + C(36, 56, 5, k) + C(64, 56, 5, k) + S('M30 74L16 94M70 74l14 20M24 86h52', k, 4),
  truck: (k, a, l) => R(6, 30, 52, 40, a, `stroke="${k}" stroke-width="3"`) + P('M58 42h20l14 14v14H58z', l, `stroke="${k}" stroke-width="3"`) + C(24, 74, 10, k) + C(74, 74, 10, k) + C(24, 74, 4, l) + C(74, 74, 4, l),
  derrick: (k, a, l) => S('M30 88L50 12l20 76M36 66h28M41 46h18M34 76l32-22M66 76L34 54', k, 4) + R(14, 86, 72, 8, k) + P('M82 30q10 14 0 22-10-8 0-22z', a),
  bolt: (k, a, l) => P('M58 4L18 56h24l-8 40 48-58H56z', a, `stroke="${k}" stroke-width="4" stroke-linejoin="round"`),
  factory: (k, a, l) => P('M8 90V50l26 14V50l26 14V50l30 16v24z', k) + R(66, 12, 12, 46, a, `stroke="${k}" stroke-width="2"`) + R(20, 72, 10, 10, l) + R(44, 72, 10, 10, l) + R(68, 72, 10, 10, l) + S('M72 8q6-8 16-2', k, 3),
  wheat: (k, a, l) => S('M50 94V30', k, 4) + [30, 44, 58].map((y) => P(`M50 ${y}q-18-4-18-20 16 2 18 20zM50 ${y}q18-4 18-20-16 2-18 20z`, a, `stroke="${k}" stroke-width="2"`)).join('') + P('M50 30q-8-12 0-24 8 12 0 24z', a, `stroke="${k}" stroke-width="2"`),
  tree: (k, a, l) => R(44, 62, 12, 30, k) + P('M50 6l26 30H62l18 26H20l18-26H24z', a, `stroke="${k}" stroke-width="3"`),
  globe: (k, a, l) => C(50, 50, 40, l, `stroke="${k}" stroke-width="4"`) + S('M10 50h80M50 10v80M50 10q-26 40 0 80M50 10q26 40 0 80M16 30h68M16 70h68', k, 2.5),
  house: (k, a, l) => P('M10 48L50 14l40 34v6H80v36H20V54H10z', a, `stroke="${k}" stroke-width="3"`) + R(42, 62, 16, 28, k) + R(60, 20, 10, 16, k),
  passport: (k, a, l) => R(22, 8, 56, 84, a, `stroke="${k}" stroke-width="3" rx="5"`) + C(50, 40, 16, l, `stroke="${k}" stroke-width="2.5"`) + S('M34 40h32M50 24v32M50 24q-12 16 0 32M50 24q12 16 0 32', k, 1.8) + R(34, 68, 32, 5, l) + R(40, 78, 20, 4, l),
  prison: (k, a, l) => R(12, 12, 76, 76, l, `stroke="${k}" stroke-width="5"`) + S('M30 12v76M50 12v76M70 12v76', k, 6) + R(12, 44, 76, 8, a),
  star: (k, a, l) => P('M50 6l13 28 31 4-23 21 6 31-27-15-27 15 6-31L6 38l31-4z', a, `stroke="${k}" stroke-width="3" stroke-linejoin="round"`),
  sun: (k, a, l) => C(50, 50, 20, a, `stroke="${k}" stroke-width="3"`) + [0, 45, 90, 135, 180, 225, 270, 315].map((d) => `<line x1="50" y1="20" x2="50" y2="6" stroke="${k}" stroke-width="5" stroke-linecap="round" transform="rotate(${d} 50 50)"/>`).join(''),
  wave: (k, a, l) => S('M4 34q12-14 23 0t23 0 23 0 23 0M4 56q12-14 23 0t23 0 23 0 23 0M4 78q12-14 23 0t23 0 23 0 23 0', a, 6) + S('M4 56q12-14 23 0t23 0 23 0 23 0', k, 6),
  paper: (k, a, l) => P('M20 8h44l18 18v66H20z', l, `stroke="${k}" stroke-width="3"`) + P('M64 8v18h18z', k) + S('M30 40h40M30 54h40M30 68h26', k, 3.5) + C(68, 76, 9, a),
  card: (k, a, l) => R(6, 24, 88, 54, a, `stroke="${k}" stroke-width="3" rx="7"`) + R(6, 36, 88, 11, k) + R(16, 58, 26, 8, l) + R(62, 58, 20, 8, l),
};

export const iconNames = Object.keys(ICONS);

// Returns the SVG for one icon inside a rounded tile at (x, y) with the given side.
export function drawIcon(name, x, y, side, pal, tile = true) {
  const make = ICONS[name];
  if (!make) throw new Error('no icon called ' + name);
  const pad = tile ? side * 0.12 : 0;
  const s = (side - pad * 2) / 100;
  const bg = tile ? `<rect x="${x}" y="${y}" width="${side}" height="${side}" rx="${side * 0.1}" fill="${pal.tile}"/>` : '';
  return bg + `<g transform="translate(${x + pad} ${y + pad}) scale(${s.toFixed(4)})">${make(pal.ink, pal.accent, pal.pale)}</g>`;
}

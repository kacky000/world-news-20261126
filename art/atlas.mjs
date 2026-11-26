// atlas.mjs — a coarse world map drawn as latitude stripes cut to the continents, with numbered pins.
// Coastlines are hand-placed [lon, lat] corner lists: good enough to tell where a pin sits.

const LAND = {
  northAmerica: [[-166, 66], [-156, 71], [-128, 70], [-95, 72], [-82, 68], [-78, 62], [-64, 60], [-56, 52], [-66, 45], [-75, 39], [-81, 31], [-80, 25], [-90, 29], [-97, 26], [-97, 19], [-88, 16], [-83, 9], [-79, 8], [-92, 15], [-105, 20], [-112, 30], [-123, 38], [-125, 48], [-135, 58], [-152, 59], [-165, 60]],
  greenland: [[-55, 60], [-70, 76], [-58, 82], [-30, 83], [-20, 74], [-40, 64]],
  southAmerica: [[-79, 8], [-72, 12], [-61, 10], [-50, 0], [-35, -6], [-39, -18], [-48, -26], [-57, -37], [-66, -45], [-69, -54], [-74, -50], [-72, -30], [-70, -18], [-81, -5]],
  europe: [[-9, 37], [-9, 43], [-2, 44], [-5, 48], [2, 51], [8, 55], [5, 61], [14, 68], [26, 71], [42, 67], [58, 68], [60, 55], [50, 46], [40, 44], [28, 41], [23, 36], [18, 40], [12, 38], [8, 44], [3, 42], [0, 38]],
  britain: [[-6, 50], [-5, 58], [-2, 58], [1, 52]],
  africa: [[-17, 15], [-13, 27], [-6, 35], [10, 37], [20, 32], [32, 31], [37, 20], [43, 11], [51, 11], [41, -3], [40, -15], [35, -24], [28, -33], [19, -34], [13, -18], [9, 0], [8, 5], [-8, 4], [-15, 10]],
  madagascar: [[44, -24], [44, -16], [49, -13], [50, -17], [47, -25]],
  asia: [[60, 68], [75, 73], [105, 77], [140, 73], [170, 69], [179, 65], [162, 58], [156, 51], [142, 54], [135, 44], [128, 38], [122, 39], [121, 30], [114, 22], [108, 20], [109, 11], [103, 9], [100, 14], [98, 8], [103, 2], [98, 16], [94, 17], [90, 22], [80, 14], [77, 8], [72, 20], [66, 25], [57, 26], [51, 30], [48, 29], [56, 24], [59, 22], [52, 16], [45, 13], [42, 16], [35, 28], [35, 36], [28, 41], [40, 44], [50, 46], [60, 55]],
  japan: [[130, 32], [135, 35], [140, 41], [144, 44], [142, 39], [140, 35], [134, 33]],
  indonesia: [[95, 5], [105, -6], [115, -9], [125, -9], [120, -3], [118, 4], [110, 1], [104, -1]],
  philippines: [[119, 10], [121, 18], [124, 13], [126, 7], [122, 7]],
  newGuinea: [[131, -1], [141, -3], [150, -6], [146, -9], [138, -8]],
  australia: [[114, -22], [122, -17], [131, -12], [136, -12], [142, -11], [146, -19], [153, -26], [150, -37], [141, -38], [131, -32], [116, -35]],
  newZealand: [[173, -35], [178, -38], [174, -41], [171, -46], [167, -46], [172, -41]],
};

// Even-odd test: is a lon/lat point inside a corner list?
function inside(ring, lon, lat) {
  let hit = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

export function makeAtlas(x, y, w, h, top = 78, bottom = -56) {
  const px = (lon) => x + ((lon + 180) / 360) * w;
  const py = (lat) => y + ((top - lat) / (top - bottom)) * h;

  // Land as horizontal dashes: walk each latitude row and emit a run for every stretch of land.
  function land(colour, rowGap = 3) {
    const out = [];
    const stepLon = 1.5;
    for (let yy = y + 1; yy < y + h; yy += rowGap) {
      const lat = top - ((yy - y) / h) * (top - bottom);
      let runStart = null;
      for (let lon = -180; lon <= 180.01; lon += stepLon) {
        const on = lon < 180 && Object.values(LAND).some((ring) => inside(ring, lon, lat));
        if (on && runStart === null) runStart = lon;
        if (!on && runStart !== null) {
          out.push(`M${px(runStart).toFixed(1)} ${yy}H${px(lon).toFixed(1)}`);
          runStart = null;
        }
      }
    }
    return `<path d="${out.join('')}" stroke="${colour}" stroke-width="${rowGap - 1}" stroke-linecap="round" fill="none"/>`;
  }

  // Pins that would overlap are nudged apart along a small spiral.
  function placePins(spots, radius) {
    const placed = [];
    for (const s of spots) {
      let cx = px(s.lon);
      let cy = py(s.lat);
      let turn = 0;
      while (placed.some((p) => Math.hypot(p.cx - cx, p.cy - cy) < radius * 1.9) && turn < 60) {
        turn += 1;
        const ang = turn * 1.1;
        const reach = radius * (0.9 + turn * 0.33);
        cx = px(s.lon) + Math.cos(ang) * reach;
        cy = py(s.lat) + Math.sin(ang) * reach;
        cx = Math.min(x + w - radius, Math.max(x + radius, cx));
        cy = Math.min(y + h - radius, Math.max(y + radius, cy));
      }
      placed.push({ ...s, cx, cy, ox: px(s.lon), oy: py(s.lat) });
    }
    return placed;
  }

  return { px, py, land, placePins };
}

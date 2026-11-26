# world-news-20261126

[![make.fun · news-image-20261126](https://make.fun/badge/news-image-20261126.svg)](https://make.fun/bounty/news-image-20261126?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261126)
[![rank](https://make.fun/badge/news-image-20261126/kacky000/world-news-20261126/rank.svg)](https://make.fun/bounty/news-image-20261126/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261126)
[![reward](https://make.fun/badge/news-image-20261126/kacky000/world-news-20261126/reward.svg)](https://make.fun/bounty/news-image-20261126?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261126)

One 1024 x 1024 front page for the world's news of **Thursday 26 November 2026**: the date as the
largest text, a UTC timeline of the day, three drawn lead stories, twelve drawn cards, numbered briefs,
a pin map, and a "date check" box naming well-known stories that belong to other days and were left out.

Every story carries a tag saying how sure it is (CONFIRMED, OFFICIAL, REPORTED, CLAIM or FORECAST) and
the source it came from. Edition 1 was filed early in the UTC day, so events that were scheduled but had
not yet happened are tagged FORECAST with their time.

- `art/desk.mjs`: the stories, regions, certainty tags and the left-out list
- `art/tape.mjs`: SVG tape and text fitting
- `art/icons.mjs`: the drawn pictures
- `art/atlas.mjs`: the striped world map and pin placement
- `art/sheet.mjs`: lays the page out and writes `art/front-page.html`
- `art/snap.sh`: photographs the page into `entry.png` with headless Chrome

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

To redraw the page: `bash art/snap.sh`.

---

<sub>Entered on [make.fun](https://make.fun/?ref=9ykrm1qx&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261126) · AI agents build software for cash rewards</sub>

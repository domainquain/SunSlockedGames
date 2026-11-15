# Sunslocked Games

- `index.html`, `style.css`, `script.js` — the site (neo-pop yellow design, sun mascot, sunburst background)
- `games.json` — 30 games (`title`, `image`, `url`); search matches the title
- `images/` — 30 thumbnails (`game-01.svg` …, 4:3) + `favicon.svg`
- `games/` — 30 folders (`game-01` … `game-30`), each with an `index.html`

Deploy: upload everything to the repo root and enable GitHub Pages (main / root).
Locally: `python3 -m http.server` (games.json is loaded with fetch).
To add a game: drop it in `games/game-XX/`, swap its thumbnail, edit its entry in `games.json`.

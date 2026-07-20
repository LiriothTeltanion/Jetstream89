# 📻 Jetstream89

> **Turn Up. Take Flight.**

Jetstream89 is a retro-futurist online radio experience created by **Jack Rodríguez** and **Kevin Cusnir**. The project combines a Spotify/TIDAL-inspired music interface with the identity of an independent 24/7 rock station focused on:

- 80s and 90s rock
- Hard rock and classic rock
- Heavy metal and progressive metal
- Progressive rock
- Glam / hair metal
- Power ballads and late-night music
- Alternative, electronic, industrial, hip-hop, and new discoveries

The current release is a **static GitHub Pages-ready experience**. It includes official Spotify embeds for legal playback, but it does not yet transmit a real Jetstream89 radio stream.

## ✨ Experience

- Spotify/TIDAL-inspired desktop layout with navigation rail and persistent player
- Original neon winged-microphone Jetstream89 identity
- Responsive home page, weekly schedule, Rock Stories, and Rock Atlas
- Official Spotify playlist embeds
- Honest `demo mode` when no legal stream is configured
- Station time in `Asia/Jerusalem` plus visitor-local time
- Search, route filters, local Top 7 voting, and music taste radar
- Flight Crew profile prototype using browser-local storage
- Reduced-motion support, keyboard navigation, contrast-conscious design, and responsive layouts
- Custom 404 page and installable web app manifest

## 🧭 Pages

| Page | Purpose |
|---|---|
| `index.html` | Main cockpit, music routes, Spotify playback, taste profile, Top 7, and host identity |
| `schedule.html` | Daily programming spine and weekly signature shows |
| `stories.html` | Rights-safe editorial concepts for interviews, history, technology, and listening guides |
| `atlas.html` | Genre relationships, historical eras, and listening missions |
| `404.html` | Branded signal-lost page |

## 🎧 Music playback

The site uses **official Spotify embeds**. Jetstream89 does not download, extract, or rebroadcast Spotify audio.

To connect a real linear radio stream, edit `CONFIG.streamUrl` in `assets/app.js` and provide a legally operated HTTPS Icecast, AzuraCast, Radio.co, Airtime, or compatible stream URL.

```js
const CONFIG = Object.freeze({
  streamUrl: "https://your-licensed-stream.example/radio.mp3",
  stationTimeZone: "Asia/Jerusalem"
});
```

## 🚀 GitHub Pages deployment

A workflow is included at `.github/workflows/pages.yml`.

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Set **Source** to **GitHub Actions** if GitHub has not selected it automatically.
4. Push or merge changes into `main`.
5. Open the workflow run under **Actions** and confirm that validation and deployment succeed.

The workflow checks the JavaScript syntax, required files, and basic HTML parsing before deployment.

## 🧪 Verification completed before publication

The generated site was checked locally on **2026-07-21**:

- `node --check assets/app.js` — passed
- All HTML pages parsed with Python's standard `HTMLParser` — passed
- Required local assets — present

These checks do not replace browser testing, accessibility auditing, or a deployed Pages run.

## 🗂️ Structure

```text
Jetstream89/
├── .github/
│   └── workflows/
│       └── pages.yml
├── assets/
│   ├── app.js
│   ├── logo.svg
│   └── styles.css
├── 404.html
├── atlas.html
├── index.html
├── manifest.webmanifest
├── schedule.html
├── stories.html
├── .nojekyll
├── LICENSE
└── README.md
```

## 🔐 Privacy and honesty

- Taste-profile choices, demo votes, and demo requests remain in browser `localStorage`.
- The site does not claim a real listener count, terrestrial frequency, global distribution network, or live transmission.
- `89` is a brand code, not an FM-frequency claim.
- Artist photos, band logos, album covers, and third-party artwork are not bundled into the public site.
- A production request or community system will require moderation, rate limiting, privacy documentation, and confirmed rights rules.

## 🛣️ Roadmap

- [ ] Connect a licensed Jetstream89 stream
- [ ] Add AzuraCast now-playing metadata
- [ ] Replace editorial demo data with a real schedule API
- [ ] Add Spanish and Hebrew interfaces with full RTL support
- [ ] Create a backend for moderated requests and dedications
- [ ] Add authenticated Flight Crew profiles
- [ ] Publish rights-cleared original station imaging and jingles
- [ ] Add automated accessibility and browser tests

## 👥 Credits

- **Hosts / editorial direction:** Jack Rodríguez & Kevin Cusnir
- **Product, interface, and development:** Kevin Cusnir
- **Creative signature:** Lirioth Teltanion

## 📄 License

Software in this repository is released under the [MIT License](LICENSE). Music, artist identities, trademarks, and third-party platform content remain subject to their respective rights.

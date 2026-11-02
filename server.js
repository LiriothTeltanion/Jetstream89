import express from 'express';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Local preview server. GitHub Pages publishes the site itself, so this only
// listens on this machine unless HOST says otherwise.
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '127.0.0.1';

// The top-level files the site links to. They are read once at start-up
// (`npm run dev` restarts on every edit), so the server source, lockfiles and
// repository metadata are never served.
const PUBLIC_PAGES = [
  'index.html',
  'atlas.html',
  'crew.html',
  'merch.html',
  'schedule.html',
  'stories.html',
  'studio.html',
  '404.html',
  'manifest.webmanifest',
];
const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};
const pages = new Map(
  PUBLIC_PAGES.map((name) => [name, readFileSync(path.join(__dirname, name))]),
);

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets'), { dotfiles: 'deny' }));

app.get(['/', '/:page'], (req, res, next) => {
  const name = req.params.page ?? 'index.html';
  const body = pages.get(name);
  if (!body) return next();
  res.type(CONTENT_TYPES[path.extname(name)]).send(body);
});

// Anything else gets the site's own 404 page.
app.use((req, res) => {
  res.status(404).type(CONTENT_TYPES['.html']).send(pages.get('404.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Jetstream89 preview on http://${HOST}:${PORT}`);
});

const STATION_ZONE = 'Asia/Jerusalem';
const ROUTE_KEY = 'jetstream89-v2:saved-routes';
const MERCH_KEY = 'jetstream89-v2:merch-interest';
const DAY_MS = 86_400_000;

const words = {
  en: {
    saveRoute: 'Save route', removeRoute: 'Remove saved route',
    routeCount: count => `${count} ${count === 1 ? 'route' : 'routes'}`,
    emptySaved: 'Save a route to find it here next time.',
    emptyRoutes: 'No routes match this selection.',
    addMerch: 'Save interest', removeMerch: 'Remove interest',
    merchCount: count => `${count} ${count === 1 ? 'concept' : 'concepts'} saved on this browser.`,
    storage: 'This browser could not store that change.',
    station: 'Station time · Asia/Jerusalem',
    local: zone => `Your time · ${zone}. The day filter uses Jerusalem weekdays.`,
    zoneGap: 'station time',
  },
  es: {
    saveRoute: 'Guardar ruta', removeRoute: 'Quitar ruta guardada',
    routeCount: count => `${count} ${count === 1 ? 'ruta' : 'rutas'}`,
    emptySaved: 'Guarda una ruta para encontrarla aquí la próxima vez.',
    emptyRoutes: 'No hay rutas que coincidan con tu selección.',
    addMerch: 'Guardar interés', removeMerch: 'Quitar interés',
    merchCount: count => `${count} ${count === 1 ? 'concepto guardado' : 'conceptos guardados'} en este navegador.`,
    storage: 'El navegador no pudo guardar ese cambio.',
    station: 'Hora de la emisora · Asia/Jerusalem',
    local: zone => `Tu hora · ${zone}. El filtro usa los días de Jerusalén.`,
    zoneGap: 'hora de la emisora',
  },
};

const locale = () => document.documentElement.lang === 'es' ? 'es' : 'en';
const messages = () => words[locale()];

/** Keep saved keys across builds and ignore malformed browser data. */
export function readSavedKeys(raw) {
  try {
    const parsed = JSON.parse(raw ?? '[]');
    return new Set(Array.isArray(parsed) ? parsed.filter(key => typeof key === 'string') : []);
  } catch {
    return new Set();
  }
}

function readLocalKeys(key) {
  try { return readSavedKeys(localStorage.getItem(key)); } catch { return new Set(); }
}

function setLocalKey(key, previous, item) {
  const updated = new Set(previous);
  if (updated.has(item)) updated.delete(item);
  else updated.add(item);
  try {
    localStorage.setItem(key, JSON.stringify([...updated]));
    return updated;
  } catch {
    return null;
  }
}

function setupRoutes() {
  const controls = document.querySelector('#desk-route-controls');
  if (!controls) return;
  const cards = [...document.querySelectorAll('[data-route-id]')];
  const buttons = [...controls.querySelectorAll('[data-route-filter]')];
  const status = document.querySelector('#desk-route-status');
  const search = document.querySelector('#global-search');
  let selected = 'all';
  let saved = readLocalKeys(ROUTE_KEY);

  function render() {
    let count = 0;
    const term = search?.value.trim().toLocaleLowerCase() ?? '';
    for (const card of cards) {
      const isSaved = saved.has(card.dataset.routeId);
      const matchesFilter = selected === 'all' || (selected === 'saved' ? isSaved : card.dataset.routeTags.split(' ').includes(selected));
      const text = `${card.querySelector('h3').textContent} ${card.querySelector('p').textContent}`;
      card.hidden = !matchesFilter || !text.toLocaleLowerCase().includes(term);
      if (!card.hidden) count++;
      const save = card.querySelector('[data-save-route]');
      const label = isSaved ? messages().removeRoute : messages().saveRoute;
      save.setAttribute('aria-pressed', String(isSaved));
      save.setAttribute('aria-label', `${label} · ${card.querySelector('h3').textContent}`);
      save.querySelector('[aria-hidden]').textContent = isSaved ? '★' : '☆';
      save.querySelector('[data-route-save-label]').textContent = label;
    }
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.routeFilter === selected));
    status.textContent = count ? messages().routeCount(count) : selected === 'saved' && !term ? messages().emptySaved : messages().emptyRoutes;
  }

  controls.hidden = false;
  for (const button of buttons) button.addEventListener('click', () => { selected = button.dataset.routeFilter; render(); });
  for (const card of cards) {
    const save = card.querySelector('[data-save-route]');
    save.hidden = false;
    save.addEventListener('click', () => {
      const next = setLocalKey(ROUTE_KEY, saved, save.dataset.saveRoute);
      if (!next) { status.textContent = messages().storage; return; }
      saved = next;
      render();
      if (card.hidden) controls.querySelector('[data-route-filter="saved"]').focus();
    });
  }
  search?.addEventListener('input', render);
  document.addEventListener('jetstream-locale', render);
  render();
}

const stationCalendar = new Intl.DateTimeFormat('en-CA', {
  timeZone: STATION_ZONE, year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', hourCycle: 'h23',
});

function stationParts(date) {
  return Object.fromEntries(stationCalendar.formatToParts(date).filter(part => part.type !== 'literal').map(part => [part.type, Number(part.value)]));
}

/** Convert a station wall clock to an instant. Return null for a DST gap. */
export function stationInstant(civilDate, clock) {
  const [hour, minute] = clock.split(':').map(Number);
  const desired = Date.UTC(civilDate.getUTCFullYear(), civilDate.getUTCMonth(), civilDate.getUTCDate(), hour, minute);
  let guess = desired;
  for (let attempt = 0; attempt < 4; attempt++) {
    const parts = stationParts(new Date(guess));
    const observed = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute);
    if (observed === desired) return new Date(guess);
    guess += desired - observed;
  }
  return null;
}

function stationDate(now = new Date()) {
  const parts = stationParts(now);
  return new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
}

function scheduleDate(base, weekday) {
  if (weekday === undefined) return base;
  return new Date(base.getTime() + ((Number(weekday) - base.getUTCDay() + 7) % 7) * DAY_MS);
}

function setupSchedule() {
  const controls = document.querySelector('#desk-schedule-controls');
  if (!controls) return;
  const day = document.querySelector('#desk-schedule-day');
  const local = document.querySelector('#desk-schedule-local');
  const note = document.querySelector('#desk-schedule-note');
  const empty = document.querySelector('#desk-schedule-empty');
  const search = document.querySelector('#global-search');
  const genreFilters = document.querySelector('[data-filter-group]');
  const slots = [...document.querySelectorAll('[data-station-slot]')];
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  function render() {
    const useLocal = local.getAttribute('aria-pressed') === 'true';
    const formatter = new Intl.DateTimeFormat(locale(), { weekday:'short', hour:'2-digit', minute:'2-digit', hourCycle:'h23' });
    const dayFormatter = new Intl.DateTimeFormat(locale(), { weekday:'short', timeZone:'UTC' });
    const base = stationDate();
    const genre = genreFilters.querySelector('.is-active')?.dataset.filter ?? 'all';
    const term = search?.value.trim().toLocaleLowerCase() ?? '';
    let weeklyCount = 0;
    for (const slot of slots) {
      const card = slot.closest('.show-card');
      const weekday = slot.dataset.stationDay;
      const date = scheduleDate(base, weekday);
      const [start, end] = slot.dataset.stationSlot.split(',');
      const startAt = useLocal ? stationInstant(date, start) : null;
      const endDate = end && end < start ? new Date(date.getTime() + DAY_MS) : date;
      const endAt = useLocal && end ? stationInstant(endDate, end) : null;
      const clock = end ? `${start}–${end}` : `${dayFormatter.format(date)} · ${start}`;
      slot.textContent = startAt && (!end || endAt)
        ? endAt ? formatter.formatRange(startAt, endAt) : formatter.format(startAt)
        : `${clock}${useLocal ? ` (${messages().zoneGap})` : ''}`;
      const matchesDay = weekday === undefined || day.value === 'all' || weekday === day.value;
      const matchesGenre = genre === 'all' || card.dataset.tags.split(' ').includes(genre);
      card.hidden = !matchesDay || !matchesGenre || !card.textContent.toLocaleLowerCase().includes(term);
      if (weekday !== undefined && !card.hidden) weeklyCount++;
    }
    for (const button of genreFilters.querySelectorAll('[data-filter]')) button.setAttribute('aria-pressed', String(button.dataset.filter === genre));
    empty.hidden = weeklyCount > 0;
    note.textContent = useLocal ? messages().local(zone) : messages().station;
  }

  controls.hidden = false;
  day.addEventListener('change', render);
  local.addEventListener('click', () => { local.setAttribute('aria-pressed', String(local.getAttribute('aria-pressed') !== 'true')); render(); });
  genreFilters.addEventListener('click', render);
  search?.addEventListener('input', render);
  document.addEventListener('jetstream-locale', render);
  render();
}

function setupMerch() {
  const list = document.querySelector('[data-desk-merch]');
  if (!list) return;
  const buttons = [...list.querySelectorAll('[data-merch-interest]')];
  const status = document.querySelector('#desk-merch-status');
  let saved = readLocalKeys(MERCH_KEY);

  function render() {
    let count = 0;
    for (const button of buttons) {
      const isSaved = saved.has(button.dataset.merchInterest);
      if (isSaved) count++;
      const label = isSaved ? messages().removeMerch : messages().addMerch;
      button.textContent = label;
      button.setAttribute('aria-pressed', String(isSaved));
      button.setAttribute('aria-label', `${label} · ${button.closest('.merch-card').querySelector('h3').textContent}`);
    }
    status.textContent = messages().merchCount(count);
  }

  for (const button of buttons) {
    button.hidden = false;
    button.addEventListener('click', () => {
      const next = setLocalKey(MERCH_KEY, saved, button.dataset.merchInterest);
      if (!next) { status.textContent = messages().storage; return; }
      saved = next;
      render();
    });
  }
  document.addEventListener('jetstream-locale', render);
  render();
}

if (typeof document !== 'undefined') {
  const menu = document.querySelector('.desk-menu');
  menu?.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !menu.open) return;
    menu.open = false;
    menu.querySelector('summary').focus();
  });
  for (const link of menu?.querySelectorAll('a[href^="#"]') ?? []) {
    link.addEventListener('click', () => { menu.open = false; });
  }
  setupRoutes();
  setupSchedule();
  setupMerch();
}

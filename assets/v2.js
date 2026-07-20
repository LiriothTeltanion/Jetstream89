/*
Module: Jetstream89 Flight Crew interactions
Purpose: Provide bilingual EN/ES copy, station-ident synthesis, local settings, social shortcuts, and merch interest tracking.
Author: Kevin Cusnir
Date: 2026-07-21 | TZ: Asia/Jerusalem
*/

"use strict";

const JETSTREAM89_V2 = Object.freeze({
  version: "2.0.0",
  defaultLocale: "en",
  supportedLocales: ["en", "es"],
  storagePrefix: "jetstream89-v2",
  social: {
    github: "https://github.com/LiriothTeltanion/Jetstream89",
    spotifyJack: "https://open.spotify.com/user/rodrijack36"
  }
});

const copy = {
  en: {
    "nav.station": "Station",
    "nav.home": "Home",
    "nav.schedule": "Schedule",
    "nav.stories": "Rock Stories",
    "nav.atlas": "Rock Atlas",
    "nav.crew": "Flight Crew",
    "nav.merch": "Merch Lab",
    "nav.studio": "Station Studio",
    "nav.routes": "Your routes",
    "nav.heavy": "Heavy Route",
    "nav.progressive": "Progressive",
    "nav.decades": "80s & 90s",
    "nav.taste": "Taste Engine",
    "search.placeholder": "Search shows, genres, stories…",
    "top.station": "Station",
    "top.local": "Local",
    "top.cinema": "Cinema mode",
    "hero.status": "Preview signal · Flight Crew v2",
    "hero.tagline": "Turn Up. Take Flight.",
    "hero.description": "A human-curated online rock universe for 80s and 90s rock, hard rock, heavy metal, progressive journeys, deep cuts, power ballads, alternative crosswinds and discoveries that deserve a louder signal.",
    "hero.play": "Play Jetstream89",
    "hero.spotify": "Listen with Spotify",
    "hero.schedule": "Explore schedule",
    "hero.credits": "Hosted by Jack Rodríguez & Kevin Cusnir · Online radio concept · Not a terrestrial FM frequency.",
    "stats.mode": "Curated online radio",
    "stats.languages": "English + Spanish",
    "stats.timezone": "Asia/Jerusalem",
    "stats.rights": "Official embeds only",
    "ident.eyebrow": "Original station ident",
    "ident.title": "Hear the Jetstream89 signal",
    "ident.description": "A short original browser-synth ident. It uses no copyrighted recording and never starts without your click.",
    "ident.launch": "Launch ident",
    "ident.night": "Night-flight ident",
    "ident.stop": "Stop sound",
    "crew.eyebrow": "The Hangar",
    "crew.title": "Meet the Flight Crew",
    "crew.description": "Two hosts, two perspectives and one human-curated signal.",
    "crew.jack.role": "Host · Classic Rock & Community",
    "crew.jack.bio": "Jack Rodríguez brings classic-rock instinct, guest relationships, interviews and the energy of The Rock Drive. His public Spotify profile is the starting point for future editorial playlist research.",
    "crew.kevin.role": "Host · Technology & Music Discovery",
    "crew.kevin.bio": "Kevin Cusnir shapes Jetstream89's product, visual identity, bilingual experience and Nova Music Lab. His route crosses rock, metal, progressive music, technology, data and musical storytelling.",
    "crew.full": "Open full crew profiles",
    "merch.eyebrow": "Merch Lab",
    "merch.title": "Wear the signal",
    "merch.description": "Concept merchandise for future production. No checkout is active and no payment is collected.",
    "merch.shirt": "Flight Crew T-shirt",
    "merch.cap": "Runway cap",
    "merch.mug": "Night-shift mug",
    "merch.hoodie": "Afterburner hoodie",
    "merch.status": "Concept · coming later",
    "merch.full": "Explore the Merch Lab",
    "studio.eyebrow": "Station Studio",
    "studio.title": "Personalize your cockpit",
    "studio.description": "Language, motion, contrast, density and local station preferences live in your browser.",
    "studio.open": "Open Station Studio",
    "footer.explore": "Explore",
    "footer.station": "Station",
    "footer.credits": "Credits",
    "common.back": "Back to station",
    "common.demo": "Demo mode",
    "common.save": "Save settings",
    "common.reset": "Reset local data",
    "toast.locale": "Language changed to English.",
    "toast.ident": "Jetstream89 ident launched.",
    "toast.identStop": "Station ident stopped.",
    "toast.settings": "Station settings saved locally.",
    "toast.reset": "Local Jetstream89 v2 preferences were cleared.",
    "toast.merch": "Saved to your local merch interest list. No order was placed.",
    "settings.language": "Interface language",
    "settings.motion": "Reduced motion",
    "settings.contrast": "High contrast",
    "settings.density": "Compact density",
    "settings.autosave": "Remember cockpit settings",
    "settings.normal": "Standard",
    "settings.compact": "Compact",
    "settings.version": "Version history",
    "settings.privacy": "Local privacy",
    "settings.privacyText": "These controls use localStorage only. They do not create a Jetstream89 account or send settings to a server.",
    "settings.rights": "Music rights",
    "settings.rightsText": "Spotify playback remains inside official embeds. A real synchronized radio stream will require authorized audio and a licensed stream provider.",
    "crew.pageTitle": "The Flight Crew",
    "crew.pageIntro": "Jack Rodríguez and Kevin Cusnir combine musical curation, conversation, technology and bilingual storytelling.",
    "merch.pageTitle": "Jetstream89 Merch Lab",
    "merch.pageIntro": "A visual prototype for shirts, caps, mugs and future collectibles. Products are concepts until manufacturing, pricing and fulfillment are formally connected.",
    "studio.pageTitle": "Jetstream89 Station Studio",
    "studio.pageIntro": "A transparent control deck for personal preferences, integration readiness and the evolution of the project."
  },
  es: {
    "nav.station": "Emisora",
    "nav.home": "Inicio",
    "nav.schedule": "Programación",
    "nav.stories": "Historias del Rock",
    "nav.atlas": "Atlas del Rock",
    "nav.crew": "Tripulación",
    "nav.merch": "Laboratorio Merch",
    "nav.studio": "Estudio de la Emisora",
    "nav.routes": "Tus rutas",
    "nav.heavy": "Ruta Heavy",
    "nav.progressive": "Progresivo",
    "nav.decades": "Años 80 y 90",
    "nav.taste": "Motor de Gustos",
    "search.placeholder": "Buscar programas, géneros e historias…",
    "top.station": "Emisora",
    "top.local": "Local",
    "top.cinema": "Modo cine",
    "hero.status": "Señal preliminar · Flight Crew v2",
    "hero.tagline": "Sube el volumen. Despega.",
    "hero.description": "Un universo de radio online curado por personas para rock de los 80 y 90, hard rock, heavy metal, viajes progresivos, joyas ocultas, power ballads, cruces alternativos y descubrimientos que merecen una señal más fuerte.",
    "hero.play": "Reproducir Jetstream89",
    "hero.spotify": "Escuchar con Spotify",
    "hero.schedule": "Explorar programación",
    "hero.credits": "Presentado por Jack Rodríguez y Kevin Cusnir · Concepto de radio online · No es una frecuencia FM terrestre.",
    "stats.mode": "Radio online curada",
    "stats.languages": "Inglés + Español",
    "stats.timezone": "Asia/Jerusalem",
    "stats.rights": "Solo embeds oficiales",
    "ident.eyebrow": "Identificador original",
    "ident.title": "Escucha la señal de Jetstream89",
    "ident.description": "Un identificador synth original generado en el navegador. No usa grabaciones con copyright y nunca inicia sin tu clic.",
    "ident.launch": "Lanzar ident",
    "ident.night": "Ident nocturno",
    "ident.stop": "Detener sonido",
    "crew.eyebrow": "El Hangar",
    "crew.title": "Conoce a la Tripulación",
    "crew.description": "Dos presentadores, dos perspectivas y una señal curada por personas.",
    "crew.jack.role": "Presentador · Classic Rock y Comunidad",
    "crew.jack.bio": "Jack Rodríguez aporta intuición de classic rock, relaciones con invitados, entrevistas y la energía de The Rock Drive. Su perfil público de Spotify es el punto de partida para futuras investigaciones editoriales de playlists.",
    "crew.kevin.role": "Presentador · Tecnología y Descubrimiento Musical",
    "crew.kevin.bio": "Kevin Cusnir diseña el producto, la identidad visual, la experiencia bilingüe y Nova Music Lab de Jetstream89. Su ruta cruza rock, metal, música progresiva, tecnología, datos y narrativa musical.",
    "crew.full": "Abrir perfiles completos",
    "merch.eyebrow": "Laboratorio Merch",
    "merch.title": "Viste la señal",
    "merch.description": "Merchandise conceptual para una producción futura. No hay checkout activo ni se recopilan pagos.",
    "merch.shirt": "Camiseta Flight Crew",
    "merch.cap": "Gorra Runway",
    "merch.mug": "Taza Night Shift",
    "merch.hoodie": "Hoodie Afterburner",
    "merch.status": "Concepto · próximamente",
    "merch.full": "Explorar Laboratorio Merch",
    "studio.eyebrow": "Estudio de la Emisora",
    "studio.title": "Personaliza tu cabina",
    "studio.description": "Idioma, movimiento, contraste, densidad y preferencias locales viven en tu navegador.",
    "studio.open": "Abrir Estudio de la Emisora",
    "footer.explore": "Explorar",
    "footer.station": "Emisora",
    "footer.credits": "Créditos",
    "common.back": "Volver a la emisora",
    "common.demo": "Modo demo",
    "common.save": "Guardar ajustes",
    "common.reset": "Restablecer datos locales",
    "toast.locale": "Idioma cambiado a español.",
    "toast.ident": "Identificador de Jetstream89 iniciado.",
    "toast.identStop": "Identificador detenido.",
    "toast.settings": "Ajustes de la emisora guardados localmente.",
    "toast.reset": "Se borraron las preferencias locales de Jetstream89 v2.",
    "toast.merch": "Guardado en tu lista local de interés. No se realizó ningún pedido.",
    "settings.language": "Idioma de interfaz",
    "settings.motion": "Movimiento reducido",
    "settings.contrast": "Contraste alto",
    "settings.density": "Densidad compacta",
    "settings.autosave": "Recordar ajustes de cabina",
    "settings.normal": "Estándar",
    "settings.compact": "Compacta",
    "settings.version": "Historial de versiones",
    "settings.privacy": "Privacidad local",
    "settings.privacyText": "Estos controles usan solo localStorage. No crean una cuenta de Jetstream89 ni envían ajustes a un servidor.",
    "settings.rights": "Derechos musicales",
    "settings.rightsText": "Spotify permanece dentro de embeds oficiales. Una radio sincronizada real necesitará audio autorizado y un proveedor de streaming con licencia.",
    "crew.pageTitle": "La Tripulación de Vuelo",
    "crew.pageIntro": "Jack Rodríguez y Kevin Cusnir combinan curación musical, conversación, tecnología y narrativa bilingüe.",
    "merch.pageTitle": "Laboratorio Merch Jetstream89",
    "merch.pageIntro": "Un prototipo visual para camisetas, gorras, tazas y futuros coleccionables. Los productos son conceptos hasta conectar fabricación, precios y logística.",
    "studio.pageTitle": "Estudio de la Emisora Jetstream89",
    "studio.pageIntro": "Una cabina transparente para preferencias personales, preparación de integraciones y evolución del proyecto."
  }
};

const v2Select = (selector, scope = document) => scope.querySelector(selector);
const v2SelectAll = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const storageKey = (name) => `${JETSTREAM89_V2.storagePrefix}:${name}`;

function currentLocale() {
  const stored = localStorage.getItem(storageKey("locale"));
  if (JETSTREAM89_V2.supportedLocales.includes(stored)) return stored;
  return navigator.language.toLowerCase().startsWith("es") ? "es" : JETSTREAM89_V2.defaultLocale;
}

function translatePage(locale) {
  const dictionary = copy[locale] || copy.en;
  document.documentElement.lang = locale;
  v2SelectAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) element.textContent = dictionary[key];
  });
  v2SelectAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (dictionary[key]) element.setAttribute("placeholder", dictionary[key]);
  });
  v2SelectAll("[data-locale]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.locale === locale));
  });
  localStorage.setItem(storageKey("locale"), locale);
}

function v2Toast(message) {
  const toast = v2Select("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(v2Toast.timer);
  v2Toast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 3400);
}

const initialLocale = currentLocale();
translatePage(initialLocale);

v2SelectAll("[data-locale]").forEach((button) => {
  button.addEventListener("click", () => {
    const locale = button.dataset.locale;
    translatePage(locale);
    v2Toast(copy[locale]["toast.locale"]);
  });
});

let identContext = null;
let identNodes = [];

function createTone(context, frequency, startsAt, duration, gainValue, waveform = "sine") {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = waveform;
  oscillator.frequency.setValueAtTime(frequency, startsAt);
  gain.gain.setValueAtTime(0.0001, startsAt);
  gain.gain.exponentialRampToValueAtTime(gainValue, startsAt + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, startsAt + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(startsAt);
  oscillator.stop(startsAt + duration + 0.03);
  identNodes.push(oscillator, gain);
}

function playIdent(mode = "launch") {
  stopIdent(false);
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    v2Toast("Web Audio is not available in this browser.");
    return;
  }

  identContext = new AudioContextClass();
  const now = identContext.currentTime + 0.04;
  const sequence = mode === "night"
    ? [110, 164.81, 220, 329.63, 246.94]
    : [164.81, 220, 329.63, 440, 659.25];

  sequence.forEach((frequency, index) => {
    createTone(identContext, frequency, now + index * 0.16, 0.34, 0.12, index % 2 ? "triangle" : "sine");
    createTone(identContext, frequency / 2, now + index * 0.16, 0.38, 0.045, "sawtooth");
  });

  const visualizer = v2Select("#ident-visualizer");
  if (visualizer) visualizer.classList.add("is-playing");
  window.setTimeout(() => visualizer?.classList.remove("is-playing"), 1600);
  v2Toast(copy[currentLocale()]["toast.ident"]);
}

function stopIdent(showMessage = true) {
  identNodes.forEach((node) => {
    try { node.disconnect(); } catch (_) { /* Node may already be disconnected. */ }
  });
  identNodes = [];
  if (identContext) {
    identContext.close().catch(() => undefined);
    identContext = null;
  }
  v2Select("#ident-visualizer")?.classList.remove("is-playing");
  if (showMessage) v2Toast(copy[currentLocale()]["toast.identStop"]);
}

v2SelectAll("[data-ident]").forEach((button) => {
  button.addEventListener("click", () => {
    const mode = button.dataset.ident;
    if (mode === "stop") stopIdent();
    else playIdent(mode);
  });
});

function applySettings(settings) {
  document.body.dataset.contrast = settings.highContrast ? "high" : "normal";
  document.body.dataset.density = settings.compact ? "compact" : "standard";
  document.body.classList.toggle("reduce-motion", Boolean(settings.reduceMotion));
}

function readSettings() {
  return {
    reduceMotion: Boolean(v2Select("#setting-motion")?.checked),
    highContrast: Boolean(v2Select("#setting-contrast")?.checked),
    compact: Boolean(v2Select("#setting-density")?.checked),
    remember: v2Select("#setting-remember")?.checked !== false
  };
}

const savedSettings = JSON.parse(localStorage.getItem(storageKey("settings")) || "{}");
applySettings(savedSettings);

[
  ["#setting-motion", "reduceMotion"],
  ["#setting-contrast", "highContrast"],
  ["#setting-density", "compact"],
  ["#setting-remember", "remember"]
].forEach(([selector, key]) => {
  const control = v2Select(selector);
  if (control && Object.hasOwn(savedSettings, key)) control.checked = Boolean(savedSettings[key]);
});

v2Select("#save-station-settings")?.addEventListener("click", () => {
  const settings = readSettings();
  applySettings(settings);
  if (settings.remember) localStorage.setItem(storageKey("settings"), JSON.stringify(settings));
  else localStorage.removeItem(storageKey("settings"));
  v2Toast(copy[currentLocale()]["toast.settings"]);
});

v2Select("#reset-station-settings")?.addEventListener("click", () => {
  Object.keys(localStorage)
    .filter((key) => key.startsWith(JETSTREAM89_V2.storagePrefix))
    .forEach((key) => localStorage.removeItem(key));
  document.body.dataset.contrast = "normal";
  document.body.dataset.density = "standard";
  document.body.classList.remove("reduce-motion");
  translatePage(currentLocale());
  v2Toast(copy[currentLocale()]["toast.reset"]);
});

v2SelectAll("[data-merch-interest]").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.dataset.merchInterest;
    const saved = JSON.parse(localStorage.getItem(storageKey("merch-interest")) || "[]");
    const next = [...new Set([...saved, item])];
    localStorage.setItem(storageKey("merch-interest"), JSON.stringify(next));
    button.setAttribute("aria-pressed", "true");
    v2Toast(copy[currentLocale()]["toast.merch"]);
  });
});

v2SelectAll("[data-copy-link]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = JETSTREAM89_V2.social[button.dataset.copyLink];
    if (!target) return;
    try {
      await navigator.clipboard.writeText(target);
      v2Toast("Link copied.");
    } catch (_) {
      window.location.href = target;
    }
  });
});

const versionElements = v2SelectAll("[data-current-version]");
versionElements.forEach((element) => {
  element.textContent = JETSTREAM89_V2.version;
});

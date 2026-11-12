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
    "desk.show.0": "Familiar 70s–90s songs, short recorded links, lighter energy and a clean morning takeoff.",
    "desk.show.1": "History, geography, production, scenes, instruments and educational music stories.",
    "desk.show.2": "Jack Rodríguez hosts requests, stories, energetic classics and community interaction.",
    "desk.show.3": "Flagship shows, guests, Top 7, Cockpit Conversations and event nights.",
    "desk.show.4": "Heavy, power, classic, melodic, progressive and selected extreme-metal blocks.",
    "desk.show.5": "Power ballads, soft rock, oldies, atmospheric music and late-night dedications.",
    "desk.show.6": "Long-form compositions, album concepts, production details and adventurous records.",
    "desk.show.7": "Kevin Cusnir connects music discovery, technology, culture and station development.",
    "desk.show.8": "Jack and Kevin host interviews, debates, community stories and music memories.",
    "desk.show.9": "A transparent weekly countdown with moderated voting and published tie-break rules.",
    "desk.show.10": "Clearly separated news, analysis, opinion, primary sources and correction notes.",
    "desk.show.11": "Artist interviews, community guests, specialist takeovers and special sessions.",
    "desk.filter.all": "All routes",
    "desk.filter.rock": "Rock",
    "desk.filter.metal": "Metal",
    "desk.filter.progressive": "Progressive",
    "desk.filter.talk": "Talk",
    "desk.filter.night": "Night",
    "desk.nav.discover": "Discover",
    "desk.menu": "Menu",
    "desk.search": "Search this page",
    "desk.hero.kicker": "Independent rock radio project",
    "desk.hero.title": "Rock at full",
    "desk.hero.accent": "altitude.",
    "desk.hero.intro": "Big choruses, heavy riffs and records worth playing all the way through. With Jack Rodríguez and Kevin Cusnir.",
    "desk.hero.listen": "Find your playlist",
    "desk.hero.discover": "Explore the routes",
    "desk.listen.kicker": "Listening room",
    "desk.listen.title": "Pick a record lane",
    "desk.listen.intro": "Three Spotify playlists, from familiar riffs to a different decade.",
    "desk.playlist.classics": "Big riffs, familiar voices",
    "desk.playlist.eighties": "The sound of a decade",
    "desk.playlist.nineties": "From anthems to left turns",
    "desk.listen.official": "Playback comes from the official Spotify player. Jetstream89’s own live stream is still in development.",
    "desk.listen.load": "Load Spotify player",
    "desk.listen.unload": "Close Spotify player",
    "desk.listen.open": "Open in Spotify ↗",
    "desk.schedule.kicker": "Programming preview",
    "desk.schedule.title": "The shape of a Jetstream night",
    "desk.schedule.intro": "Explore the proposed lineup in station time or your own time zone.",
    "desk.schedule.open": "Open program guide →",
    "desk.schedule.zone": "Jerusalem station time",
    "desk.routes.all": "All routes",
    "desk.routes.guitar": "Guitars",
    "desk.routes.night": "After dark",
    "desk.routes.saved": "Saved",
    "desk.schedule.page": "Program guide",
    "desk.schedule.pageIntro": "A proposed lineup for Jetstream89. Explore daily blocks and weekly show ideas. Times are editorial plans.",
    "desk.schedule.day": "Weekly shows by day",
    "desk.schedule.allDays": "All days",
    "desk.schedule.local": "Show my local time",
    "desk.schedule.daily": "Daily blocks",
    "desk.schedule.weekly": "Weekly shows",
    "desk.schedule.empty": "No weekly shows match this selection.",
    "desk.day.0": "Sunday",
    "desk.day.1": "Monday",
    "desk.day.2": "Tuesday",
    "desk.day.3": "Wednesday",
    "desk.day.4": "Thursday",
    "desk.day.5": "Friday",
    "desk.day.6": "Saturday",
    "desk.merch.intro": "Four product concepts inspired by the station. Save or remove the ones you like on this browser.",
    "desk.merch.first": "First collection concepts",
    "desk.merch.shirt": "Heavy black cotton with a small orange wing mark.",
    "desk.merch.cap": "A black cap with an off-white wing patch.",
    "desk.merch.mug": "A matte ceramic mug with the night-shift wave mark.",
    "desk.merch.hoodie": "Charcoal fleece with a subtle wing design.",
    "desk.merch.archive": "More concept ideas",
    "desk.merch.explain": "Your interest list stays on this browser. There is no checkout, stock or payment collection.",
    "desk.merch.poster": "A flightdeck poster based on the station illustration.",
    "desk.merch.bag": "A utility tote for records, cables and headphones.",
    "desk.merch.mat": "A desk mat with radar rings and flight routes.",
    "desk.merch.badge": "An enamel badge shaped like the winged microphone.",
    "desk.merch.posterName": "Neon Hangar poster",
    "desk.merch.bagName": "Signal crew bag",
    "desk.merch.matName": "Cockpit desk mat",
    "desk.merch.badgeName": "Collector radio badge",
    "station.listen": "Listen",
    "station.eyebrow": "Independent rock radio",
    "station.intro": "From arena rock and 90s alternative to metal, progressive and deep cuts, selected by Jack Rodríguez and Kevin Cusnir.",
    "station.ident": "Hear our station ident",
    "station.preview": "Station preview · English and Spanish",
    "station.routes": "Choose a music route",
    "station.routesHelp": "Start with a playlist or follow the story behind a sound.",
    "route.0.description": "Huge choruses, polished guitars, neon stages and highway anthems.",
    "route.0.action": "Open the 80s playlist",
    "route.1.description": "Grunge, alternative metal, industrial edges and post-grunge gravity.",
    "route.1.action": "Open the 90s playlist",
    "route.2.description": "Heavy, power, classic, melodic and selected extreme-metal turbulence.",
    "route.2.action": "Explore heavy metal",
    "route.3.description": "Concept albums, suites, odd meters and patient musical exploration.",
    "route.3.action": "Explore progressive rock",
    "route.4.description": "Power ballads, melodic rock, late-night requests and softer landings.",
    "route.4.action": "See the late-night show",
    "route.5.description": "Synth-pop, electronic, industrial, rap, hip-hop and genre collisions.",
    "route.5.action": "Explore genre crossovers",
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
    "desk.show.0": "Rock de los 70 a los 90, intervenciones breves y un arranque tranquilo.",
    "desk.show.1": "Historia, geografía, producción, escenas, instrumentos y relatos de la música.",
    "desk.show.2": "Jack Rodríguez presenta clásicos con energía, historias y peticiones de la comunidad.",
    "desk.show.3": "Programas principales, invitados, Top 7, Cockpit Conversations y noches especiales.",
    "desk.show.4": "Heavy, power, clásico, melódico, progresivo y selecciones de metal extremo.",
    "desk.show.5": "Baladas, soft rock, clásicos, música atmosférica y dedicatorias de madrugada.",
    "desk.show.6": "Composiciones extensas, álbumes conceptuales, producción y discos que se salen de lo habitual.",
    "desk.show.7": "Kevin Cusnir conecta descubrimiento musical, tecnología, cultura y desarrollo de la emisora.",
    "desk.show.8": "Jack y Kevin presentan entrevistas, debates, historias de la comunidad y recuerdos musicales.",
    "desk.show.9": "Propuesta de recuento semanal con votación moderada y reglas de desempate públicas.",
    "desk.show.10": "Noticias, análisis, opiniones, fuentes primarias y notas de corrección en espacios diferenciados.",
    "desk.show.11": "Entrevistas a artistas, invitados de la comunidad, especialistas y sesiones especiales.",
    "desk.filter.all": "Todas las rutas",
    "desk.filter.rock": "Rock",
    "desk.filter.metal": "Metal",
    "desk.filter.progressive": "Progresivo",
    "desk.filter.talk": "Conversaciones",
    "desk.filter.night": "Noche",
    "desk.nav.discover": "Descubrir",
    "desk.menu": "Menú",
    "desk.search": "Buscar en esta página",
    "desk.hero.kicker": "Proyecto de radio rock independiente",
    "desk.hero.title": "Rock a toda",
    "desk.hero.accent": "potencia.",
    "desk.hero.intro": "Grandes coros, riffs pesados y discos para escuchar de principio a fin. Con Jack Rodríguez y Kevin Cusnir.",
    "desk.hero.listen": "Elige una playlist",
    "desk.hero.discover": "Explora las rutas",
    "desk.listen.kicker": "Sala de escucha",
    "desk.listen.title": "Elige qué escuchar",
    "desk.listen.intro": "Tres playlists de Spotify para volver a tus riffs favoritos o cambiar de década.",
    "desk.playlist.classics": "Grandes riffs, voces de siempre",
    "desk.playlist.eighties": "El sonido de una década",
    "desk.playlist.nineties": "Himnos y giros inesperados",
    "desk.listen.official": "La música se reproduce en el reproductor oficial de Spotify. La señal en vivo de Jetstream89 sigue en desarrollo.",
    "desk.listen.load": "Cargar reproductor de Spotify",
    "desk.listen.unload": "Cerrar reproductor de Spotify",
    "desk.listen.open": "Abrir en Spotify ↗",
    "desk.schedule.kicker": "Programación propuesta",
    "desk.schedule.title": "Así sonaría una noche en Jetstream",
    "desk.schedule.intro": "Explora la parrilla propuesta en la hora de la emisora o en tu zona horaria.",
    "desk.schedule.open": "Ver la programación →",
    "desk.schedule.zone": "Hora de la emisora · Jerusalén",
    "desk.routes.all": "Todas",
    "desk.routes.guitar": "Guitarras",
    "desk.routes.night": "De noche",
    "desk.routes.saved": "Guardadas",
    "desk.schedule.page": "Guía de programación",
    "desk.schedule.pageIntro": "Así se propone organizar Jetstream89. Explora los bloques diarios y las ideas de programas semanales. Los horarios son orientativos.",
    "desk.schedule.day": "Programas semanales por día",
    "desk.schedule.allDays": "Todos los días",
    "desk.schedule.local": "Ver en mi hora local",
    "desk.schedule.daily": "Bloques diarios",
    "desk.schedule.weekly": "Programas semanales",
    "desk.schedule.empty": "No hay programas semanales que coincidan con tu selección.",
    "desk.day.0": "Domingo",
    "desk.day.1": "Lunes",
    "desk.day.2": "Martes",
    "desk.day.3": "Miércoles",
    "desk.day.4": "Jueves",
    "desk.day.5": "Viernes",
    "desk.day.6": "Sábado",
    "desk.merch.intro": "Cuatro ideas de productos inspirados en la emisora. Guarda o quita tus favoritas en este navegador.",
    "desk.merch.first": "Conceptos de la primera colección",
    "desk.merch.shirt": "Algodón grueso negro con una pequeña ala naranja.",
    "desk.merch.cap": "Gorra negra con un parche de ala en color marfil.",
    "desk.merch.mug": "Taza de cerámica mate con una onda de radio nocturna.",
    "desk.merch.hoodie": "Sudadera gris carbón con un diseño de ala discreto.",
    "desk.merch.archive": "Más ideas de productos",
    "desk.merch.explain": "Tu lista de interés queda en este navegador. Los conceptos aún no tienen stock ni venta.",
    "desk.merch.poster": "Póster de cabina basado en la ilustración de la emisora.",
    "desk.merch.bag": "Bolso para discos, cables y audífonos.",
    "desk.merch.mat": "Alfombrilla con círculos de radar y rutas de vuelo.",
    "desk.merch.badge": "Pin esmaltado con la forma del micrófono alado.",
    "desk.merch.posterName": "Póster Neon Hangar",
    "desk.merch.bagName": "Bolso Signal Crew",
    "desk.merch.matName": "Alfombrilla Cockpit",
    "desk.merch.badgeName": "Pin Collector Radio",
    "station.listen": "Escuchar",
    "station.eyebrow": "Radio de rock independiente",
    "station.intro": "Del rock de estadios y la alternativa de los 90 al metal, el progresivo y las joyas ocultas que eligen Jack Rodríguez y Kevin Cusnir.",
    "station.ident": "Escuchar la cortina de la emisora",
    "station.preview": "Vista previa de la emisora · Español e inglés",
    "station.routes": "Elige una ruta musical",
    "station.routesHelp": "Empieza por una lista o descubre la historia detrás de un sonido.",
    "route.0.description": "Grandes coros, guitarras pulidas, escenarios de neón e himnos de carretera.",
    "route.0.action": "Abrir la lista de los 80",
    "route.1.description": "Grunge, metal alternativo, sonidos industriales y post-grunge.",
    "route.1.action": "Abrir la lista de los 90",
    "route.2.description": "Heavy, power metal, clásicos, melodías y una selección de metal extremo.",
    "route.2.action": "Explorar el heavy metal",
    "route.3.description": "Álbumes conceptuales, suites, compases irregulares y música para escuchar con calma.",
    "route.3.action": "Explorar el rock progresivo",
    "route.4.description": "Power ballads, rock melódico y peticiones para la madrugada.",
    "route.4.action": "Ver el programa nocturno",
    "route.5.description": "Synth-pop, electrónica, industrial, rap, hip-hop y sus cruces.",
    "route.5.action": "Explorar los cruces de géneros",
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
  document.dispatchEvent(new CustomEvent("jetstream-locale", { detail: locale }));
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

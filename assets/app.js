/*
Module: Jetstream89 interactions
Purpose: Search, stream controls, Spotify embeds, clocks, local voting, and taste profile.
Author: Kevin Cusnir
Date: 2026-07-21 | TZ: Asia/Jerusalem
*/

"use strict";

const CONFIG = Object.freeze({
  streamUrl: "",
  stationTimeZone: "Asia/Jerusalem",
  spotifyPlaylists: {
    classics: "37i9dQZF1DWXRqgorJj26U",
    eighties: "37i9dQZF1DX4UtSsGT1Sbe",
    nineties: "37i9dQZF1DXbTxeAdrVG2l"
  }
});

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const audio = $("#radio-audio");
const toast = $("#toast");
const streamStatus = $("#stream-status");
const playButtons = $$('[data-action="toggle-stream"]');

/**
 * Display a small non-blocking status message.
 * @param {string} message Human-readable status text.
 * @returns {void}
 */
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timerId);
  showToast.timerId = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 3600);
}

/**
 * Update all play buttons with one shared state.
 * @param {boolean} isPlaying Whether the radio stream is active.
 * @returns {void}
 */
function setPlayState(isPlaying) {
  playButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(isPlaying));
    button.dataset.state = isPlaying ? "playing" : "paused";
    const label = button.querySelector("[data-play-label]");
    if (label) label.textContent = isPlaying ? "Pause" : "Play";
    const icon = button.querySelector("[data-play-icon]");
    if (icon) icon.textContent = isPlaying ? "❚❚" : "▶";
  });
}

/**
 * Start or pause the external radio stream.
 * @returns {Promise<void>}
 */
async function toggleStream() {
  if (!audio) return;
  if (!CONFIG.streamUrl) {
    if (streamStatus) streamStatus.textContent = "Demo mode · stream not connected";
    showToast("The interface is ready. Add a legal Icecast/AzuraCast stream URL in assets/app.js.");
    return;
  }

  try {
    if (!audio.src) audio.src = CONFIG.streamUrl;
    if (audio.paused) {
      if (streamStatus) streamStatus.textContent = "Connecting to Jetstream89…";
      await audio.play();
      if (streamStatus) streamStatus.textContent = "Jetstream89 live stream";
      setPlayState(true);
    } else {
      audio.pause();
      if (streamStatus) streamStatus.textContent = "Stream paused";
      setPlayState(false);
    }
  } catch (error) {
    console.error("Jetstream89 stream error", error);
    if (streamStatus) streamStatus.textContent = "Stream unavailable";
    showToast("The stream could not be opened. Check HTTPS, CORS, and the source URL.");
    setPlayState(false);
  }
}

playButtons.forEach((button) => button.addEventListener("click", toggleStream));

const volume = $("#volume");
if (volume && audio) {
  audio.volume = Number(volume.value);
  volume.addEventListener("input", (event) => {
    audio.volume = Number(event.currentTarget.value);
  });
}

/**
 * Refresh station and visitor clocks.
 * @returns {void}
 */
function updateClocks() {
  const now = new Date();
  const stationClock = $("#station-clock");
  const localClock = $("#local-clock");

  if (stationClock) {
    stationClock.textContent = new Intl.DateTimeFormat(undefined, {
      timeZone: CONFIG.stationTimeZone,
      hour: "2-digit",
      minute: "2-digit"
    }).format(now);
  }

  if (localClock) {
    localClock.textContent = new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit"
    }).format(now);
  }
}

updateClocks();
window.setInterval(updateClocks, 30000);

const spotifyFrame = $("#spotify-frame");
$$('[data-spotify-playlist]').forEach((button) => {
  button.addEventListener("click", () => {
    $$('[data-spotify-playlist]').forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    const key = button.dataset.spotifyPlaylist;
    const playlistId = CONFIG.spotifyPlaylists[key];
    if (!spotifyFrame || !playlistId) return;
    spotifyFrame.src = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;
    spotifyFrame.title = `${button.textContent.trim()} on Spotify`;
  });
});

const searchInput = $("#global-search");
if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    const query = event.currentTarget.value.trim().toLocaleLowerCase();
    const searchableItems = $$('[data-searchable]');
    let visible = 0;

    searchableItems.forEach((item) => {
      const text = item.textContent.toLocaleLowerCase();
      const matches = !query || text.includes(query);
      item.hidden = !matches;
      if (matches) visible += 1;
    });

    const result = $("#search-result");
    if (result) {
      result.hidden = !query || visible > 0;
      result.textContent = visible === 0 ? `No Jetstream89 content matches “${event.currentTarget.value}”.` : "";
    }
  });
}

const cinemaButton = $('[data-action="toggle-cinema"]');
if (cinemaButton) {
  const storedCinema = localStorage.getItem("jetstream89-cinema") === "true";
  document.body.classList.toggle("is-cinema", storedCinema);
  cinemaButton.setAttribute("aria-pressed", String(storedCinema));

  cinemaButton.addEventListener("click", () => {
    const enabled = !document.body.classList.contains("is-cinema");
    document.body.classList.toggle("is-cinema", enabled);
    cinemaButton.setAttribute("aria-pressed", String(enabled));
    localStorage.setItem("jetstream89-cinema", String(enabled));
    showToast(enabled ? "Cinema mode enabled." : "Cinema mode disabled.");
  });
}

const voteKey = "jetstream89-top7-vote";
const previousVote = localStorage.getItem(voteKey);
const voteNotice = $("#vote-notice");

if (previousVote && voteNotice) {
  voteNotice.textContent = `Your local demo vote: ${previousVote}.`;
  $$('[data-vote]').forEach((button) => {
    button.disabled = true;
  });
}

$$('[data-vote]').forEach((button) => {
  button.addEventListener("click", () => {
    const selection = button.dataset.vote;
    localStorage.setItem(voteKey, selection);
    $$('[data-vote]').forEach((item) => {
      item.disabled = true;
    });
    if (voteNotice) voteNotice.textContent = `Local demo vote saved: ${selection}.`;
    showToast("Your Top 7 demo vote was saved on this device.");
  });
});

const axisDefaults = [34, 34, 34, 34, 34, 34];

/**
 * Convert one radar axis into an SVG point.
 * @param {number} index Axis index from zero to five.
 * @param {number} value Percentage from zero to one hundred.
 * @returns {[number, number]} X and Y coordinates.
 */
function polarPoint(index, value) {
  const center = 210;
  const radius = 168 * (value / 100);
  const angle = -Math.PI / 2 + index * (Math.PI * 2 / 6);
  return [
    center + Math.cos(angle) * radius,
    center + Math.sin(angle) * radius
  ];
}

/**
 * Read selected taste coordinates from the profile controls.
 * @returns {number[]} Six percentage values.
 */
function readTasteProfile() {
  const values = [...axisDefaults];
  $$('[data-taste-axis]').forEach((input) => {
    const index = Number(input.dataset.tasteAxis);
    values[index] = input.checked ? Number(input.value) : 26;
  });
  return values;
}

/**
 * Render the radar polygon for the taste profile.
 * @param {number[]} values Six taste values.
 * @returns {void}
 */
function updateTasteRadar(values) {
  const polygon = $("#taste-polygon");
  if (!polygon) return;
  const points = values.map((value, index) => polarPoint(index, value).join(",")).join(" ");
  polygon.setAttribute("points", points);
}

$$('[data-taste-axis]').forEach((input) => {
  input.addEventListener("change", () => updateTasteRadar(readTasteProfile()));
});

const tasteKey = "jetstream89-taste-profile";
const previousTaste = JSON.parse(localStorage.getItem(tasteKey) || "[]");
$$('[data-taste-axis]').forEach((input) => {
  input.checked = previousTaste.includes(input.value);
});
updateTasteRadar(readTasteProfile());

const saveTasteButton = $("#save-taste");
if (saveTasteButton) {
  saveTasteButton.addEventListener("click", () => {
    const selected = $$('[data-taste-axis]').filter((input) => input.checked).map((input) => input.value);
    localStorage.setItem(tasteKey, JSON.stringify(selected));
    showToast("Your Flight Crew taste profile was saved locally.");
  });
}

$$('[data-filter]').forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.closest('[data-filter-group]');
    if (!group) return;
    $$('[data-filter]', group).forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    const value = button.dataset.filter;
    const targetSelector = group.dataset.filterGroup;
    $$(targetSelector).forEach((item) => {
      const tags = (item.dataset.tags || "").split(" ");
      item.hidden = value !== "all" && !tags.includes(value);
    });
  });
});

const requestForm = $("#request-form");
if (requestForm) {
  requestForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(requestForm);
    const request = {
      name: String(form.get("name") || "").trim(),
      song: String(form.get("song") || "").trim(),
      artist: String(form.get("artist") || "").trim(),
      message: String(form.get("message") || "").trim(),
      createdAt: new Date().toISOString()
    };

    if (!request.name || !request.song || !request.artist) {
      showToast("Complete your name, song, and artist before saving the request.");
      return;
    }

    const requests = JSON.parse(localStorage.getItem("jetstream89-requests") || "[]");
    requests.push(request);
    localStorage.setItem("jetstream89-requests", JSON.stringify(requests.slice(-20)));
    requestForm.reset();
    showToast("Demo request saved locally. It has not been sent to a public radio queue.");
  });
}

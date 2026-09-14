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
  const globalPlayer = document.querySelector(".player");
  if (globalPlayer) {
    globalPlayer.classList.toggle("is-playing", isPlaying);
  }
  if (isPlaying) {
    startVisualizer();
    if (document.body.style.getPropertyValue("--flight-aura")) {
      document.body.classList.add("aura-active");
    }
  } else {
    stopVisualizer();
    document.body.classList.remove("aura-active");
  }
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
    
    // Simulate playing for demo purposes since we want to show off the visualizer
    setPlayState(!audio.paused);
    // Actually, to simulate play if streamUrl is empty:
    if (!audio.dataset.demoPlaying) {
      audio.dataset.demoPlaying = "true";
      if (streamStatus) streamStatus.textContent = "Simulating Demo Playback";
      setPlayState(true);
    } else {
      audio.dataset.demoPlaying = "";
      if (streamStatus) streamStatus.textContent = "Demo mode paused";
      setPlayState(false);
    }
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

let visualizerAnimationId;
function startVisualizer() {
  if (visualizerAnimationId) cancelAnimationFrame(visualizerAnimationId);
  
  let time = 0;
  
  function draw() {
    const canvas = document.getElementById("audio-visualizer");
    if (!canvas) {
      visualizerAnimationId = requestAnimationFrame(draw);
      return;
    }
    const ctx = canvas.getContext("2d");
    
    // Set high-DPI scaling if needed, assuming 40x40 CSS size
    if (canvas.width === 40) {
      canvas.width = 80;
      canvas.height = 80;
      canvas.style.width = "40px";
      canvas.style.height = "40px";
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const baseRadius = 24;
    
    ctx.beginPath();
    const segments = 32;
    
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      
      // Create a smooth mock waveform using Math.sin and time
      const noise = Math.sin(angle * 4 + time) * Math.cos(angle * 3 - time * 1.5) * 6;
      const pulse = Math.sin(time * 2) * 2;
      const radius = baseRadius + noise + pulse + (Math.random() * 2); 
      
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    
    ctx.closePath();
    
    // Cyberpunk Neon Glow
    ctx.strokeStyle = "rgba(39, 217, 255, 0.9)";
    ctx.lineWidth = 2.5;
    ctx.shadowBlur = 12;
    ctx.shadowColor = "rgba(255, 46, 166, 1)";
    ctx.stroke();
    
    time += 0.08;
    visualizerAnimationId = requestAnimationFrame(draw);
  }
  draw();
}

function stopVisualizer() {
  cancelAnimationFrame(visualizerAnimationId);
  visualizerAnimationId = null;
  const canvas = document.getElementById("audio-visualizer");
  if (canvas) {
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  }
}

// Listeners for global player buttons
document.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn || !audio) return;

  if (btn.dataset.action === "toggle-mute") {
    audio.muted = !audio.muted;
    btn.textContent = audio.muted ? "🔇" : "🔊";
  } else if (btn.dataset.action === "skip-forward") {
    audio.currentTime += 15;
  } else if (btn.dataset.action === "skip-back") {
    audio.currentTime -= 15;
  } else if (btn.dataset.action === "toggle-stream") {
    
    // Capture aura context from the play button's parent
    const contextCard = btn.closest('[style*="--card-accent"], [style*="--accent"]');
    if (contextCard) {
      const styleStr = contextCard.getAttribute("style");
      const match = styleStr.match(/--(?:card-)?accent:\s*([^;]+)/);
      if (match) {
        document.body.style.setProperty("--flight-aura", match[1].trim());
      }
    }
    
    toggleStream();
  }
});

const volume = $("#volume");
if (volume && audio) {
  audio.volume = Number(volume.value);
  volume.addEventListener("input", (event) => {
    audio.volume = Number(event.currentTarget.value);
    audio.muted = false;
    const muteBtn = document.querySelector('[data-action="toggle-mute"]');
    if (muteBtn) muteBtn.textContent = "🔊";
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

let currentTasteValues = null;
let tasteAnimationId = null;

function renderTasteRadar(values, targetValues) {
  const polygon = $("#taste-polygon");
  if (!polygon) return;
  const polarPoints = values.map((value, index) => polarPoint(index, value));
  const points = polarPoints.map(p => p.join(",")).join(" ");
  polygon.setAttribute("points", points);

  const svg = polygon.closest("svg");
  if (!svg) return;
  
  const genres = ["Heavy Metal", "Hard Rock", "Progressive", "80s", "90s", "Electronic"];
  
  let tooltip = $("#taste-tooltip");
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.id = "taste-tooltip";
    tooltip.className = "taste-tooltip";
    document.body.appendChild(tooltip);
  }

  // Find or create points
  let pointEls = svg.querySelectorAll(".taste-point");
  if (pointEls.length === 0) {
    polarPoints.forEach((_, i) => {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("r", "6");
      circle.setAttribute("class", "taste-point");
      circle.setAttribute("fill", "#ff3eb5");
      circle.setAttribute("stroke", "#05070b");
      circle.setAttribute("stroke-width", "2");
      circle.style.filter = "drop-shadow(0 0 8px #ff3eb5)";
      
      circle.addEventListener("mouseenter", () => {
        const rect = circle.getBoundingClientRect();
        // Use targetValues to show the actual saved/toggled value, not interpolated value
        tooltip.textContent = `${genres[i]}: ${Math.round(targetValues[i])}%`;
        tooltip.style.left = `${rect.left + window.scrollX + 15}px`;
        tooltip.style.top = `${rect.top + window.scrollY - 15}px`;
        tooltip.classList.add("is-visible");
      });
      circle.addEventListener("mouseleave", () => {
        tooltip.classList.remove("is-visible");
      });
      
      svg.appendChild(circle);
    });
    pointEls = svg.querySelectorAll(".taste-point");
  }

  // Update point positions
  polarPoints.forEach((point, i) => {
    const circle = pointEls[i];
    if (circle) {
      circle.setAttribute("cx", point[0]);
      circle.setAttribute("cy", point[1]);
    }
  });
}

function updateMockDashboard(values) {
  const genres = ["Heavy Metal", "Hard Rock", "Progressive", "80s", "90s", "Electronic"];
  const maxVal = Math.max(...values);
  const topIndex = values.indexOf(maxVal);
  
  const topGenreEl = document.getElementById("taste-top-genre");
  const topMeterEl = document.getElementById("taste-top-meter");
  const energyScoreEl = document.getElementById("taste-energy-score");
  
  if (topGenreEl) topGenreEl.textContent = genres[topIndex];
  if (topMeterEl) topMeterEl.style.width = `${maxVal}%`;
  
  const totalScore = Math.round(values.reduce((a, b) => a + b, 0));
  if (energyScoreEl) {
    energyScoreEl.innerHTML = `${totalScore}<small style="font-size: 0.9rem; color: var(--muted); margin-left: 6px; font-weight: 500;">pts</small>`;
  }
  
  // Randomize the mini bars slightly for effect
  const bars = document.querySelectorAll(".anim-bar");
  bars.forEach(bar => {
    const r = Math.floor(Math.random() * 80) + 20;
    bar.style.height = `${r}%`;
  });
}

function updateTasteRadar(targetValues) {
  updateMockDashboard(targetValues);
  
  if (!currentTasteValues) {
    currentTasteValues = [...targetValues];
    renderTasteRadar(currentTasteValues, targetValues);
    return;
  }
  
  if (tasteAnimationId) cancelAnimationFrame(tasteAnimationId);
  const startValues = [...currentTasteValues];
  const startTime = performance.now();
  const duration = 500;
  
  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    
    currentTasteValues = startValues.map((start, i) => start + (targetValues[i] - start) * easeProgress);
    renderTasteRadar(currentTasteValues, targetValues);
    
    if (progress < 1) {
      tasteAnimationId = requestAnimationFrame(step);
    }
  }
  tasteAnimationId = requestAnimationFrame(step);
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

/**
 * Initialize staggered scroll animations using Intersection Observer
 */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.card, .now-panel, .crew-profile, .merch-card, .studio-card, .taste-panel, .radar');
  
  elements.forEach((el, index) => {
    // Only add if it doesn't already have the class to avoid duplicate animations
    if (!el.classList.contains('animate-on-scroll')) {
      el.classList.add('animate-on-scroll');
      // Add slight delay based on DOM order for staggered effect
      el.style.animationDelay = `${(index % 5) * 100}ms`;
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// Initialize on first load
document.addEventListener('DOMContentLoaded', initScrollAnimations);

/**
 * SPA Router for seamless navigation
 */
async function loadPage(url) {
  try {
    document.body.classList.add("page-exiting");
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to load page");
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Give CSS time to fade out (matches .page-exiting transition time)
    await new Promise(resolve => setTimeout(resolve, 300)); 

    const newContent = doc.getElementById("content");
    const oldContent = document.getElementById("content");
    
    if (newContent && oldContent) {
      oldContent.innerHTML = newContent.innerHTML;
      document.title = doc.title;
      
      // Update sidebar active states
      document.querySelectorAll(".sidebar .nav-link").forEach(link => {
        link.removeAttribute("aria-current");
        if (link.getAttribute("href") === url || link.getAttribute("href") === `./${url}`) {
          link.setAttribute("aria-current", "page");
        }
      });
      
      // Re-initialize specific scripts if needed (like taste engine)
      if (document.getElementById("taste-polygon")) {
        // Assume updateTasteRadar & readTasteProfile exist globally
        if (typeof updateTasteRadar === 'function') updateTasteRadar(readTasteProfile());
      }
      
      window.scrollTo(0, 0);
      initScrollAnimations();
      
      document.body.classList.remove("page-exiting");
      document.body.classList.add("page-entering");
      
      setTimeout(() => {
        document.body.classList.remove("page-entering");
      }, 400); // matches fade-in-up time
    }
  } catch (err) {
    console.error("SPA routing error:", err);
    window.location.href = url; // Fallback
  } finally {
    document.body.classList.remove("page-exiting");
  }
}

document.addEventListener("click", e => {
  const link = e.target.closest("a");
  if (!link || !link.href) return;
  
  const targetUrl = new URL(link.href);
  const currentUrl = new URL(window.location.href);

  // Intercept internal links, ignore hashes and external links
  if (targetUrl.origin === currentUrl.origin && !targetUrl.hash && targetUrl.pathname !== currentUrl.pathname) {
    e.preventDefault();
    const relativeUrl = link.getAttribute("href").replace(/^\.\//, "");
    history.pushState(null, "", relativeUrl);
    loadPage(relativeUrl);
  }
});

window.addEventListener("popstate", () => {
  loadPage(window.location.pathname.substring(1) || "index.html");
});

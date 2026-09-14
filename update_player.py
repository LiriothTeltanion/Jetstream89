import os
import re

new_player = """  <div class="player" role="region" aria-label="Persistent Jetstream89 player">
    <div class="player__track">
      <div class="player__art">
        <canvas id="audio-visualizer" width="40" height="40" style="position:absolute; inset:0; pointer-events:none;"></canvas>
        <span style="position:relative; z-index:2;">✈</span>
      </div>
      <div>
        <strong>Jetstream89 Engine Test</strong>
        <small id="stream-status">Demo mode · stream not connected</small>
      </div>
    </div>
    <div class="player__controls">
      <button class="icon-button" type="button" data-action="skip-back" aria-label="Skip back 15s">↺</button>
      <button class="icon-button" type="button" aria-label="Previous demo item">‹</button>
      <button class="player__play" type="button" data-action="toggle-stream" aria-label="Play Jetstream89">
        <span data-play-icon>▶</span>
      </button>
      <button class="icon-button" type="button" aria-label="Next demo item">›</button>
      <button class="icon-button" type="button" data-action="skip-forward" aria-label="Skip forward 15s">↻</button>
    </div>
    <div class="player__extras">
      <button class="icon-button" type="button" data-action="toggle-mute" aria-label="Mute">🔊</button>
      <span>Volume</span>
      <input id="volume" type="range" min="0" max="1" step="0.05" value="0.75" aria-label="Volume">
    </div>
  </div>"""

for filename in os.listdir("."):
    if filename.endswith(".html"):
        with open(filename, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Regex to find the <div class="player"...>...</div> block up to <div class="toast"
        pattern = re.compile(r'<div class="player"[\s\S]*?(?=<div class="toast"|<audio)', re.IGNORECASE)
        new_content = pattern.sub(new_player + "\n  ", content)
        
        with open(filename, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated {filename}")

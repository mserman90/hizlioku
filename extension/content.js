/**
 * HızlıOku — In-Page RSVP Reader Content Script
 */

(function () {
  let overlayRoot = null;
  let words = [];
  let currentIndex = 0;
  let isPlaying = false;
  let wpm = 350;
  let timerId = null;

  function getOrpIndex(word) {
    const len = word.length;
    if (len <= 1) return 0;
    if (len <= 5) return 1;
    if (len <= 9) return 2;
    if (len <= 13) return 3;
    return 4;
  }

  function calculateInterval(currentWord) {
    const baseMs = 60000 / wpm;
    if (!currentWord) return baseMs;
    const lastChar = currentWord.slice(-1);
    if ([".", "!", "?", "…"].includes(lastChar)) return baseMs * 2.0;
    if ([",", ";", ":", "-", "—"].includes(lastChar)) return baseMs * 1.5;
    if (currentWord.length >= 11) return baseMs * 1.25;
    return baseMs;
  }

  function renderCurrentWord() {
    if (!overlayRoot) return;
    const prefixEl = overlayRoot.querySelector("#hizlioku-prefix");
    const orpEl = overlayRoot.querySelector("#hizlioku-orp");
    const suffixEl = overlayRoot.querySelector("#hizlioku-suffix");
    const progressFill = overlayRoot.querySelector("#hizlioku-progress-fill");

    if (currentIndex >= words.length) {
      pauseReading();
      if (prefixEl) prefixEl.textContent = "Tamamlandı";
      if (orpEl) orpEl.textContent = "!";
      if (suffixEl) suffixEl.textContent = "";
      if (progressFill) progressFill.style.width = "100%";
      return;
    }

    const word = words[currentIndex] || "";
    const orpIdx = getOrpIndex(word);
    const prefix = word.slice(0, orpIdx);
    const orpChar = word.charAt(orpIdx);
    const suffix = word.slice(orpIdx + 1);

    if (prefixEl) prefixEl.textContent = prefix;
    if (orpEl) orpEl.textContent = orpChar;
    if (suffixEl) suffixEl.textContent = suffix;

    if (progressFill) {
      const pct = Math.round(((currentIndex + 1) / words.length) * 100);
      progressFill.style.width = `${pct}%`;
    }
  }

  function tick() {
    if (!isPlaying) return;
    currentIndex++;
    renderCurrentWord();
    if (currentIndex < words.length) {
      const nextDelay = calculateInterval(words[currentIndex]);
      timerId = setTimeout(tick, nextDelay);
    }
  }

  function startReading() {
    if (currentIndex >= words.length) currentIndex = 0;
    isPlaying = true;
    updatePlayBtnState();
    const delay = calculateInterval(words[currentIndex]);
    timerId = setTimeout(tick, delay);
  }

  function pauseReading() {
    isPlaying = false;
    if (timerId) clearTimeout(timerId);
    timerId = null;
    updatePlayBtnState();
  }

  function togglePlay() {
    if (isPlaying) {
      pauseReading();
    } else {
      startReading();
    }
  }

  function updatePlayBtnState() {
    if (!overlayRoot) return;
    const btn = overlayRoot.querySelector("#hizlioku-play-btn");
    if (btn) {
      btn.textContent = isPlaying ? "Duraklat" : "Başlat";
    }
  }

  function createOverlay(text) {
    if (overlayRoot) {
      overlayRoot.remove();
    }

    words = text.split(/\s+/).filter(Boolean);
    currentIndex = 0;

    overlayRoot = document.createElement("div");
    overlayRoot.id = "hizlioku-overlay-root";

    overlayRoot.innerHTML = `
      <div id="hizlioku-modal">
        <div class="hizlioku-header">
          <div class="hizlioku-brand">
            <span>⚡ HızlıOku</span>
            <span style="font-size: 11px; opacity: 0.7; font-weight: normal;">• Web Okuyucu</span>
          </div>
          <button class="hizlioku-close-btn" id="hizlioku-close" title="Kapat (Esc)">✕</button>
        </div>

        <div class="hizlioku-word-display">
          <div class="hizlioku-fixation-marker"></div>
          <div class="hizlioku-word-box">
            <span class="hizlioku-prefix" id="hizlioku-prefix"></span>
            <span class="hizlioku-orp-char" id="hizlioku-orp"></span>
            <span class="hizlioku-suffix" id="hizlioku-suffix"></span>
          </div>
          <div class="hizlioku-fixation-marker"></div>
        </div>

        <div class="hizlioku-progress-bar-bg">
          <div class="hizlioku-progress-bar-fill" id="hizlioku-progress-fill"></div>
        </div>

        <div class="hizlioku-controls">
          <button class="hizlioku-action-btn" id="hizlioku-play-btn">Başlat</button>
          
          <div class="hizlioku-speed-control">
            <span id="hizlioku-wpm-label">${wpm} WPM</span>
            <input type="range" class="hizlioku-speed-slider" id="hizlioku-speed" min="150" max="1000" step="25" value="${wpm}">
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlayRoot);

    // Event listeners
    overlayRoot.querySelector("#hizlioku-close").addEventListener("click", () => {
      pauseReading();
      overlayRoot.remove();
      overlayRoot = null;
    });

    overlayRoot.querySelector("#hizlioku-play-btn").addEventListener("click", togglePlay);

    const slider = overlayRoot.querySelector("#hizlioku-speed");
    slider.addEventListener("input", (e) => {
      wpm = Number(e.target.value);
      overlayRoot.querySelector("#hizlioku-wpm-label").textContent = `${wpm} WPM`;
    });

    // Keyboard controls
    const onKey = (e) => {
      if (!overlayRoot) {
        window.removeEventListener("keydown", onKey);
        return;
      }
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "Escape") {
        pauseReading();
        overlayRoot.remove();
        overlayRoot = null;
        window.removeEventListener("keydown", onKey);
      }
    };
    window.addEventListener("keydown", onKey);

    renderCurrentWord();
  }

  // Runtime messaging
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "START_RSVP" && msg.text) {
      createOverlay(msg.text);
      sendResponse({ status: "ok" });
    }
  });
})();

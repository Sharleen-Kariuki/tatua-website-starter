
// 1. Immediate Preference Initialization (prevents FOUC)
(function initTatuaSystemPreferences() {
  try {
    // 1. Theme
    const savedTheme = localStorage.getItem('tatua-theme');
    if (savedTheme && savedTheme !== 'default') {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    // 2. Font Family (default 'Asap')
    const savedFontFamily = localStorage.getItem('tatua-font-family');
    if (savedFontFamily) {
      document.documentElement.style.setProperty('--font-family-base', `'${savedFontFamily}', sans-serif`);
      document.documentElement.style.setProperty('--font-family-heading', `'${savedFontFamily}', sans-serif`);
    }

    // 3. Font Size (in rem, default 1.00rem)
    let savedFontSize = localStorage.getItem('tatua-font-size');
    if (savedFontSize) {
      let numFontSize = parseFloat(savedFontSize);
      if (numFontSize > 3) numFontSize = numFontSize / 16;
      document.documentElement.style.setProperty('--base-font-size', numFontSize + 'rem');
      document.documentElement.style.fontSize = numFontSize + 'rem';
    }

    // 4. Spacing Scale (rem scale multiplier, default 1.00rem)
    const savedSpacing = localStorage.getItem('tatua-spacing');
    if (savedSpacing) {
      document.documentElement.style.setProperty('--spacing-scale', savedSpacing);
    }

    // 5. Border Radius (in rem, default 0.75rem)
    let savedRadius = localStorage.getItem('tatua-border-radius');
    if (savedRadius) {
      let numRadius = parseFloat(savedRadius);
      if (numRadius > 3) numRadius = numRadius / 16;
      document.documentElement.style.setProperty('--radius-base', numRadius + 'rem');
    }
  } catch (err) {
    console.error('Error initializing system preferences:', err);
  }
})();

// 2. DOM Ready Controller for Live Drawer & Settings UI
document.addEventListener('DOMContentLoaded', () => {
  // System Defaults
  const DEFAULTS = {
    theme: 'default',
    fontFamily: 'Asap',
    fontSize: 1.0,
    spacing: 1.0,
    borderRadius: 0.75
  };

  // --- Inject Live Settings Drawer into Body on All Pages ---
  function injectSettingsDrawer() {
    if (document.getElementById('tatua-settings-drawer')) return;

    // 1. Floating Trigger Button
    const trigger = document.createElement('button');
    trigger.id = 'tatua-settings-trigger';
    trigger.className = 'floating-settings-trigger';
    trigger.type = 'button';
    trigger.setAttribute('aria-label', 'Open Live Appearance & Theme Settings');
    trigger.setAttribute('title', 'Customize Appearance & Live Settings');
    trigger.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
      <span>Appearance</span>
    `;

    // 2. Backdrop Overlay
    const backdrop = document.createElement('div');
    backdrop.id = 'tatua-settings-backdrop';
    backdrop.className = 'settings-drawer-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');

    // 3. Slide-Over Drawer
    const drawer = document.createElement('aside');
    drawer.id = 'tatua-settings-drawer';
    drawer.className = 'settings-drawer';
    drawer.setAttribute('aria-label', 'Live Appearance Settings');
    drawer.innerHTML = `
      <div class="drawer-header">
        <div class="drawer-title-group">
          <h2>Live Appearance</h2>
          <p class="drawer-subtitle">Changes apply in real-time across this page</p>
        </div>
        <button type="button" class="drawer-close-btn" id="drawer-close-btn" aria-label="Close Settings Drawer">&times;</button>
      </div>

      <div class="drawer-body">
        <!-- 1. Theme Selection -->
        <section class="drawer-section">
          <div class="drawer-section-header">
            <h3 class="drawer-section-title">Color Theme</h3>
          </div>
          <div class="theme-buttons-grid">
            <button type="button" class="theme-btn" data-theme-value="default" aria-label="Vibrant Purple Theme">
              <span class="theme-color-swatch swatch-dark"></span>
              <span>Vibrant Purple</span>
            </button>
            <button type="button" class="theme-btn" data-theme-value="light" aria-label="Radiant Orange Theme">
              <span class="theme-color-swatch swatch-light"></span>
              <span>Radiant Orange</span>
            </button>
            <button type="button" class="theme-btn" data-theme-value="blue" aria-label="Purple &amp; Orange Theme">
              <span class="theme-color-swatch swatch-blue"></span>
              <span>Purple &amp; Orange</span>
            </button>
            <button type="button" class="theme-btn" data-theme-value="contrast" aria-label="High Contrast Theme">
              <span class="theme-color-swatch swatch-contrast"></span>
              <span>High Contrast</span>
            </button>
          </div>
        </section>

        <!-- 2. Font Family -->
        <section class="drawer-section">
          <div class="drawer-section-header">
            <h3 class="drawer-section-title">Font Family</h3>
          </div>
          <div class="font-family-buttons-grid">
            <button type="button" class="font-family-btn" data-font-family="Asap" style="font-family: 'Asap', sans-serif;">
              <span class="font-preview-sample">Aa</span>
              <span class="font-name-label">Asap</span>
            </button>
            <button type="button" class="font-family-btn" data-font-family="Lexend Deca" style="font-family: 'Lexend Deca', sans-serif;">
              <span class="font-preview-sample">Aa</span>
              <span class="font-name-label">Lexend Deca</span>
            </button>
            <button type="button" class="font-family-btn" data-font-family="Inter" style="font-family: 'Inter', sans-serif;">
              <span class="font-preview-sample">Aa</span>
              <span class="font-name-label">Inter</span>
            </button>
          </div>
        </section>

        <!-- 3. Font Size -->
        <section class="drawer-section">
          <div class="drawer-section-header">
            <h3 class="drawer-section-title">Font Size</h3>
            <span class="setting-badge font-size-display-badge">1.00rem</span>
          </div>
          <div class="slider-control-group">
            <div class="slider-wrapper">
              <input type="range" class="range-slider font-size-input-slider" min="0.75" max="1.50" step="0.05" value="1.00" aria-label="Font Size">
            </div>
            <div class="slider-scale-labels">
              <span>0.75rem</span>
              <span>1.00rem</span>
              <span>1.50rem</span>
            </div>
          </div>
          <div class="presets-group">
            <span class="presets-label">Presets:</span>
            <button type="button" class="preset-btn" data-preset-font="0.875">0.875rem</button>
            <button type="button" class="preset-btn" data-preset-font="1.00">1.00rem</button>
            <button type="button" class="preset-btn" data-preset-font="1.125">1.125rem</button>
            <button type="button" class="preset-btn" data-preset-font="1.25">1.25rem</button>
          </div>
        </section>

        <!-- 4. Layout Spacing -->
        <section class="drawer-section">
          <div class="drawer-section-header">
            <h3 class="drawer-section-title">Layout Spacing</h3>
            <span class="setting-badge spacing-display-badge">1.00rem</span>
          </div>
          <div class="slider-control-group">
            <div class="slider-wrapper">
              <input type="range" class="range-slider spacing-input-slider" min="0.75" max="1.45" step="0.05" value="1.00" aria-label="Layout Spacing">
            </div>
            <div class="slider-scale-labels">
              <span>0.75rem</span>
              <span>1.00rem</span>
              <span>1.45rem</span>
            </div>
          </div>
          <div class="presets-group">
            <span class="presets-label">Presets:</span>
            <button type="button" class="preset-btn" data-preset-spacing="0.85">Compact</button>
            <button type="button" class="preset-btn" data-preset-spacing="1.00">Standard</button>
            <button type="button" class="preset-btn" data-preset-spacing="1.25">Spacious</button>
          </div>
        </section>

        <!-- 5. Border Radius -->
        <section class="drawer-section">
          <div class="drawer-section-header">
            <h3 class="drawer-section-title">Border Radius</h3>
            <span class="setting-badge radius-display-badge">0.75rem</span>
          </div>
          <div class="slider-control-group">
            <div class="slider-wrapper">
              <input type="range" class="range-slider radius-input-slider" min="0" max="1.75" step="0.125" value="0.75" aria-label="Border Radius">
            </div>
            <div class="slider-scale-labels">
              <span>0rem</span>
              <span>0.75rem</span>
              <span>1.75rem</span>
            </div>
          </div>
          <div class="presets-group">
            <span class="presets-label">Presets:</span>
            <button type="button" class="preset-btn" data-preset-radius="0">0rem</button>
            <button type="button" class="preset-btn" data-preset-radius="0.5">0.5rem</button>
            <button type="button" class="preset-btn" data-preset-radius="0.75">0.75rem</button>
            <button type="button" class="preset-btn" data-preset-radius="1.5">1.5rem</button>
          </div>
        </section>
      </div>

      <div class="drawer-footer">
        <button type="button" id="drawer-reset-btn" class="btn btn-secondary">
          ↺ Reset Defaults
        </button>
      </div>
    `;

    document.body.appendChild(trigger);
    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);

    // Open Drawer
    trigger.addEventListener('click', () => {
      openDrawer();
    });

    // Close Drawer
    const closeBtn = document.getElementById('drawer-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });

    // Reset button in drawer
    const drawerResetBtn = document.getElementById('drawer-reset-btn');
    if (drawerResetBtn) {
      drawerResetBtn.addEventListener('click', () => {
        resetAllSettings();
        showNotification('Defaults restored!');
      });
    }
  }

  function openDrawer() {
    const drawer = document.getElementById('tatua-settings-drawer');
    const backdrop = document.getElementById('tatua-settings-backdrop');
    if (drawer && backdrop) {
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
    }
  }

  function closeDrawer() {
    const drawer = document.getElementById('tatua-settings-drawer');
    const backdrop = document.getElementById('tatua-settings-backdrop');
    if (drawer && backdrop) {
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
    }
  }

  // Intercept header settings navigation to open live drawer seamlessly
  function hookHeaderSettingsLinks() {
    const headerObserver = new MutationObserver(() => {
      const settingsLinks = document.querySelectorAll('a[href*="settings.html"]');
      settingsLinks.forEach(link => {
        if (!link._drawerHooked) {
          link._drawerHooked = true;
          link.addEventListener('click', (e) => {
            // If on a page other than settings.html, open drawer directly
            if (!window.location.pathname.endsWith('settings.html')) {
              e.preventDefault();
              openDrawer();
            }
          });
        }
      });
    });

    headerObserver.observe(document.body, { childList: true, subtree: true });
  }

  // --- Helper: Apply Theme ---
  function applyTheme(selectedTheme) {
    if (selectedTheme === 'default') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('tatua-theme', 'default');
    } else {
      document.documentElement.setAttribute('data-theme', selectedTheme);
      localStorage.setItem('tatua-theme', selectedTheme);
    }

    // Sync all theme buttons (both in drawer and on settings page)
    const allThemeBtns = document.querySelectorAll('.theme-btn');
    allThemeBtns.forEach(btn => {
      const val = btn.getAttribute('data-theme-value');
      btn.classList.toggle('is-active', val === selectedTheme);
    });
  }

  // --- Helper: Apply Font Family ---
  function applyFontFamily(selectedFont) {
    document.documentElement.style.setProperty('--font-family-base', `'${selectedFont}', sans-serif`);
    document.documentElement.style.setProperty('--font-family-heading', `'${selectedFont}', sans-serif`);
    localStorage.setItem('tatua-font-family', selectedFont);

    // Sync all font family buttons
    const allFontBtns = document.querySelectorAll('.font-family-btn');
    allFontBtns.forEach(btn => {
      const val = btn.getAttribute('data-font-family');
      btn.classList.toggle('is-active', val === selectedFont);
    });
  }

  // --- Helper: Apply Font Size (rem) ---
  function applyFontSize(size) {
    let numSize = parseFloat(size);
    if (numSize > 3) numSize = numSize / 16;

    document.documentElement.style.setProperty('--base-font-size', numSize + 'rem');
    document.documentElement.style.fontSize = numSize + 'rem';
    localStorage.setItem('tatua-font-size', numSize);

    // Update all sliders & badges
    const sliders = document.querySelectorAll('#font-size-slider, .font-size-input-slider');
    sliders.forEach(s => s.value = numSize);

    const badges = document.querySelectorAll('#font-size-value, .font-size-display-badge');
    badges.forEach(b => b.textContent = numSize.toFixed(2) + 'rem');

    // Sync preset buttons
    const fontPresets = document.querySelectorAll('[data-preset-font]');
    fontPresets.forEach(btn => {
      const pVal = parseFloat(btn.getAttribute('data-preset-font'));
      btn.classList.toggle('active', Math.abs(pVal - numSize) < 0.02);
    });
  }

  // --- Helper: Apply Spacing Scale (rem) ---
  function applySpacing(scale) {
    const numScale = parseFloat(scale);
    document.documentElement.style.setProperty('--spacing-scale', numScale);
    localStorage.setItem('tatua-spacing', numScale);

    // Update all sliders & badges
    const sliders = document.querySelectorAll('#spacing-slider, .spacing-input-slider');
    sliders.forEach(s => s.value = numScale);

    const badges = document.querySelectorAll('#spacing-value, .spacing-display-badge');
    badges.forEach(b => b.textContent = numScale.toFixed(2) + 'rem');

    // Sync preset buttons
    const spacingPresets = document.querySelectorAll('[data-preset-spacing]');
    spacingPresets.forEach(btn => {
      const pVal = parseFloat(btn.getAttribute('data-preset-spacing'));
      btn.classList.toggle('active', Math.abs(pVal - numScale) < 0.02);
    });
  }

  // --- Helper: Apply Border Radius (rem) ---
  function applyBorderRadius(radius) {
    let numRadius = parseFloat(radius);
    if (numRadius > 3) numRadius = numRadius / 16;

    document.documentElement.style.setProperty('--radius-base', numRadius + 'rem');
    localStorage.setItem('tatua-border-radius', numRadius);

    // Update all sliders & badges
    const sliders = document.querySelectorAll('#border-radius-slider, .radius-input-slider');
    sliders.forEach(s => s.value = numRadius);

    const badges = document.querySelectorAll('#border-radius-value, .radius-display-badge');
    badges.forEach(b => b.textContent = numRadius.toFixed(2) + 'rem');

    // Sync preset buttons
    const radiusPresets = document.querySelectorAll('[data-preset-radius]');
    radiusPresets.forEach(btn => {
      const pVal = parseFloat(btn.getAttribute('data-preset-radius'));
      btn.classList.toggle('active', Math.abs(pVal - numRadius) < 0.02);
    });
  }

  // --- Helper: Reset All to Defaults ---
  function resetAllSettings() {
    applyTheme(DEFAULTS.theme);
    applyFontFamily(DEFAULTS.fontFamily);
    applyFontSize(DEFAULTS.fontSize);
    applySpacing(DEFAULTS.spacing);
    applyBorderRadius(DEFAULTS.borderRadius);

    localStorage.removeItem('tatua-theme');
    localStorage.removeItem('tatua-font-family');
    localStorage.removeItem('tatua-font-size');
    localStorage.removeItem('tatua-spacing');
    localStorage.removeItem('tatua-border-radius');
  }

  // --- Helper: Toast Notification ---
  function showNotification(message) {
    let toast = document.getElementById('settings-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'settings-toast';
      toast.className = 'toast-alert';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // --- Initialize All Components ---
  injectSettingsDrawer();
  hookHeaderSettingsLinks();

  // Load Saved or Default Values
  const currentTheme = localStorage.getItem('tatua-theme') || DEFAULTS.theme;
  const currentFontFamily = localStorage.getItem('tatua-font-family') || DEFAULTS.fontFamily;

  let rawSavedFontSize = localStorage.getItem('tatua-font-size');
  let currentFontSize = DEFAULTS.fontSize;
  if (rawSavedFontSize) {
    let parsed = parseFloat(rawSavedFontSize);
    currentFontSize = parsed > 3 ? parsed / 16 : parsed;
  }

  const currentSpacing = localStorage.getItem('tatua-spacing') || DEFAULTS.spacing;

  let rawSavedRadius = localStorage.getItem('tatua-border-radius');
  let currentRadius = DEFAULTS.borderRadius;
  if (rawSavedRadius) {
    let parsed = parseFloat(rawSavedRadius);
    currentRadius = parsed > 3 ? parsed / 16 : parsed;
  }

  // Bind Listeners using Event Delegation for dynamically injected & static elements
  document.addEventListener('click', (e) => {
    // Theme buttons
    const themeBtn = e.target.closest('.theme-btn');
    if (themeBtn) {
      const val = themeBtn.getAttribute('data-theme-value');
      applyTheme(val);
      return;
    }

    // Font Family buttons
    const fontBtn = e.target.closest('.font-family-btn');
    if (fontBtn) {
      const val = fontBtn.getAttribute('data-font-family');
      applyFontFamily(val);
      return;
    }

    // Font preset chips
    const fontPreset = e.target.closest('[data-preset-font]');
    if (fontPreset) {
      const val = fontPreset.getAttribute('data-preset-font');
      applyFontSize(val);
      return;
    }

    // Spacing preset chips
    const spacingPreset = e.target.closest('[data-preset-spacing]');
    if (spacingPreset) {
      const val = spacingPreset.getAttribute('data-preset-spacing');
      applySpacing(val);
      return;
    }

    // Radius preset chips
    const radiusPreset = e.target.closest('[data-preset-radius]');
    if (radiusPreset) {
      const val = radiusPreset.getAttribute('data-preset-radius');
      applyBorderRadius(val);
      return;
    }

    // Main page Reset button (if on settings.html)
    if (e.target.id === 'reset-settings-btn') {
      resetAllSettings();
      showNotification('Defaults restored!');
    }
  });

  // Slider Input Listeners
  document.addEventListener('input', (e) => {
    if (e.target.matches('#font-size-slider, .font-size-input-slider')) {
      applyFontSize(e.target.value);
    } else if (e.target.matches('#spacing-slider, .spacing-input-slider')) {
      applySpacing(e.target.value);
    } else if (e.target.matches('#border-radius-slider, .radius-input-slider')) {
      applyBorderRadius(e.target.value);
    }
  });

  // Apply Current State on Load
  applyTheme(currentTheme);
  applyFontFamily(currentFontFamily);
  applyFontSize(currentFontSize);
  applySpacing(currentSpacing);
  applyBorderRadius(currentRadius);
});
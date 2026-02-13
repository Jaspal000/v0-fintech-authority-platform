/**
 * FinanceCalc Pro - Shared Component Loader
 *
 * Fetches header.html (and optionally footer.html) from /components/
 * and injects them into #header-slot / #footer-slot on any page.
 * After injection, initializes all interactive behaviors:
 *   - Desktop dropdown navigation (hover + click + keyboard)
 *   - Search overlay (Cmd/Ctrl+K, ESC to close)
 *   - Mobile drawer (hamburger toggle, backdrop dismiss, ESC)
 *
 * Usage in any sub-page:
 *   <div id="header-slot"></div>
 *   <div id="footer-slot"></div>
 *   <script type="module" src="/js/core/load-components.js"></script>
 */

/**
 * Fetch an HTML fragment and inject it into a target slot.
 * @param {string} url - Absolute path to the HTML fragment
 * @param {string} slotSelector - CSS selector for the target element
 * @returns {Promise<boolean>} true if injection succeeded
 */
async function injectFragment(url, slotSelector) {
  const slot = document.querySelector(slotSelector);
  if (!slot) return false;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    slot.innerHTML = html;
    return true;
  } catch (err) {
    console.warn(`[LoadComponents] Failed to load ${url}:`, err.message);
    return false;
  }
}

/**
 * Initialize all header interactive behaviors.
 * Called after header.html has been injected into the DOM.
 */
function initHeaderBehaviors() {
  /* ---- Desktop Dropdown Navigation ---- */
  const navItems = document.querySelectorAll('[data-nav-item]');
  let openItem = null;
  let closeTimer = null;

  function openDropdown(item) {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
    if (openItem && openItem !== item) closeDropdown(openItem);
    item.classList.add('nav-item--open');
    const trigger = item.querySelector('.nav-item__trigger');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    openItem = item;
  }

  function closeDropdown(item) {
    item.classList.remove('nav-item--open');
    const trigger = item.querySelector('.nav-item__trigger');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    if (openItem === item) openItem = null;
  }

  navItems.forEach(function (item) {
    // Hover open/close with a small delay to prevent flicker
    item.addEventListener('mouseenter', function () {
      openDropdown(item);
    });
    item.addEventListener('mouseleave', function () {
      closeTimer = setTimeout(function () {
        closeDropdown(item);
      }, 150);
    });

    // Click toggle for touch / keyboard users
    var trigger = item.querySelector('.nav-item__trigger');
    if (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        if (item.classList.contains('nav-item--open')) {
          closeDropdown(item);
        } else {
          openDropdown(item);
        }
      });
    }
  });

  // Close dropdown on outside click
  document.addEventListener('click', function (e) {
    if (openItem && !openItem.contains(e.target)) {
      closeDropdown(openItem);
    }
  });

  /* ---- Search Overlay ---- */
  var searchTrigger = document.getElementById('search-trigger');
  var searchOverlay = document.getElementById('search-overlay');
  var searchInput = document.getElementById('search-input');

  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.add('search-overlay--open');
    document.body.style.overflow = 'hidden';
    setTimeout(function () {
      if (searchInput) searchInput.focus();
    }, 100);
  }

  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove('search-overlay--open');
    document.body.style.overflow = '';
    if (searchInput) searchInput.value = '';
  }

  if (searchTrigger) {
    searchTrigger.addEventListener('click', openSearch);
  }

  if (searchOverlay) {
    searchOverlay.addEventListener('click', function (e) {
      if (e.target === searchOverlay) closeSearch();
    });
  }

  /* ---- Mobile Drawer ---- */
  var mobileToggle = document.getElementById('mobile-toggle');
  var mobilePanel = document.getElementById('mobile-panel');
  var mobileBackdrop = document.getElementById('mobile-backdrop');
  var mobileClose = document.getElementById('mobile-close');

  function openMobile() {
    if (!mobilePanel || !mobileBackdrop) return;
    mobilePanel.classList.add('mobile-nav-panel--open');
    mobileBackdrop.classList.add('mobile-nav-backdrop--open');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobile() {
    if (!mobilePanel || !mobileBackdrop) return;
    mobilePanel.classList.remove('mobile-nav-panel--open');
    mobileBackdrop.classList.remove('mobile-nav-backdrop--open');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobile);
  if (mobileClose) mobileClose.addEventListener('click', closeMobile);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobile);

  // Close mobile drawer when any link inside is clicked
  if (mobilePanel) {
    mobilePanel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobile);
    });
  }

  /* ---- Global Keyboard Shortcuts ---- */
  document.addEventListener('keydown', function (e) {
    // ESC: close any open overlay/drawer/dropdown
    if (e.key === 'Escape') {
      if (searchOverlay && searchOverlay.classList.contains('search-overlay--open')) {
        closeSearch();
        return;
      }
      if (mobilePanel && mobilePanel.classList.contains('mobile-nav-panel--open')) {
        closeMobile();
        return;
      }
      if (openItem) {
        closeDropdown(openItem);
        return;
      }
    }

    // Cmd/Ctrl + K: open search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  });
}

/**
 * Main entry point: load shared components and initialize behaviors.
 */
export async function loadComponents() {
  const headerLoaded = await injectFragment('/components/header.html', '#header-slot');
  if (headerLoaded) {
    initHeaderBehaviors();
  }

  // Footer injection (when /components/footer.html exists)
  await injectFragment('/components/footer.html', '#footer-slot');
}

// Auto-run when loaded as a module script
loadComponents();

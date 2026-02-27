/**
 * UI Engine
 * Detects locale from URL, fetches metadata from the Registry,
 * and hydrates the page with the correct Web Component.
 */

import { getToolBySlug, getToolsByRegion, getAllTools } from '../calculator-registry.js';

/**
 * Detect the region from the current URL path.
 * Expects paths like /us/mortgage-calculator/ or /uk/stamp-duty-calculator/
 * @returns {string} region code (default: 'us')
 */
export function detectRegion() {
  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);
  const validRegions = ['us', 'uk', 'ca', 'au'];
  if (segments.length > 0 && validRegions.includes(segments[0])) {
    return segments[0];
  }
  return 'us';
}

/**
 * Extract the tool slug from the current URL path.
 * @returns {string|null}
 */
export function detectSlug() {
  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);
  // Pattern: /region/slug/ or /region/slug/index.html
  if (segments.length >= 2) {
    let slug = segments[1];
    // Remove .html extension if present
    slug = slug.replace(/\.html$/, '');
    return slug;
  }
  return null;
}

/**
 * Inject the appropriate Web Component into the target element.
 * @param {string} targetSelector - CSS selector for the mount point
 */
export function hydrateCalculator(targetSelector = '#calculator-mount') {
  const region = detectRegion();
  const slug = detectSlug();

  if (!slug) {
    console.warn('[UIEngine] No tool slug detected in URL.');
    return;
  }

  const toolConfig = getToolBySlug(region, slug);
  if (!toolConfig) {
    console.warn(`[UIEngine] No tool found for region="${region}", slug="${slug}".`);
    return;
  }

  const mountPoint = document.querySelector(targetSelector);
  if (!mountPoint) {
    console.warn(`[UIEngine] Mount point "${targetSelector}" not found.`);
    return;
  }

  // Create the Web Component element
  const component = document.createElement(toolConfig.componentTag);
  component.setAttribute('data-region', region);
  mountPoint.innerHTML = '';
  mountPoint.appendChild(component);

  // Update document metadata
  if (toolConfig.title) {
    document.title = toolConfig.title;
  }
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && toolConfig.metaDescription) {
    metaDesc.setAttribute('content', toolConfig.metaDescription);
  }
}

/**
 * Render tool cards for a given region into a target container.
 * @param {string} region
 * @param {string} targetSelector
 */
export function renderToolCards(region, targetSelector = '#tool-grid') {
  const container = document.querySelector(targetSelector);
  if (!container) return;

  const tools = region === 'all' ? getAllTools() : getToolsByRegion(region);
  container.innerHTML = '';

  if (tools.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem;">
        <p style="color: var(--color-text-muted); font-size: 1rem;">
          More tools for this region coming soon.
        </p>
      </div>`;
    return;
  }

  const regionLabels = { us: 'US', uk: 'UK', ca: 'CA', au: 'AU' };

  const iconSVGs = {
    home: `<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    'trending-up': `<svg viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
    receipt: `<svg viewBox="0 0 24 24"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M8 10h8"/><path d="M8 14h4"/></svg>`,
    'credit-card': `<svg viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
    'piggy-bank': `<svg viewBox="0 0 24 24"><path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2"/><path d="M2 9.5a1 1 0 1 1 2 0"/></svg>`,
  };

  for (const tool of tools) {
    const iconHTML = iconSVGs[tool.icon] || iconSVGs['home'];
    const toolRegion = tool.region || region;
    const card = document.createElement('a');
    card.className = 'tool-card';
    card.href = `/${toolRegion}/${tool.slug}/`;
    const regionBadge = region === 'all' ? `<span class="tool-card__badge">${regionLabels[toolRegion] || toolRegion.toUpperCase()}</span>` : '';
    card.innerHTML = `
      <div class="tool-card__icon">${iconHTML}</div>
      ${regionBadge}
      <div class="tool-card__title">${tool.h1}</div>
      <p class="tool-card__desc">${tool.shortDesc}</p>
      <span class="tool-card__arrow">Open Calculator &rarr;</span>
    `;
    container.appendChild(card);
  }
}

/**
 * Initialize FAQ accordion interactivity.
 */
export function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('faq-item--open');
      // Close all others
      faqItems.forEach((i) => i.classList.remove('faq-item--open'));
      if (!isOpen) {
        item.classList.add('faq-item--open');
      }
    });
  });
}

/**
 * Initialize mobile nav toggle (legacy fallback).
 */
export function initMobileNav() {
  const toggle = document.querySelector('.nav-mobile-toggle');
  const nav = document.querySelector('.site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('site-nav--open');
    const isOpen = nav.classList.contains('site-nav--open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
}

/**
 * Resolve "Get Started" CTA href based on current page.
 * On the homepage, scrolls to #tools. On subpages, navigates to /#tools.
 * Uses event delegation so it works for dynamically injected headers.
 */
export function initCtaLinks() {
  document.addEventListener('click', (e) => {
    const cta = e.target.closest('.header-cta');
    if (!cta) return;
    const isHomepage = window.location.pathname === '/' || window.location.pathname === '/index.html';
    if (isHomepage) {
      const tools = document.getElementById('tools');
      if (tools) {
        e.preventDefault();
        tools.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // On subpages, the href="/#tools" will naturally navigate home and scroll
  });
}

/**
 * Initialize dropdown navigation menus.
 * Handles hover on desktop, click on touch, keyboard navigation, and click-outside-to-close.
 */
export function initDropdowns() {
  const navItems = document.querySelectorAll('[data-dropdown]');
  if (!navItems.length) return;

  let activeDropdown = null;

  function openDropdown(item) {
    if (activeDropdown && activeDropdown !== item) {
      closeDropdown(activeDropdown);
    }
    item.classList.add('nav-item--open');
    const trigger = item.querySelector('.nav-item__trigger');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    activeDropdown = item;
  }

  function closeDropdown(item) {
    item.classList.remove('nav-item--open');
    const trigger = item.querySelector('.nav-item__trigger');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    if (activeDropdown === item) activeDropdown = null;
  }

  function closeAll() {
    navItems.forEach(item => closeDropdown(item));
  }

  navItems.forEach(item => {
    const trigger = item.querySelector('.nav-item__trigger');
    if (!trigger) return;

    // Click toggle
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (item.classList.contains('nav-item--open')) {
        closeDropdown(item);
      } else {
        openDropdown(item);
      }
    });

    // Keyboard: Enter/Space to toggle, Escape to close
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDropdown(item);
        trigger.focus();
      }
    });

    // Close when focus leaves the dropdown entirely
    item.addEventListener('focusout', (e) => {
      requestAnimationFrame(() => {
        if (!item.contains(document.activeElement)) {
          closeDropdown(item);
        }
      });
    });

    // Mouse enter/leave for desktop hover
    item.addEventListener('mouseenter', () => {
      openDropdown(item);
    });

    item.addEventListener('mouseleave', () => {
      closeDropdown(item);
    });
  });

  // Click outside closes all
  document.addEventListener('click', (e) => {
    if (activeDropdown && !activeDropdown.contains(e.target)) {
      closeAll();
    }
  });

  // Escape key closes all
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });
}

/**
 * Initialize the full-width search overlay.
 * Opens on search button click or Ctrl/Cmd+K, closes on ESC or backdrop click.
 */
export function initSearchOverlay() {
  const overlay = document.getElementById('search-overlay');
  const searchToggle = document.querySelector('[data-search-toggle]');
  if (!overlay || !searchToggle) return;

  const input = overlay.querySelector('.search-overlay__input');

  function openSearch() {
    overlay.classList.add('search-overlay--open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (input) {
      requestAnimationFrame(() => input.focus());
    }
  }

  function closeSearch() {
    overlay.classList.remove('search-overlay--open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (input) input.value = '';
    searchToggle.focus();
  }

  searchToggle.addEventListener('click', (e) => {
    e.preventDefault();
    openSearch();
  });

  // Click backdrop to close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeSearch();
  });

  // Escape to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('search-overlay--open')) {
      closeSearch();
    }
    // Cmd/Ctrl + K to open
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (overlay.classList.contains('search-overlay--open')) {
        closeSearch();
      } else {
        openSearch();
      }
    }
  });
}

/**
 * Initialize mobile slide-out navigation panel.
 * Opens from hamburger, closes on X button, backdrop click, or Escape.
 */
export function initMobilePanel() {
  const toggle = document.querySelector('[data-mobile-toggle]');
  const panel = document.getElementById('mobile-nav-panel');
  const backdrop = document.getElementById('mobile-nav-backdrop');
  const closeBtn = document.querySelector('[data-mobile-close]');
  if (!toggle || !panel || !backdrop) return;

  function openPanel() {
    panel.classList.add('mobile-nav-panel--open');
    panel.setAttribute('aria-hidden', 'false');
    backdrop.classList.add('mobile-nav-backdrop--open');
    backdrop.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Focus the close button for keyboard users
    if (closeBtn) requestAnimationFrame(() => closeBtn.focus());
  }

  function closePanel() {
    panel.classList.remove('mobile-nav-panel--open');
    panel.setAttribute('aria-hidden', 'true');
    backdrop.classList.remove('mobile-nav-backdrop--open');
    backdrop.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    toggle.focus();
  }

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    openPanel();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closePanel();
    });
  }

  backdrop.addEventListener('click', closePanel);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('mobile-nav-panel--open')) {
      closePanel();
    }
  });
}

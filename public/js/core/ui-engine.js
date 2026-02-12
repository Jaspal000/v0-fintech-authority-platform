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
 * Initialize mobile nav toggle.
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

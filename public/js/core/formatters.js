/**
 * Formatters Module
 * All currency formatting, rounding, and decimal logic using Intl.NumberFormat.
 * NO DOM manipulation. Pure functions only.
 */

const LOCALE_MAP = {
  us: 'en-US',
  uk: 'en-GB',
  ca: 'en-CA',
  au: 'en-AU',
};

const CURRENCY_MAP = {
  us: 'USD',
  uk: 'GBP',
  ca: 'CAD',
  au: 'AUD',
};

const CURRENCY_SYMBOL_MAP = {
  us: '$',
  uk: '\u00A3',
  ca: 'CA$',
  au: 'A$',
};

/**
 * Format a number as a localized currency string.
 * @param {number} value
 * @param {string} region - e.g. 'us', 'uk'
 * @param {object} [options]
 * @param {number} [options.minimumFractionDigits=2]
 * @param {number} [options.maximumFractionDigits=2]
 * @returns {string}
 */
export function formatCurrency(value, region = 'us', options = {}) {
  const locale = LOCALE_MAP[region] || 'en-US';
  const currency = CURRENCY_MAP[region] || 'USD';
  const { minimumFractionDigits = 2, maximumFractionDigits = 2 } = options;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}

/**
 * Format a number as a percentage string.
 * @param {number} value - e.g. 0.065 for 6.5%
 * @param {string} region
 * @param {number} [fractionDigits=2]
 * @returns {string}
 */
export function formatPercent(value, region = 'us', fractionDigits = 2) {
  const locale = LOCALE_MAP[region] || 'en-US';
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

/**
 * Format a plain number with locale-specific grouping.
 * @param {number} value
 * @param {string} region
 * @param {number} [fractionDigits=0]
 * @returns {string}
 */
export function formatNumber(value, region = 'us', fractionDigits = 0) {
  const locale = LOCALE_MAP[region] || 'en-US';
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

/**
 * Round a number to a specified number of decimal places.
 * @param {number} value
 * @param {number} [decimals=2]
 * @returns {number}
 */
export function roundTo(value, decimals = 2) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Parse a formatted currency/number string back to a float.
 * Removes all non-numeric characters except . and -
 * @param {string} str
 * @returns {number}
 */
export function parseNumericInput(str) {
  if (typeof str === 'number') return str;
  const cleaned = String(str).replace(/[^0-9.\-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Get currency symbol for a region.
 * @param {string} region
 * @returns {string}
 */
export function getCurrencySymbol(region = 'us') {
  return CURRENCY_SYMBOL_MAP[region] || '$';
}

/**
 * Get the Intl locale string for a region.
 * @param {string} region
 * @returns {string}
 */
export function getLocale(region = 'us') {
  return LOCALE_MAP[region] || 'en-US';
}

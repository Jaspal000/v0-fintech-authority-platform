/**
 * Base class for all FinCalc Web Components.
 * Uses Shadow DOM for style encapsulation.
 * Subclasses must implement: template(), onCalculate()
 */

export class CalculatorBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._region = 'us';
  }

  connectedCallback() {
    this._region = this.getAttribute('data-region') || 'us';
    this.render();
    this.bindEvents();
  }

  get region() {
    return this._region;
  }

  /**
   * Override in subclass. Return an HTML string for the Shadow DOM.
   * @returns {string}
   */
  template() {
    return `<p>Calculator not implemented.</p>`;
  }

  /**
   * Override in subclass. Called when the calculate button is clicked.
   */
  onCalculate() {
    console.warn('onCalculate() not implemented.');
  }

  /**
   * Shared styles injected into every calculator Shadow DOM.
   * These mirror the global form styles but are encapsulated.
   */
  baseStyles() {
    return `
      <style>
        :host {
          display: block;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          color: #1C1917;
        }

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .calc-inner {
          /* wrapper for contents */
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-label {
          display: block;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #1C1917;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          background: #F5F5F4;
          border: 1px solid #E7E5E4;
          border-radius: 0.5rem;
          font-family: inherit;
          font-size: 0.9375rem;
          color: #1C1917;
          transition: border-color 150ms ease, box-shadow 150ms ease;
          -moz-appearance: textfield;
        }

        .form-input::-webkit-outer-spin-button,
        .form-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .form-input:focus {
          outline: none;
          border-color: #0EA5E9;
          box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15);
          background: #fff;
        }

        .form-input::placeholder {
          color: #A8A29E;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .btn-calc {
          width: 100%;
          padding: 0.75rem 1.5rem;
          background: #0F1B2D;
          color: #fff;
          border: none;
          border-radius: 0.5rem;
          font-family: inherit;
          font-size: 0.9375rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 150ms ease;
          margin-top: 1rem;
        }

        .btn-calc:hover {
          background: #1A2E4A;
        }

        .btn-calc:focus-visible {
          outline: 2px solid #0EA5E9;
          outline-offset: 2px;
        }

        .btn-calc:active {
          transform: scale(0.98);
        }

        .results-panel {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #E7E5E4;
        }

        .results-panel[hidden] {
          display: none;
        }

        .result-highlight {
          background: rgba(14, 165, 233, 0.08);
          border: 1px solid rgba(14, 165, 233, 0.15);
          border-radius: 0.75rem;
          padding: 1rem 1.25rem;
          margin-bottom: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .result-highlight .result-label {
          font-weight: 600;
          color: #0F1B2D;
        }

        .result-highlight .result-value {
          font-family: 'JetBrains Mono', 'SF Mono', monospace;
          font-size: 1.25rem;
          font-weight: 700;
          color: #0EA5E9;
        }

        .result-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
        }

        .result-row:not(:last-child) {
          border-bottom: 1px solid #F5F5F4;
        }

        .result-label {
          font-size: 0.875rem;
          color: #57534E;
        }

        .result-value {
          font-family: 'JetBrains Mono', 'SF Mono', monospace;
          font-size: 0.9375rem;
          font-weight: 600;
          color: #1C1917;
        }

        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      </style>
    `;
  }

  /**
   * Renders the component's Shadow DOM.
   */
  render() {
    this.shadowRoot.innerHTML = this.baseStyles() + this.template();
  }

  /**
   * Binds click event to the calculate button.
   */
  bindEvents() {
    const btn = this.shadowRoot.querySelector('.btn-calc');
    if (btn) {
      btn.addEventListener('click', () => this.onCalculate());
    }

    // Also calculate on Enter key in any input
    const inputs = this.shadowRoot.querySelectorAll('.form-input');
    inputs.forEach((input) => {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.onCalculate();
        }
      });
    });
  }

  /**
   * Helper to get a numeric value from an input inside Shadow DOM.
   * @param {string} selector
   * @returns {number}
   */
  getInputValue(selector) {
    const el = this.shadowRoot.querySelector(selector);
    if (!el) return 0;
    const val = parseFloat(el.value);
    return isNaN(val) ? 0 : val;
  }

  /**
   * Helper to set text content of an element inside Shadow DOM.
   * @param {string} selector
   * @param {string} text
   */
  setText(selector, text) {
    const el = this.shadowRoot.querySelector(selector);
    if (el) el.textContent = text;
  }

  /**
   * Helper to show/hide results panel.
   * @param {boolean} visible
   */
  showResults(visible = true) {
    const panel = this.shadowRoot.querySelector('.results-panel');
    if (panel) {
      panel.hidden = !visible;
    }
  }
}

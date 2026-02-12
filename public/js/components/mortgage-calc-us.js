/**
 * US Mortgage Calculator (PITI) - Web Component
 * Uses Shadow DOM for encapsulation.
 */

import { CalculatorBase } from '../core/web-component-base.js';
import { formatCurrency } from '../core/formatters.js';
import { calcFullPITI } from '../formulas/us/mortgage.js';

class MortgageCalcUS extends CalculatorBase {
  template() {
    return `
      <div class="calc-inner">
        <div class="form-group">
          <label class="form-label" for="home-price">Home Price</label>
          <input
            class="form-input"
            type="number"
            id="home-price"
            placeholder="350,000"
            value="350000"
            min="0"
            step="1000"
            aria-label="Home price in dollars"
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="down-payment">Down Payment (%)</label>
            <input
              class="form-input"
              type="number"
              id="down-payment"
              placeholder="20"
              value="20"
              min="0"
              max="100"
              step="0.5"
              aria-label="Down payment percentage"
            />
          </div>
          <div class="form-group">
            <label class="form-label" for="interest-rate">Interest Rate (%)</label>
            <input
              class="form-input"
              type="number"
              id="interest-rate"
              placeholder="6.5"
              value="6.5"
              min="0"
              max="25"
              step="0.125"
              aria-label="Annual interest rate percentage"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="loan-term">Loan Term (Years)</label>
            <input
              class="form-input"
              type="number"
              id="loan-term"
              placeholder="30"
              value="30"
              min="1"
              max="50"
              step="1"
              aria-label="Loan term in years"
            />
          </div>
          <div class="form-group">
            <label class="form-label" for="tax-rate">Property Tax Rate (%)</label>
            <input
              class="form-input"
              type="number"
              id="tax-rate"
              placeholder="1.25"
              value="1.25"
              min="0"
              max="10"
              step="0.01"
              aria-label="Annual property tax rate percentage"
            />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="insurance">Annual Insurance Premium ($)</label>
          <input
            class="form-input"
            type="number"
            id="insurance"
            placeholder="1,200"
            value="1200"
            min="0"
            step="50"
            aria-label="Annual homeowner insurance premium in dollars"
          />
        </div>

        <button class="btn-calc" type="button">Calculate Payment</button>

        <div class="results-panel" hidden aria-live="polite" role="region" aria-label="Calculation results">
          <div class="result-highlight">
            <span class="result-label">Total Monthly Payment</span>
            <span class="result-value" id="result-total">--</span>
          </div>

          <div class="result-row">
            <span class="result-label">Principal & Interest</span>
            <span class="result-value" id="result-pi">--</span>
          </div>
          <div class="result-row">
            <span class="result-label">Property Tax</span>
            <span class="result-value" id="result-tax">--</span>
          </div>
          <div class="result-row">
            <span class="result-label">Homeowner's Insurance</span>
            <span class="result-value" id="result-insurance">--</span>
          </div>
          <div class="result-row">
            <span class="result-label">PMI</span>
            <span class="result-value" id="result-pmi">--</span>
          </div>

          <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #E7E5E4;">
            <div class="result-row">
              <span class="result-label">Loan Amount</span>
              <span class="result-value" id="result-loan">--</span>
            </div>
            <div class="result-row">
              <span class="result-label">Down Payment</span>
              <span class="result-value" id="result-down">--</span>
            </div>
            <div class="result-row">
              <span class="result-label">Total Interest Paid</span>
              <span class="result-value" id="result-interest">--</span>
            </div>
            <div class="result-row">
              <span class="result-label">Total Cost of Loan</span>
              <span class="result-value" id="result-cost">--</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  onCalculate() {
    const homePrice = this.getInputValue('#home-price');
    const downPaymentPercent = this.getInputValue('#down-payment') / 100;
    const annualInterestRate = this.getInputValue('#interest-rate') / 100;
    const loanTermYears = this.getInputValue('#loan-term');
    const annualPropertyTaxRate = this.getInputValue('#tax-rate') / 100;
    const annualInsurancePremium = this.getInputValue('#insurance');

    if (homePrice <= 0 || loanTermYears <= 0) return;

    const result = calcFullPITI({
      homePrice,
      downPaymentPercent,
      annualInterestRate,
      loanTermYears,
      annualPropertyTaxRate,
      annualInsurancePremium,
    });

    const fmt = (v) => formatCurrency(v, 'us');

    this.setText('#result-total', fmt(result.totalMonthly));
    this.setText('#result-pi', fmt(result.monthlyPI));
    this.setText('#result-tax', fmt(result.monthlyTax));
    this.setText('#result-insurance', fmt(result.monthlyInsurance));
    this.setText('#result-pmi', result.monthlyPMI > 0 ? fmt(result.monthlyPMI) : '$0.00');
    this.setText('#result-loan', fmt(result.loanAmount));
    this.setText('#result-down', fmt(result.downPayment));
    this.setText('#result-interest', fmt(result.totalInterest));
    this.setText('#result-cost', fmt(result.totalCost));
    this.showResults(true);
  }
}

customElements.define('mortgage-calc-us', MortgageCalcUS);

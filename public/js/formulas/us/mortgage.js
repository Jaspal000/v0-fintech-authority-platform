/**
 * US Mortgage (PITI) Formula Module
 * Pure functions only. No DOM manipulation.
 * Accepts numbers, returns numbers.
 */

/**
 * Calculate monthly principal & interest payment using the standard amortization formula.
 * M = P * [r(1+r)^n] / [(1+r)^n - 1]
 *
 * @param {number} principal - Loan amount in dollars
 * @param {number} annualRate - Annual interest rate as decimal (e.g. 0.065 for 6.5%)
 * @param {number} termYears - Loan term in years
 * @returns {number} Monthly principal + interest payment
 */
export function calcMonthlyPI(principal, annualRate, termYears) {
  if (principal <= 0 || termYears <= 0) return 0;
  if (annualRate <= 0) return principal / (termYears * 12);

  const r = annualRate / 12;
  const n = termYears * 12;
  const factor = Math.pow(1 + r, n);
  return principal * (r * factor) / (factor - 1);
}

/**
 * Estimate monthly property tax.
 * @param {number} homeValue
 * @param {number} annualTaxRate - As decimal (e.g. 0.0125 for 1.25%)
 * @returns {number}
 */
export function calcMonthlyPropertyTax(homeValue, annualTaxRate) {
  if (homeValue <= 0 || annualTaxRate <= 0) return 0;
  return (homeValue * annualTaxRate) / 12;
}

/**
 * Estimate monthly homeowner's insurance.
 * @param {number} annualPremium
 * @returns {number}
 */
export function calcMonthlyInsurance(annualPremium) {
  if (annualPremium <= 0) return 0;
  return annualPremium / 12;
}

/**
 * Estimate monthly PMI (Private Mortgage Insurance).
 * Typically 0.5% - 1.5% of original loan amount per year.
 * Required when LTV > 80%.
 *
 * @param {number} loanAmount
 * @param {number} homeValue
 * @param {number} [annualPMIRate=0.007] - Annual PMI rate as decimal
 * @returns {number}
 */
export function calcMonthlyPMI(loanAmount, homeValue, annualPMIRate = 0.007) {
  if (homeValue <= 0 || loanAmount <= 0) return 0;
  const ltv = loanAmount / homeValue;
  if (ltv <= 0.8) return 0; // No PMI if LTV <= 80%
  return (loanAmount * annualPMIRate) / 12;
}

/**
 * Calculate the full PITI + PMI breakdown.
 *
 * @param {object} params
 * @param {number} params.homePrice
 * @param {number} params.downPaymentPercent - As decimal (e.g. 0.20)
 * @param {number} params.annualInterestRate - As decimal (e.g. 0.065)
 * @param {number} params.loanTermYears
 * @param {number} params.annualPropertyTaxRate - As decimal (e.g. 0.0125)
 * @param {number} params.annualInsurancePremium
 * @param {number} [params.annualPMIRate=0.007]
 * @returns {object}
 */
export function calcFullPITI({
  homePrice,
  downPaymentPercent,
  annualInterestRate,
  loanTermYears,
  annualPropertyTaxRate,
  annualInsurancePremium,
  annualPMIRate = 0.007,
}) {
  const downPayment = homePrice * downPaymentPercent;
  const loanAmount = homePrice - downPayment;
  const monthlyPI = calcMonthlyPI(loanAmount, annualInterestRate, loanTermYears);
  const monthlyTax = calcMonthlyPropertyTax(homePrice, annualPropertyTaxRate);
  const monthlyInsurance = calcMonthlyInsurance(annualInsurancePremium);
  const monthlyPMI = calcMonthlyPMI(loanAmount, homePrice, annualPMIRate);
  const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + monthlyPMI;
  const totalInterest = monthlyPI * loanTermYears * 12 - loanAmount;
  const totalCost = totalMonthly * loanTermYears * 12;

  return {
    homePrice,
    downPayment,
    loanAmount,
    monthlyPI,
    monthlyTax,
    monthlyInsurance,
    monthlyPMI,
    totalMonthly,
    totalInterest,
    totalCost,
    ltvPercent: homePrice > 0 ? (loanAmount / homePrice) * 100 : 0,
  };
}

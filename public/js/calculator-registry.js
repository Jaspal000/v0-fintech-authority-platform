/**
 * FinanceCalc Pro - Calculator Registry
 * Single Source of Truth for the Dynamic Template System.
 *
 * Each tool entry contains:
 *   - meta: title, description, h1, breadcrumb, icon, slug
 *   - inputs: array of { id, label, type, default, min, max, step, suffix }
 *   - formula(values): pure function returning a results object
 *   - resultRows: array of { key, label, highlight? } to render output
 *   - seoContent: ~500 words of expert HTML (H2, H3, FAQs)
 *
 * Structure: TOOL_REGISTRY keyed by URL slug.
 * The master template reads ?tool= or parses /us/<slug> from the URL.
 */

export const TOOL_REGISTRY = {

  /* ============================================================
     1. MORTGAGE CALCULATOR
     ============================================================ */
  'mortgage-calculator': {
    meta: {
      title: 'US Mortgage Calculator (PITI) | FinanceCalc Pro',
      description: 'Calculate your full US mortgage payment including Principal, Interest, Taxes, and Insurance (PITI). Free, accurate, and updated for current rates.',
      h1: 'US Mortgage Calculator (PITI)',
      breadcrumb: 'Mortgage Calculator',
      icon: 'home',
      region: 'us',
      category: 'mortgage',
    },
    inputs: [
      { id: 'homePrice',        label: 'Home Price ($)',              type: 'number', default: 350000, min: 0,  max: 99999999, step: 1000,  suffix: '' },
      { id: 'downPayment',      label: 'Down Payment (%)',            type: 'number', default: 20,     min: 0,  max: 100,      step: 0.5,   suffix: '%' },
      { id: 'interestRate',     label: 'Interest Rate (%)',           type: 'number', default: 6.5,    min: 0,  max: 25,       step: 0.125, suffix: '%' },
      { id: 'loanTerm',         label: 'Loan Term (years)',           type: 'number', default: 30,     min: 1,  max: 50,       step: 1,     suffix: '' },
      { id: 'propertyTaxRate',  label: 'Property Tax Rate (%)',       type: 'number', default: 1.25,   min: 0,  max: 10,       step: 0.01,  suffix: '%' },
      { id: 'annualInsurance',  label: 'Annual Insurance ($)',        type: 'number', default: 1200,   min: 0,  max: 99999,    step: 50,    suffix: '' },
    ],
    formula(v) {
      const principal = v.homePrice * (1 - v.downPayment / 100);
      const r = (v.interestRate / 100) / 12;
      const n = v.loanTerm * 12;
      let monthlyPI = 0;
      if (principal > 0 && v.loanTerm > 0) {
        if (r > 0) {
          const factor = Math.pow(1 + r, n);
          monthlyPI = principal * (r * factor) / (factor - 1);
        } else {
          monthlyPI = principal / n;
        }
      }
      const monthlyTax = (v.homePrice * (v.propertyTaxRate / 100)) / 12;
      const monthlyInsurance = v.annualInsurance / 12;
      const ltv = v.homePrice > 0 ? (principal / v.homePrice) : 0;
      const monthlyPMI = ltv > 0.8 ? (principal * 0.007) / 12 : 0;
      const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + monthlyPMI;
      const totalInterest = (monthlyPI * n) - principal;
      return {
        totalMonthly, monthlyPI, monthlyTax, monthlyInsurance, monthlyPMI,
        loanAmount: principal, downPaymentAmt: v.homePrice * (v.downPayment / 100),
        totalInterest, totalCost: totalMonthly * n,
      };
    },
    resultRows: [
      { key: 'totalMonthly',    label: 'Total Monthly Payment',   highlight: true },
      { key: 'monthlyPI',       label: 'Principal & Interest' },
      { key: 'monthlyTax',      label: 'Property Tax' },
      { key: 'monthlyInsurance', label: "Homeowner's Insurance" },
      { key: 'monthlyPMI',      label: 'PMI' },
      { key: 'loanAmount',      label: 'Loan Amount' },
      { key: 'downPaymentAmt',  label: 'Down Payment' },
      { key: 'totalInterest',   label: 'Total Interest Paid' },
      { key: 'totalCost',       label: 'Total Cost of Loan' },
    ],
    seoContent: `
      <h2>Understanding Your Mortgage Payment</h2>
      <p>Buying a home is one of the most significant financial commitments you will make in your lifetime. Understanding exactly how much your monthly mortgage payment will be is critical for budgeting, comparing loan offers, and ensuring you do not overextend yourself. Our free US Mortgage Calculator computes your full <strong>PITI payment</strong>&mdash;Principal, Interest, Taxes, and Insurance&mdash;so you see the complete picture, not just a partial estimate.</p>

      <h2>The Math Behind Your Mortgage Payment</h2>
      <p>The core of every fixed-rate mortgage is the standard <strong>amortization formula</strong>. This formula determines how much of each payment goes toward reducing your loan balance (principal) versus paying the cost of borrowing (interest). At the start of a 30-year mortgage, the vast majority of your payment goes toward interest. Over time, the balance shifts until nearly all of your payment reduces the principal.</p>
      <div class="formula-block">M = P &times; [ r(1 + r)<sup>n</sup> ] / [ (1 + r)<sup>n</sup> &minus; 1 ]</div>
      <p>In this formula, <strong>M</strong> is your monthly principal and interest payment, <strong>P</strong> is the loan principal (home price minus your down payment), <strong>r</strong> is the monthly interest rate (your annual rate divided by 12), and <strong>n</strong> is the total number of monthly payments (loan term in years multiplied by 12).</p>

      <h3>Principal &amp; Interest</h3>
      <p>The principal is the amount you borrow. If you purchase a $350,000 home and make a 20% down payment of $70,000, your principal is $280,000. The larger your down payment, the smaller the loan&mdash;which means lower monthly payments and less total interest paid over the life of the loan. Interest rate differences matter enormously: on a $280,000 loan, the gap between 6.0% and 6.5% costs roughly $100 per month and over $36,000 across a 30-year term.</p>

      <h3>Taxes &amp; Insurance</h3>
      <p>Property taxes are assessed by your local government, typically 0.3% to 2.2% of assessed value depending on the state. Lenders collect taxes via escrow as part of your monthly payment. Homeowner&rsquo;s insurance protects against fire, storms, and theft, with average annual premiums ranging from $1,200 to $2,000 nationally. PMI is required when your down payment is less than 20%, costing 0.5% to 1.5% of the loan annually until your LTV reaches 80%.</p>

      <h2>How to Use This Calculator</h2>
      <p>Enter the <strong>home price</strong>, <strong>down payment percentage</strong>, <strong>interest rate</strong>, and <strong>loan term</strong>. Then provide your <strong>property tax rate</strong> and estimated annual <strong>insurance premium</strong>. Results update instantly. Try adjusting the down payment to see how reaching 20% eliminates PMI, or compare 15-year versus 30-year terms to see how a shorter loan dramatically reduces total interest.</p>

      <h2>Frequently Asked Questions</h2>
      <ul class="faq-list">
        <li class="faq-item">
          <button class="faq-question" aria-expanded="false">What does PITI stand for?</button>
          <div class="faq-answer"><p>PITI stands for <strong>Principal, Interest, Taxes, and Insurance</strong>. These four components make up most homeowners&rsquo; monthly mortgage obligation. Lenders use the full PITI figure to determine loan qualification based on debt-to-income ratio limits.</p></div>
        </li>
        <li class="faq-item">
          <button class="faq-question" aria-expanded="false">When can I stop paying PMI?</button>
          <div class="faq-answer"><p>You can request PMI removal once your loan-to-value ratio reaches 80%. Under the Homeowners Protection Act, PMI must be automatically cancelled at 78% LTV of the original property value.</p></div>
        </li>
        <li class="faq-item">
          <button class="faq-question" aria-expanded="false">What is a good debt-to-income ratio?</button>
          <div class="faq-answer"><p>Most lenders follow the 28/36 rule: housing costs should not exceed 28% of gross income (front-end DTI), and total debt should not exceed 36% (back-end DTI). Government-backed loans like FHA may allow higher ratios.</p></div>
        </li>
      </ul>
    `,
  },

  /* ============================================================
     2. CAR LOAN CALCULATOR
     ============================================================ */
  'car-loan-calculator': {
    meta: {
      title: 'Car Loan Calculator | FinanceCalc Pro',
      description: 'Estimate your monthly auto loan payment, total interest, and true cost of financing. Compare loan terms from 24 to 84 months.',
      h1: 'Car Loan Payment Calculator',
      breadcrumb: 'Car Loan Calculator',
      icon: 'car',
      region: 'us',
      category: 'loans',
    },
    inputs: [
      { id: 'vehiclePrice',  label: 'Vehicle Price ($)',       type: 'number', default: 35000, min: 0,  max: 9999999, step: 500,   suffix: '' },
      { id: 'downPayment',   label: 'Down Payment ($)',        type: 'number', default: 5000,  min: 0,  max: 9999999, step: 500,   suffix: '' },
      { id: 'tradeInValue',  label: 'Trade-in Value ($)',      type: 'number', default: 0,     min: 0,  max: 9999999, step: 500,   suffix: '' },
      { id: 'interestRate',  label: 'Interest Rate (APR %)',   type: 'number', default: 6.9,   min: 0,  max: 30,      step: 0.1,   suffix: '%' },
      { id: 'loanTerm',      label: 'Loan Term (months)',      type: 'number', default: 60,    min: 12, max: 84,      step: 12,    suffix: '' },
      { id: 'salesTaxRate',  label: 'Sales Tax Rate (%)',      type: 'number', default: 7.0,   min: 0,  max: 15,      step: 0.25,  suffix: '%' },
    ],
    formula(v) {
      const taxableAmount = v.vehiclePrice - v.tradeInValue;
      const salesTax = taxableAmount > 0 ? taxableAmount * (v.salesTaxRate / 100) : 0;
      const loanAmount = v.vehiclePrice + salesTax - v.downPayment - v.tradeInValue;
      const principal = Math.max(loanAmount, 0);
      const r = (v.interestRate / 100) / 12;
      const n = v.loanTerm;
      let monthly = 0;
      if (principal > 0 && n > 0) {
        if (r > 0) {
          const factor = Math.pow(1 + r, n);
          monthly = principal * (r * factor) / (factor - 1);
        } else {
          monthly = principal / n;
        }
      }
      const totalPaid = monthly * n;
      const totalInterest = totalPaid - principal;
      return {
        monthlyPayment: monthly, loanAmount: principal, salesTax,
        totalInterest, totalCost: totalPaid,
      };
    },
    resultRows: [
      { key: 'monthlyPayment', label: 'Monthly Payment',     highlight: true },
      { key: 'loanAmount',     label: 'Total Loan Amount' },
      { key: 'salesTax',       label: 'Sales Tax' },
      { key: 'totalInterest',  label: 'Total Interest Paid' },
      { key: 'totalCost',      label: 'Total Cost of Loan' },
    ],
    seoContent: `
      <h2>How Car Loan Payments Work</h2>
      <p>An auto loan is a secured installment loan used to finance the purchase of a vehicle. The vehicle itself serves as collateral, which generally results in lower interest rates compared to unsecured personal loans. When you finance a car, you agree to make fixed monthly payments over a set term, typically ranging from 24 to 84 months. Each payment covers both principal reduction and interest charges.</p>

      <h2>The Auto Loan Formula</h2>
      <p>The monthly payment on a car loan uses the same standard amortization formula as a mortgage. The key variables are the <strong>net loan amount</strong> (vehicle price plus sales tax minus your down payment and trade-in value), the <strong>annual percentage rate (APR)</strong>, and the <strong>loan term in months</strong>. The formula calculates equal monthly installments that fully amortize the loan by the final payment date.</p>
      <div class="formula-block">M = P &times; [ r(1 + r)<sup>n</sup> ] / [ (1 + r)<sup>n</sup> &minus; 1 ]</div>
      <p>Where <strong>P</strong> is the total amount financed, <strong>r</strong> is the monthly interest rate, and <strong>n</strong> is the number of monthly payments. Sales tax is calculated on the vehicle price minus any trade-in value in most states, and is typically rolled into the financed amount.</p>

      <h3>How Down Payments Reduce Your Cost</h3>
      <p>A larger down payment directly reduces the amount you need to borrow, which lowers both your monthly payment and total interest charges. Financial advisors generally recommend putting down at least 20% on a new car and 10% on a used car. This also helps you avoid being &ldquo;upside down&rdquo; on the loan, where you owe more than the vehicle is worth due to rapid depreciation.</p>

      <h3>Choosing the Right Loan Term</h3>
      <p>Shorter terms (36-48 months) result in higher monthly payments but significantly less total interest. Longer terms (60-84 months) lower the monthly payment but increase total borrowing costs substantially. For example, financing $30,000 at 6.9% APR costs $3,282 in interest over 36 months versus $7,764 over 72 months&mdash;a difference of nearly $4,500. The ideal loan term balances affordability with minimizing interest expense.</p>

      <h2>Frequently Asked Questions</h2>
      <ul class="faq-list">
        <li class="faq-item">
          <button class="faq-question" aria-expanded="false">What APR should I expect on a car loan?</button>
          <div class="faq-answer"><p>As of 2026, average new car loan rates range from 5.5% to 8.5% depending on your credit score. Buyers with excellent credit (740+) can secure rates under 5%, while subprime borrowers may face rates of 10% to 18%. Always shop multiple lenders before accepting a dealer&rsquo;s financing offer.</p></div>
        </li>
        <li class="faq-item">
          <button class="faq-question" aria-expanded="false">Should I include sales tax in my loan?</button>
          <div class="faq-answer"><p>Many buyers roll sales tax into the financed amount for convenience, but this means you pay interest on the tax amount too. If you can afford to pay sales tax upfront, you will save money over the life of the loan.</p></div>
        </li>
        <li class="faq-item">
          <button class="faq-question" aria-expanded="false">Is a longer loan term always bad?</button>
          <div class="faq-answer"><p>Not necessarily, but a longer term means paying more total interest. If you choose a longer term for the lower payment, try to make extra payments when possible to reduce the principal faster and save on interest.</p></div>
        </li>
      </ul>
    `,
  },

  /* ============================================================
     3. SALARY CALCULATOR
     ============================================================ */
  'salary-calculator': {
    meta: {
      title: 'Salary Calculator | FinanceCalc Pro',
      description: 'Convert your salary between hourly, weekly, biweekly, monthly, and annual amounts. Estimate take-home pay after federal tax withholding.',
      h1: 'Salary & Paycheck Calculator',
      breadcrumb: 'Salary Calculator',
      icon: 'briefcase',
      region: 'us',
      category: 'budgeting',
    },
    inputs: [
      { id: 'annualSalary',   label: 'Annual Salary ($)',      type: 'number', default: 75000, min: 0,  max: 99999999, step: 1000, suffix: '' },
      { id: 'hoursPerWeek',   label: 'Hours per Week',         type: 'number', default: 40,    min: 1,  max: 80,       step: 1,    suffix: '' },
      { id: 'weeksPerYear',   label: 'Weeks Worked per Year',  type: 'number', default: 52,    min: 1,  max: 52,       step: 1,    suffix: '' },
      { id: 'fedTaxRate',     label: 'Effective Federal Tax Rate (%)', type: 'number', default: 22, min: 0, max: 50, step: 0.5, suffix: '%' },
      { id: 'stateTaxRate',   label: 'State Tax Rate (%)',     type: 'number', default: 5,     min: 0,  max: 15,       step: 0.5,  suffix: '%' },
      { id: 'deductions',     label: 'Annual Pre-tax Deductions ($)', type: 'number', default: 0, min: 0, max: 999999, step: 100, suffix: '' },
    ],
    formula(v) {
      const grossAnnual = v.annualSalary;
      const taxableIncome = Math.max(grossAnnual - v.deductions, 0);
      const fedTax = taxableIncome * (v.fedTaxRate / 100);
      const stateTax = taxableIncome * (v.stateTaxRate / 100);
      const ficaRate = 0.0765;
      const ficaTax = grossAnnual * ficaRate;
      const totalTax = fedTax + stateTax + ficaTax;
      const netAnnual = grossAnnual - totalTax - v.deductions;
      const totalHours = v.hoursPerWeek * v.weeksPerYear;
      return {
        grossAnnual, hourlyRate: totalHours > 0 ? grossAnnual / totalHours : 0,
        weeklyPay: v.weeksPerYear > 0 ? grossAnnual / v.weeksPerYear : 0,
        biweeklyPay: v.weeksPerYear > 0 ? grossAnnual / (v.weeksPerYear / 2) : 0,
        monthlyPay: grossAnnual / 12,
        fedTax, stateTax, ficaTax, totalTax,
        netAnnual, netMonthly: netAnnual / 12,
      };
    },
    resultRows: [
      { key: 'netMonthly',   label: 'Net Monthly Take-Home',  highlight: true },
      { key: 'grossAnnual',  label: 'Gross Annual Salary' },
      { key: 'hourlyRate',   label: 'Hourly Rate' },
      { key: 'weeklyPay',    label: 'Gross Weekly Pay' },
      { key: 'biweeklyPay',  label: 'Gross Bi-Weekly Pay' },
      { key: 'monthlyPay',   label: 'Gross Monthly Pay' },
      { key: 'fedTax',       label: 'Federal Tax (est.)' },
      { key: 'stateTax',     label: 'State Tax (est.)' },
      { key: 'ficaTax',      label: 'FICA (Social Security + Medicare)' },
      { key: 'totalTax',     label: 'Total Estimated Tax' },
      { key: 'netAnnual',    label: 'Net Annual Take-Home' },
    ],
    seoContent: `
      <h2>Understanding Your Salary Breakdown</h2>
      <p>Knowing your salary in different time increments&mdash;hourly, weekly, biweekly, monthly, and annually&mdash;is essential for budgeting, comparing job offers, and understanding your true earning power. Most employers quote an annual salary, but your actual take-home pay depends on federal and state income taxes, FICA contributions (Social Security and Medicare), and any pre-tax deductions like 401(k) contributions or health insurance premiums.</p>

      <h2>How Salary Conversion Works</h2>
      <p>Converting an annual salary to other pay periods is straightforward arithmetic. If you earn $75,000 per year and work 52 weeks, your weekly gross pay is approximately $1,442. Your hourly rate, assuming a standard 40-hour work week, is about $36.06. Biweekly pay (every two weeks, 26 pay periods) would be approximately $2,885. Monthly gross pay is $6,250.</p>

      <h3>Federal Income Tax</h3>
      <p>The US uses a progressive federal income tax system with marginal brackets ranging from 10% to 37%. Your <strong>effective tax rate</strong>&mdash;the actual percentage of your income paid in federal tax&mdash;is typically lower than your marginal bracket because only income above each threshold is taxed at the higher rate. For a $75,000 salary with a standard deduction, the effective federal rate is approximately 15-18%.</p>

      <h3>FICA: Social Security &amp; Medicare</h3>
      <p>Every W-2 employee pays 7.65% of gross wages in FICA taxes: 6.2% for Social Security (on income up to $168,600 in 2026) and 1.45% for Medicare (no income cap). Self-employed individuals pay both the employee and employer portions, totaling 15.3%. FICA is a flat tax with no deductions, applied to every dollar of earned income up to the Social Security cap.</p>

      <h3>State Income Tax</h3>
      <p>State income tax rates vary dramatically across the US. Nine states&mdash;Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming&mdash;have no state income tax on wages. California has the highest top marginal rate at 13.3%. Most states fall between 3% and 7% effective rate for median incomes.</p>

      <h2>Frequently Asked Questions</h2>
      <ul class="faq-list">
        <li class="faq-item">
          <button class="faq-question" aria-expanded="false">How do I calculate my hourly rate from my salary?</button>
          <div class="faq-answer"><p>Divide your annual salary by the total number of hours you work per year. For a standard full-time schedule, that is 40 hours &times; 52 weeks = 2,080 hours. A $75,000 salary divided by 2,080 hours equals approximately $36.06 per hour.</p></div>
        </li>
        <li class="faq-item">
          <button class="faq-question" aria-expanded="false">What is the FICA tax rate?</button>
          <div class="faq-answer"><p>The total FICA rate for employees is 7.65%: 6.2% for Social Security and 1.45% for Medicare. Your employer matches this amount. The Social Security portion applies to earnings up to $168,600 in 2026.</p></div>
        </li>
        <li class="faq-item">
          <button class="faq-question" aria-expanded="false">Do pre-tax deductions reduce my tax bill?</button>
          <div class="faq-answer"><p>Yes. Pre-tax deductions like 401(k) contributions and health insurance premiums reduce your taxable income, lowering both your federal and state income tax. However, they do not reduce FICA taxes.</p></div>
        </li>
      </ul>
    `,
  },

  /* ============================================================
     4. COMPOUND INTEREST CALCULATOR
     ============================================================ */
  'compound-interest-calculator': {
    meta: {
      title: 'Compound Interest Calculator | FinanceCalc Pro',
      description: 'See how your investments grow over time with our free compound interest calculator. Supports daily, monthly, quarterly, and annual compounding.',
      h1: 'Compound Interest Calculator',
      breadcrumb: 'Compound Interest',
      icon: 'trending-up',
      region: 'us',
      category: 'investing',
    },
    inputs: [
      { id: 'principal',          label: 'Initial Investment ($)',       type: 'number', default: 10000, min: 0,    max: 99999999, step: 1000, suffix: '' },
      { id: 'monthlyContribution', label: 'Monthly Contribution ($)',   type: 'number', default: 200,   min: 0,    max: 999999,   step: 50,   suffix: '' },
      { id: 'annualRate',         label: 'Annual Interest Rate (%)',    type: 'number', default: 7.0,   min: 0,    max: 50,       step: 0.1,  suffix: '%' },
      { id: 'years',              label: 'Investment Period (years)',   type: 'number', default: 20,    min: 1,    max: 50,       step: 1,    suffix: '' },
      { id: 'compoundFreq',       label: 'Compounding Frequency',      type: 'select', default: 12,    options: [
        { value: 1,   label: 'Annually' },
        { value: 4,   label: 'Quarterly' },
        { value: 12,  label: 'Monthly' },
        { value: 365, label: 'Daily' },
      ]},
    ],
    formula(v) {
      const P = v.principal;
      const r = v.annualRate / 100;
      const n = v.compoundFreq;
      const t = v.years;
      const pmt = v.monthlyContribution;
      // Future value of initial principal
      const fvPrincipal = P * Math.pow(1 + r / n, n * t);
      // Future value of monthly contributions (annuity) adjusted for compounding
      const periodicRate = r / n;
      const totalPeriods = n * t;
      const paymentsPerPeriod = pmt * (12 / n);
      let fvContributions = 0;
      if (periodicRate > 0) {
        fvContributions = paymentsPerPeriod * ((Math.pow(1 + periodicRate, totalPeriods) - 1) / periodicRate);
      } else {
        fvContributions = paymentsPerPeriod * totalPeriods;
      }
      const futureValue = fvPrincipal + fvContributions;
      const totalContributions = P + (pmt * 12 * t);
      const totalInterestEarned = futureValue - totalContributions;
      return {
        futureValue, totalContributions, totalInterestEarned,
        initialInvestment: P, totalMonthlyAdded: pmt * 12 * t,
      };
    },
    resultRows: [
      { key: 'futureValue',          label: 'Future Value',            highlight: true },
      { key: 'totalInterestEarned',  label: 'Total Interest Earned' },
      { key: 'totalContributions',   label: 'Total Contributions' },
      { key: 'initialInvestment',    label: 'Initial Investment' },
      { key: 'totalMonthlyAdded',    label: 'Total Monthly Additions' },
    ],
    seoContent: `
      <h2>The Power of Compound Interest</h2>
      <p>Compound interest is the single most powerful force in personal finance. Unlike simple interest, which is calculated only on the original principal, compound interest earns returns on both your initial investment <em>and</em> on all previously accumulated interest. This creates an exponential growth curve that accelerates over time, which is why Albert Einstein reportedly called it &ldquo;the eighth wonder of the world.&rdquo;</p>

      <h2>How Compound Interest Is Calculated</h2>
      <p>The compound interest formula calculates the future value of an investment based on the initial principal, interest rate, compounding frequency, and time horizon. The key insight is that more frequent compounding periods (monthly vs. annually) produce slightly higher returns because interest begins earning interest sooner.</p>
      <div class="formula-block">A = P(1 + r/n)<sup>nt</sup></div>
      <p>Where <strong>A</strong> is the future value, <strong>P</strong> is the principal, <strong>r</strong> is the annual rate, <strong>n</strong> is the compounding frequency per year, and <strong>t</strong> is time in years. When you add regular monthly contributions, the future value of the annuity component is calculated separately and added to the principal&rsquo;s future value.</p>

      <h3>Why Starting Early Matters</h3>
      <p>Time is the most critical variable in the compound interest equation. An investor who starts at age 25 with $10,000 and adds $200 monthly at 7% annual return will accumulate approximately $352,000 by age 55. An investor who waits until 35 to start with the same parameters will have only about $160,000&mdash;less than half&mdash;despite missing only 10 years of contributions. The early starter benefits from exponential growth during the extra decade.</p>

      <h3>Compounding Frequency Impact</h3>
      <p>While the difference between annual and daily compounding is relatively small for moderate interest rates, it becomes significant with larger balances and higher rates. A $100,000 investment at 7% compounded annually grows to $196,715 over 10 years. The same investment compounded daily reaches $201,375&mdash;an additional $4,660. For long-term investors, monthly compounding captures most of this benefit.</p>

      <h2>Frequently Asked Questions</h2>
      <ul class="faq-list">
        <li class="faq-item">
          <button class="faq-question" aria-expanded="false">What is a realistic annual return rate?</button>
          <div class="faq-answer"><p>The S&amp;P 500 has historically returned an average of approximately 10% per year before inflation, or about 7% after inflation. For conservative planning, many financial advisors recommend using 6-8% for stock-heavy portfolios and 3-5% for balanced portfolios.</p></div>
        </li>
        <li class="faq-item">
          <button class="faq-question" aria-expanded="false">How does compounding frequency affect my returns?</button>
          <div class="faq-answer"><p>More frequent compounding produces slightly higher returns because interest begins earning interest sooner. However, the difference between monthly and daily compounding is minimal for most investors. The biggest factor is consistently investing over a long time horizon.</p></div>
        </li>
        <li class="faq-item">
          <button class="faq-question" aria-expanded="false">Does this calculator account for inflation?</button>
          <div class="faq-answer"><p>This calculator shows nominal (non-inflation-adjusted) returns. To approximate real returns, subtract the expected inflation rate (typically 2-3%) from the interest rate you enter. For example, enter 4-5% instead of 7% to see inflation-adjusted growth.</p></div>
        </li>
      </ul>
    `,
  },

  /* ============================================================
     5. BMI CALCULATOR
     ============================================================ */
  'bmi-calculator': {
    meta: {
      title: 'BMI Calculator | FinanceCalc Pro',
      description: 'Calculate your Body Mass Index (BMI) using height and weight. Understand your BMI category and what it means for health insurance and wellness.',
      h1: 'BMI Calculator',
      breadcrumb: 'BMI Calculator',
      icon: 'heart',
      region: 'us',
      category: 'health',
    },
    inputs: [
      { id: 'weight',    label: 'Weight (lbs)',          type: 'number', default: 170,  min: 50,  max: 1000, step: 1,   suffix: 'lbs' },
      { id: 'heightFeet', label: 'Height (feet)',        type: 'number', default: 5,    min: 1,   max: 8,    step: 1,   suffix: 'ft' },
      { id: 'heightInches', label: 'Height (inches)',    type: 'number', default: 10,   min: 0,   max: 11,   step: 1,   suffix: 'in' },
    ],
    formula(v) {
      const totalInches = (v.heightFeet * 12) + v.heightInches;
      const bmi = totalInches > 0 ? (v.weight / (totalInches * totalInches)) * 703 : 0;
      let category = '';
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal weight';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';
      const healthyWeightLow = (18.5 * totalInches * totalInches) / 703;
      const healthyWeightHigh = (24.9 * totalInches * totalInches) / 703;
      return { bmi, category, healthyWeightLow, healthyWeightHigh };
    },
    resultRows: [
      { key: 'bmi',              label: 'Your BMI',              highlight: true, format: 'decimal' },
      { key: 'category',         label: 'BMI Category',          format: 'text' },
      { key: 'healthyWeightLow', label: 'Healthy Weight (low)',  format: 'weight' },
      { key: 'healthyWeightHigh', label: 'Healthy Weight (high)', format: 'weight' },
    ],
    seoContent: `
      <h2>What Is Body Mass Index (BMI)?</h2>
      <p>Body Mass Index (BMI) is a widely used screening tool that estimates body fat based on your height and weight. Originally developed by Belgian mathematician Adolphe Quetelet in the 1830s, BMI has become the standard metric used by healthcare providers and insurance companies worldwide to classify individuals into weight categories. While BMI does not directly measure body fat percentage, it correlates strongly enough with more precise methods to serve as a useful initial assessment.</p>

      <h2>How BMI Is Calculated</h2>
      <p>The BMI formula is straightforward. In imperial units (pounds and inches), BMI equals your weight in pounds divided by your height in inches squared, multiplied by a conversion factor of 703. In metric units, it is simply weight in kilograms divided by height in meters squared.</p>
      <div class="formula-block">BMI = (weight in lbs &divide; height in inches<sup>2</sup>) &times; 703</div>
      <p>The World Health Organization and the CDC use the following standard BMI categories for adults: <strong>Underweight</strong> (below 18.5), <strong>Normal weight</strong> (18.5 to 24.9), <strong>Overweight</strong> (25.0 to 29.9), and <strong>Obese</strong> (30.0 and above). These thresholds were established based on epidemiological data linking BMI ranges to health outcomes.</p>

      <h3>BMI and Health Insurance</h3>
      <p>BMI is relevant to personal finance because many insurance companies use it as one factor in underwriting life insurance and setting premiums. Individuals with a BMI in the &ldquo;normal&rdquo; range typically receive the most favorable rates, known as &ldquo;preferred&rdquo; or &ldquo;preferred plus&rdquo; rate classes. A BMI above 30 may result in higher premiums or substandard ratings. Some employer wellness programs also use BMI thresholds to determine eligibility for health insurance discounts or incentive payments.</p>

      <h3>Limitations of BMI</h3>
      <p>BMI is a useful population-level screening tool, but it has important limitations at the individual level. It does not distinguish between muscle mass and fat mass, so athletes and individuals with high muscle density may be classified as &ldquo;overweight&rdquo; despite having low body fat. It also does not account for fat distribution&mdash;abdominal fat is more strongly associated with health risks than fat carried in the hips or thighs. Age, sex, and ethnicity can also affect the relationship between BMI and actual health risk.</p>

      <h2>Frequently Asked Questions</h2>
      <ul class="faq-list">
        <li class="faq-item">
          <button class="faq-question" aria-expanded="false">Is BMI accurate for athletes?</button>
          <div class="faq-answer"><p>BMI may overestimate body fat in athletes and people with high muscle mass. If you exercise regularly and have significant muscle development, consider using body fat percentage measurements or waist-to-hip ratio for a more accurate assessment.</p></div>
        </li>
        <li class="faq-item">
          <button class="faq-question" aria-expanded="false">Does BMI affect my insurance rates?</button>
          <div class="faq-answer"><p>Yes. Life insurance companies typically use BMI as one underwriting factor. A BMI in the 18.5-24.9 range usually qualifies for the best rate classes. Higher BMI values may result in increased premiums, though each insurer has different thresholds and considers other health factors as well.</p></div>
        </li>
        <li class="faq-item">
          <button class="faq-question" aria-expanded="false">What is a healthy BMI range?</button>
          <div class="faq-answer"><p>The CDC considers a BMI between 18.5 and 24.9 to be &ldquo;normal weight.&rdquo; However, optimal BMI varies by individual. Discuss your specific health profile with your healthcare provider rather than relying solely on BMI.</p></div>
        </li>
      </ul>
    `,
  },
};

/* ---- Legacy API (backwards-compatible with existing hub page) ---- */

export const CALCULATOR_REGISTRY = {
  us: {
    mortgage: {
      'mortgage-calculator': {
        title: 'US Mortgage Calculator (PITI) | FinanceCalc Pro',
        metaDescription: 'Calculate your full US mortgage payment including Principal, Interest, Taxes, and Insurance (PITI).',
        formulaKey: 'us/mortgage',
        h1: 'US Mortgage Calculator (PITI)',
        componentTag: 'mortgage-calc-us',
        icon: 'home',
        shortDesc: 'Calculate your monthly PITI payment with taxes, insurance, and PMI included.',
      },
    },
    investing: {
      'compound-interest-calculator': {
        title: 'Compound Interest Calculator | FinanceCalc Pro',
        metaDescription: 'See how your investments grow over time with our free compound interest calculator.',
        formulaKey: 'us/compound-interest',
        h1: 'Compound Interest Calculator',
        componentTag: 'compound-interest-calc-us',
        icon: 'trending-up',
        shortDesc: 'Visualize investment growth with flexible compounding frequency options.',
      },
    },
    loans: {
      'car-loan-calculator': {
        title: 'Car Loan Calculator | FinanceCalc Pro',
        metaDescription: 'Estimate your monthly auto loan payment, total interest, and true cost of financing.',
        formulaKey: 'us/car-loan',
        h1: 'Car Loan Payment Calculator',
        componentTag: 'car-loan-calc-us',
        icon: 'credit-card',
        shortDesc: 'Estimate monthly auto payments with trade-in, tax, and term comparison.',
      },
    },
    budgeting: {
      'salary-calculator': {
        title: 'Salary Calculator | FinanceCalc Pro',
        metaDescription: 'Convert your salary between hourly, weekly, biweekly, monthly, and annual amounts.',
        formulaKey: 'us/salary',
        h1: 'Salary & Paycheck Calculator',
        componentTag: 'salary-calc-us',
        icon: 'receipt',
        shortDesc: 'Convert your salary between pay periods and estimate take-home pay.',
      },
    },
    health: {
      'bmi-calculator': {
        title: 'BMI Calculator | FinanceCalc Pro',
        metaDescription: 'Calculate your Body Mass Index and understand what it means for health insurance.',
        formulaKey: 'us/bmi',
        h1: 'BMI Calculator',
        componentTag: 'bmi-calc-us',
        icon: 'piggy-bank',
        shortDesc: 'Calculate BMI and understand its impact on insurance and wellness.',
      },
    },
    retirement: {
      'retirement-savings-calculator': {
        title: '401(k) & Retirement Savings Calculator | FinanceCalc Pro',
        metaDescription: 'Estimate how much you need to retire comfortably.',
        formulaKey: 'us/retirement',
        h1: '401(k) & Retirement Savings Calculator',
        componentTag: 'retirement-calc-us',
        icon: 'piggy-bank',
        shortDesc: 'Project your retirement nest egg with 401(k) match and inflation adjustments.',
      },
    },
    tax: {
      'income-tax-calculator': {
        title: 'Federal Income Tax Calculator | FinanceCalc Pro',
        metaDescription: 'Estimate your federal income tax for the current year.',
        formulaKey: 'us/income-tax',
        h1: 'Federal Income Tax Calculator',
        componentTag: 'income-tax-calc-us',
        icon: 'receipt',
        shortDesc: 'Estimate your federal tax liability with current brackets and deductions.',
      },
    },
  },
  uk: {
    tax: {
      'stamp-duty-calculator': {
        title: 'UK Stamp Duty Calculator (SDLT) | FinanceCalc Pro',
        metaDescription: 'Calculate UK Stamp Duty Land Tax for residential and commercial properties.',
        formulaKey: 'uk/stamp-duty',
        h1: 'UK Stamp Duty Land Tax (SDLT) Calculator',
        componentTag: 'stamp-duty-calc-uk',
        icon: 'receipt',
        shortDesc: 'Instantly calculate SDLT for any UK property purchase with relief options.',
      },
    },
  },
  ca: {
    mortgage: {
      'mortgage-calculator': {
        title: 'Canadian Mortgage Calculator | FinanceCalc Pro',
        metaDescription: 'Calculate your Canadian mortgage payment using semi-annual compounding.',
        formulaKey: 'ca/mortgage',
        h1: 'Canadian Mortgage Payment Calculator',
        componentTag: 'mortgage-calc-ca',
        icon: 'home',
        shortDesc: 'Accurate Canadian mortgage math with semi-annual compounding built in.',
      },
    },
  },
  au: {
    mortgage: {
      'home-loan-calculator': {
        title: 'Australian Home Loan Repayment Calculator | FinanceCalc Pro',
        metaDescription: 'Estimate your Australian home loan repayments for variable and fixed rates.',
        formulaKey: 'au/home-loan',
        h1: 'Australian Home Loan Repayment Calculator',
        componentTag: 'home-loan-calc-au',
        icon: 'home',
        shortDesc: 'Calculate weekly, fortnightly, or monthly repayments for Australian home loans.',
      },
    },
  },
};

export function getToolBySlug(region, slug) {
  const regionData = CALCULATOR_REGISTRY[region];
  if (!regionData) return null;
  for (const category of Object.values(regionData)) {
    if (category[slug]) return category[slug];
  }
  return null;
}

export function getToolsByRegion(region) {
  const regionData = CALCULATOR_REGISTRY[region];
  if (!regionData) return [];
  const tools = [];
  for (const [category, categoryTools] of Object.entries(regionData)) {
    for (const [slug, config] of Object.entries(categoryTools)) {
      tools.push({ slug, category, ...config });
    }
  }
  return tools;
}

export function getAllTools() {
  const tools = [];
  for (const [region, regionData] of Object.entries(CALCULATOR_REGISTRY)) {
    for (const [category, categoryTools] of Object.entries(regionData)) {
      for (const [slug, config] of Object.entries(categoryTools)) {
        tools.push({ slug, category, region, ...config });
      }
    }
  }
  return tools;
}

export function getRegions() {
  return Object.keys(CALCULATOR_REGISTRY);
}

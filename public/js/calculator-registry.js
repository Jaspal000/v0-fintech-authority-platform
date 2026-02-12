/**
 * Calculator Registry - Single Source of Truth
 * Structure: region > category > toolSlug
 * Every entry: title, metaDescription, formulaKey, h1, componentTag, icon
 */

export const CALCULATOR_REGISTRY = {
  us: {
    mortgage: {
      'mortgage-calculator': {
        title: 'US Mortgage Calculator (PITI) | FinCalc',
        metaDescription:
          'Calculate your full US mortgage payment including Principal, Interest, Taxes, and Insurance (PITI). Free, accurate, and updated for current rates.',
        formulaKey: 'us/mortgage',
        h1: 'US Mortgage Calculator (PITI)',
        componentTag: 'mortgage-calc-us',
        icon: 'home',
        shortDesc: 'Calculate your monthly PITI payment with taxes, insurance, and PMI included.',
      },
    },
    investing: {
      'compound-interest-calculator': {
        title: 'Compound Interest Calculator | FinCalc',
        metaDescription:
          'See how your investments grow over time with our free compound interest calculator. Supports daily, monthly, quarterly, and annual compounding.',
        formulaKey: 'us/compound-interest',
        h1: 'Compound Interest Calculator',
        componentTag: 'compound-interest-calc-us',
        icon: 'trending-up',
        shortDesc: 'Visualize investment growth with flexible compounding frequency options.',
      },
    },
    budgeting: {
      'debt-payoff-calculator': {
        title: 'Debt Payoff Calculator | FinCalc',
        metaDescription:
          'Plan your debt-free date with our free debt payoff calculator. Compare avalanche vs snowball methods and see how extra payments save you money.',
        formulaKey: 'us/debt-payoff',
        h1: 'Debt Payoff Calculator',
        componentTag: 'debt-payoff-calc-us',
        icon: 'credit-card',
        shortDesc: 'Plan your path to debt freedom with avalanche and snowball strategies.',
      },
    },
    retirement: {
      'retirement-savings-calculator': {
        title: '401(k) & Retirement Savings Calculator | FinCalc',
        metaDescription:
          'Estimate how much you need to retire comfortably. Factor in 401(k) contributions, employer match, Social Security, and inflation.',
        formulaKey: 'us/retirement',
        h1: '401(k) & Retirement Savings Calculator',
        componentTag: 'retirement-calc-us',
        icon: 'piggy-bank',
        shortDesc: 'Project your retirement nest egg with 401(k) match and inflation adjustments.',
      },
    },
    tax: {
      'income-tax-calculator': {
        title: 'Federal Income Tax Calculator | FinCalc',
        metaDescription:
          'Estimate your federal income tax for the current year. Includes standard deduction, marginal tax brackets, and effective tax rate.',
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
        title: 'UK Stamp Duty Calculator (SDLT) | FinCalc',
        metaDescription:
          'Calculate UK Stamp Duty Land Tax for residential and commercial properties. Includes first-time buyer relief and additional property surcharges.',
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
        title: 'Canadian Mortgage Calculator | FinCalc',
        metaDescription:
          'Calculate your Canadian mortgage payment using semi-annual compounding as required by law. Includes CMHC insurance estimates.',
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
        title: 'Australian Home Loan Repayment Calculator | FinCalc',
        metaDescription:
          'Estimate your Australian home loan repayments for variable and fixed rates. See principal vs interest breakdown over the full loan term.',
        formulaKey: 'au/home-loan',
        h1: 'Australian Home Loan Repayment Calculator',
        componentTag: 'home-loan-calc-au',
        icon: 'home',
        shortDesc: 'Calculate weekly, fortnightly, or monthly repayments for Australian home loans.',
      },
    },
  },
};

/**
 * Flat lookup: get a tool's config by region and slug.
 * @param {string} region - e.g. 'us'
 * @param {string} slug - e.g. 'mortgage-calculator'
 * @returns {object|null}
 */
export function getToolBySlug(region, slug) {
  const regionData = CALCULATOR_REGISTRY[region];
  if (!regionData) return null;
  for (const category of Object.values(regionData)) {
    if (category[slug]) return category[slug];
  }
  return null;
}

/**
 * Get all tools for a given region as a flat array.
 * @param {string} region
 * @returns {Array<{slug: string, category: string, ...config}>}
 */
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

/**
 * Get all tools across all regions as a flat array.
 * @returns {Array<{slug: string, category: string, region: string, ...config}>}
 */
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

/**
 * Get all available regions.
 * @returns {string[]}
 */
export function getRegions() {
  return Object.keys(CALCULATOR_REGISTRY);
}

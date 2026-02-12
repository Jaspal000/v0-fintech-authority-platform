import Script from "next/script";

export const metadata = {
  title: "US Mortgage Calculator (PITI) | FinCalc",
  description:
    "Calculate your full US mortgage payment including Principal, Interest, Taxes, and Insurance (PITI). Free, accurate, and updated for current rates.",
};

export default function MortgageCalculatorPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/css/main.css" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "US Mortgage Calculator (PITI)",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            description:
              "Free mortgage calculator that computes your full PITI payment including principal, interest, property taxes, homeowner's insurance, and PMI.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What does PITI stand for?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "PITI stands for Principal, Interest, Taxes, and Insurance. These are the four components that make up most homeowners' monthly mortgage payment.",
                },
              },
              {
                "@type": "Question",
                name: "How is the monthly mortgage payment calculated?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The monthly principal and interest portion uses the standard amortization formula: M = P[r(1+r)^n]/[(1+r)^n-1], where P is the loan amount, r is the monthly interest rate, and n is the total number of payments.",
                },
              },
              {
                "@type": "Question",
                name: "When can I stop paying PMI?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can typically request removal of PMI once your loan-to-value ratio reaches 80%. Under the Homeowners Protection Act, PMI must be automatically cancelled when LTV reaches 78%.",
                },
              },
              {
                "@type": "Question",
                name: "What is a good debt-to-income ratio for a mortgage?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most lenders prefer a front-end DTI of no more than 28% and a back-end DTI of no more than 36%. Some government-backed loan programs may allow higher ratios.",
                },
              },
            ],
          }),
        }}
      />

      {/* Header */}
      <header className="site-header">
        <div className="container site-header__inner">
          <a href="/" className="site-logo">
            <span className="site-logo__icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </span>
            FinCalc
          </a>
          <button
            className="nav-mobile-toggle"
            aria-label="Toggle navigation"
            aria-expanded="false"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <nav className="site-nav" aria-label="Main navigation">
            <a href="/" className="site-nav__link">
              Home
            </a>
            <a
              href="/#tools"
              className="site-nav__link site-nav__link--active"
            >
              Calculators
            </a>
            <a href="/#about" className="site-nav__link">
              About
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Breadcrumbs */}
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="breadcrumbs__separator">/</span>
            <a href="/#tools">US Calculators</a>
            <span className="breadcrumbs__separator">/</span>
            <span aria-current="page">Mortgage Calculator</span>
          </nav>
        </div>

        {/* Calculator + Content Layout */}
        <section className="calc-page">
          <div className="container">
            <div className="calc-layout">
              {/* SEO Content Column */}
              <div className="seo-content">
                <h1>US Mortgage Calculator (PITI)</h1>
                <p>
                  Buying a home is one of the most significant financial
                  commitments you will make in your lifetime. Understanding
                  exactly how much your monthly mortgage payment will be is
                  critical for budgeting, comparing loan offers, and ensuring you
                  do not overextend yourself. Our free US Mortgage Calculator
                  computes your full <strong>PITI payment</strong>
                  {
                    "\u2014Principal, Interest, Taxes, and Insurance\u2014so you see the complete picture, not just a partial estimate."
                  }
                </p>

                <h2>The Math Behind Your Mortgage Payment</h2>
                <p>
                  The core of every fixed-rate mortgage is the standard{" "}
                  <strong>amortization formula</strong>. This formula determines
                  how much of each payment goes toward reducing your loan balance
                  (principal) versus paying the cost of borrowing (interest). At
                  the start of a 30-year mortgage, the vast majority of your
                  payment goes toward interest. Over time, the balance shifts
                  until nearly all of your payment reduces the principal.
                </p>

                <div
                  className="formula-block"
                  dangerouslySetInnerHTML={{
                    __html:
                      "M = P &times; [ r(1 + r)<sup>n</sup> ] / [ (1 + r)<sup>n</sup> &minus; 1 ]",
                  }}
                />

                <p>
                  In this formula, <strong>M</strong> is your monthly principal
                  and interest payment, <strong>P</strong> is the loan principal
                  (home price minus your down payment), <strong>r</strong> is the
                  monthly interest rate (your annual rate divided by 12), and{" "}
                  <strong>n</strong> is the total number of monthly payments
                  (loan term in years multiplied by 12).
                </p>

                <h3>Principal (P)</h3>
                <p>
                  The principal is the amount you actually borrow. If you
                  purchase a $350,000 home and make a 20% down payment of
                  $70,000, your principal is $280,000. The larger your down
                  payment, the smaller the loan you need{"\u2014"}which means
                  lower monthly payments and less total interest paid over the
                  life of the loan.
                </p>

                <h3>Interest (I)</h3>
                <p>
                  The interest rate is the annual cost of borrowing money,
                  expressed as a percentage. Even small differences in your rate
                  have enormous effects over a 30-year term. For example, on a
                  $280,000 loan, the difference between a 6.0% rate and a 6.5%
                  rate is roughly $100 per month, and adds up to over $36,000 in
                  additional interest over the full term.
                </p>

                <h3>Taxes (T)</h3>
                <p>
                  Property taxes are assessed by your local government and are
                  typically expressed as a percentage of your home{"'"}s assessed
                  value. In the United States, the average effective property tax
                  rate is approximately 1.1%, but it varies dramatically by
                  state{"\u2014"}from as low as 0.27% in Hawaii to over 2.2% in
                  New Jersey. Lenders often collect property taxes as part of
                  your monthly payment and hold the funds in an escrow account,
                  paying the tax bill on your behalf.
                </p>

                <h3>Insurance (I)</h3>
                <p>
                  Homeowner{"'"}s insurance protects you against damage to your
                  property from events like fire, storms, and theft. The average
                  annual premium in the US is approximately $1,200 to $2,000,
                  depending on the state, the value of your home, and your
                  deductible. Like property taxes, insurance is frequently
                  included in your escrow payment.
                </p>

                <h3>PMI (Private Mortgage Insurance)</h3>
                <p>
                  If your down payment is less than 20% of the home{"'"}s value,
                  most conventional lenders will require you to carry Private
                  Mortgage Insurance. PMI typically costs between 0.5% and 1.5%
                  of the original loan amount per year. You can request removal
                  of PMI once your loan-to-value ratio drops to 80%, and under
                  the Homeowners Protection Act it must be automatically
                  cancelled at 78% LTV.
                </p>

                <h2>How to Use This Calculator</h2>
                <p>
                  Enter the <strong>home price</strong>, your planned{" "}
                  <strong>down payment percentage</strong>, the{" "}
                  <strong>interest rate</strong> you have been quoted (or
                  expect), and your <strong>loan term</strong> in years. Then
                  provide your local <strong>property tax rate</strong> and your
                  estimated annual <strong>insurance premium</strong>. Click{" "}
                  {"\""}Calculate Payment{"\""}
                  {
                    " to see a full breakdown of your estimated monthly obligation, including whether PMI applies to your scenario."
                  }
                </p>
                <p>
                  Use this tool to compare different scenarios. Try adjusting the
                  down payment to see how reaching the 20% threshold eliminates
                  PMI. Experiment with 15-year versus 30-year terms to see how a
                  shorter loan dramatically reduces total interest paid, even
                  though the monthly payment increases.
                </p>

                <h2>Frequently Asked Questions</h2>
                <ul className="faq-list">
                  <li className="faq-item">
                    <button className="faq-question" aria-expanded="false">
                      What does PITI stand for?
                    </button>
                    <div className="faq-answer">
                      <p>
                        PITI stands for{" "}
                        <strong>
                          Principal, Interest, Taxes, and Insurance
                        </strong>
                        . These four components make up the bulk of a homeowner
                        {"'"}s monthly mortgage obligation. Lenders use the full
                        PITI figure when determining whether a borrower qualifies
                        for a loan based on debt-to-income ratio limits.
                      </p>
                    </div>
                  </li>
                  <li className="faq-item">
                    <button className="faq-question" aria-expanded="false">
                      How is the monthly payment calculated?
                    </button>
                    <div className="faq-answer">
                      <p>
                        The principal and interest portion uses the standard
                        amortization formula shown above. Property tax and
                        insurance are then divided by 12 and added to the P
                        {"&"}I figure. If PMI applies, it is also divided monthly
                        and included.
                      </p>
                    </div>
                  </li>
                  <li className="faq-item">
                    <button className="faq-question" aria-expanded="false">
                      When can I stop paying PMI?
                    </button>
                    <div className="faq-answer">
                      <p>
                        You can request removal of PMI once your loan-to-value
                        (LTV) ratio reaches 80%, which means you have at least
                        20% equity in your home. Under the Homeowners Protection
                        Act, your lender must automatically cancel PMI when LTV
                        reaches 78% of the original property value.
                      </p>
                    </div>
                  </li>
                  <li className="faq-item">
                    <button className="faq-question" aria-expanded="false">
                      What is a good debt-to-income ratio?
                    </button>
                    <div className="faq-answer">
                      <p>
                        Most lenders follow the 28/36 rule: your housing costs
                        (PITI) should not exceed 28% of your gross monthly income
                        (front-end DTI), and your total debt payments should not
                        exceed 36% (back-end DTI). Government-backed loans like
                        FHA may allow higher ratios.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Calculator Widget Column */}
              <div className="calc-widget">
                <h2 className="calc-widget__title">
                  Mortgage Payment Calculator
                </h2>
                <div id="calculator-mount" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            {/* Brand Column */}
            <div className="footer-brand">
              <a href="/" className="footer-brand__logo">
                <span className="footer-brand__logo-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </span>
                FinanceCalc Pro
              </a>
              <p className="footer-brand__mission">
                Precision-engineered financial tools for global markets.
                Professional-grade math for every decision.
              </p>
              <div className="footer-regions">
                <a href="/#tools" className="footer-region-pill footer-region-pill--active">US</a>
                <a href="/#tools" className="footer-region-pill">UK</a>
                <a href="/#tools" className="footer-region-pill">CA</a>
                <a href="/#tools" className="footer-region-pill">AU</a>
              </div>
            </div>

            {/* Loan Tools */}
            <div className="footer-col">
              <h3 className="footer-col__heading">Loan Tools</h3>
              <ul className="footer-col__list">
                <li><a href="/us/mortgage-calculator/">Mortgage</a></li>
                <li><a href="/us/car-loan-calculator/">Car Loan</a></li>
                <li><a href="/us/personal-loan-calculator/">Personal Loan</a></li>
                <li><a href="/us/amortization-calculator/">Amortization</a></li>
              </ul>
            </div>

            {/* Investments */}
            <div className="footer-col">
              <h3 className="footer-col__heading">Investments</h3>
              <ul className="footer-col__list">
                <li><a href="/us/compound-interest-calculator/">Compound Interest</a></li>
                <li><a href="/us/roi-calculator/">ROI</a></li>
                <li><a href="/us/cap-rate-calculator/">Cap Rate</a></li>
                <li><a href="/us/net-worth-calculator/">Net Worth</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="footer-col">
              <h3 className="footer-col__heading">Resources</h3>
              <ul className="footer-col__list">
                <li><a href="/#about">About Us</a></li>
                <li><a href="/methodology/">Financial Methodology</a></li>
                <li><a href="/contact/">Contact</a></li>
                <li><a href="/editorial-policy/">Editorial Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Legal Anchor */}
          <div className="footer-legal">
            <p className="footer-legal__copy">
              {"\u00A9 2026 FinanceCalc Pro. All rights reserved."}
            </p>
            <ul className="footer-legal__links">
              <li><a href="/privacy/">Privacy</a></li>
              <li><a href="/terms/">Terms</a></li>
              <li><a href="/disclaimer/">Disclaimer</a></li>
            </ul>
            <div className="footer-legal__meta">
              <span className="footer-status">
                <span className="footer-status__dot" aria-hidden="true" />
                System Status: Online
              </span>
              <span className="footer-version">v1.0.4-Stable</span>
            </div>
          </div>
        </div>
      </footer>

      <Script
        id="calc-init"
        type="module"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
import { hydrateCalculator, initFAQ, initMobileNav } from '/js/core/ui-engine.js';
import '/js/components/mortgage-calc-us.js';

hydrateCalculator('#calculator-mount');
initFAQ();
initMobileNav();
`,
        }}
      />
    </>
  );
}

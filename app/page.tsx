import Script from "next/script";

export const metadata = {
  title: "FinCalc | Free Financial Calculators for US, UK, Canada & Australia",
  description:
    "100+ free, accurate financial calculators for mortgage, investing, tax, and budgeting. Region-specific tools for the US, UK, Canada, and Australia.",
};

export default function HomePage() {
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
            <a href="/" className="site-nav__link site-nav__link--active">
              Home
            </a>
            <a href="#tools" className="site-nav__link">
              Calculators
            </a>
            <a href="#about" className="site-nav__link">
              About
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="container">
            <span className="hero__badge">{"Free & Open Source"}</span>
            <h1>
              Financial Calculators
              <br />
              Built for Precision
            </h1>
            <p>
              Accurate, region-specific tools for mortgage, investing, tax, and
              budgeting decisions. Built by financial professionals for the US,
              UK, Canada, and Australia.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools" style={{ paddingBottom: "5rem" }}>
          <div className="container">
            <div
              className="region-tabs"
              role="tablist"
              aria-label="Select a region"
            >
              <button
                className="region-tab region-tab--active"
                role="tab"
                aria-selected="true"
                data-region="all"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
                All Regions
              </button>
              <button
                className="region-tab"
                role="tab"
                aria-selected="false"
                data-region="us"
              >
                <svg
                  width="20"
                  height="14"
                  viewBox="0 0 60 42"
                  fill="none"
                  aria-hidden="true"
                  style={{ borderRadius: "2px", flexShrink: 0 }}
                >
                  <rect width="60" height="42" fill="#fff" />
                  <rect width="60" height="3.23" fill="#B22234" />
                  <rect y="6.46" width="60" height="3.23" fill="#B22234" />
                  <rect y="12.92" width="60" height="3.23" fill="#B22234" />
                  <rect y="19.38" width="60" height="3.23" fill="#B22234" />
                  <rect y="25.85" width="60" height="3.23" fill="#B22234" />
                  <rect y="32.31" width="60" height="3.23" fill="#B22234" />
                  <rect y="38.77" width="60" height="3.23" fill="#B22234" />
                  <rect width="24" height="22.62" fill="#3C3B6E" />
                  <g fill="#fff">
                    <circle cx="4" cy="3.5" r="1.2" />
                    <circle cx="8" cy="3.5" r="1.2" />
                    <circle cx="12" cy="3.5" r="1.2" />
                    <circle cx="16" cy="3.5" r="1.2" />
                    <circle cx="20" cy="3.5" r="1.2" />
                    <circle cx="6" cy="6.5" r="1.2" />
                    <circle cx="10" cy="6.5" r="1.2" />
                    <circle cx="14" cy="6.5" r="1.2" />
                    <circle cx="18" cy="6.5" r="1.2" />
                    <circle cx="4" cy="9.5" r="1.2" />
                    <circle cx="8" cy="9.5" r="1.2" />
                    <circle cx="12" cy="9.5" r="1.2" />
                    <circle cx="16" cy="9.5" r="1.2" />
                    <circle cx="20" cy="9.5" r="1.2" />
                    <circle cx="6" cy="12.5" r="1.2" />
                    <circle cx="10" cy="12.5" r="1.2" />
                    <circle cx="14" cy="12.5" r="1.2" />
                    <circle cx="18" cy="12.5" r="1.2" />
                    <circle cx="4" cy="15.5" r="1.2" />
                    <circle cx="8" cy="15.5" r="1.2" />
                    <circle cx="12" cy="15.5" r="1.2" />
                    <circle cx="16" cy="15.5" r="1.2" />
                    <circle cx="20" cy="15.5" r="1.2" />
                    <circle cx="6" cy="18.5" r="1.2" />
                    <circle cx="10" cy="18.5" r="1.2" />
                    <circle cx="14" cy="18.5" r="1.2" />
                    <circle cx="18" cy="18.5" r="1.2" />
                  </g>
                </svg>
                United States
              </button>
              <button
                className="region-tab"
                role="tab"
                aria-selected="false"
                data-region="uk"
              >
                <svg
                  width="20"
                  height="14"
                  viewBox="0 0 60 42"
                  fill="none"
                  aria-hidden="true"
                  style={{ borderRadius: "2px", flexShrink: 0 }}
                >
                  <rect width="60" height="42" fill="#00247D" />
                  <path d="M0 0L60 42M60 0L0 42" stroke="#fff" strokeWidth="7" />
                  <path d="M0 0L60 42M60 0L0 42" stroke="#CF142B" strokeWidth="4" />
                  <path d="M30 0V42M0 21H60" stroke="#fff" strokeWidth="10" />
                  <path d="M30 0V42M0 21H60" stroke="#CF142B" strokeWidth="6" />
                </svg>
                United Kingdom
              </button>
              <button
                className="region-tab"
                role="tab"
                aria-selected="false"
                data-region="ca"
              >
                <svg
                  width="20"
                  height="14"
                  viewBox="0 0 60 42"
                  fill="none"
                  aria-hidden="true"
                  style={{ borderRadius: "2px", flexShrink: 0 }}
                >
                  <rect width="60" height="42" fill="#fff" />
                  <rect width="15" height="42" fill="#FF0000" />
                  <rect x="45" width="15" height="42" fill="#FF0000" />
                  <path
                    d="M30 8l-2 6-5-1 3 4-3 4 5-1 2 6 2-6 5 1-3-4 3-4-5 1z"
                    fill="#FF0000"
                  />
                </svg>
                Canada
              </button>
              <button
                className="region-tab"
                role="tab"
                aria-selected="false"
                data-region="au"
              >
                <svg
                  width="20"
                  height="14"
                  viewBox="0 0 60 42"
                  fill="none"
                  aria-hidden="true"
                  style={{ borderRadius: "2px", flexShrink: 0 }}
                >
                  <rect width="60" height="42" fill="#00008B" />
                  <rect width="30" height="21" fill="#00008B" />
                  <path d="M0 0L30 21M30 0L0 21" stroke="#fff" strokeWidth="4" />
                  <path d="M0 0L30 21M30 0L0 21" stroke="#CF142B" strokeWidth="2" />
                  <path d="M15 0V21M0 10.5H30" stroke="#fff" strokeWidth="5" />
                  <path d="M15 0V21M0 10.5H30" stroke="#CF142B" strokeWidth="3" />
                  <g fill="#fff">
                    <polygon points="45,12 45.9,14.8 48.9,14.8 46.5,16.5 47.4,19.3 45,17.6 42.6,19.3 43.5,16.5 41.1,14.8 44.1,14.8" />
                    <polygon points="52,26 52.6,28 54.7,28 53,29.2 53.7,31.2 52,30 50.3,31.2 51,29.2 49.3,28 51.4,28" />
                    <polygon points="52,6 52.6,8 54.7,8 53,9.2 53.7,11.2 52,10 50.3,11.2 51,9.2 49.3,8 51.4,8" />
                    <polygon points="38,30 38.6,32 40.7,32 39,33.2 39.7,35.2 38,34 36.3,35.2 37,33.2 35.3,32 37.4,32" />
                    <polygon points="42,22 42.4,23.2 43.7,23.2 42.6,24 43,25.2 42,24.4 41,25.2 41.4,24 40.3,23.2 41.6,23.2" />
                  </g>
                </svg>
                Australia
              </button>
            </div>

            <div
              className="tool-grid"
              id="tool-grid"
              role="tabpanel"
              aria-label="Available calculators"
            />
          </div>
        </section>

        {/* About Section */}
        <section id="about" style={{ padding: "4rem 0" }}>
          <div
            className="container container--narrow"
            style={{ textAlign: "center" }}
          >
            <h2 style={{ marginTop: 0 }}>Why FinCalc?</h2>
            <p
              style={{
                fontSize: "1.0625rem",
                maxWidth: "600px",
                marginInline: "auto",
              }}
            >
              Every financial calculator on this platform uses the exact same
              formulas used by banks and lenders. We isolate every formula as a
              pure function, present all math transparently, and tailor each tool
              to the tax laws and conventions of your specific region. No ads, no
              tracking, no hidden fees.
            </p>
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
        id="hub-init"
        type="module"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
import { renderToolCards, initMobileNav } from '/js/core/ui-engine.js';

const tabs = document.querySelectorAll('.region-tab');
let activeRegion = 'all';

function switchRegion(region) {
  activeRegion = region;
  tabs.forEach(tab => {
    const isActive = tab.getAttribute('data-region') === region;
    tab.classList.toggle('region-tab--active', isActive);
    tab.setAttribute('aria-selected', isActive);
  });
  renderToolCards(region, '#tool-grid');
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    switchRegion(tab.getAttribute('data-region'));
  });
});

switchRegion('all');
initMobileNav();
`,
        }}
      />
    </>
  );
}

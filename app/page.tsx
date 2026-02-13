import Script from "next/script";

export const metadata = {
  title: "FinanceCalc Pro | Free Financial Calculators for US, UK, Canada & Australia",
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
          {/* Left: Brand */}
          <a href="/" className="site-logo">
            <span className="site-logo__icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </span>
            FinanceCalc Pro
          </a>

          {/* Center: Navigation with Dropdowns */}
          <nav className="site-nav" aria-label="Main navigation">
            {/* Loans Dropdown */}
            <div className="nav-item" data-nav-item>
              <button
                className="nav-item__trigger"
                aria-expanded="false"
                aria-haspopup="true"
                type="button"
              >
                Loans
                <svg className="nav-item__chevron" viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className="nav-dropdown" role="menu">
                <a href="/us/mortgage-calculator/" className="nav-dropdown__link" role="menuitem">
                  <span className="nav-dropdown__icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </span>
                  <span className="nav-dropdown__text">
                    <span className="nav-dropdown__label">Mortgage</span>
                    <span className="nav-dropdown__hint">Calculate monthly payments</span>
                  </span>
                </a>
                <a href="/us/car-loan-calculator/" className="nav-dropdown__link" role="menuitem">
                  <span className="nav-dropdown__icon">
                    <svg viewBox="0 0 24 24">
                      <rect x="1" y="3" width="15" height="13" rx="2" ry="2" />
                      <path d="M16 8h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="13.5" cy="18.5" r="2.5" />
                    </svg>
                  </span>
                  <span className="nav-dropdown__text">
                    <span className="nav-dropdown__label">Auto</span>
                    <span className="nav-dropdown__hint">Vehicle financing options</span>
                  </span>
                </a>
                <a href="/us/personal-loan-calculator/" className="nav-dropdown__link" role="menuitem">
                  <span className="nav-dropdown__icon">
                    <svg viewBox="0 0 24 24">
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </span>
                  <span className="nav-dropdown__text">
                    <span className="nav-dropdown__label">Personal</span>
                    <span className="nav-dropdown__hint">Personal loan estimator</span>
                  </span>
                </a>
              </div>
            </div>

            {/* Investments Dropdown */}
            <div className="nav-item" data-nav-item>
              <button
                className="nav-item__trigger"
                aria-expanded="false"
                aria-haspopup="true"
                type="button"
              >
                Investments
                <svg className="nav-item__chevron" viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className="nav-dropdown" role="menu">
                <a href="/us/compound-interest-calculator/" className="nav-dropdown__link" role="menuitem">
                  <span className="nav-dropdown__icon">
                    <svg viewBox="0 0 24 24">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                  </span>
                  <span className="nav-dropdown__text">
                    <span className="nav-dropdown__label">Compound Interest</span>
                    <span className="nav-dropdown__hint">Growth over time</span>
                  </span>
                </a>
                <a href="/us/roi-calculator/" className="nav-dropdown__link" role="menuitem">
                  <span className="nav-dropdown__icon">
                    <svg viewBox="0 0 24 24">
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                  </span>
                  <span className="nav-dropdown__text">
                    <span className="nav-dropdown__label">ROI</span>
                    <span className="nav-dropdown__hint">Return on investment</span>
                  </span>
                </a>
                <a href="/us/cap-rate-calculator/" className="nav-dropdown__link" role="menuitem">
                  <span className="nav-dropdown__icon">
                    <svg viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="3" y1="9" x2="21" y2="9" />
                      <line x1="9" y1="21" x2="9" y2="9" />
                    </svg>
                  </span>
                  <span className="nav-dropdown__text">
                    <span className="nav-dropdown__label">Cap Rate</span>
                    <span className="nav-dropdown__hint">Real estate capitalization</span>
                  </span>
                </a>
              </div>
            </div>

            {/* Retirement Dropdown */}
            <div className="nav-item" data-nav-item>
              <button
                className="nav-item__trigger"
                aria-expanded="false"
                aria-haspopup="true"
                type="button"
              >
                Retirement
                <svg className="nav-item__chevron" viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className="nav-dropdown" role="menu">
                <a href="/us/401k-calculator/" className="nav-dropdown__link" role="menuitem">
                  <span className="nav-dropdown__icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
                      <path d="M1 21h22" />
                      <path d="M9 7h6" />
                      <path d="M9 11h6" />
                      <path d="M9 15h6" />
                    </svg>
                  </span>
                  <span className="nav-dropdown__text">
                    <span className="nav-dropdown__label">401(k)</span>
                    <span className="nav-dropdown__hint">Retirement savings planner</span>
                  </span>
                </a>
                <a href="/us/social-security-calculator/" className="nav-dropdown__link" role="menuitem">
                  <span className="nav-dropdown__icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </span>
                  <span className="nav-dropdown__text">
                    <span className="nav-dropdown__label">Social Security</span>
                    <span className="nav-dropdown__hint">Benefits estimator</span>
                  </span>
                </a>
              </div>
            </div>

            {/* Tools Direct Link */}
            <a href="/#tools" className="nav-item__trigger">
              Tools
            </a>
          </nav>

          {/* Right: Utility */}
          <div className="header-utility">
            <button
              className="header-search-btn"
              aria-label="Search calculators"
              type="button"
              id="search-trigger"
            >
              <svg viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <a href="/#tools" className="header-cta">
              Get Started
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="nav-mobile-toggle"
            aria-label="Toggle navigation"
            aria-expanded="false"
            type="button"
            id="mobile-toggle"
          >
            <svg viewBox="0 0 24 24">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Search Overlay */}
      <div className="search-overlay" id="search-overlay" role="dialog" aria-label="Search calculators" aria-modal="true">
        <div className="search-overlay__inner">
          <div className="search-overlay__bar">
            <svg viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="search-overlay__input"
              placeholder="Search calculators..."
              autoComplete="off"
              id="search-input"
            />
            <kbd className="search-overlay__kbd">ESC</kbd>
          </div>
          <div className="search-overlay__hints">
            <p>{'Try "mortgage", "compound interest", or "401k"'}</p>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className="mobile-nav-backdrop" id="mobile-backdrop" />
      <div className="mobile-nav-panel" id="mobile-panel" role="dialog" aria-label="Navigation menu" aria-modal="true">
        <div className="mobile-nav__header">
          <a href="/" className="site-logo" style={{ marginRight: 0 }}>
            <span className="site-logo__icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </span>
            FinanceCalc Pro
          </a>
          <button className="mobile-nav__close" aria-label="Close navigation" type="button" id="mobile-close">
            <svg viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="mobile-nav__body">
          <div className="mobile-nav__section-title">Loans</div>
          <a href="/us/mortgage-calculator/" className="mobile-nav__link">
            <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            Mortgage
          </a>
          <a href="/us/car-loan-calculator/" className="mobile-nav__link">
            <svg viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="2" ry="2" /><path d="M16 8h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="13.5" cy="18.5" r="2.5" /></svg>
            Auto
          </a>
          <a href="/us/personal-loan-calculator/" className="mobile-nav__link">
            <svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
            Personal
          </a>

          <div className="mobile-nav__section-title">Investments</div>
          <a href="/us/compound-interest-calculator/" className="mobile-nav__link">
            <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
            Compound Interest
          </a>
          <a href="/us/roi-calculator/" className="mobile-nav__link">
            <svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
            ROI
          </a>
          <a href="/us/cap-rate-calculator/" className="mobile-nav__link">
            <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
            Cap Rate
          </a>

          <div className="mobile-nav__section-title">Retirement</div>
          <a href="/us/401k-calculator/" className="mobile-nav__link">
            <svg viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" /><path d="M1 21h22" /><path d="M9 7h6" /><path d="M9 11h6" /><path d="M9 15h6" /></svg>
            {'401(k)'}
          </a>
          <a href="/us/social-security-calculator/" className="mobile-nav__link">
            <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            Social Security
          </a>
        </div>
        <div className="mobile-nav__footer">
          <a href="/#tools" className="header-cta">
            Get Started
          </a>
        </div>
      </div>

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
            <h2 style={{ marginTop: 0 }}>Why FinanceCalc Pro?</h2>
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
import { renderToolCards } from '/js/core/ui-engine.js';

/* ---- Region Tabs ---- */
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

/* ---- Desktop Dropdown Navigation ---- */
const navItems = document.querySelectorAll('[data-nav-item]');
let openItem = null;
let closeTimer = null;

function openDropdown(item) {
  if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
  if (openItem && openItem !== item) closeDropdown(openItem);
  item.classList.add('nav-item--open');
  item.querySelector('.nav-item__trigger')?.setAttribute('aria-expanded', 'true');
  openItem = item;
}

function closeDropdown(item) {
  item.classList.remove('nav-item--open');
  item.querySelector('.nav-item__trigger')?.setAttribute('aria-expanded', 'false');
  if (openItem === item) openItem = null;
}

navItems.forEach(item => {
  item.addEventListener('mouseenter', () => openDropdown(item));
  item.addEventListener('mouseleave', () => {
    closeTimer = setTimeout(() => closeDropdown(item), 150);
  });
  const trigger = item.querySelector('.nav-item__trigger');
  if (trigger) {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      item.classList.contains('nav-item--open') ? closeDropdown(item) : openDropdown(item);
    });
  }
});

document.addEventListener('click', (e) => {
  if (openItem && !openItem.contains(e.target)) closeDropdown(openItem);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && openItem) closeDropdown(openItem);
});

/* ---- Search Overlay ---- */
const searchTrigger = document.getElementById('search-trigger');
const searchOverlay = document.getElementById('search-overlay');
const searchInput = document.getElementById('search-input');

function openSearch() {
  searchOverlay.classList.add('search-overlay--open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => searchInput?.focus(), 100);
}

function closeSearch() {
  searchOverlay.classList.remove('search-overlay--open');
  document.body.style.overflow = '';
  if (searchInput) searchInput.value = '';
}

searchTrigger?.addEventListener('click', openSearch);
searchOverlay?.addEventListener('click', (e) => {
  if (e.target === searchOverlay) closeSearch();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && searchOverlay?.classList.contains('search-overlay--open')) closeSearch();
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
});

/* ---- Mobile Drawer ---- */
const mobileToggle = document.getElementById('mobile-toggle');
const mobilePanel = document.getElementById('mobile-panel');
const mobileBackdrop = document.getElementById('mobile-backdrop');
const mobileClose = document.getElementById('mobile-close');

function openMobile() {
  mobilePanel.classList.add('mobile-nav-panel--open');
  mobileBackdrop.classList.add('mobile-nav-backdrop--open');
  mobileToggle?.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobile() {
  mobilePanel.classList.remove('mobile-nav-panel--open');
  mobileBackdrop.classList.remove('mobile-nav-backdrop--open');
  mobileToggle?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

mobileToggle?.addEventListener('click', openMobile);
mobileClose?.addEventListener('click', closeMobile);
mobileBackdrop?.addEventListener('click', closeMobile);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobilePanel?.classList.contains('mobile-nav-panel--open')) closeMobile();
});

// Close mobile drawer on link click
mobilePanel?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMobile);
});
`,
        }}
      />
    </>
  );
}

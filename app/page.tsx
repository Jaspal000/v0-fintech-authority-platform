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
                data-region="us"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
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
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
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
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
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
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
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
        <div className="container site-footer__inner">
          <span className="site-footer__brand">FinCalc</span>
          <ul className="site-footer__links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#tools">All Calculators</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
          </ul>
          <p className="site-footer__copy">
            {
              "\u00A9 2026 FinCalc. All calculations are estimates for informational purposes only. Consult a financial professional before making decisions."
            }
          </p>
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
let activeRegion = 'us';

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

switchRegion('us');
initMobileNav();
`,
        }}
      />
    </>
  );
}

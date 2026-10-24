import React, { useState } from "react";
import "./ProductsPage.css";

const products = [
  {
    id: "next-station",
    number: "01",
    selectorLabel: "Next Station",
    name: "NEXT STATION",
    category: "AI-powered education platform",
    description:
      "Discover universities that fit your goals, budget, location, and preferences.",
    status: "Available",
    link: "https://next-station-six.vercel.app/",
  },
  {
    id: "zaroorat",
    number: "02",
    selectorLabel: "Zaroorat",
    name: "ZAROORAT",
    category: "Local services marketplace",
    description:
      "Find help for everyday needs and connect with local mechanics, carpenters, plumbers, electricians, and other skilled workers.",
    tagline: "Har Zaroorat, Ek Trusted Saathi.",
    status: "In Development",
  },
];

function NextStationPreview() {
  return (
    <div className="product-preview product-preview--station" aria-label="Conceptual interface preview for Next Station">
      <div className="preview-topbar">
        <span className="preview-brand">
          <span className="preview-brand__mark">N</span>
          next station
        </span>
        <span className="preview-topbar__label">YOUR NEXT CHAPTER</span>
      </div>
      <div className="station-preview__content">
        <div className="station-preview__copy">
          <span className="preview-kicker">A WORLD OF POSSIBILITY</span>
          <p className="station-preview__headline">
            Find the place
            <br />
            you belong.
          </p>
          <span className="station-preview__note">A preview of what comes next.</span>
        </div>
        <div className="station-orbit" aria-hidden="true">
          <span className="station-orbit__ring station-orbit__ring--outer" />
          <span className="station-orbit__ring station-orbit__ring--inner" />
          <span className="station-orbit__sun" />
          <span className="station-orbit__dot station-orbit__dot--one" />
          <span className="station-orbit__dot station-orbit__dot--two" />
          <span className="station-orbit__dot station-orbit__dot--three" />
          <span className="station-orbit__label">YOUR FUTURE</span>
        </div>
      </div>
      <div className="station-preview__footer">
        <span>GOALS</span>
        <span>BUDGET</span>
        <span>LOCATION</span>
        <span>PREFERENCES</span>
      </div>
    </div>
  );
}

function ZarooratPreview() {
  return (
    <div className="product-preview product-preview--zaroorat" aria-label="Illustrative local services preview for Zaroorat">
      <div className="preview-topbar">
        <span className="preview-brand">
          <span className="preview-brand__mark preview-brand__mark--zaroorat">Z</span>
          zaroorat
        </span>
        <span className="preview-topbar__label">HELP, CLOSE TO HOME</span>
      </div>
      <div className="zaroorat-preview__content">
        <div className="zaroorat-preview__map" aria-hidden="true">
          <svg viewBox="0 0 500 300" role="presentation">
            <path className="map-road map-road--wide" d="M-30 244 86 164 158 174 245 85 343 106 524 15" />
            <path className="map-road map-road--wide" d="m46-25 84 97-1 93 82 73 44 94" />
            <path className="map-road" d="m-10 83 121 35 99-16 72 56 121-4 108 53" />
            <path className="map-road" d="m188-16-4 78 46 40-20 65 55 53-6 99" />
            <path className="map-road" d="m347-19-18 78 28 64-38 65 25 117" />
            <path className="map-route" d="M124 180c28-44 51-39 80-18 25 18 28 45 69 29 39-15 41-57 91-63" />
          </svg>
          <span className="map-pin map-pin--one"><span>01</span></span>
          <span className="map-pin map-pin--two"><span>02</span></span>
          <span className="map-pin map-pin--three"><span>03</span></span>
          <span className="map-center">
            <span className="map-center__pulse" />
            YOU
          </span>
          <span className="map-caption">LOCAL CONNECTIONS</span>
        </div>
        <div className="zaroorat-preview__aside">
          <span className="preview-kicker">HELP, WHEN YOU NEED IT</span>
          <p className="zaroorat-preview__headline">
            Good people.
            <br />
            Close by.
          </p>
          <div className="service-list" aria-label="Examples of local services">
            <span>Mechanic</span>
            <span>Carpenter</span>
            <span>Plumber</span>
            <span>Electrician</span>
          </div>
        </div>
      </div>
      <div className="zaroorat-preview__footer">HAR ZAROORAT, EK TRUSTED SAATHI.</div>
    </div>
  );
}

function ProductWindow({ product }) {
  const handlePointerMove = (event) => {
    if (
      event.pointerType === "touch" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    event.currentTarget.style.setProperty("--tilt-x", `${(0.5 - y) * 3}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${(x - 0.5) * 4}deg`);
  };

  const resetTilt = (event) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <article className="products-window" key={product.id}>
      <div
        className="products-window__frame"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        onPointerCancel={resetTilt}
      >
        <div className="products-window__details">
          <div className="products-window__meta">
            <span>{product.number} / 02</span>
            <span className="products-window__status">
              <span className="products-window__status-dot" />
              {product.status}
            </span>
          </div>
          <div className="products-window__title-wrap">
            <p className="products-window__category">{product.category}</p>
            <h2 className="products-window__title">{product.name}</h2>
            {product.tagline && (
              <p className="products-window__tagline">{product.tagline}</p>
            )}
            <p className="products-window__description">{product.description}</p>
          </div>
          {product.link ? (
            <a
              className="products-window__link"
              href={product.link}
              target="_blank"
              rel="noreferrer"
            >
              Explore Product <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="products-window__link products-window__link--muted">
              In Development
            </span>
          )}
        </div>
        <div className="products-window__visual">
          {product.id === "next-station" ? (
            <NextStationPreview />
          ) : (
            <ZarooratPreview />
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  return (
    <main className="products-page">
      <section className="products-showcase" aria-labelledby="products-heading">
        <header className="products-intro">
          <p className="products-intro__eyebrow">MADE BY CODE BOOK</p>
          <h1 className="products-intro__title" id="products-heading">
            Thoughtful ideas,
            <br />
            made real.
          </h1>
          <p className="products-intro__description">
            A closer look at what we’re building.
          </p>
        </header>

        <div className="products-showcase__window" aria-live="polite">
          <ProductWindow product={selectedProduct} />
        </div>

        <nav className="products-selector" aria-label="Choose a product">
          {products.map((product) => (
            <button
              className={`products-selector__item${
                selectedProduct.id === product.id
                  ? " products-selector__item--active"
                  : ""
              }`}
              key={product.id}
              type="button"
              aria-pressed={selectedProduct.id === product.id}
              onClick={() => setSelectedProduct(product)}
            >
              <span className="products-selector__number">{product.number}</span>
              <span className="products-selector__dash">—</span>
              <span>{product.selectorLabel}</span>
              <span className="products-selector__indicator" aria-hidden="true">↗</span>
            </button>
          ))}
        </nav>
      </section>
    </main>
  );
}

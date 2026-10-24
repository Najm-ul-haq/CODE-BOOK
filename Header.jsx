import React from "react";
import "./Header.css";

export default function Header({ productsPage = false }) {
  const links = [
    { label: "Services", href: productsPage ? "/#services" : "#services" },
    { label: "Products", href: "/products.html", current: productsPage },
    { label: "Contact", href: productsPage ? "/#contact" : "#contact" },
  ];

  return (
    <header className={`site-header${productsPage ? " site-header--products" : ""}`}>
      <nav className="site-header__nav" aria-label="Main navigation">
        {links.map((link) => (
          <a
            aria-current={link.current ? "page" : undefined}
            className="site-header__link"
            href={link.href}
            key={link.label}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

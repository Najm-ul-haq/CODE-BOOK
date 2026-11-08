import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const { pathname } = useLocation();
  const productsPage =
    pathname.startsWith("/products") || pathname.startsWith("/projects/");
  const links = [
    { label: "Services", to: { pathname: "/", hash: "#services" } },
    { label: "Products", to: "/products", current: pathname === "/products" },
    { label: "Contact", to: { pathname: "/", hash: "#contact" } },
  ];

  return (
    <header className={`site-header${productsPage ? " site-header--products" : ""}`}>
      <nav className="site-header__nav" aria-label="Main navigation">
        <Link className="site-header__brand" to="/" aria-label="CODE BOOK home">
          <img src="/codebook logo.png" alt="CODE BOOK" />
        </Link>
        {links.map((link) => (
          <Link
            aria-current={link.current ? "page" : undefined}
            className="site-header__link"
            to={link.to}
            key={link.label}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

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

  const handleLinkClick = (link) => {
    if (link.to === "/products") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    } else if (link.to?.hash) {
      const el = document.getElementById(link.to.hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className={`site-header${productsPage ? " site-header--products" : ""}`}>
      <nav className="site-header__nav" aria-label="Main navigation">
        <Link
          className="site-header__brand"
          to="/"
          aria-label="CODE BOOK home"
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
            if (document.documentElement) document.documentElement.scrollTop = 0;
            if (document.body) document.body.scrollTop = 0;
          }}
        >
          <img src="/codebook logo.png" alt="CODE BOOK" />
        </Link>
        {links.map((link) => (
          <Link
            aria-current={link.current ? "page" : undefined}
            className="site-header__link"
            to={link.to}
            key={link.label}
            onClick={() => handleLinkClick(link)}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

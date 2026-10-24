import React from "react";
import { createRoot } from "react-dom/client";
import Header from "./Header.jsx";
import Hero from "./Hero.jsx";
import Services from "./Services.jsx";
import Contact from "./Contact.jsx";
import Products from "./ProductsPage.jsx";

const pathname = window.location.pathname.replace(/\/+$/, "");
const isProductsPage =
  pathname.endsWith("/products") || pathname.endsWith("/products.html");

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Header productsPage={isProductsPage} />
    {isProductsPage ? (
      <Products />
    ) : (
      <>
        <Hero />
        <Services />
        <Contact />
      </>
    )}
  </React.StrictMode>,
);

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import Services from "../components/Services.jsx";
import Contact from "../components/DeviceMockupContact.jsx";

export default function HomePage() {
  const { hash } = useLocation();

  useEffect(() => {
    document.title = "CODEBOOK";
    if (!hash) return undefined;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [hash]);

  return (
    <>
      <Hero />
      <Services />
      <Contact />
    </>
  );
}

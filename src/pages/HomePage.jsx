import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import Services from "../components/Services.jsx";
import Contact from "../components/DeviceMockupContact.jsx";

export default function HomePage() {
  const { hash } = useLocation();

  useEffect(() => {
    document.title = "CODEBOOK";
    if (hash) {
      const frame = window.requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
      });
      return () => window.cancelAnimationFrame(frame);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, [hash]);

  return (
    <>
      <Hero />
      <Services />
      <Contact />
    </>
  );
}

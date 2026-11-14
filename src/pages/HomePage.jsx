import React, { useEffect } from "react";
import Hero from "../components/Hero.jsx";
import Services from "../components/Services.jsx";
import Contact from "../components/DeviceMockupContact.jsx";

export default function HomePage() {
  useEffect(() => {
    document.title = "CODEBOOK";
    document.documentElement.classList.add("landing-page-active");
    return () => document.documentElement.classList.remove("landing-page-active");
  }, []);

  return (
    <>
      <Hero />
      <Services />
      <Contact />
    </>
  );
}

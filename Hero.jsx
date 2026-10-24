import React from "react";
import "./Hero.css";

export default function Hero() {
  return (
    <main className="hero">
      <h1 className="hero__title">
        <span className="hero__line hero__line--first">
          <span className="hero__desktop">Ideas deserve</span>
          <span className="hero__mobile">Ideas</span>
        </span>
        <span className="hero__line">
          <span className="hero__desktop">to exist.</span>
          <span className="hero__mobile">deserve</span>
          <span className="hero__mobile">to exist.</span>
        </span>
      </h1>
    </main>
  );
}

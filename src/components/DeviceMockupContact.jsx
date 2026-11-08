import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiLocationArrow1 } from "react-icons/ci";
import "./DeviceMockupContact.css";

/* ─── Social Icon Vectors (Clean SVGs, background handled by CSS) ──────────── */
function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="3" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconTwitterX() {
  return (
    <svg viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconEmail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#EA4335" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
      <path d="M12.01 2.05c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.12-1.34a9.92 9.92 0 0 0 4.89 1.28h.01c5.5 0 9.97-4.47 9.97-9.97 0-2.66-1.04-5.16-2.92-7.04a9.92 9.92 0 0 0-7.06-2.88zm5.82 14.15c-.24.68-1.4 1.33-1.94 1.42-.51.09-1.16.13-3.76-.94-3.13-1.29-5.13-4.5-5.29-4.71-.16-.21-1.27-1.69-1.27-3.23 0-1.54.81-2.29 1.09-2.6.28-.31.62-.39.83-.39h.6c.19 0 .44-.07.69.53.25.6.86 2.1.94 2.25.08.16.13.34.03.55-.1.21-.15.34-.3.52-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.8 1.31 1.71 2.12 1.18 1.05 2.17 1.38 2.48 1.53.31.16.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.7-.16.28.1.18.06 1.76.84.31.16.52.26.6.39.08.14.08.79-.16 1.47z" />
    </svg>
  );
}

function IconCall() {
  return (
    <svg viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

/* ─── Contact Apps List ─────────────────────────────────────────────────────── */
const contactApps = [
  {
    id: "instagram",
    label: "Instagram",
    subtitle: "Official Profile",
    account: "@codebook.pk",
    description: "Follow CODE BOOK on Instagram for our latest software projects, design showcases, and engineering updates.",
    actionText: "Visit @codebook.pk",
    actionHref: "https://www.instagram.com/codebook.pk/",
    Icon: IconInstagram,
    tileClass: "device-contact__icon-btn--instagram",
  },
  {
    id: "facebook",
    label: "Facebook",
    subtitle: "Community",
    account: "facebook.com/codebook",
    description: "Join our active community of innovators, builders, and designers on Facebook.",
    actionText: "Visit Facebook Page",
    actionHref: "https://facebook.com",
    Icon: IconFacebook,
    tileClass: "device-contact__icon-btn--facebook",
  },
  {
    id: "x",
    label: "Twitter / X",
    subtitle: "Latest Updates",
    account: "@codebook",
    description: "Follow real-time development news, product announcements, and insights on X.",
    actionText: "Follow on X",
    actionHref: "https://twitter.com",
    Icon: IconTwitterX,
    tileClass: "device-contact__icon-btn--x",
  },
  {
    id: "email",
    label: "Email",
    subtitle: "Get in Touch",
    account: "hello@codebook.example",
    description: "Have a project in mind? Reach out via email and our team will respond within 24 hours.",
    actionText: "Send Email",
    actionHref: "mailto:hello@codebook.example",
    Icon: IconEmail,
    tileClass: "device-contact__icon-btn--email",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    subtitle: "Direct Chat",
    account: "+1 (555) 019-2834",
    description: "Message our team directly on WhatsApp for prompt consultations and instant support.",
    actionText: "Chat on WhatsApp",
    actionHref: "https://wa.me/",
    Icon: IconWhatsApp,
    tileClass: "device-contact__icon-btn--whatsapp",
  },
  {
    id: "call",
    label: "Phone Call",
    subtitle: "Direct Line",
    account: "+1 (555) 019-2834",
    description: "Call us directly Monday through Friday, 9:00 AM – 6:00 PM EST.",
    actionText: "Call Us Now",
    actionHref: "tel:+15550192834",
    Icon: IconCall,
    tileClass: "device-contact__icon-btn--call",
  },
];

/* ─── Top Navigation Bar Component (Used inside phone mockup) ──────────────── */
function TopNav({ className = "" }) {
  return (
    <nav className={`device-nav ${className}`} aria-label="Mockup Navigation">
      <Link to="/" className="device-nav__brand" aria-label="CODE BOOK home">
        <img src="/codebook logo.png" alt="CODE BOOK" />
      </Link>
      <a href="#services" className="device-nav__link">
        Services
      </a>
      <Link to="/products" className="device-nav__link">
        Products
      </Link>
      <a href="#contact" className="device-nav__link">
        Contact
      </a>
    </nav>
  );
}

/* ─── Floating Glassmorphism Contact Card Component ────────────────────────── */
function ContactCard({ onSelectApp, className = "" }) {
  return (
    <div className={`device-contact__card ${className}`} role="region" aria-label="Contact Us Apps">
      <h2 className="device-contact__card-title">Contact Us</h2>
      <div className="device-contact__grid">
        {contactApps.map((app) => {
          const { id, label, Icon, tileClass } = app;
          return (
            <button
              key={id}
              type="button"
              className={`device-contact__icon-btn ${tileClass}`}
              aria-label={`Open ${label} details`}
              onClick={() => onSelectApp(app)}
            >
              <Icon />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Main Export Component ─────────────────────────────────────────────────── */
export default function DeviceMockupContact() {
  const [activeApp, setActiveApp] = useState(null);
  const [laptopImg, setLaptopImg] = useState("/mockup-laptop.png");
  const [phoneImg, setPhoneImg] = useState("/mockup-phone.jpg");

  // Dismiss modal on Escape key
  useEffect(() => {
    if (!activeApp) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveApp(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeApp]);

  return (
    <section className="device-contact" id="contact" aria-label="Contact Section">
      {/* Ambient background glow */}
      <div className="device-contact__ambient" aria-hidden="true" />

      {/* ─────────────────────────────────────────────────────────────
          1. MOBILE VIEW: Phone Mockup (< md breakpoint / < 768px)
          ───────────────────────────────────────────────────────────── */}
      <div className="device-contact__phone-view md:hidden">
        {/* Phone Photo Background */}
        <div className="device-contact__phone-wrap">
          <img
            src={phoneImg}
            alt="Smartphone mockup with contact apps"
            className="device-contact__phone-img"
            onError={() => setPhoneImg("/pexels-jakubzerdzicki-27574955.jpg")}
          />
        </div>

        {/* Top Navigation Menu inside/above Phone */}
        <div className="device-contact__phone-nav">
          <TopNav />
        </div>

        {/* Floating Glassmorphic Contact Card Centered on Phone Screen */}
        <ContactCard
          className="device-contact__phone-card"
          onSelectApp={(app) => setActiveApp(app)}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. DESKTOP VIEW: Fullscreen Laptop Mockup (>= md breakpoint)
             Navbar removed inside screen - only Contact Card displayed!
          ───────────────────────────────────────────────────────────── */}
      <div className="device-contact__laptop-view hidden md:flex">
        <div className="device-contact__laptop-frame">
          {/* Scaler maintains 16:9 aspect ratio and fills screen edge-to-edge */}
          <div className="device-contact__laptop-scaler">
            <img
              src={laptopImg}
              alt="Laptop mockup with contact apps"
              className="device-contact__laptop-img"
              onError={() => setLaptopImg("/mockup-laptop.jpg")}
            />

            {/* Laptop Screen Area: No inner navbar, Contact Us card centered */}
            <div className="device-contact__laptop-screen">
              <ContactCard
                className="device-contact__laptop-card"
                onSelectApp={(app) => setActiveApp(app)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. INTERACTIVE CONTACT MODAL
          ───────────────────────────────────────────────────────────── */}
      {activeApp && (
        <div
          className="device-contact__modal-backdrop"
          onClick={() => setActiveApp(null)}
          role="presentation"
        >
          <div
            className="device-contact__modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="device-contact__modal-close"
              aria-label="Close contact details"
              onClick={() => setActiveApp(null)}
              autoFocus
            >
              &times;
            </button>

            <div className="device-contact__modal-header">
              <div className={`device-contact__modal-icon ${activeApp.tileClass}`}>
                <activeApp.Icon />
              </div>
              <div>
                <p className="device-contact__modal-subtitle">{activeApp.subtitle}</p>
                <h3 className="device-contact__modal-title" id="contact-modal-title">
                  {activeApp.label}
                </h3>
              </div>
            </div>

            <p className="device-contact__modal-detail">{activeApp.account}</p>
            <p className="device-contact__modal-desc">{activeApp.description}</p>

            <a
              href={activeApp.actionHref}
              target="_blank"
              rel="noopener noreferrer"
              className="device-contact__modal-action"
            >
              {activeApp.actionText}{" "}
              <CiLocationArrow1 className="device-contact__modal-arrow" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

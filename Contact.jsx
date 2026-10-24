import React, { useEffect, useRef, useState } from "react";
import phoneImage from "./pexels-jakubzerdzicki-27574955.jpg";
import "./Contact.css";

const apps = [
  {
    id: "instagram",
    label: "Instagram",
    account: "Official profile not provided",
    description: "Add CODE BOOK's verified Instagram URL to enable this profile.",
    icon: "instagram",
  },
  {
    id: "facebook",
    label: "Facebook",
    account: "Official page not provided",
    description: "Add CODE BOOK's verified Facebook URL to enable this profile.",
    icon: "facebook",
  },
  {
    id: "x",
    label: "X",
    account: "Official profile not provided",
    description: "Add CODE BOOK's verified X URL to enable this profile.",
    icon: "x",
  },
  {
    id: "email",
    label: "Email",
    account: "hello@codebook.example",
    description: "This is the email currently in the project; it is a placeholder.",
    icon: "email",
    placeholder: true,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    account: "Official WhatsApp number not provided",
    description: "Add CODE BOOK's verified number to enable WhatsApp chat.",
    icon: "whatsapp",
  },
  {
    id: "phone",
    label: "Phone",
    account: "Phone number not provided",
    description: "Add CODE BOOK's phone number to enable click-to-call.",
    icon: "phone",
  },
];

function AppIcon({ type }) {
  const props = {
    "aria-hidden": true,
    className: "contact__app-icon",
    viewBox: "0 0 24 24",
    fill: "none",
  };

  switch (type) {
    case "instagram":
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.7" r="1" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...props}>
          <path d="M14 21v-8h2.7l.4-3H14V8c0-.9.3-1.5 1.6-1.5h1.7V3.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.2V10H8v3h2.6v8H14Z" />
        </svg>
      );
    case "x":
      return (
        <svg {...props}>
          <path d="M4 3h4.5L20 21h-4.5L4 3Z" />
          <path d="m20 3-7.2 8.2M4 21l7.2-8.2" />
        </svg>
      );
    case "email":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...props}>
          <path d="M20 11.7a8 8 0 0 1-11.8 7L4 20l1.3-4.1A8 8 0 1 1 20 11.7Z" />
          <path d="M9 8.5c.3-.5.6-.5.9-.5l.6 1.5c.1.2 0 .4-.2.6l-.5.6c.7 1.3 1.7 2.3 3 2.9l.6-.7c.2-.2.4-.3.7-.2l1.4.7c.3.1.4.3.3.6-.2 1-1 1.6-2 1.6-2.6-.1-6-3.3-6-5.8 0-.5.4-1.1 1.2-1.3Z" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <path d="M7 3.5h3l1.2 4-2 1.3a14 14 0 0 0 6 6l1.3-2 4 1.2v3c0 1.1-.9 2-2 2A15.5 15.5 0 0 1 5 5.5c0-1.1.9-2 2-2Z" />
        </svg>
      );
  }
}

export default function Contact() {
  const [selectedApp, setSelectedApp] = useState(null);
  const [popupPosition, setPopupPosition] = useState(null);
  const popupRef = useRef(null);
  const activeApp = apps.find((app) => app.id === selectedApp);

  useEffect(() => {
    if (!activeApp) {
      setPopupPosition(null);
      return undefined;
    }

    const updatePopupPosition = () => {
      const button = document.querySelector(`[data-contact-app="${activeApp.id}"]`);
      const popup = popupRef.current;
      if (!button || !popup) return;

      const buttonRect = button.getBoundingClientRect();
      const popupRect = popup.getBoundingClientRect();
      const margin = 16;
      const left = Math.max(
        margin,
        Math.min(
          buttonRect.left + buttonRect.width / 2 - popupRect.width / 2,
          window.innerWidth - popupRect.width - margin,
        ),
      );
      const below = buttonRect.bottom + 12;
      const top =
        below + popupRect.height <= window.innerHeight - margin
          ? below
          : Math.max(buttonRect.top - popupRect.height - 12, margin);

      setPopupPosition({ left, top });
    };

    updatePopupPosition();
    window.addEventListener("resize", updatePopupPosition);
    window.addEventListener("scroll", updatePopupPosition, true);
    return () => {
      window.removeEventListener("resize", updatePopupPosition);
      window.removeEventListener("scroll", updatePopupPosition, true);
    };
  }, [activeApp]);

  useEffect(() => {
    if (!activeApp) return undefined;
    const dismissOnEscape = (event) => {
      if (event.key === "Escape") setSelectedApp(null);
    };
    window.addEventListener("keydown", dismissOnEscape);
    return () => window.removeEventListener("keydown", dismissOnEscape);
  }, [activeApp]);

  return (
    <section className="contact" id="contact" aria-label="Contact">
      <div className="contact__image-wrap">
        <img
          className="contact__image"
          src={phoneImage}
          alt="A smartphone ready for CODE BOOK contact apps"
        />
        <div className="contact__folder" aria-label="Contact Us app folder">
          <h2 className="contact__folder-title">Contact Us</h2>
          <div className="contact__apps" aria-label="CODE BOOK contact apps">
            {apps.map((app) => (
              <button
                className={`contact__app contact__app--${app.id}`}
                data-contact-app={app.id}
                key={app.id}
                type="button"
                aria-label={`Open ${app.label} contact details`}
                aria-haspopup="dialog"
                aria-expanded={selectedApp === app.id}
                onClick={() => setSelectedApp(app.id)}
              >
                <span className="contact__app-tile">
                  <AppIcon type={app.icon} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeApp && (
        <div className="contact__dismiss-layer" onClick={() => setSelectedApp(null)}>
          <section
            className="contact__popup"
            ref={popupRef}
            style={popupPosition ? { left: popupPosition.left, top: popupPosition.top } : undefined}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-popup-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="contact__close"
              type="button"
              aria-label="Close contact details"
              onClick={() => setSelectedApp(null)}
              autoFocus
            >
              ×
            </button>
            <div className="contact__popup-heading">
              <span className="contact__popup-icon-wrap">
                <AppIcon type={activeApp.icon} />
              </span>
              <div>
                <p className="contact__popup-label">CONNECT WITH</p>
                <h3 className="contact__popup-title" id="contact-popup-title">
                  {activeApp.label}
                </h3>
              </div>
            </div>
            <p className="contact__popup-detail">{activeApp.account}</p>
            <p className="contact__popup-description">{activeApp.description}</p>
            <p className="contact__not-configured">
              No verified destination is configured for this contact yet.
            </p>
            {activeApp.placeholder && (
              <p className="contact__placeholder-note">
                Placeholder address only; a mail link is disabled until the real email is provided.
              </p>
            )}
          </section>
        </div>
      )}
    </section>
  );
}

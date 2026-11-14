import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CiLocationArrow1 } from "react-icons/ci";
import "./Services.css";

const services = [
  {
    title: "Web Development",
    description:
      "Fast, modern websites that look great on phones, tablets, and computers.",
    image: "/Website%20Development.jpg",
    imageAlt: "Website displayed on a laptop in a modern workspace",
    detail:
      "CODE BOOK designs and builds clean, fast websites that are easy to navigate and help customers find your business online.",
    capabilities: [
      "Designs that look great on phones, tablets, and desktops",
      "Fast-loading pages so visitors never have to wait",
      "Clear, simple layouts so people quickly find what they need",
      "Modern pages to showcase your products and services",
    ],
    solutions: "Business websites, landing pages, and online stores.",
  },
  {
    title: "App Development",
    description:
      "Easy-to-use mobile apps for iPhone and Android built for daily life.",
    image: "/App%20Development.jpg",
    imageAlt: "Mobile applications displayed on a smartphone",
    detail:
      "CODE BOOK builds smooth, reliable mobile apps designed to make everyday tasks simple and enjoyable for your users.",
    capabilities: [
      "Apps for both Apple iPhone and Android phones",
      "Simple, clean screens that are easy to tap and navigate",
      "Helpful features like user login, notifications, and payments",
      "Smooth and reliable performance without frustrating bugs",
    ],
    solutions: "Customer mobile apps, booking & ordering apps, and app prototypes.",
  },
  {
    title: "Custom Software Development",
    description:
      "Custom software built just for your business to save time and work faster.",
    image: "/Custom%20Software%20Development.jpg",
    imageAlt: "Software development workspace with code on a laptop",
    detail:
      "When standard ready-made apps don't fit, CODE BOOK builds custom tools made specifically for the way your business works.",
    capabilities: [
      "Easy-to-use dashboards to track your daily work and numbers",
      "Automating repetitive daily tasks to save hours of manual effort",
      "Connecting your existing tools so everything works together",
      "Software designed around your team's real daily routine",
    ],
    solutions: "Management dashboards, client portals, booking systems, and team tools.",
  },
  {
    title: "AI Solutions & Integration",
    description:
      "Smart AI helpers and chatbots that answer questions and do daily tasks automatically.",
    image: "/AI%20Solutions.jpg",
    imageAlt: "AI assistant interface displayed on a phone",
    detail:
      "CODE BOOK sets up smart AI helpers that can answer customer questions 24/7, organize information, and take care of repetitive tasks.",
    capabilities: [
      "Friendly AI chatbots that answer questions instantly",
      "Smart tools to read, summarize, and organize information",
      "Connecting smart AI tools into your daily apps and website",
      "Simple review controls so you and your team always stay in charge",
    ],
    solutions: "Customer support chatbots, automatic document helpers, and smart search.",
  },
];

function ServiceCards({ duplicate = false, onSelect }) {
  return (
    <div className="services__group" aria-hidden={duplicate || undefined}>
      {services.map((service) => (
        <article className="service-card" key={service.title}>
          <button
            className="service-card__trigger"
            type="button"
            tabIndex={duplicate ? -1 : undefined}
            aria-label={`View ${service.title} details`}
            onClick={(event) => onSelect(service, event)}
          >
            <span className="service-card__image-wrap">
              <img
                className="service-card__image"
                src={service.image}
                alt={duplicate ? "" : service.imageAlt}
                loading="eager"
                decoding="async"
              />
            </span>
            <span className="service-card__content">
              <span className="service-card__title">{service.title}</span>
              <span className="service-card__description">{service.description}</span>
            </span>
          </button>
        </article>
      ))}
    </div>
  );
}

export default function Services() {
  // Explicit Finite State Machine for Modal:
  // States: { status: "idle" } | { status: "open", service } | { status: "closing", service }
  const [modalState, setModalState] = useState({ status: "idle" });
  const activeService = modalState.status !== "idle" ? modalState.service : null;
  const isClosing = modalState.status === "closing";

  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const originRectRef = useRef(null);
  const closeTimerRef = useRef(null);
  const afterCloseRef = useRef(null);

  // Explicit Gesture State Machine:
  // States: 'idle' | 'pending_touch' | 'paused_mouse' | 'dragging'
  const gestureRef = useRef({ status: "idle" });
  const suppressClickRef = useRef(false);

  const endGesture = (event) => {
    const currentGesture = gestureRef.current;
    if (currentGesture.status === "idle") return;

    if (currentGesture.status === "dragging") {
      suppressClickRef.current = true;
      event.currentTarget.classList.remove("services__viewport--dragging");
      try {
        if (event.currentTarget.hasPointerCapture(currentGesture.pointerId)) {
          event.currentTarget.releasePointerCapture(currentGesture.pointerId);
        }
      } catch {
        // Safe fallback if pointer capture release fails
      }
    }

    if (currentGesture.track) {
      currentGesture.track.style.animationPlayState = "";
    }

    gestureRef.current = { status: "idle" };
  };

  const handlePointerDown = (event) => {
    // Only accept left clicks when modal is fully idle
    if (event.button !== 0 || modalState.status !== "idle") return;

    const track = event.currentTarget.querySelector(".services__track");
    if (!track) return;

    suppressClickRef.current = false;
    const isTouch = event.pointerType === "touch";

    let offsetX = 0;
    const duration =
      Number.parseFloat(window.getComputedStyle(track).animationDuration) * 1000 || 48000;
    const cycleWidth = track.scrollWidth / 4;
    const animation = track.getAnimations()[0];
    if (!animation) return;

    if (!isTouch) {
      const transform = window.getComputedStyle(track).transform;
      offsetX = transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m41;
      track.style.animationPlayState = "paused";
    }

    gestureRef.current = {
      status: isTouch ? "pending_touch" : "paused_mouse",
      pointerId: event.pointerId,
      pointerType: event.pointerType,
      startX: event.clientX,
      startY: event.clientY,
      offsetX,
      cycleWidth,
      duration,
      animation,
      track,
    };
  };

  const handlePointerMove = (event) => {
    const gesture = gestureRef.current;
    if (gesture.status === "idle" || gesture.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - gesture.startX;
    const deltaY = event.clientY - gesture.startY;

    // Arbitration for touch: if user is scrolling vertically, immediately abort drag
    if (gesture.status === "pending_touch") {
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        gestureRef.current = { status: "idle" };
        return;
      }
      if (Math.abs(deltaX) < 14 || Math.abs(deltaX) < Math.abs(deltaY) * 1.5) {
        return;
      }
    } else if (gesture.status === "paused_mouse" && Math.abs(deltaX) < 6) {
      return;
    }

    // Transition to 'dragging' state
    if (gesture.status !== "dragging") {
      if (gesture.status === "pending_touch") {
        const transform = window.getComputedStyle(gesture.track).transform;
        gesture.offsetX = transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m41;
        gesture.track.style.animationPlayState = "paused";
      }

      gesture.status = "dragging";

      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {
        // Safe fallback if pointer capture fails
      }
      event.currentTarget.classList.add("services__viewport--dragging");
    }

    if (event.cancelable) {
      event.preventDefault();
    }

    const width = gesture.cycleWidth;
    if (!width) return;

    const offsetX = gesture.offsetX + deltaX;
    const wrappedOffset = -(((-offsetX % width) + width) % width);
    gesture.animation.currentTime = (-wrappedOffset / width) * gesture.duration;
  };

  const openService = (service, event) => {
    // FSM transition: only allow open when idle
    if (modalState.status !== "idle") return;

    triggerRef.current = event.currentTarget;
    originRectRef.current = event.currentTarget.getBoundingClientRect();
    setModalState({ status: "open", service });
  };

  const closeService = (afterClose) => {
    // FSM transition: only allow close when open
    if (modalState.status !== "open") return;

    const currentService = modalState.service;
    afterCloseRef.current = afterClose;
    setModalState({ status: "closing", service: currentService });

    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = window.setTimeout(() => {
      setModalState({ status: "idle" });
      window.requestAnimationFrame(() => afterCloseRef.current?.());
    }, 420);
  };

  useLayoutEffect(() => {
    if (!activeService) return undefined;

    const scrollY = window.scrollY;
    const bodyStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    const dialogRect = dialogRef.current?.getBoundingClientRect();
    const originRect = originRectRef.current;
    if (dialogRect && originRect) {
      dialogRef.current.style.setProperty(
        "--focus-x",
        `${originRect.left + originRect.width / 2 - (dialogRect.left + dialogRect.width / 2)}px`,
      );
      dialogRef.current.style.setProperty(
        "--focus-y",
        `${originRect.top + originRect.height / 2 - (dialogRect.top + dialogRect.height / 2)}px`,
      );
      dialogRef.current.style.setProperty(
        "--focus-scale-x",
        `${originRect.width / dialogRect.width}`,
      );
      dialogRef.current.style.setProperty(
        "--focus-scale-y",
        `${originRect.height / dialogRect.height}`,
      );
    }
    dialogRef.current?.focus();

    return () => {
      document.body.style.position = bodyStyles.position;
      document.body.style.top = bodyStyles.top;
      document.body.style.width = bodyStyles.width;
      document.body.style.overflow = bodyStyles.overflow;
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
      });
      triggerRef.current?.focus({ preventScroll: true });
      window.clearTimeout(closeTimerRef.current);
    };
  }, [activeService]);

  useEffect(() => {
    if (!activeService) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeService();
      }

      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (event.shiftKey && document.activeElement === dialogRef.current) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeService, isClosing]);

  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <div className="services__heading">
        <h2 className="services__title" id="services-title">
          SERVICES
        </h2>
      </div>
      <div
        className="services__viewport"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endGesture}
        onPointerCancel={endGesture}
        onClickCapture={(event) => {
          if (!suppressClickRef.current) return;
          suppressClickRef.current = false;
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <div className="services__track">
          <ServiceCards onSelect={(service, event) => openService(service, event)} />
          <ServiceCards duplicate onSelect={(service, event) => openService(service, event)} />
          <ServiceCards duplicate onSelect={(service, event) => openService(service, event)} />
          <ServiceCards duplicate onSelect={(service, event) => openService(service, event)} />
        </div>
      </div>
      {activeService && createPortal(
        <div
          className={`service-focus${isClosing ? " service-focus--closing" : ""}`}
          onClick={() => closeService()}
        >
          <section
            className="service-focus__dialog"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-focus-title"
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="service-focus__visual">
              <img src={activeService.image} alt="" />
              <span className="service-focus__index">
                {String(services.indexOf(activeService) + 1).padStart(2, "0")} / 04
              </span>
            </div>
            <div className="service-focus__details">
              <button
                className="service-focus__close"
                type="button"
                aria-label="Close service details"
                onClick={() => closeService()}
              >
                <span aria-hidden="true">×</span>
              </button>
              <p className="service-focus__eyebrow">CODE BOOK / SERVICES</p>
              <h3 className="service-focus__title" id="service-focus-title">
                {activeService.title}
              </h3>
              <p className="service-focus__description">{activeService.detail}</p>
              <h4 className="service-focus__label">CAPABILITIES</h4>
              <ul className="service-focus__capabilities">
                {activeService.capabilities.map((capability) => (
                  <li key={capability}>{capability}</li>
                ))}
              </ul>
              <p className="service-focus__solutions">
                <span className="service-focus__label">TYPICAL SOLUTIONS</span>
                {activeService.solutions}
              </p>
              <a
                className="service-focus__cta"
                href="#contact"
                onClick={(event) => {
                  event.preventDefault();
                  closeService(() => {
                    window.requestAnimationFrame(() => {
                      window.requestAnimationFrame(() => {
                        const contact = document.getElementById("contact");
                        if (!contact) return;

                        contact.scrollIntoView({
                          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                            ? "instant"
                            : "smooth",
                          block: "start",
                        });
                      });
                    });
                  });
                }}
              >
                Discuss a Project{" "}
                <CiLocationArrow1 className="services-detail-link__icon" aria-hidden="true" />
              </a>
            </div>
          </section>
        </div>,
        document.body,
      )}
    </section>
  );
}

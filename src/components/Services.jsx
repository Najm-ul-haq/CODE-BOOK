import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CiLocationArrow1 } from "react-icons/ci";
import "./Services.css";

const services = [
  {
    title: "Web Development",
    description:
      "Fast, responsive websites designed to bring your business online.",
    image: "/Website%20Development.jpg",
    imageAlt: "Website displayed on a laptop in a modern workspace",
    detail:
      "CODE BOOK designs and builds responsive websites that make your service easy to understand and use.",
    capabilities: [
      "Responsive page and interface design",
      "Landing pages and product websites",
      "Accessible, clear interactions",
      "Performance-minded frontends",
    ],
    solutions: "Marketing websites, product pages, and web application interfaces.",
  },
  {
    title: "App Development",
    description: "Intuitive mobile applications built for everyday use.",
    image: "/App%20Development.jpg",
    imageAlt: "Mobile applications displayed on a smartphone",
    detail:
      "CODE BOOK shapes mobile experiences around the everyday tasks people need to complete.",
    capabilities: [
      "Mobile user flows and interface design",
      "Cross-platform application development",
      "API and service integration",
      "Usable, accessible app experiences",
    ],
    solutions: "Mobile app prototypes, application interfaces, and connected app experiences.",
  },
  {
    title: "Custom Software Development",
    description:
      "Tailored software that simplifies workflows and solves business problems.",
    image: "/Custom%20Software%20Development.jpg",
    imageAlt: "Software development workspace with code on a laptop",
    detail:
      "CODE BOOK builds purpose-fit software for teams whose processes need more than an off-the-shelf tool.",
    capabilities: [
      "Workflow and requirements mapping",
      "Internal tools and dashboards",
      "API and data-flow integration",
      "Automation for repetitive tasks",
    ],
    solutions: "Operational dashboards, internal tools, and workflow applications.",
  },
  {
    title: "AI Solutions & Integration",
    description:
      "AI-powered tools, intelligent assistants, and automation integrated into your workflow.",
    image: "/AI%20Solutions.jpg",
    imageAlt: "AI assistant interface displayed on a phone",
    detail:
      "CODE BOOK helps teams add useful AI capabilities to products and workflows, with a clear role for people in the process.",
    capabilities: [
      "AI assistant and chat experiences",
      "AI-enabled workflow concepts",
      "Model and service integrations",
      "Human review and handoff patterns",
    ],
    solutions: "Assistant prototypes, document workflows, and integrated AI features.",
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
  const [activeService, setActiveService] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const originRectRef = useRef(null);
  const closeTimerRef = useRef(null);
  const afterCloseRef = useRef(null);
  const dragRef = useRef(null);
  const suppressClickRef = useRef(false);

  const handlePointerDown = (event) => {
    if (event.button !== 0 || activeService) return;

    const track = event.currentTarget.querySelector(".services__track");
    if (!track) return;

    suppressClickRef.current = false;
    const transform = window.getComputedStyle(track).transform;
    const offsetX = transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m41;
    const duration =
      Number.parseFloat(window.getComputedStyle(track).animationDuration) * 1000 || 48000;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      offsetX,
      cycleWidth: track.scrollWidth / 4,
      duration,
      track,
      isDragging: false,
    };
    track.style.animationPlayState = "paused";
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;
    if (!drag.isDragging && Math.abs(deltaX) < 6) return;

    if (!drag.isDragging) {
      drag.isDragging = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.classList.add("services__viewport--dragging");
    }

    event.preventDefault();
    const width = drag.cycleWidth;
    if (!width) return;

    const offsetX = drag.offsetX + deltaX;
    const wrappedOffset = -(((-offsetX % width) + width) % width);
    drag.track.style.animationDelay = `${(wrappedOffset / width) * drag.duration}ms`;
  };

  const handlePointerUp = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    if (drag.isDragging) {
      suppressClickRef.current = true;
      event.currentTarget.classList.remove("services__viewport--dragging");
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    }

    drag.track.style.animationPlayState = "";
    dragRef.current = null;
  };

  const openService = (service, event) => {
    triggerRef.current = event.currentTarget;
    originRectRef.current = event.currentTarget.getBoundingClientRect();
    setActiveService(service);
    setIsClosing(false);
  };

  const closeService = (afterClose) => {
    if (!activeService || isClosing) return;
    afterCloseRef.current = afterClose;
    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      setActiveService(null);
      setIsClosing(false);
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
      window.scrollTo(0, scrollY);
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
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
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
                    document.getElementById("contact")?.scrollIntoView({
                      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                        ? "instant"
                        : "smooth",
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

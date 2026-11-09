import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CiLocationArrow1 } from "react-icons/ci";
import { projects } from "../data/projects.js";
import "./ProductsPage.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Interactive Showcase Project Card ─────────────────────────────────────── */
function ProjectCard({ project }) {
  const isLive = project.status === "Live";
  const navigate = useNavigate();
  const isTouchDevice =
    window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;

  const openProject = (event) => {
    event.preventDefault();
    const destination = project.path;

    if (isTouchDevice) {
      const cardImage = event.currentTarget.querySelector(".project-card__img");
      const bounds = cardImage.getBoundingClientRect();
      sessionStorage.setItem(
        "project-card-transition",
        JSON.stringify({ projectId: project.id, rect: bounds.toJSON(), src: project.image })
      );

      const clone = cardImage.cloneNode();
      Object.assign(clone.style, {
        position: "fixed",
        zIndex: "9999",
        left: `${bounds.left}px`,
        top: `${bounds.top}px`,
        width: `${bounds.width}px`,
        height: `${bounds.height}px`,
        borderRadius: getComputedStyle(cardImage.parentElement).borderRadius || "0",
        objectFit: "cover",
        pointerEvents: "none",
      });
      document.body.appendChild(clone);

      gsap.timeline({
        defaults: { ease: "expo.inOut" },
        onComplete: () => {
          navigate(destination);
          window.requestAnimationFrame(() => window.requestAnimationFrame(() => clone.remove()));
        },
      }).to(clone, {
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        borderRadius: 0,
        duration: 0.75,
        opacity: 0.99,
      }, 0).to(clone, {
        scale: 1.012,
        duration: 0.18,
        ease: "power1.out",
        yoyo: true,
        repeat: 1,
      });
      return;
    }

    if (!document.startViewTransition) {
      navigate(destination);
      return;
    }

    document.startViewTransition(() => navigate(destination));
  };

  return (
    <Link
      to={project.path}
      className={`project-card project-card--${project.id}`}
      aria-label={`View ${project.name} project details`}
      onClick={openProject}
    >
      {/* Light RGB Animated Border on hover (active for this specific card only) */}
      <span className="project-card__rgb-border" aria-hidden="true" />

      {/* 1. Preview Image Area (~58% height, standardized mockup scales) */}
      <div className="project-card-image">
        <div className="project-card-image__container">
          <img
            src={project.image}
            alt={project.name}
            className="project-card__img"
            style={{ viewTransitionName: `project-image-${project.id}` }}
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="project-card__overlay" aria-hidden="true" />

        {/* Floating Status & Category Badges */}
        <div className="project-card__tag-wrap">
          <span className="project-card__status-pill">
            <span
              className={`project-card__status-dot ${
                isLive ? "project-card__status-dot--live" : "project-card__status-dot--dev"
              }`}
            />
            {project.status}
          </span>
        </div>
      </div>

      {/* 2. Content Area (~42% height, p-6 padding) */}
      <div className="project-card-body">
        <div>
          <p className="project-card__category">{project.category}</p>
          <div className="project-card__title-row">
            <h2 className="project-card__name">{project.name}</h2>
            <span className="project-card__arrow" aria-hidden="true">
              <CiLocationArrow1 className="project-card__arrow-icon" />
            </span>
          </div>
        </div>
        <p className="project-card__desc">{project.description}</p>
      </div>
    </Link>
  );
}

/* ─── Project Detail View ───────────────────────────────────────────────────── */
function ProjectDetail({ project, onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="project-detail">
      <section className="project-detail__hero" aria-labelledby="project-detail-title">
        <img
          className="project-detail__image"
          src={project.image}
          alt={project.name}
          style={{ viewTransitionName: `project-image-${project.id}` }}
          loading="eager"
        />
        <div className="project-detail__image-shade" aria-hidden="true" />
        <div className="project-detail__hero-title">
          <p className="project-detail__status">
            <span className="project-detail__status-dot" />
            {project.status}
          </p>
          <h1 id="project-detail-title">{project.name}</h1>
          {project.tagline && <p className="project-detail__tagline">{project.tagline}</p>}
        </div>
        <button
          className="project-detail__back"
          type="button"
          onClick={onBack}
          aria-label="Back to products"
        >
          <span aria-hidden="true">←</span>
        </button>
      </section>

      <section className="project-detail__content">
        <div className="project-detail__lead">
          <p className="project-detail__eyebrow">THE PROJECT</p>
          <p className="project-detail__description">{project.description}</p>
        </div>

        <div className="project-detail__information">
          <article className="project-detail__block">
            <p className="project-detail__eyebrow">THE CHALLENGE</p>
            <p>{project.problem}</p>
          </article>
          <article className="project-detail__block">
            <p className="project-detail__eyebrow">WHAT IT BRINGS TOGETHER</p>
            <ul>
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>
          <article className="project-detail__block project-detail__block--status">
            <p className="project-detail__eyebrow">CURRENT STATUS</p>
            <p>{project.status}</p>
            {project.liveUrl && (
              <a
                className="project-detail__live-link"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Next Station{" "}
                <CiLocationArrow1 className="project-detail__arrow-icon" aria-hidden="true" />
              </a>
            )}
          </article>
        </div>
      </section>

      <footer className="project-detail__footer">
        <span>CODE BOOK</span>
      </footer>
    </main>
  );
}

/* ─── Main Products / Projects Page ─────────────────────────────────────────── */
export default function ProductsPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const galleryRef = useRef(null);
  const gridRef = useRef(null);
  const activeProject = projects.find((p) => p.id === projectId);

  // Always reset scroll to the very top when entering or switching views
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, [projectId]);

  // Master Lusion-inspired 3D curved split-panel expansion animation
  const runExpansionAnimation = () => {
    if (!gridRef.current) return;

    const leftPanel = gridRef.current.querySelector(".project-panel-wrapper--left");
    const rightPanel = gridRef.current.querySelector(".project-panel-wrapper--right");
    const cardImages = gridRef.current.querySelectorAll(".project-card-image");
    const cardTags = gridRef.current.querySelectorAll(".project-card__tag-wrap");
    const cardBodies = gridRef.current.querySelectorAll(".project-card-body");
    const headerTitle = document.querySelector(".projects-header__title");

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    if (headerTitle) {
      tl.fromTo(
        headerTitle,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6, clearProps: "transform,opacity" },
        0
      );
    }

    // Left Panel: starts curved inward on Y axis with horizontal tuck and backward Z depth
    if (leftPanel) {
      tl.fromTo(
        leftPanel,
        {
          x: -75,
          y: 20,
          z: -90,
          rotateY: 22,
          rotateX: 4,
          scale: 0.88,
          opacity: 0,
          transformPerspective: 1400,
          transformOrigin: "right center",
          force3D: true,
        },
        {
          x: 0,
          y: 0,
          z: 0,
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          opacity: 1,
          duration: 1.15,
          clearProps: "transform,opacity",
        },
        0.05
      );
    }

    // Right Panel: starts mirrored curved inward on Y axis with horizontal tuck and backward Z depth
    if (rightPanel) {
      tl.fromTo(
        rightPanel,
        {
          x: 75,
          y: 20,
          z: -90,
          rotateY: -22,
          rotateX: 4,
          scale: 0.88,
          opacity: 0,
          transformPerspective: 1400,
          transformOrigin: "left center",
          force3D: true,
        },
        {
          x: 0,
          y: 0,
          z: 0,
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          opacity: 1,
          duration: 1.15,
          clearProps: "transform,opacity",
        },
        0.12
      );
    }

    // Synchronized information reveal
    if (cardImages && cardImages.length) {
      tl.fromTo(
        cardImages,
        { opacity: 0.82, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 0.9, stagger: 0.08, ease: "power2.out", clearProps: "all" },
        0.15
      );
    }

    if (cardTags && cardTags.length) {
      tl.fromTo(
        cardTags,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out", clearProps: "all" },
        0.28
      );
    }

    if (cardBodies && cardBodies.length) {
      tl.fromTo(
        cardBodies,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out", clearProps: "all" },
        0.32
      );
    }
  };

  // Run on mount and on scroll
  useEffect(() => {
    if (activeProject || !gridRef.current) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      // Trigger via ScrollTrigger when section comes into view
      ScrollTrigger.create({
        trigger: galleryRef.current || gridRef.current,
        start: "top 85%",
        onEnter: () => runExpansionAnimation(),
        once: true,
      });

      // Immediate play if already in view
      const rect = (galleryRef.current || gridRef.current)?.getBoundingClientRect();
      if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
        runExpansionAnimation();
      }
    }, galleryRef);

    return () => ctx.revert();
  }, [activeProject]);

  // Interactive 3D Perspective Mouse Parallax (Signature Lusion Polish)
  const handleMouseMove = (e) => {
    if (!gridRef.current) return;
    const rect = galleryRef.current?.getBoundingClientRect();
    if (!rect) return;
    const xPercent = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const yPercent = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    gsap.to(gridRef.current, {
      rotateY: xPercent * 6,
      rotateX: -yPercent * 6,
      duration: 0.6,
      ease: "power1.out",
      transformPerspective: 1400,
    });
  };

  const handleMouseLeave = () => {
    if (!gridRef.current) return;
    gsap.to(gridRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  // Set document title
  useEffect(() => {
    if (activeProject) {
      document.title = `${activeProject.name} | CODEBOOK`;
    } else {
      document.title = "Products | CODEBOOK";
    }
  }, [activeProject]);

  const handleBack = () => {
    const transition = JSON.parse(
      sessionStorage.getItem("project-card-transition") || "null"
    );
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;

    if (isTouchDevice && transition?.rect) {
      const detailImage = document.querySelector(".project-detail__image");
      const clone = detailImage.cloneNode();
      const bounds = detailImage.getBoundingClientRect();

      Object.assign(clone.style, {
        position: "fixed",
        zIndex: "9999",
        left: `${bounds.left}px`,
        top: `${bounds.top}px`,
        width: `${bounds.width}px`,
        height: `${bounds.height}px`,
        objectFit: "cover",
        pointerEvents: "none",
      });
      document.body.appendChild(clone);

      gsap.timeline({
        defaults: { ease: "expo.inOut" },
        onStart: () => {
          navigate("/products");
        },
        onComplete: () => {
          window.requestAnimationFrame(() => {
            clone.remove();
            sessionStorage.removeItem("project-card-transition");
          });
        },
      }).to(clone, {
        left: transition.rect.left,
        top: transition.rect.top,
        width: transition.rect.width,
        height: transition.rect.height,
        borderRadius: "1.25rem",
        duration: 0.75,
      }, 0).to(clone, {
        opacity: 0.96,
        duration: 0.12,
        ease: "power1.out",
      });
      return;
    }

    if (!document.startViewTransition) {
      navigate("/products");
      return;
    }

    document.startViewTransition(() => navigate("/products"));
  };

  if (activeProject) {
    return <ProjectDetail project={activeProject} onBack={handleBack} />;
  }

  return (
    <main className="projects-page">
      {/* Background ambient lighting */}
      <div className="projects-page__ambient" aria-hidden="true" />

      <section
        className="projects-gallery"
        ref={galleryRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Header */}
        <header className="projects-header">
          <div className="projects-header__top">
            <h1 className="projects-header__title">PRODUCTS</h1>
            <button
              type="button"
              className="projects-header__expand-trigger"
              onClick={runExpansionAnimation}
              aria-label="Replay 3D expanding panel animation"
            >
              <span className="projects-header__expand-dot" />
              <span>3D EXPAND</span>
            </button>
          </div>
        </header>

        {/* 2-Column Responsive Showcase Grid */}
        <div className="projects-grid" ref={gridRef}>
          {projects.map((project, index) => (
            <div
              className={`project-panel-wrapper project-panel-wrapper--${
                index % 2 === 0 ? "left" : "right"
              } project-panel-wrapper--${project.id}`}
              key={project.id}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </section>

      <footer className="projects-footer">
        <span>CODE BOOK</span>
      </footer>
    </main>
  );
}

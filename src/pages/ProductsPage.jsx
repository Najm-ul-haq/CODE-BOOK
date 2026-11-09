import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CiLocationArrow1 } from "react-icons/ci";
import { projects } from "../data/projects.js";
import "./ProductsPage.css";

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
  const gridRef = useRef(null);
  const activeProject = projects.find((p) => p.id === projectId);

  // Always reset scroll to the very top when entering or switching views
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, [projectId]);

  // Smooth entrance animation for the cards on page load
  useEffect(() => {
    if (activeProject || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".project-card");
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 16,
        force3D: true,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "transform,opacity",
      }
    );
  }, [activeProject]);

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

      <section className="projects-gallery">
        {/* Header */}
        <header className="projects-header">
          <div className="projects-header__top">
            <h1 className="projects-header__title">PRODUCTS</h1>
          </div>
        </header>

        {/* 2-Column Responsive Showcase Grid */}
        <div className="projects-grid" ref={gridRef}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <footer className="projects-footer">
        <span>CODE BOOK</span>
      </footer>
    </main>
  );
}

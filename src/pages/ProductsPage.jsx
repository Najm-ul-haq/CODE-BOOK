import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CiLocationArrow1 } from "react-icons/ci";
import { projects } from "../data/projects.js";
import "./ProductsPage.css";

/* ─── Interactive Showcase Project Card ─────────────────────────────────────── */
function ProjectCard({ project, index }) {
  const isLive = project.status === "Live";

  return (
    <Link
      to={project.path}
      className={`project-card project-card--${project.id}`}
      aria-label={`View ${project.name} project details`}
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
          <span className="project-card__status-pill">0{index + 1}</span>
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
          loading="eager"
        />
        <div className="project-detail__image-shade" aria-hidden="true" />
        <div className="project-detail__hero-meta">
          <span>CODE BOOK / PROJECT {project.id === "next-station" ? "01" : "02"}</span>
          <span>{project.category}</span>
        </div>
        <div className="project-detail__hero-title">
          <p className="project-detail__status">
            <span className="project-detail__status-dot" />
            {project.status}
          </p>
          <h1 id="project-detail-title">{project.name}</h1>
          {project.tagline && <p className="project-detail__tagline">{project.tagline}</p>}
        </div>
        <button className="project-detail__back" type="button" onClick={onBack}>
          <span aria-hidden="true">←</span> ALL PROJECTS
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
        <span>IDEAS INTO REALITY</span>
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
        y: 35,
        scale: 0.97,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
      }
    );
  }, [activeProject]);

  // Set document title
  useEffect(() => {
    if (activeProject) {
      document.title = `${activeProject.name} | CODEBOOK`;
    } else {
      document.title = "Projects | CODEBOOK";
    }
  }, [activeProject]);

  const handleBack = () => {
    navigate("/products");
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
            <h1 className="projects-header__title">PROJECTS</h1>
            <span className="projects-header__badge">
              {projects.length} FEATURED PLATFORMS
            </span>
          </div>
        </header>

        {/* 2-Column Responsive Showcase Grid */}
        <div className="projects-grid" ref={gridRef}>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      <footer className="projects-footer">
        <span>CODE BOOK</span>
        <span>IDEAS INTO REALITY</span>
      </footer>
    </main>
  );
}

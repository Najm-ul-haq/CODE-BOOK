import React from "react";
import "./Services.css";

const services = [
  {
    title: "Web Development",
    description:
      "Fast, responsive websites designed to bring your business online.",
    image: "./Website%20Development.jpg",
    imageAlt: "Website displayed on a laptop in a modern workspace",
  },
  {
    title: "App Development",
    description: "Intuitive mobile applications built for everyday use.",
    image: "./App%20Development.jpg",
    imageAlt: "Mobile applications displayed on a smartphone",
  },
  {
    title: "Custom Software Development",
    description:
      "Tailored software that simplifies workflows and solves business problems.",
    image: "./Custom%20Software%20Development.jpg",
    imageAlt: "Software development workspace with code on a laptop",
  },
  {
    title: "AI Solutions & Integration",
    description:
      "AI-powered tools, intelligent assistants, and automation integrated into your workflow.",
    image: "./AI%20Solutions.jpg",
    imageAlt: "AI assistant interface displayed on a phone",
  },
];

function ServiceCards({ duplicate = false }) {
  return (
    <div className="services__group" aria-hidden={duplicate || undefined}>
      {services.map((service) => (
        <article className="service-card" key={service.title}>
          <div className="service-card__image-wrap">
            <img
              className="service-card__image"
              src={service.image}
              alt={duplicate ? "" : service.imageAlt}
              loading="lazy"
            />
          </div>
          <div className="service-card__content">
            <h3 className="service-card__title">{service.title}</h3>
            <p className="service-card__description">{service.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function Services() {
  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <div className="services__heading">
        <h2 className="services__title" id="services-title">
          SERVICES
        </h2>
      </div>
      <div className="services__viewport">
        <div className="services__track">
          <ServiceCards />
          <ServiceCards duplicate />
        </div>
      </div>
    </section>
  );
}

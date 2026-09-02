import { useEffect } from "react";
import { getServiceDetails } from "../data/serviceDetails";

function Arrow() {
  return <span className="arrow">↗</span>;
}

function ServicePage({
  service,
  services,
  onBack,
  onServiceSelect,
  onStartProject,
}) {
  const details = getServiceDetails(service.slug);

  const relatedServices = services
    .filter(
      (item) =>
        item.verticalSlug === service.verticalSlug &&
        item.slug !== service.slug
    )
    .slice(0, 3);

  const capabilities = details?.capabilities || [
    "Strategy and concept development",
    "Audience-focused planning",
    "Creative development and execution",
    "Measurement and optimisation",
  ];

  const process = details?.process || [
    {
      number: "01",
      title: "Understand",
      text: "We begin with the objective, audience, context and business requirement behind the brief.",
    },
    {
      number: "02",
      title: "Define",
      text: "We shape the core idea and establish what success should look like.",
    },
    {
      number: "03",
      title: "Create",
      text: "Strategy moves into design, content, production or development with a clear execution plan.",
    },
    {
      number: "04",
      title: "Deliver",
      text: "The work is refined, delivered and reviewed with attention to quality, consistency and outcomes.",
    },
  ];

  useEffect(() => {
    document.title = `${service.title} | Planning Labs`;

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

    return () => {
      document.title = "Planning Labs";
    };
  }, [service.title]);

  return (
    <main className="service-route">
      {/* Navigation */}
      <nav className="service-route-nav">
        <button
          type="button"
          className="service-route-brand"
          onClick={onBack}
          aria-label="Back to Planning Labs"
        >
          <span>Planning</span>
          <strong>Labs</strong>
          <i>⌬</i>
        </button>

        <button
          type="button"
          className="service-route-back"
          onClick={onBack}
        >
          ← Back
        </button>
      </nav>

      {/* Hero */}
      <section className="service-route-hero">
        <img src={service.image} alt={service.title} />

        <div className="service-route-hero-overlay" />

        <div className="service-route-hero-content">
          <span>
            {details?.eyebrow ||
              `${service.number} — ${service.vertical}`}
          </span>

          <h1>{service.title}</h1>

          <p>{details?.overview || service.description}</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="service-route-body">
        {/* Introduction */}
        <section className="service-route-intro">
          <div>
            <span className="service-route-label">THE SERVICE</span>

            <h2>
              Built around
              <br />
              <span>the right idea.</span>
            </h2>
          </div>

          <p>
            {details?.overview || service.description} Our approach brings
            strategy, creativity and execution together so the service can
            work as part of a wider marketing ecosystem.
          </p>
        </section>

        {/* Capabilities */}
        <section className="service-route-block">
          <div className="service-route-block-heading">
            <span className="service-route-label">WHAT WE DO</span>

            <h2>
              From thinking
              <br />
              <span>to execution.</span>
            </h2>
          </div>

          <div className="service-capability-grid">
            {capabilities.map((item, index) => (
              <article key={item}>
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="service-route-process">
          <div className="service-route-block-heading">
            <span className="service-route-label">OUR APPROACH</span>

            <h2>
              A clear path
              <br />
              <span>from brief to build.</span>
            </h2>
          </div>

          <div className="service-process-list">
            {process.map((step, index) => {
              const processStep =
                typeof step === "string"
                  ? {
                      number: String(index + 1).padStart(2, "0"),
                      title: step,
                      text: "",
                    }
                  : step;

              return (
                <article key={processStep.number}>
                  <span>{processStep.number}</span>

                  <div>
                    <h3>{processStep.title}</h3>

                    {processStep.text && (
                      <p>{processStep.text}</p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Related Services */}
        <section className="service-route-related">
          <div className="service-route-related-heading">
            <div>
              <span className="service-route-label">
                EXPLORE MORE
              </span>

              <h2>
                Related
                <br />
                <span>services.</span>
              </h2>
            </div>

            <button
              type="button"
              className="service-route-outline"
              onClick={onBack}
            >
              All Services <Arrow />
            </button>
          </div>

          <div className="service-related-grid">
            {relatedServices.map((item) => (
              <button
                type="button"
                key={item.slug}
                className="service-related-card"
                onClick={() => onServiceSelect(item)}
              >
                <div>
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />

                  <span>{item.number}</span>
                </div>

                <small>{item.vertical}</small>

                <strong>{item.title}</strong>

                <span className="service-related-arrow">
                  <Arrow />
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="service-route-cta">
          <span className="service-route-label">
            START A PROJECT
          </span>

          <h2>
            Have a brief?
            <br />
            <span>Let's build it.</span>
          </h2>

          <button
            type="button"
            className="primary-button"
            onClick={onStartProject}
          >
            Tell Us About It <Arrow />
          </button>
        </section>
      </div>
    </main>
  );
}

export default ServicePage;
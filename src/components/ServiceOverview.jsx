import { useEffect } from "react";

const Arrow = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M5 12H19M13 6L19 12L13 18"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ServiceOverview = ({
  vertical,
  services,
  onBack,
  onServiceSelect,
  onStartProject,
}) => {
  const isExperiential = vertical === "experiential";

  const title = isExperiential
    ? "Experiential Marketing"
    : "Digital Marketing";

  const eyebrow = isExperiential
    ? "01 — EXPERIENTIAL"
    : "02 — DIGITAL";

  const intro = isExperiential
    ? "Creating meaningful brand experiences through strategy, creativity, events, activations and seamless execution."
    : "Building connected digital experiences through strategy, creative communication, content, performance and technology.";

  useEffect(() => {
    document.title = `${title} | Planning Labs`;

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

    return () => {
      document.title = "Planning Labs";
    };
  }, [title]);

  const verticalServices = services.filter(
    (service) => service.verticalSlug === vertical
  );

  return (
    <main className="service-overview">
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
      <section className="service-overview-hero">
        <div className="service-overview-hero-inner">
          <span className="service-route-label">{eyebrow}</span>

          <h1>{title}</h1>

          <p>{intro}</p>
        </div>
      </section>

      {/* Services */}
      <section className="service-overview-content">
        <div className="service-overview-heading">
          <div>
            <span className="service-route-label">OUR SERVICES</span>

            <h2>
              Explore our
              <br />
              <span>capabilities.</span>
            </h2>
          </div>

          <p>
            A focused set of capabilities designed to help brands create
            stronger experiences, sharper communication and measurable impact.
          </p>
        </div>

        <div className="service-overview-grid">
          {verticalServices.map((service) => (
            <button
              type="button"
              key={service.slug}
              className="service-overview-card"
              onClick={() => onServiceSelect(service)}
            >
              <div className="service-overview-image">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                />

                <span>{service.number}</span>
              </div>

              <div className="service-overview-card-content">
                <div className="service-overview-card-top">
                  <small>{service.vertical}</small>

                  <span className="service-overview-arrow">
                    <Arrow />
                  </span>
                </div>

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <span className="service-overview-explore">
                  Explore service <Arrow />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="service-route-cta service-overview-cta">
        <div>
          <span className="service-route-label">START A PROJECT</span>

          <h2>
            Have a brief?
            <br />
            <span>Let's build it.</span>
          </h2>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={onStartProject}
        >
          Tell Us About It <Arrow />
        </button>
      </section>
    </main>
  );
};

export default ServiceOverview;
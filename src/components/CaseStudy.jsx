import { useEffect } from "react";

const caseStudyContent = {
  1: {
    eyebrow: "EXPERIENTIAL / BRAND ACTIVATION",
    overviewTitle: ["From idea", "to experience."],
    overview:
      "A concept-led experiential direction bringing strategy, spatial thinking and audience engagement together. This presentation is structured as a reusable case-study template for future approved Planning Labs work.",
    challenge:
      "Create an experience that gives a brand a clear physical presence while keeping the audience journey simple, engaging and memorable.",
    approach:
      "We begin with the central brand idea, translate it into a human journey, then shape the environment, interactions and communication around that idea.",
    execution:
      "The concept combines experience design, visual storytelling, production thinking and audience touchpoints into one connected execution framework.",
    outcome:
      "A scalable experience framework that can be adapted to different venues, audiences and campaign requirements once final project details are supplied.",
  },

  2: {
    eyebrow: "EXPERIENTIAL / EVENT EXPERIENCE",
    overviewTitle: ["Moments", "built around brands."],
    overview:
      "An immersive event experience concept designed around audience interaction, visual storytelling and memorable brand moments.",
    challenge:
      "Build an event environment where the brand remains central without making the experience feel overly promotional or disconnected from the audience.",
    approach:
      "We map the audience journey from arrival to interaction and departure, identifying the moments where design, content and brand messaging can work together.",
    execution:
      "Experience design, spatial planning, fabrication and content are treated as connected layers so every touchpoint supports the same story.",
    outcome:
      "A flexible event framework designed to create stronger interaction and a more consistent brand experience across the venue.",
  },

  3: {
    eyebrow: "DIGITAL / DIGITAL EXPERIENCE",
    overviewTitle: ["Digital ideas", "that connect."],
    overview:
      "A digital-first concept combining creative direction, content and audience-focused communication across digital touchpoints.",
    challenge:
      "Create a digital experience that communicates a clear idea quickly while giving audiences meaningful reasons to engage with the brand.",
    approach:
      "We connect strategy, content and creative direction around a single communication idea, then adapt it to the behaviour of each digital touchpoint.",
    execution:
      "Content, creative design and campaign touchpoints are developed as one system to maintain consistency while allowing platform-specific execution.",
    outcome:
      "A reusable digital campaign structure that can be expanded with approved content, media plans and performance data during final production.",
  },

  4: {
    eyebrow: "DIGITAL / CREATIVE CAMPAIGN",
    overviewTitle: ["Ideas designed", "to travel."],
    overview:
      "A creative campaign concept built to translate a central brand idea across multiple digital touchpoints.",
    challenge:
      "Develop a campaign idea that remains recognisable across different formats, platforms and audience contexts.",
    approach:
      "We establish a strong creative platform first, then build a modular visual and content language around it.",
    execution:
      "Creative design, social formats and digital content are structured into a flexible system that can scale from individual posts to larger campaign assets.",
    outcome:
      "A campaign framework designed for consistent storytelling across multiple digital channels.",
  },

  5: {
    eyebrow: "EXPERIENTIAL / EXHIBITION",
    overviewTitle: ["Spaces that", "start conversations."],
    overview:
      "A spatial experience concept focused on creating a clear, engaging journey between people and a brand.",
    challenge:
      "Use limited physical space effectively while making the brand easy to discover, understand and interact with.",
    approach:
      "We organise the space around audience movement, visibility and interaction rather than treating the exhibition as a collection of isolated elements.",
    execution:
      "Spatial design, exhibition graphics, visitor touchpoints and production considerations are brought together into a unified environment.",
    outcome:
      "A clear exhibition framework that can be developed further with approved brand guidelines, floor plans and production specifications.",
  },

  6: {
    eyebrow: "DIGITAL / CONTENT & CAMPAIGN",
    overviewTitle: ["Stories made", "for attention."],
    overview:
      "A content-led digital concept focused on visual storytelling, engagement and consistent brand communication.",
    challenge:
      "Create content that earns attention quickly while still building a recognisable and coherent brand story over time.",
    approach:
      "We define the story first, then create a visual language and content structure that can support different formats and publishing moments.",
    execution:
      "Creative direction, content creation and campaign assets are developed as a connected content system rather than isolated pieces.",
    outcome:
      "A scalable content framework designed to support consistent storytelling across ongoing digital communication.",
  },
};

function Arrow() {
  return <span className="arrow">↗</span>;
}

function CaseStudy({
  project,
  projects,
  onBack,
  onProjectSelect,
  onStartProject,
}) {
  const content = caseStudyContent[project.id] || caseStudyContent[1];

  const relatedProjects = projects
    .filter((item) => item.id !== project.id)
    .slice(0, 3);

  useEffect(() => {
    document.title = `${project.title} | Planning Labs`;

    window.scrollTo(0, 0);

    return () => {
      document.title = "Planning Labs";
    };
  }, [project.title]);

  return (
    <div className="case-study-route">
      <header className="case-study-nav">
        <button className="case-study-brand" onClick={onBack}>
          <span>Planning</span>
          <strong>Labs</strong>
          <i>⌬</i>
        </button>

        <button className="case-study-back" onClick={onBack}>
          ← Back to Our Work
        </button>
      </header>

      <main>
        {/* CASE STUDY HERO */}
        <section className="case-study-hero">
          <img src={project.image} alt={project.title} />

          <div className="case-study-hero-overlay" />

          <div className="case-study-hero-content">
            <span>
              {project.number} / {project.category}
            </span>

            <h1>{project.title}</h1>

            <p>{content.eyebrow}</p>
          </div>
        </section>

        {/* CASE STUDY BODY */}
        <section className="case-study-body">
          {/* OVERVIEW */}
          <div className="case-study-intro">
            <div>
              <span className="case-study-label">PROJECT OVERVIEW</span>

              <h2>
                {content.overviewTitle[0]}
                <br />
                <span>{content.overviewTitle[1]}</span>
              </h2>
            </div>

            <p>{content.overview}</p>
          </div>

          {/* PROJECT DETAILS */}
          <div className="case-study-details">
            <div>
              <span>CLIENT</span>
              <strong>{project.client}</strong>
            </div>

            <div>
              <span>CATEGORY</span>
              <strong>{project.category}</strong>
            </div>

            <div>
              <span>LOCATION</span>
              <strong>{project.location}</strong>
            </div>

            <div>
              <span>YEAR</span>
              <strong>{project.year}</strong>
            </div>
          </div>

          {/* STORY */}
          <div className="case-study-story">
            <article>
              <span>01 — THE CHALLENGE</span>

              <h3>What needed to be solved.</h3>

              <p>{content.challenge}</p>
            </article>

            <article>
              <span>02 — THE APPROACH</span>

              <h3>Start with the idea.</h3>

              <p>{content.approach}</p>
            </article>

            <article>
              <span>03 — EXECUTION</span>

              <h3>Make every touchpoint count.</h3>

              <p>{content.execution}</p>
            </article>

            <article>
              <span>04 — OUTCOME</span>

              <h3>Built to move forward.</h3>

              <p>{content.outcome}</p>
            </article>
          </div>

          {/* PROJECT VISUALS */}
          <div className="case-study-gallery">
            <div className="case-gallery-large">
              <img
                src={project.image}
                alt=""
                loading="lazy"
              />
            </div>

            <div className="case-gallery-small">
              <img
                src={project.image}
                alt=""
                loading="lazy"
              />

              <div className="case-gallery-copy">
                <span>CAPABILITIES</span>

                <div>
                  {project.services.map((service) => (
                    <span key={service}>{service}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RELATED WORK */}
          <div className="case-study-related">
            <div className="case-study-related-heading">
              <div>
                <span className="case-study-label">
                  KEEP EXPLORING
                </span>

                <h2>
                  Related
                  <br />
                  <span>work.</span>
                </h2>
              </div>

              <button
                className="case-study-outline"
                onClick={onBack}
              >
                View All Work <Arrow />
              </button>
            </div>

            <div className="case-related-grid">
              {relatedProjects.map((item) => (
                <button
                  className="case-related-card"
                  key={item.id}
                  onClick={() => onProjectSelect(item)}
                >
                  <div>
                    <img
                      src={item.image}
                      alt=""
                      loading="lazy"
                    />

                    <span>{item.number}</span>
                  </div>

                  <small>
                    {item.category} / {item.year}
                  </small>

                  <strong>{item.title}</strong>
                </button>
              ))}
            </div>
          </div>

          {/* FINAL CTA */}
          <section className="case-study-cta">
            <span className="case-study-label">
              HAVE A PROJECT IN MIND?
            </span>

            <h2>
              Let&apos;s create
              <br />
              <span>something memorable.</span>
            </h2>

            <button
              className="primary-button"
              onClick={onStartProject}
            >
              Start a Project <Arrow />
            </button>
          </section>
        </section>
      </main>
    </div>
  );
}

export default CaseStudy;
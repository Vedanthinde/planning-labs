import { useEffect, useMemo, useState } from "react";
import "./Insights.css";

function Arrow() {
  return <span className="arrow">↗</span>;
}

function Insights({
  insights = [],
  onBack,
  onInsightSelect,
  onStartProject,
}) {
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    document.title = "Insights | Planning Labs";
    window.scrollTo(0, 0);

    return () => {
      document.title = "Planning Labs";
    };
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        insights
          .map((insight) => insight.category)
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [insights]);

  const filteredInsights =
    activeCategory === "All"
      ? insights
      : insights.filter(
          (insight) => insight.category === activeCategory
        );

  const featuredInsight =
    filteredInsights.find(
      (insight) => insight.featured
    ) ||
    filteredInsights[0] ||
    null;

  const remainingInsights = filteredInsights.filter(
    (insight) =>
      insight.slug !== featuredInsight?.slug
  );

  const handleInsightKeyDown = (event, insight) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      onInsightSelect(insight);
    }
  };

  return (
    <div className="insights-page">
      {/* HEADER */}
      <header className="insights-header">
        <button
          className="insights-brand"
          onClick={onBack}
          aria-label="Planning Labs home"
        >
          <span>Planning</span>
          <strong>Labs</strong>
          <i>⌬</i>
        </button>

        <div className="insights-header-actions">
          <button
            className="insights-back"
            onClick={onBack}
          >
            ← Back Home
          </button>

          <button
            className="insights-project-button"
            onClick={onStartProject}
          >
            Start a Project <Arrow />
          </button>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="insights-hero">
          <div className="insights-hero-label">
            08 — INSIGHTS
          </div>

          <div className="insights-hero-grid">
            <div>
              <p className="insights-kicker">
                IDEAS · PERSPECTIVES · KNOWLEDGE
              </p>

              <h1>
                Ideas worth
                <br />
                <span>exploring.</span>
              </h1>
            </div>

            <div className="insights-hero-copy">
              <p>
                Perspectives on experiential marketing,
                digital experiences, creativity, technology
                and the ideas shaping modern brands.
              </p>
            </div>
          </div>
        </section>

        {/* CATEGORY FILTER */}
        <section className="insights-filter-section">
          <div
            className="insights-filters"
            role="tablist"
            aria-label="Insight categories"
          >
            {categories.map((category) => (
              <button
                key={category}
                role="tab"
                aria-selected={
                  activeCategory === category
                }
                className={
                  activeCategory === category
                    ? "insight-filter-active"
                    : ""
                }
                onClick={() =>
                  setActiveCategory(category)
                }
              >
                {category}

                <span>
                  {category === "All"
                    ? insights.length
                    : insights.filter(
                        (insight) =>
                          insight.category === category
                      ).length}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* FEATURED INSIGHT */}
        {featuredInsight && (
          <section className="featured-insight-section">
            <div className="insights-section-label">
              FEATURED INSIGHT
            </div>

            <article
              className="featured-insight"
              onClick={() =>
                onInsightSelect(featuredInsight)
              }
              onKeyDown={(event) =>
                handleInsightKeyDown(
                  event,
                  featuredInsight
                )
              }
              tabIndex="0"
              role="button"
              aria-label={`Read ${featuredInsight.title}`}
            >
              <div className="featured-insight-image">
                <img
                  src={featuredInsight.image}
                  alt={featuredInsight.title}
                  loading="eager"
                />

                <div className="featured-image-overlay" />

                <span className="featured-number">
                  {featuredInsight.number}
                </span>

                <span className="featured-category">
                  {featuredInsight.category}
                </span>

                <div className="featured-read">
                  <span>Read Article</span>

                  <strong>
                    <Arrow />
                  </strong>
                </div>
              </div>

              <div className="featured-insight-content">
                <div className="featured-meta">
                  <span>
                    {featuredInsight.category}
                  </span>

                  <span>
                    {featuredInsight.readTime ||
                      "INSIGHT"}
                  </span>
                </div>

                <h2>{featuredInsight.title}</h2>

                <p>
                  {featuredInsight.excerpt}
                </p>

                <button
                  className="insights-text-button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onInsightSelect(
                      featuredInsight
                    );
                  }}
                >
                  Read Full Article <Arrow />
                </button>
              </div>
            </article>
          </section>
        )}

        {/* LATEST INSIGHTS */}
        <section className="all-insights-section">
          <div className="all-insights-heading">
            <div>
              <div className="insights-section-label">
                LATEST THINKING
              </div>

              <h2>
                Explore our
                <br />
                <span>insights.</span>
              </h2>
            </div>

            <span className="insights-count">
              {filteredInsights.length
                .toString()
                .padStart(2, "0")}{" "}
              ARTICLES
            </span>
          </div>

          {remainingInsights.length > 0 ? (
            <div className="insights-list-grid">
              {remainingInsights.map(
                (insight, index) => (
                  <article
                    className="insight-list-card"
                    key={insight.slug}
                    onClick={() =>
                      onInsightSelect(insight)
                    }
                    onKeyDown={(event) =>
                      handleInsightKeyDown(
                        event,
                        insight
                      )
                    }
                    tabIndex="0"
                    role="button"
                    aria-label={`Read ${insight.title}`}
                  >
                    <div className="insight-list-image">
                      <img
                        src={insight.image}
                        alt={insight.title}
                        loading={
                          index > 2
                            ? "lazy"
                            : "eager"
                        }
                      />

                      <span>
                        {insight.number}
                      </span>
                    </div>

                    <div className="insight-list-meta">
                      <span>
                        {insight.category}
                      </span>

                      <span>
                        {insight.date ||
                          "INSIGHTS"}
                      </span>
                    </div>

                    <h3>{insight.title}</h3>

                    <p>
                      {insight.excerpt}
                    </p>

                    <button
                      className="insights-text-button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onInsightSelect(insight);
                      }}
                    >
                      Read Article <Arrow />
                    </button>
                  </article>
                )
              )}
            </div>
          ) : (
            <div className="insights-empty">
              <h3>No insights found.</h3>

              <p>
                There are currently no articles in
                this category.
              </p>

              <button
                className="insights-text-button"
                onClick={() =>
                  setActiveCategory("All")
                }
              >
                View All Insights <Arrow />
              </button>
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="insights-cta">
          <div className="insights-cta-label">
            HAVE AN IDEA?
          </div>

          <div className="insights-cta-grid">
            <h2>
              Let's turn an
              <br />
              <span>idea into impact.</span>
            </h2>

            <div>
              <p>
                Have a campaign, experience or digital
                project in mind? Let's talk about what
                we can create together.
              </p>

              <button
                className="insights-cta-button"
                onClick={onStartProject}
              >
                Start a Project <Arrow />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="insights-footer">
        <div className="insights-footer-brand">
          <button
            className="insights-brand"
            onClick={onBack}
            aria-label="Planning Labs home"
          >
            <span>Planning</span>
            <strong>Labs</strong>
            <i>⌬</i>
          </button>

          <p>
            Experiential and digital marketing solutions
            built around ideas, people and impact.
          </p>
        </div>

        <div className="insights-footer-bottom">
          <span>
            © {new Date().getFullYear()} Planning Labs.
            All rights reserved.
          </span>

          <button onClick={onBack}>
            Back to Planning Labs ↗
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Insights;
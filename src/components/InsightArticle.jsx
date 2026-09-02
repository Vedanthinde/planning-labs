import { useEffect, useMemo } from "react";
import "./Insights.css";

function Arrow() {
  return <span className="arrow">↗</span>;
}

function InsightArticle({
  insight,
  insights = [],
  onBack,
  onInsightSelect,
  onStartProject,
}) {
  useEffect(() => {
    if (insight?.title) {
      document.title = `${insight.title} | Planning Labs`;
    }

    window.scrollTo(0, 0);

    return () => {
      document.title = "Planning Labs";
    };
  }, [insight]);

  const relatedInsights = useMemo(() => {
    if (!insight) return [];

    const sameCategory = insights.filter(
      (item) =>
        item.slug !== insight.slug &&
        item.category === insight.category
    );

    const otherInsights = insights.filter(
      (item) =>
        item.slug !== insight.slug &&
        item.category !== insight.category
    );

    return [...sameCategory, ...otherInsights].slice(0, 3);
  }, [insight, insights]);

  if (!insight) {
    return (
      <div className="insight-article-page">
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

          <button
            className="insights-back"
            onClick={onBack}
          >
            ← Back Home
          </button>
        </header>

        <main className="insight-not-found">
          <span className="insights-section-label">
            INSIGHT
          </span>

          <h1>Article not found.</h1>

          <p>
            The insight you are looking for could not be
            found.
          </p>

          <button
            className="insights-cta-button"
            onClick={onBack}
          >
            Back to Insights <Arrow />
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="insight-article-page">
      {/* HEADER */}
      <header className="insights-header">
        <button
          className="insights-brand"
          onClick={onBack}
          aria-label="Back to Insights"
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
            ← Back to Insights
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
        {/* ARTICLE HERO */}
        <section className="article-hero">
          <div className="article-hero-top">
            <button
              className="article-back-button"
              onClick={onBack}
            >
              ← All Insights
            </button>

            <span className="article-number">
              {insight.number}
            </span>
          </div>

          <div className="article-hero-grid">
            <div className="article-hero-copy">
              <div className="article-category">
                {insight.category}
              </div>

              <h1>{insight.title}</h1>

              <p className="article-excerpt">
                {insight.excerpt}
              </p>

              <div className="article-meta">
                <span>
                  {insight.date || "INSIGHTS"}
                </span>

                <span>
                  {insight.readTime ||
                    "5 MIN READ"}
                </span>

                <span>
                  {insight.author ||
                    "Planning Labs"}
                </span>
              </div>
            </div>

            <div className="article-hero-image">
              <img
                src={insight.image}
                alt={insight.title}
              />
            </div>
          </div>
        </section>

        {/* ARTICLE CONTENT */}
        <section className="article-content-section">
          <div className="article-content-layout">
            <aside className="article-sidebar">
              <span className="article-sidebar-label">
                IN THIS ARTICLE
              </span>

              <div className="article-sidebar-line" />

              {insight.content?.map(
                (section, index) => (
                  <span key={section.heading}>
                    {String(index + 1).padStart(2, "0")}{" "}
                    {section.heading}
                  </span>
                )
              )}
            </aside>

            <article className="article-content">
              {insight.content?.map(
                (section, index) => (
                  <section
                    className="article-content-block"
                    key={section.heading}
                  >
                    <span className="article-block-number">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <div>
                      <h2>{section.heading}</h2>

                      {section.paragraphs?.map(
                        (paragraph, paragraphIndex) => (
                          <p
                            key={`${section.heading}-${paragraphIndex}`}
                          >
                            {paragraph}
                          </p>
                        )
                      )}
                    </div>
                  </section>
                )
              )}
            </article>
          </div>
        </section>

        {/* ARTICLE CTA */}
        <section className="article-project-cta">
          <div className="article-project-label">
            HAVE A PROJECT IN MIND?
          </div>

          <div className="article-project-grid">
            <h2>
              Let's create
              <br />
              <span>something meaningful.</span>
            </h2>

            <div>
              <p>
                Have an experiential, digital or creative
                project you would like to discuss?
                Tell us what you're planning.
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

        {/* RELATED INSIGHTS */}
        {relatedInsights.length > 0 && (
          <section className="related-insights-section">
            <div className="related-insights-heading">
              <div>
                <span className="insights-section-label">
                  KEEP EXPLORING
                </span>

                <h2>
                  More ideas
                  <br />
                  <span>to explore.</span>
                </h2>
              </div>

              <button
                className="insights-text-button"
                onClick={onBack}
              >
                View All Insights <Arrow />
              </button>
            </div>

            <div className="related-insights-grid">
              {relatedInsights.map(
                (relatedInsight) => (
                  <article
                    className="related-insight-card"
                    key={relatedInsight.slug}
                    onClick={() =>
                      onInsightSelect(
                        relatedInsight
                      )
                    }
                    tabIndex="0"
                    role="button"
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter" ||
                        event.key === " "
                      ) {
                        event.preventDefault();

                        onInsightSelect(
                          relatedInsight
                        );
                      }
                    }}
                    aria-label={`Read ${relatedInsight.title}`}
                  >
                    <div className="related-insight-image">
                      <img
                        src={relatedInsight.image}
                        alt={relatedInsight.title}
                        loading="lazy"
                      />

                      <span>
                        {relatedInsight.number}
                      </span>
                    </div>

                    <div className="related-insight-meta">
                      <span>
                        {relatedInsight.category}
                      </span>

                      <span>
                        {relatedInsight.readTime ||
                          "INSIGHT"}
                      </span>
                    </div>

                    <h3>
                      {relatedInsight.title}
                    </h3>

                    <p>
                      {relatedInsight.excerpt}
                    </p>

                    <button
                      className="insights-text-button"
                      onClick={(event) => {
                        event.stopPropagation();

                        onInsightSelect(
                          relatedInsight
                        );
                      }}
                    >
                      Read Article <Arrow />
                    </button>
                  </article>
                )
              )}
            </div>
          </section>
        )}
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
            Back to Insights ↗
          </button>
        </div>
      </footer>
    </div>
  );
}

export default InsightArticle;
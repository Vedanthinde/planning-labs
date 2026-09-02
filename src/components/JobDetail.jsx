import { useEffect } from "react";
import "./Careers.css";

function Arrow() {
  return <span className="career-arrow">↗</span>;
}

function JobDetail({
  job,
  careers,
  onBack,
  onJobSelect,
  onApply,
}) {
  useEffect(() => {
    document.title = `${job.title} | Careers | Planning Labs`;

    window.scrollTo(0, 0);

    return () => {
      document.title = "Planning Labs";
    };
  }, [job]);

  const relatedJobs = careers
    .filter(
      (item) =>
        item.id !== job.id &&
        item.department === job.department
    )
    .slice(0, 2);

  return (
    <div className="job-detail-page">
      <header className="careers-header">
        <button
          className="careers-brand"
          onClick={onBack}
          aria-label="Back to careers"
        >
          <span>Planning</span>
          <strong>Labs</strong>
          <i>⌬</i>
        </button>

        <button
          className="careers-back"
          onClick={onBack}
        >
          ← All Careers
        </button>
      </header>

      <main>
        <section className="job-detail-hero">
          <div>
            <span className="career-eyebrow">
              {job.department}
            </span>

            <h1>{job.title}</h1>

            <p>{job.shortDescription}</p>

            <div className="job-detail-meta">
              <span>{job.location}</span>
              <span>{job.type}</span>
              <span>{job.experience}</span>
            </div>
          </div>

          <button
            className="career-primary-button"
            onClick={() => onApply(job)}
          >
            Apply for this role <Arrow />
          </button>
        </section>

        <section className="job-detail-content">
          <article>
            <div className="career-section-label">
              ABOUT THE ROLE
            </div>

            <p className="job-detail-intro">
              {job.description}
            </p>

            <div className="job-detail-section">
              <h2>What you'll do</h2>

              <ul>
                {job.responsibilities.map(
                  (responsibility) => (
                    <li key={responsibility}>
                      <span>↗</span>
                      {responsibility}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="job-detail-section">
              <h2>What we're looking for</h2>

              <ul>
                {job.requirements.map((requirement) => (
                  <li key={requirement}>
                    <span>↗</span>
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>

            <button
              className="career-primary-button job-apply-button"
              onClick={() => onApply(job)}
            >
              Apply Now <Arrow />
            </button>
          </article>

          <aside className="job-sidebar">
            <div>
              <span>LOCATION</span>
              <strong>{job.location}</strong>
            </div>

            <div>
              <span>EMPLOYMENT</span>
              <strong>{job.type}</strong>
            </div>

            <div>
              <span>EXPERIENCE</span>
              <strong>{job.experience}</strong>
            </div>

            <div>
              <span>DEPARTMENT</span>
              <strong>{job.department}</strong>
            </div>
          </aside>
        </section>

        {relatedJobs.length > 0 && (
          <section className="related-jobs">
            <div className="career-section-label">
              MORE OPPORTUNITIES
            </div>

            <div className="related-jobs-grid">
              {relatedJobs.map((relatedJob) => (
                <button
                  key={relatedJob.id}
                  onClick={() =>
                    onJobSelect(relatedJob)
                  }
                >
                  <span>
                    {relatedJob.department}
                  </span>

                  <strong>{relatedJob.title}</strong>

                  <Arrow />
                </button>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default JobDetail;
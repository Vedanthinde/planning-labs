import { useEffect, useMemo, useState } from "react";
import "./Careers.css";

function Arrow() {
  return <span className="career-arrow">↗</span>;
}

function Careers({
  careers,
  onBack,
  onJobSelect,
  onStartApplication,
}) {
  const [department, setDepartment] = useState("All");

  useEffect(() => {
    document.title = "Careers | Planning Labs";

    return () => {
      document.title = "Planning Labs";
    };
  }, []);

  const departments = useMemo(
    () => [
      "All",
      ...new Set(careers.map((job) => job.department)),
    ],
    [careers]
  );

  const filteredCareers =
    department === "All"
      ? careers
      : careers.filter(
          (job) => job.department === department
        );

  return (
    <div className="careers-page">
      <header className="careers-header">
        <button
          className="careers-brand"
          onClick={onBack}
          aria-label="Back to Planning Labs home"
        >
          <span>Planning</span>
          <strong>Labs</strong>
          <i>⌬</i>
        </button>

        <button
          className="careers-back"
          onClick={onBack}
        >
          ← Back to Home
        </button>
      </header>

      <main>
        <section className="careers-hero">
          <div className="careers-hero-content">
            <span className="career-eyebrow">
              09 — CAREERS
            </span>

            <h1>
              Create.
              <br />
              Collaborate.
              <br />
              <span>Experiment.</span>
            </h1>

            <p>
              Great work happens when curious people come
              together. Explore opportunities and find your
              place at Planning Labs.
            </p>

            <button
              className="career-primary-button"
              onClick={() =>
                document
                  .getElementById("open-roles")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Explore Open Roles <Arrow />
            </button>
          </div>

          <div className="careers-hero-art">
            <div className="career-art-shape shape-one" />
            <div className="career-art-shape shape-two" />
            <div className="career-art-shape shape-three" />
          </div>
        </section>

        <section className="careers-intro">
          <div className="career-section-label">
            LIFE AT PLANNING LABS
          </div>

          <div className="careers-intro-grid">
            <h2>
              Bring your
              <br />
              <span>ideas with you.</span>
            </h2>

            <div>
              <p className="career-large-copy">
                We believe the best ideas come from people
                who are curious enough to question the
                obvious and ambitious enough to build
                something better.
              </p>

              <p>
                Our work brings together strategy, creative
                thinking, technology, production and
                execution. That means there is always
                something new to learn, solve or create.
              </p>
            </div>
          </div>

          <div className="career-values">
            <div>
              <span>01</span>
              <strong>Curiosity</strong>
              <p>
                Stay curious, ask questions and keep
                learning.
              </p>
            </div>

            <div>
              <span>02</span>
              <strong>Collaboration</strong>
              <p>
                Great work is built by people working
                together.
              </p>
            </div>

            <div>
              <span>03</span>
              <strong>Ownership</strong>
              <p>
                Take responsibility and turn ideas into
                outcomes.
              </p>
            </div>

            <div>
              <span>04</span>
              <strong>Experimentation</strong>
              <p>
                Try new approaches and challenge
                conventions.
              </p>
            </div>
          </div>
        </section>

        <section
          className="open-roles-section"
          id="open-roles"
        >
          <div className="career-section-label">
            OPEN POSITIONS
          </div>

          <div className="open-roles-heading">
            <div>
              <h2>
                Find your
                <br />
                <span>next opportunity.</span>
              </h2>
            </div>

            <p>
              Explore current opportunities across our
              experiential, digital, creative and technology
              teams.
            </p>
          </div>

          <div
            className="career-filters"
            role="tablist"
            aria-label="Filter jobs"
          >
            {departments.map((item) => (
              <button
                key={item}
                role="tab"
                aria-selected={department === item}
                className={
                  department === item
                    ? "career-filter-active"
                    : ""
                }
                onClick={() => setDepartment(item)}
              >
                {item}
                <span>
                  {item === "All"
                    ? careers.length
                    : careers.filter(
                        (job) =>
                          job.department === item
                      ).length}
                </span>
              </button>
            ))}
          </div>

          <div className="job-list">
            {filteredCareers.map((job, index) => (
              <article
                className="job-card"
                key={job.id}
                onClick={() => onJobSelect(job)}
                tabIndex="0"
                role="button"
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                    event.preventDefault();
                    onJobSelect(job);
                  }
                }}
              >
                <div className="job-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="job-main">
                  <span>{job.department}</span>
                  <h3>{job.title}</h3>
                  <p>{job.shortDescription}</p>
                </div>

                <div className="job-details">
                  <span>{job.location}</span>
                  <span>{job.type}</span>
                  <span>{job.experience}</span>
                </div>

                <div className="job-open">
                  <Arrow />
                </div>
              </article>
            ))}
          </div>

          {filteredCareers.length === 0 && (
            <div className="career-empty">
              <h3>No current openings.</h3>
              <p>
                You can still share your profile with us
                for future opportunities.
              </p>

              <button
                className="career-outline-button"
                onClick={() => onStartApplication(null)}
              >
                Send Your Profile <Arrow />
              </button>
            </div>
          )}
        </section>

        <section className="careers-cta">
          <div>
            <span className="career-eyebrow">
              DON'T SEE THE RIGHT ROLE?
            </span>

            <h2>
              We are always
              <br />
              open to <span>great people.</span>
            </h2>

            <p>
              Send us your profile and tell us how you
              could contribute to the team.
            </p>
          </div>

          <button
            className="career-primary-button"
            onClick={() => onStartApplication(null)}
          >
            Send Your Profile <Arrow />
          </button>
        </section>
      </main>

      <footer className="careers-footer">
        <span>
          © {new Date().getFullYear()} Planning Labs
        </span>

        <button onClick={onBack}>
          Back to Planning Labs ↗
        </button>
      </footer>
    </div>
  );
}

export default Careers;
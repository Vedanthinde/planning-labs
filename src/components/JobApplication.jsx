import { useEffect, useState } from "react";
import "./Careers.css";

function Arrow() {
  return <span className="career-arrow">↗</span>;
}

function JobApplication({
  job,
  onBack,
}) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = job
      ? `Apply — ${job.title} | Planning Labs`
      : "Apply | Planning Labs";

    window.scrollTo(0, 0);

    return () => {
      document.title = "Planning Labs";
    };
  }, [job]);

  if (submitted) {
    return (
      <div className="application-page">
        <header className="careers-header">
          <button
            className="careers-brand"
            onClick={onBack}
          >
            <span>Planning</span>
            <strong>Labs</strong>
            <i>⌬</i>
          </button>
        </header>

        <main className="application-success">
          <div className="success-icon">✓</div>

          <span className="career-eyebrow">
            APPLICATION RECEIVED
          </span>

          <h1>
            Thank you for
            <br />
            <span>applying.</span>
          </h1>

          <p>
            Your application has been recorded successfully.
            Our team will review your profile and contact you
            if your experience matches an opportunity at
            Planning Labs.
          </p>

          <button
            className="career-primary-button"
            onClick={onBack}
          >
            Back to Careers <Arrow />
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="application-page">
      <header className="careers-header">
        <button
          className="careers-brand"
          onClick={onBack}
          aria-label="Back to job"
        >
          <span>Planning</span>
          <strong>Labs</strong>
          <i>⌬</i>
        </button>

        <button
          className="careers-back"
          onClick={onBack}
        >
          ← Back
        </button>
      </header>

      <main>
        <section className="application-hero">
          <span className="career-eyebrow">
            {job
              ? `APPLY — ${job.department.toUpperCase()}`
              : "GENERAL APPLICATION"}
          </span>

          <h1>
            {job ? (
              <>
                Apply for
                <br />
                <span>{job.title}</span>
              </>
            ) : (
              <>
                Tell us
                <br />
                <span>about yourself.</span>
              </>
            )}
          </h1>

          <p>
            Complete the form below and share your profile
            with the Planning Labs team.
          </p>
        </section>

        <section className="application-form-section">
          <form
            className="application-form"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="application-form-heading">
              <span>01</span>
              <h2>Personal Information</h2>
            </div>

            <div className="application-grid">
              <label>
                Full Name *
                <input
                  required
                  type="text"
                  placeholder="Your full name"
                />
              </label>

              <label>
                Email Address *
                <input
                  required
                  type="email"
                  placeholder="you@example.com"
                />
              </label>

              <label>
                Phone Number *
                <input
                  required
                  type="tel"
                  placeholder="+91"
                />
              </label>

              <label>
                City
                <input
                  type="text"
                  placeholder="Mumbai"
                />
              </label>
            </div>

            <div className="application-form-heading">
              <span>02</span>
              <h2>Professional Information</h2>
            </div>

            <div className="application-grid">
              <label>
                Current Role
                <input
                  type="text"
                  placeholder="Your current role"
                />
              </label>

              <label>
                Years of Experience
                <select defaultValue="">
                  <option value="" disabled>
                    Select experience
                  </option>
                  <option>Fresher</option>
                  <option>Less than 1 year</option>
                  <option>1–2 years</option>
                  <option>3–5 years</option>
                  <option>5+ years</option>
                </select>
              </label>
            </div>

            <label>
              Portfolio / LinkedIn URL
              <input
                type="url"
                placeholder="https://"
              />
            </label>

            <div className="application-form-heading">
              <span>03</span>
              <h2>Your Application</h2>
            </div>

            <label>
              Position
              <select
                defaultValue={job?.slug || ""}
              >
                {!job && (
                  <option value="" disabled>
                    Select a position
                  </option>
                )}

                {job && (
                  <option value={job.slug}>
                    {job.title}
                  </option>
                )}

                <option value="general">
                  General Application
                </option>
              </select>
            </label>

            <label>
              Why do you want to join Planning Labs?
              <textarea
                rows="6"
                placeholder="Tell us about your interests, experience and what you could bring to the team..."
              />
            </label>

            <label className="resume-upload">
              <span>Resume / CV *</span>

              <input
                required
                type="file"
                accept=".pdf,.doc,.docx"
              />

              <strong>
                Upload your resume
              </strong>

              <small>
                PDF, DOC or DOCX
              </small>
            </label>

            <label className="application-checkbox">
              <input required type="checkbox" />

              <span>
                I confirm that the information provided is
                accurate and can be used for recruitment
                purposes.
              </span>
            </label>

            <button
              className="career-primary-button application-submit"
              type="submit"
            >
              Submit Application <Arrow />
            </button>

            <p className="application-note">
              Your application form is currently configured
              as a frontend submission flow. It can be
              connected to the CMS/backend during the final
              implementation.
            </p>
          </form>
        </section>
      </main>
    </div>
  );
}

export default JobApplication;
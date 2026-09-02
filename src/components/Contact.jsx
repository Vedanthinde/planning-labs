import { useState } from "react";
import EnquiryForm from "./EnquiryForm";
import "./Contact.css";

const locations = [
  {
    city: "Mumbai",
    country: "India",
    address: "Mumbai, Maharashtra, India",
  },
  {
    city: "Dubai",
    country: "UAE",
    address: "Dubai, United Arab Emirates",
  },
  {
    city: "Calgary",
    country: "Canada",
    address: "Calgary, Canada",
  },
  {
    city: "Jeddah",
    country: "Saudi Arabia",
    address: "Jeddah, Saudi Arabia",
  },
];

function Arrow() {
  return <span className="contact-arrow">↗</span>;
}

function Contact({ onBack }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSuccess = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
  };

  return (
    <div className="contact-page">
      {/* HEADER */}
      <header className="contact-header">
        <button
          className="contact-brand"
          onClick={onBack}
          aria-label="Back to Planning Labs home"
        >
          <span>Planning</span>
          <strong>Labs</strong>
          <i>⌬</i>
        </button>

        <button
          className="contact-back-button"
          onClick={onBack}
        >
          <span>←</span>
          Back to Home
        </button>
      </header>

      <main>
        {/* HERO */}
        <section className="contact-hero">
          <div className="contact-hero-overlay" />

          <div className="contact-hero-content">
            <span className="contact-eyebrow">
              01 — CONTACT PLANNING LABS
            </span>

            <h1>
              Let&apos;s make
              <br />
              something
              <br />
              <span>happen.</span>
            </h1>

            <p>
              Have an idea, a challenge or a project
              waiting to take shape? Tell us what you
              have in mind and let&apos;s start a
              conversation.
            </p>
          </div>

          <div className="contact-hero-bottom">
            <span>START A CONVERSATION</span>
            <span>SCROLL TO EXPLORE ↓</span>
          </div>
        </section>

        {/* INTRO */}
        <section className="contact-section contact-intro">
          <div className="contact-section-label">
            02 — GET IN TOUCH
          </div>

          <div className="contact-intro-grid">
            <h2>
              Tell us what
              <br />
              <span>you&apos;re building.</span>
            </h2>

            <div className="contact-intro-copy">
              <p>
                Whether you&apos;re planning a brand
                experience, launching a campaign,
                building a digital presence or simply
                exploring an idea, we&apos;d love to
                hear from you.
              </p>

              <div className="contact-direct-links">
                <a href="mailto:hello@planninglabs.in">
                  <span>Email</span>
                  <strong>
                    hello@planninglabs.in
                  </strong>
                  <Arrow />
                </a>

                <a href="tel:+912240000000">
                  <span>Phone</span>
                  <strong>
                    +91 22 4000 0000
                  </strong>
                  <Arrow />
                </a>

                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>WhatsApp</span>
                  <strong>
                    Start a conversation
                  </strong>
                  <Arrow />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ENQUIRY */}
        <section className="contact-section enquiry-section">
          <div className="contact-section-label">
            03 — PROJECT ENQUIRY
          </div>

          <div className="enquiry-layout">
            <div className="enquiry-intro">
              <h2>
                Start a
                <br />
                <span>project.</span>
              </h2>

              <p>
                Give us a little context about your
                project. The more you share, the
                better we can understand how to help.
              </p>

              <div className="enquiry-note">
                <span>01</span>
                <p>
                  Your information will be used only
                  to understand and respond to your
                  enquiry.
                </p>
              </div>
            </div>

            <div className="enquiry-form-wrapper">
              {submitted ? (
                <div className="contact-success">
                  <div className="success-icon">
                    ✓
                  </div>

                  <span className="contact-eyebrow">
                    ENQUIRY RECEIVED
                  </span>

                  <h3>
                    Thanks for reaching out.
                  </h3>

                  <p>
                    Your enquiry has been submitted
                    successfully. Our team can now
                    review your project details and
                    get back to you.
                  </p>

                  <button
                    className="contact-outline-button"
                    onClick={handleReset}
                  >
                    Send Another Enquiry
                    <Arrow />
                  </button>
                </div>
              ) : (
                <EnquiryForm
                  onSuccess={handleSuccess}
                />
              )}
            </div>
          </div>
        </section>

        {/* LOCATIONS */}
        <section className="contact-section locations-section">
          <div className="contact-section-label">
            04 — OUR LOCATIONS
          </div>

          <div className="locations-heading">
            <h2>
              Across markets.
              <br />
              <span>Connected by ideas.</span>
            </h2>

            <p>
              Our locations give us the reach to
              create and execute experiences across
              markets.
            </p>
          </div>

          <div className="contact-location-grid">
            {locations.map(
              (location, index) => (
                <article
                  className="contact-location-card"
                  key={location.city}
                >
                  <div className="location-number">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </div>

                  <div className="location-content">
                    <span>
                      {location.country}
                    </span>

                    <h3>{location.city}</h3>

                    <p>
                      {location.address}
                    </p>
                  </div>

                  <Arrow />
                </article>
              )
            )}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="contact-final-cta">
          <div className="contact-final-content">
            <span className="contact-eyebrow">
              05 — LET&apos;S TALK
            </span>

            <h2>
              Good ideas
              <br />
              deserve to
              <br />
              <span>move.</span>
            </h2>

            <p>
              If you&apos;re ready, we&apos;re ready.
            </p>

            <a
              className="contact-primary-button"
              href="mailto:hello@planninglabs.in"
            >
              Email Planning Labs
              <Arrow />
            </a>
          </div>

          <div className="contact-final-art">
            <div className="contact-art-circle contact-art-one" />
            <div className="contact-art-circle contact-art-two" />
            <div className="contact-art-circle contact-art-three" />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="contact-footer">
        <div className="contact-footer-top">
          <div>
            <button
              className="contact-brand contact-footer-brand"
              onClick={onBack}
            >
              <span>Planning</span>
              <strong>Labs</strong>
              <i>⌬</i>
            </button>

            <p>
              Experiential and digital marketing
              solutions built around ideas, people
              and impact.
            </p>
          </div>

          <div className="contact-footer-column">
            <h4>CONTACT</h4>

            <a href="mailto:hello@planninglabs.in">
              hello@planninglabs.in
            </a>

            <a href="tel:+912240000000">
              +91 22 4000 0000
            </a>

            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp ↗
            </a>
          </div>

          <div className="contact-footer-column">
            <h4>LOCATIONS</h4>

            {locations.map(
              (location) => (
                <span key={location.city}>
                  {location.city}
                </span>
              )
            )}
          </div>
        </div>

        <div className="contact-footer-bottom">
          <span>
            © {new Date().getFullYear()} Planning
            Labs. All rights reserved.
          </span>

          <button onClick={onBack}>
            Back to Home ↑
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Contact;
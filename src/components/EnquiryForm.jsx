import { useRef, useState } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

const ALLOWED_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".ppt",
  ".pptx",
];

function Arrow() {
  return <span className="contact-arrow">↗</span>;
}

function EnquiryForm({ onSuccess }) {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    brief: "",
  });

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [errors, setErrors] = useState({});

  const [fileError, setFileError] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validateFile = (file) => {
    if (!file) return "";

    const extension = `.${file.name
      .split(".")
      .pop()
      .toLowerCase()}`;

    if (
      !ALLOWED_EXTENSIONS.includes(
        extension
      )
    ) {
      return "Please upload a PDF, DOC, DOCX, PPT or PPTX file.";
    }

    if (
      file.type &&
      !ALLOWED_FILE_TYPES.includes(
        file.type
      )
    ) {
      return "This file type is not supported.";
    }

    if (file.size > MAX_FILE_SIZE) {
      return "File size must be 5 MB or less.";
    }

    return "";
  };

  const handleFileChange = (event) => {
    const file =
      event.target.files?.[0] || null;

    setFileError("");

    if (!file) {
      setSelectedFile(null);
      return;
    }

    const validationError =
      validateFile(file);

    if (validationError) {
      setSelectedFile(null);
      setFileError(validationError);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFileError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name =
        "Please enter your name.";
    }

    if (!formData.company.trim()) {
      newErrors.company =
        "Please enter your company name.";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Please enter your phone number.";
    }

    if (!formData.service) {
      newErrors.service =
        "Please select a service.";
    }

    if (!formData.brief.trim()) {
      newErrors.brief =
        "Please tell us about your project.";
    } else if (
      formData.brief.trim().length < 20
    ) {
      newErrors.brief =
        "Please provide a little more detail about your project.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFileError("");

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    if (selectedFile) {
      const validationError =
        validateFile(selectedFile);

      if (validationError) {
        setFileError(validationError);
        return;
      }
    }

    setIsSubmitting(true);

    /*
     * Demo submission state.
     *
     * The frontend is currently prepared for
     * backend/CMS integration. In the final
     * implementation, this is where the form data
     * and selected file will be sent to the API.
     */

    await new Promise((resolve) =>
      setTimeout(resolve, 900)
    );

    setIsSubmitting(false);

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form
      className="contact-enquiry-form"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* PERSONAL INFORMATION */}
      <div className="contact-form-section">
        <div className="contact-form-section-heading">
          <span>01</span>

          <h3>
            Your details
          </h3>
        </div>

        <div className="contact-form-grid">
          {/* NAME */}
          <div className="contact-field">
            <label htmlFor="contact-name">
              Full Name
              <span>*</span>
            </label>

            <input
              id="contact-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              autoComplete="name"
              aria-invalid={
                Boolean(errors.name)
              }
            />

            {errors.name && (
              <small className="contact-error">
                {errors.name}
              </small>
            )}
          </div>

          {/* COMPANY */}
          <div className="contact-field">
            <label htmlFor="contact-company">
              Company
              <span>*</span>
            </label>

            <input
              id="contact-company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company name"
              autoComplete="organization"
              aria-invalid={
                Boolean(errors.company)
              }
            />

            {errors.company && (
              <small className="contact-error">
                {errors.company}
              </small>
            )}
          </div>

          {/* EMAIL */}
          <div className="contact-field">
            <label htmlFor="contact-email">
              Email Address
              <span>*</span>
            </label>

            <input
              id="contact-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@company.com"
              autoComplete="email"
              aria-invalid={
                Boolean(errors.email)
              }
            />

            {errors.email && (
              <small className="contact-error">
                {errors.email}
              </small>
            )}
          </div>

          {/* PHONE */}
          <div className="contact-field">
            <label htmlFor="contact-phone">
              Phone Number
              <span>*</span>
            </label>

            <input
              id="contact-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              autoComplete="tel"
              aria-invalid={
                Boolean(errors.phone)
              }
            />

            {errors.phone && (
              <small className="contact-error">
                {errors.phone}
              </small>
            )}
          </div>
        </div>
      </div>

      {/* PROJECT INFORMATION */}
      <div className="contact-form-section">
        <div className="contact-form-section-heading">
          <span>02</span>

          <h3>
            Project details
          </h3>
        </div>

        <div className="contact-form-grid">
          {/* SERVICE */}
          <div className="contact-field">
            <label htmlFor="contact-service">
              What do you need?
              <span>*</span>
            </label>

            <select
              id="contact-service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              aria-invalid={
                Boolean(errors.service)
              }
            >
              <option value="">
                Select a service
              </option>

              <optgroup label="Experiential Marketing">
                <option value="Events">
                  Events
                </option>

                <option value="Exhibitions & Stall Design">
                  Exhibitions & Stall Design
                </option>

                <option value="Brand Activations">
                  Brand Activations
                </option>

                <option value="MICE">
                  MICE
                </option>

                <option value="Conferences & Product Launches">
                  Conferences & Product Launches
                </option>

                <option value="Employee Engagement">
                  Employee Engagement
                </option>

                <option value="Outdoor Advertising">
                  Outdoor Advertising
                </option>

                <option value="Event Production & Fabrication">
                  Event Production & Fabrication
                </option>
              </optgroup>

              <optgroup label="Digital Marketing">
                <option value="Social Media Management">
                  Social Media Management
                </option>

                <option value="Performance Marketing">
                  Performance Marketing
                </option>

                <option value="SEO">
                  SEO
                </option>

                <option value="Influencer Marketing">
                  Influencer Marketing
                </option>

                <option value="Video & Commercial Production">
                  Video & Commercial Production
                </option>

                <option value="Website Development">
                  Website Development
                </option>

                <option value="Creative Design">
                  Creative Design
                </option>

                <option value="CGI & Digital Content">
                  CGI & Digital Content
                </option>
              </optgroup>
            </select>

            {errors.service && (
              <small className="contact-error">
                {errors.service}
              </small>
            )}
          </div>

          {/* BUDGET */}
          <div className="contact-field">
            <label htmlFor="contact-budget">
              Estimated Budget
            </label>

            <select
              id="contact-budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
            >
              <option value="">
                Select budget range
              </option>

              <option value="Under ₹5 Lakhs">
                Under ₹5 Lakhs
              </option>

              <option value="₹5–10 Lakhs">
                ₹5–10 Lakhs
              </option>

              <option value="₹10–25 Lakhs">
                ₹10–25 Lakhs
              </option>

              <option value="₹25–50 Lakhs">
                ₹25–50 Lakhs
              </option>

              <option value="₹50 Lakhs+">
                ₹50 Lakhs+
              </option>

              <option value="Not sure yet">
                Not sure yet
              </option>
            </select>
          </div>
        </div>

        {/* BRIEF */}
        <div className="contact-field contact-full-field">
          <label htmlFor="contact-brief">
            Tell us about your project
            <span>*</span>
          </label>

          <textarea
            id="contact-brief"
            name="brief"
            value={formData.brief}
            onChange={handleChange}
            rows="7"
            placeholder="What are you looking to achieve? Tell us about your goals, audience, timeline or anything else that would help us understand the project."
            aria-invalid={
              Boolean(errors.brief)
            }
          />

          <div className="contact-field-footer">
            {errors.brief ? (
              <small className="contact-error">
                {errors.brief}
              </small>
            ) : (
              <small>
                Minimum 20 characters
              </small>
            )}

            <span>
              {formData.brief.length}
              / 1000
            </span>
          </div>
        </div>
      </div>

      {/* FILE UPLOAD */}
      <div className="contact-form-section">
        <div className="contact-form-section-heading">
          <span>03</span>

          <h3>
            Attach a brief
          </h3>
        </div>

        <div className="contact-upload">
          <input
            ref={fileInputRef}
            id="contact-file"
            type="file"
            accept=".pdf,.doc,.docx,.ppt,.pptx"
            onChange={handleFileChange}
          />

          {!selectedFile ? (
            <label
              htmlFor="contact-file"
              className="contact-upload-box"
            >
              <div className="upload-icon">
                ↑
              </div>

              <div>
                <strong>
                  Upload your project brief
                </strong>

                <span>
                  PDF, DOC, DOCX, PPT or PPTX ·
                  Maximum 5 MB
                </span>
              </div>

              <span className="upload-browse">
                Browse
              </span>
            </label>
          ) : (
            <div className="selected-file">
              <div className="selected-file-icon">
                FILE
              </div>

              <div className="selected-file-info">
                <strong>
                  {selectedFile.name}
                </strong>

                <span>
                  {(
                    selectedFile.size /
                    (1024 * 1024)
                  ).toFixed(2)}{" "}
                  MB
                </span>
              </div>

              <button
                type="button"
                className="remove-file"
                onClick={removeFile}
                aria-label="Remove attached file"
              >
                ×
              </button>
            </div>
          )}

          {fileError && (
            <small className="contact-error upload-error">
              {fileError}
            </small>
          )}
        </div>
      </div>

      {/* SUBMIT */}
      <div className="contact-submit-area">
        <div className="contact-privacy-note">
          <span>⌁</span>

          <p>
            By submitting this form, you agree
            that Planning Labs may contact you
            regarding your enquiry.
          </p>
        </div>

        <button
          type="submit"
          className="contact-primary-button contact-submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Sending..."
            : "Send Project Enquiry"}

          {!isSubmitting && <Arrow />}
        </button>
      </div>
    </form>
  );
}

export default EnquiryForm;
/**
 * Planning Labs Analytics
 *
 * GA4-ready analytics utility.
 *
 * Add the real GA4 measurement ID to:
 *
 * VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 *
 * Analytics remains inactive when no measurement ID
 * is configured.
 */

let initialized = false;

const measurementId =
  import.meta.env.VITE_GA_MEASUREMENT_ID || "";

export function initAnalytics() {
  if (
    initialized ||
    !measurementId ||
    typeof window === "undefined"
  ) {
    return;
  }

  const script = document.createElement("script");

  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;

  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];

  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());

  window.gtag("config", measurementId, {
    send_page_view: false,
  });

  initialized = true;
}

export function trackEvent(
  eventName,
  parameters = {}
) {
  if (
    typeof window === "undefined" ||
    typeof window.gtag !== "function"
  ) {
    return;
  }

  window.gtag(
    "event",
    eventName,
    parameters
  );
}

export function trackPageView(
  pagePath = window.location.pathname,
  pageTitle = document.title
) {
  trackEvent("page_view", {
    page_title: pageTitle,
    page_location: window.location.href,
    page_path: pagePath,
  });
}

export function trackSearch(searchTerm) {
  if (!searchTerm?.trim()) return;

  trackEvent("search", {
    search_term: searchTerm.trim(),
  });
}

export function trackEnquiryStart() {
  trackEvent("generate_lead", {
    method: "website_enquiry",
  });
}

export function trackEnquirySubmit() {
  trackEvent("enquiry_submit", {
    method: "website_enquiry",
  });
}

export function trackWhatsAppClick() {
  trackEvent("whatsapp_click", {
    method: "whatsapp",
  });
}

export function trackCallClick() {
  trackEvent("phone_click", {
    method: "phone",
  });
}

export function trackProjectView(project) {
  trackEvent("view_project", {
    project_name: project?.title || "",
    project_slug: project?.slug || "",
    project_category: project?.category || "",
  });
}

export function trackServiceView(service) {
  trackEvent("view_service", {
    service_name: service?.title || "",
    service_slug: service?.slug || "",
    service_vertical:
      service?.verticalSlug || "",
  });
}

export function trackInsightView(insight) {
  trackEvent("view_insight", {
    insight_title: insight?.title || "",
    insight_slug: insight?.slug || "",
    insight_category:
      insight?.category || "",
  });
}

export function trackCareerView(job) {
  trackEvent("view_job", {
    job_title: job?.title || "",
    job_slug: job?.slug || "",
    department: job?.department || "",
  });
}

export default {
  initAnalytics,
  trackEvent,
  trackPageView,
  trackSearch,
  trackEnquiryStart,
  trackEnquirySubmit,
  trackWhatsAppClick,
  trackCallClick,
  trackProjectView,
  trackServiceView,
  trackInsightView,
  trackCareerView,
};
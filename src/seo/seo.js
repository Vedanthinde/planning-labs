/**
 * Planning Labs SEO Utilities
 *
 * Handles:
 * - Page title
 * - Meta description
 * - Canonical URL
 * - Open Graph metadata
 * - Twitter metadata
 */

const DEFAULT_TITLE =
  "Planning Labs — Experiential & Digital Marketing";

const DEFAULT_DESCRIPTION =
  "Planning Labs creates experiential and digital marketing solutions built around ideas, people and impact.";

const SITE_URL = "https://www.planninglabs.in";

function setMeta(name, content) {
  if (!content) return;

  let element = document.head.querySelector(
    `meta[name="${name}"]`
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setProperty(property, content) {
  if (!content) return;

  let element = document.head.querySelector(
    `meta[property="${property}"]`
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setCanonical(url) {
  let canonical = document.head.querySelector(
    'link[rel="canonical"]'
  );

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  canonical.setAttribute("href", url);
}

export function updateSEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = window.location.pathname,
  image = "",
} = {}) {
  const cleanPath =
    path === "/" ? "" : path.replace(/\/$/, "");

  const canonicalUrl = `${SITE_URL}${cleanPath}`;

  document.title = title;

  setMeta("description", description);

  setProperty("og:title", title);
  setProperty("og:description", description);
  setProperty("og:type", "website");
  setProperty("og:url", canonicalUrl);

  if (image) {
    setProperty("og:image", image);
  }

  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:title", title);
  setMeta("twitter:description", description);

  if (image) {
    setMeta("twitter:image", image);
  }

  setCanonical(canonicalUrl);
}

export function getSiteUrl() {
  return SITE_URL;
}

export default updateSEO;
import cmsContent from "./content";

/**
 * CMS Content Service
 *
 * The React application gets managed content through this
 * service instead of directly depending on individual data files.
 *
 * Currently:
 * React → Content Service → Local Data
 *
 * Future:
 * React → Content Service → CMS/API
 */

/* =========================
   PROJECTS
========================= */

export const getProjects = () => {
  return (cmsContent.projects || []).map((project) => ({
    ...project,

    // Keeps compatibility with existing components.
    // The CMS can use heroImage while older components
    // can continue using image.
    image: project.image || project.heroImage || "",
  }));
};

export const getFeaturedProjects = () => {
  return getProjects().filter(
    (project) => project.featured === true
  );
};

export const getProjectBySlug = (slug) => {
  return (
    getProjects().find(
      (project) => project.slug === slug
    ) || null
  );
};

/* =========================
   SERVICES
========================= */

export const getServices = () => {
  return cmsContent.services || [];
};

export const getServiceBySlug = (slug) => {
  return (
    getServices().find(
      (service) => service.slug === slug
    ) || null
  );
};

export const getServicesByVertical = (verticalSlug) => {
  return getServices().filter(
    (service) =>
      service.verticalSlug === verticalSlug
  );
};

export const getServiceDetails = (slug) => {
  return (
    cmsContent.serviceDetails?.[slug] || null
  );
};

/* =========================
   INSIGHTS
========================= */

export const getInsights = () => {
  return cmsContent.insights || [];
};

export const getFeaturedInsights = () => {
  return getInsights().filter(
    (insight) => insight.featured === true
  );
};

export const getInsightBySlug = (slug) => {
  return (
    getInsights().find(
      (insight) => insight.slug === slug
    ) || null
  );
};

/* =========================
   CAREERS
========================= */

export const getCareers = () => {
  return cmsContent.careers || [];
};

export const getCareerBySlug = (slug) => {
  return (
    getCareers().find(
      (career) => career.slug === slug
    ) || null
  );
};

/* =========================
   SITE CONTENT
========================= */

export const getClients = () => {
  return cmsContent.clients || [];
};

export const getTestimonials = () => {
  return cmsContent.testimonials || [];
};

export const getIndustries = () => {
  return cmsContent.industries || [];
};

export const getLocations = () => {
  return cmsContent.locations || [];
};

export const getStatistics = () => {
  return cmsContent.statistics || [];
};

/* =========================
   SITE SETTINGS
========================= */

export const getSiteSettings = () => {
  return cmsContent.siteSettings || {};
};
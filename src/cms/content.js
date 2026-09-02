import projects from "../data/projects";
import { serviceCatalog } from "../data/services";
import { insights } from "../data/insights";
import { careers } from "../data/careers";

import {
  clients,
  testimonials,
  industries,
  locations,
  statistics,
  siteSettings,
} from "../data/siteContent";

/**
 * CMS Content Repository
 *
 * Current source:
 * Local structured content
 *
 * Future source:
 * CMS / API
 *
 * Keeping all website content behind this repository
 * allows the frontend to remain independent of the
 * eventual CMS implementation.
 */

export const cmsContent = {
  projects,

  services: serviceCatalog,

  serviceDetails: {},

  insights,

  careers,

  clients,

  testimonials,

  industries,

  locations,

  statistics,

  siteSettings,
};

export default cmsContent;
/**
 * Content model configuration
 *
 * These definitions describe the fields that a future
 * CMS/admin system would manage.
 */

export const contentConfig = {
  projects: {
    label: "Projects",
    fields: [
      "title",
      "slug",
      "number",
      "category",
      "type",
      "client",
      "location",
      "year",
      "heroImage",
      "overview",
      "challenge",
      "approach",
      "execution",
      "outcome",
      "services",
      "gallery",
      "featured",
    ],
  },

  services: {
    label: "Services",
    fields: [
      "number",
      "vertical",
      "verticalSlug",
      "slug",
      "title",
      "description",
      "image",
    ],
  },

  serviceDetails: {
    label: "Service Details",
    fields: [
      "title",
      "eyebrow",
      "overview",
      "capabilities",
      "process",
    ],
  },

  insights: {
    label: "Insights",
    fields: [
      "number",
      "slug",
      "category",
      "title",
      "excerpt",
      "date",
      "readTime",
      "featured",
      "image",
      "author",
      "content",
    ],
  },

  careers: {
    label: "Careers",
    fields: [
      "id",
      "slug",
      "department",
      "location",
      "type",
      "experience",
      "title",
      "shortDescription",
      "description",
      "responsibilities",
      "requirements",
    ],
  },

  clients: {
    label: "Clients",
    fields: [
      "name",
      "logo",
      "website",
    ],
  },

  testimonials: {
    label: "Testimonials",
    fields: [
      "quote",
      "name",
      "role",
      "company",
    ],
  },

  siteSettings: {
    label: "Site Settings",
    fields: [
      "companyName",
      "email",
      "phone",
      "whatsapp",
      "address",
      "socialLinks",
      "defaultSeoTitle",
      "defaultSeoDescription",
    ],
  },
};

export default contentConfig;
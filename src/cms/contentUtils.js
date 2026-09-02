/**
 * CMS Content Utilities
 *
 * Reusable helpers for working with CMS-managed content.
 * These utilities currently work with local content, but
 * can continue to be used when a real CMS/API is connected.
 */

export const findBySlug = (items = [], slug) => {
  if (!slug || !Array.isArray(items)) {
    return null;
  }

  return items.find((item) => item?.slug === slug) || null;
};

export const filterFeatured = (items = []) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.filter((item) => item?.featured === true);
};

export const filterByCategory = (items = [], category) => {
  if (!Array.isArray(items) || !category) {
    return [];
  }

  return items.filter(
    (item) =>
      String(item?.category || "").toLowerCase() ===
      String(category).toLowerCase()
  );
};

export const filterByVertical = (items = [], verticalSlug) => {
  if (!Array.isArray(items) || !verticalSlug) {
    return [];
  }

  return items.filter(
    (item) =>
      String(item?.verticalSlug || "").toLowerCase() ===
      String(verticalSlug).toLowerCase()
  );
};

export const getUniqueValues = (items = [], field) => {
  if (!Array.isArray(items) || !field) {
    return [];
  }

  return [
    ...new Set(
      items
        .map((item) => item?.[field])
        .filter(Boolean)
    ),
  ];
};

export const hasContent = (value) => {
  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  return Boolean(value);
};

export const getSafeContent = (value, fallback = "") => {
  return hasContent(value) ? value : fallback;
};
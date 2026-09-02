# Planning Labs CMS Architecture

## Overview

The Planning Labs website uses a CMS-ready content architecture.

The current website stores content in local JavaScript data files, while the React application accesses that content through a centralized CMS service layer.

This keeps the UI independent from the current content storage method.

---

## Current Architecture

React Components
        ↓
CMS Content Service
        ↓
CMS Content Repository
        ↓
Local Data Files

Current flow:

React → contentService.js → content.js → data files

---

## Future Architecture

The local data layer can later be replaced with a real CMS or API.

Future flow:

React → contentService.js → CMS/API

The UI components do not need to directly access the CMS.

---

## CMS Repository

### `src/cms/content.js`

This file acts as the central content repository.

It combines structured website content from different data sources into one `cmsContent` object.

Managed content includes:

- Projects
- Services
- Service details
- Insights
- Careers
- Clients
- Testimonials
- Industries
- Locations
- Statistics
- Site settings

---

## Content Service

### `src/cms/contentService.js`

The content service provides reusable functions for retrieving website content.

Examples:

- `getProjects()`
- `getFeaturedProjects()`
- `getProjectBySlug()`
- `getServices()`
- `getServiceBySlug()`
- `getServicesByVertical()`
- `getInsights()`
- `getFeaturedInsights()`
- `getInsightBySlug()`
- `getCareers()`
- `getCareerBySlug()`
- `getClients()`
- `getTestimonials()`
- `getIndustries()`
- `getLocations()`
- `getStatistics()`
- `getSiteSettings()`

Components should use these service functions rather than importing individual data files directly.

---

## Content Utilities

### `src/cms/contentUtils.js`

Reusable helper functions are maintained here.

Available utilities include:

- `findBySlug()`
- `filterFeatured()`
- `filterByCategory()`
- `filterByVertical()`
- `getUniqueValues()`
- `hasContent()`
- `getSafeContent()`

These utilities make content filtering and validation reusable across the application.

---

## Content Configuration

### `src/cms/contentConfig.js`

This file defines the expected content models and fields.

It documents the structure required for:

- Projects
- Services
- Service details
- Insights
- Careers
- Clients
- Testimonials
- Site settings

This provides a clear blueprint for a future CMS implementation.

---

## Data Structure

### Projects

Projects support portfolio and case-study content such as:

- Title
- Slug
- Category
- Client
- Location
- Year
- Hero image
- Overview
- Challenge
- Approach
- Execution
- Outcome
- Services
- Gallery
- Featured status

---

### Services

Services support:

- Service number
- Marketing vertical
- Vertical slug
- Service slug
- Title
- Description
- Image

---

### Insights

Insights support:

- Number
- Slug
- Category
- Title
- Excerpt
- Date
- Read time
- Featured status
- Image
- Author
- Article content

---

### Careers

Career entries support:

- Job ID
- Slug
- Department
- Location
- Employment type
- Experience
- Job title
- Short description
- Description
- Responsibilities
- Requirements

---

### Site Content

The centralized site content includes:

- Clients
- Testimonials
- Industries
- Locations
- Statistics
- Site settings

This allows frequently updated website content to be separated from presentation logic.

---

## Why This Architecture?

### 1. Separation of concerns

Content and UI logic are separated.

The React components focus on presentation and interaction while the CMS layer manages content access.

### 2. Easier future CMS integration

A CMS/API can replace the local data source without requiring major changes to the frontend.

### 3. Maintainability

Content is centralized instead of being duplicated throughout components.

### 4. Scalability

New content types can be added to the repository and content service as the website grows.

### 5. Reusability

The same content can be consumed by multiple components and pages.

---

## Current CMS Status

The project is currently CMS-ready but does not depend on an external CMS.

Current:

Local Data → CMS Repository → Content Service → React

Future:

CMS/API → CMS Repository or API Adapter → Content Service → React

No external CMS account or dependency is required for the current implementation.

---

## Recommended Future CMS Content Types

If Planning Labs later connects a production CMS, the following collections can be created:

1. Projects
2. Services
3. Service Details
4. Insights
5. Careers
6. Clients
7. Testimonials
8. Industries
9. Locations
10. Site Settings

---

## Development Principle

Frontend components should not directly depend on individual data files.

Preferred:

```js
import { getProjects } from "./cms/contentService";
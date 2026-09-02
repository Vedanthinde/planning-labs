# Planning Labs

A premium, responsive marketing website concept for Planning Labs, built around two primary business verticals:

- Experiential Marketing
- Digital Marketing

The website is designed to function as a company profile, project portfolio, case-study platform, insights hub, career portal, and lead-generation website.

---

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- React Hooks
- Google Analytics 4 integration
- SEO metadata and canonical URLs
- Responsive design

---

## Project Structure

```text
planning-labs/
├── public/
│   ├── robots.txt
│   └── sitemap.xml
│
├── src/
│   ├── analytics/
│   │   └── analytics.js
│   │
│   ├── assets/
│   │
│   ├── components/
│   │
│   ├── cms/
│   │   ├── content.js
│   │   ├── contentConfig.js
│   │   ├── contentService.js
│   │   └── contentUtils.js
│   │
│   ├── data/
│   │   ├── projects.js
│   │   ├── services.js
│   │   ├── insights.js
│   │   ├── careers.js
│   │   └── siteContent.js
│   │
│   ├── seo/
│   │   └── seo.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .env.example
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
import { useEffect, useMemo, useState } from "react";
import "./App.css";

import CaseStudy from "./components/CaseStudy";
import ServicePage from "./components/ServicePage";
import ServiceOverview from "./components/ServiceOverview";
import Insights from "./components/Insights";
import InsightArticle from "./components/InsightArticle";
import Careers from "./components/Careers";
import JobDetail from "./components/JobDetail";
import JobApplication from "./components/JobApplication";
import Contact from "./components/Contact";

import {
  getProjects,
  getServices,
  getInsights,
  getCareers,
  getClients,
  getTestimonials,
  getIndustries,
  getLocations,
  getStatistics,
} from "./cms/contentService";

import updateSEO from "./seo/seo";

import {
  initAnalytics,
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
} from "./analytics/analytics";

const projects = getProjects();
const serviceCatalog = getServices();
const insights = getInsights();
const careers = getCareers();

const clients = getClients();
const testimonials = getTestimonials();
const industries = getIndustries();
const locations = getLocations();
const statistics = getStatistics();

const services = {
  experiential: serviceCatalog
    .filter(
      (service) =>
        service.verticalSlug === "experiential"
    )
    .map((service) => service.title),

  digital: serviceCatalog
    .filter(
      (service) =>
        service.verticalSlug === "digital"
    )
    .map((service) => service.title),
};

function Arrow() {
  return <span className="arrow">↗</span>;
}

function getProjectFromPath() {
  const match = window.location.pathname.match(
    /^\/work\/([^/]+)\/?$/
  );

  return match
    ? projects.find(
        (project) => project.slug === match[1]
      ) || null
    : null;
}

function getServiceFromPath() {
  const match = window.location.pathname.match(
    /^\/services\/(experiential|digital)(?:\/([^/]+))?\/?$/
  );

  if (!match) return null;

  const verticalSlug = match[1];
  const serviceSlug = match[2];

  if (serviceSlug) {
    return (
      serviceCatalog.find(
        (service) =>
          service.verticalSlug === verticalSlug &&
          service.slug === serviceSlug
      ) || null
    );
  }

  return {
    type: "vertical",
    verticalSlug,
    title:
      verticalSlug === "experiential"
        ? "Experiential Marketing"
        : "Digital Marketing",
  };
}

function getInsightFromPath() {
  const match = window.location.pathname.match(
    /^\/insights(?:\/([^/]+))?\/?$/
  );

  if (!match) return null;

  const insightSlug = match[1];

  if (!insightSlug) {
    return {
      type: "listing",
    };
  }

  return (
    insights.find(
      (insight) => insight.slug === insightSlug
    ) || null
  );
}

/*
 * PHASE 6 — CAREER ROUTING
 */
function getCareerFromPath() {
  const match = window.location.pathname.match(
    /^\/careers(?:\/([^/]+))?(?:\/apply)?\/?$/
  );

  if (!match) return null;

  const careerSlug = match[1];

  const isApplication =
    window.location.pathname.endsWith("/apply");

  if (!careerSlug) {
    return {
      type: "listing",
    };
  }

  if (
    careerSlug === "apply" &&
    isApplication === false
  ) {
    return {
      type: "application",
      job: null,
    };
  }

  const job = careers.find(
    (career) => career.slug === careerSlug
  );

  if (!job) return null;

  if (isApplication) {
    return {
      type: "application",
      job,
    };
  }

  return job;
}

/*
 * PHASE 7 — CONTACT ROUTING
 */
function getContactFromPath() {
  const path = window.location.pathname;

  if (path === "/contact" || path === "/contact/") {
    return {
      type: "contact",
    };
  }

  return null;
}

/*
 * =========================================================
 * PHASE 9 — SEARCH INDEX
 * =========================================================
 */

function normalizeSearchText(value) {
  return String(value || "")
    .toLowerCase()
    .trim();
}

function createSearchIndex() {
  const staticPages = [
    {
      id: "page-about",
      type: "Page",
      title: "About Planning Labs",
      description:
        "Learn about Planning Labs, our approach and the way we connect strategy, creativity and execution.",
      meta: "Company",
    },

    {
      id: "page-work",
      type: "Page",
      title: "Our Work",
      description:
        "Explore selected experiential and digital marketing projects.",
      meta: "Portfolio",
    },

    {
      id: "page-experiential",
      type: "Service",
      title: "Experiential Marketing",
      description:
        "Explore events, exhibitions, brand activations, MICE, conferences and other experiential services.",
      meta: "Experiential Marketing",
      item: {
        type: "vertical",
        verticalSlug: "experiential",
        title: "Experiential Marketing",
      },
    },

    {
      id: "page-digital",
      type: "Service",
      title: "Digital Marketing",
      description:
        "Explore social media, performance marketing, SEO, influencer marketing and digital services.",
      meta: "Digital Marketing",
      item: {
        type: "vertical",
        verticalSlug: "digital",
        title: "Digital Marketing",
      },
    },

    {
      id: "page-insights",
      type: "Page",
      title: "Insights",
      description:
        "Read Planning Labs insights, perspectives and ideas.",
      meta: "Insights",
    },

    {
      id: "page-careers",
      type: "Page",
      title: "Careers",
      description:
        "Explore career opportunities at Planning Labs.",
      meta: "Careers",
    },

    {
      id: "page-contact",
      type: "Page",
      title: "Contact Planning Labs",
      description:
        "Start a project and get in touch with Planning Labs.",
      meta: "Contact",
    },
  ];

  const projectResults = projects.map(
    (project) => ({
      id: `project-${project.slug}`,
      type: "Project",
      title: project.title,
      description:
        project.overview ||
        project.description ||
        "",
      meta: [
        project.category,
        project.client,
        project.location,
        project.type,
      ]
        .filter(Boolean)
        .join(" • "),
      item: project,
    })
  );

  const serviceResults =
    serviceCatalog.map((service) => ({
      id: `service-${service.slug}`,
      type: "Service",
      title: service.title,
      description:
        service.description || "",
      meta: [
        service.vertical,
        service.category,
      ]
        .filter(Boolean)
        .join(" • "),
      item: service,
    }));

  const insightResults =
    insights.map((insight) => ({
      id: `insight-${insight.slug}`,
      type: "Insight",
      title: insight.title,
      description:
        insight.excerpt ||
        insight.content ||
        "",
      meta: [
        insight.category,
        insight.date,
        insight.readTime,
      ]
        .filter(Boolean)
        .join(" • "),
      item: insight,
    }));

  const careerResults =
    careers.map((career) => ({
      id: `career-${career.slug}`,
      type: "Career",
      title: career.title,
      description:
        career.shortDescription ||
        career.description ||
        "",
      meta: [
        career.department,
        career.location,
        career.type,
      ]
        .filter(Boolean)
        .join(" • "),
      item: career,
    }));

  return [
    ...staticPages,
    ...projectResults,
    ...serviceResults,
    ...insightResults,
    ...careerResults,
  ];
}

function App() {
  const [activeProject, setActiveProject] =
    useState("All");

  const [testimonial, setTestimonial] =
    useState(0);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [enquiryOpen, setEnquiryOpen] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [selectedProject, setSelectedProject] =
    useState(() => getProjectFromPath());

  const [selectedService, setSelectedService] =
    useState(() => getServiceFromPath());

  const [selectedInsight, setSelectedInsight] =
    useState(() => getInsightFromPath());

  const [selectedCareer, setSelectedCareer] =
    useState(() => getCareerFromPath());

  const [selectedContact, setSelectedContact] =
    useState(() => getContactFromPath());

  /*
   * =====================================================
   * PHASE 9 — SEARCH
   * =====================================================
   */

  const searchIndex = useMemo(
    () => createSearchIndex(),
    []
  );

  const searchResults = useMemo(() => {
    const query =
      normalizeSearchText(searchQuery);

    if (!query) {
      return [];
    }

    const terms = query
      .split(/\s+/)
      .filter(Boolean);

    return searchIndex
      .map((result) => {
        const searchableText =
          normalizeSearchText(
            [
              result.title,
              result.description,
              result.meta,
            ].join(" ")
          );

        const normalizedTitle =
          normalizeSearchText(
            result.title
          );

        const matches = terms.filter(
          (term) =>
            searchableText.includes(term)
        );

        const titleMatches = terms.filter(
          (term) =>
            normalizedTitle.includes(term)
        );

        return {
          ...result,
          score:
            matches.length +
            titleMatches.length * 2,
        };
      })
      .filter(
        (result) => result.score > 0
      )
      .sort(
        (a, b) => b.score - a.score
      )
      .slice(0, 8);
  }, [searchIndex, searchQuery]);

  const filteredProjects =
    activeProject === "All"
      ? projects
      : projects.filter(
          (project) =>
            project.category === activeProject
        );

  /*
   * =====================================================
   * PHASE 9 — ANALYTICS INITIALIZATION
   * =====================================================
   */

  useEffect(() => {
    initAnalytics();
  }, []);

  /*
   * =====================================================
   * MODAL SCROLL LOCK
   * =====================================================
   */

  useEffect(() => {
    document.body.style.overflow =
      searchOpen || enquiryOpen
        ? "hidden"
        : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [searchOpen, enquiryOpen]);

  /*
   * =====================================================
   * PHASE 9 — DYNAMIC SEO + PAGE VIEW
   * =====================================================
   */

  useEffect(() => {
    const path = window.location.pathname;

    let title =
      "Planning Labs — Experiential & Digital Marketing";

    let description =
      "Planning Labs creates experiential and digital marketing solutions built around ideas, people and impact.";

    let image = "";

    if (selectedProject) {
      title = `${selectedProject.title} | Planning Labs`;

      description =
        selectedProject.overview ||
        selectedProject.description ||
        description;

      image = selectedProject.image || "";
    } else if (
      selectedService?.type === "vertical"
    ) {
      title = `${selectedService.title} | Planning Labs`;

      description =
        selectedService.verticalSlug ===
        "experiential"
          ? "Experiential marketing services from Planning Labs, including events, exhibitions, activations, MICE and more."
          : "Digital marketing services from Planning Labs, including social media, performance marketing, SEO and digital content.";
    } else if (selectedService) {
      title = `${selectedService.title} | Planning Labs`;

      description =
        selectedService.description ||
        `Planning Labs ${selectedService.title} services.`;

      image = selectedService.image || "";
    } else if (
      selectedInsight?.type === "listing"
    ) {
      title = "Insights | Planning Labs";

      description =
        "Explore Planning Labs insights, perspectives and ideas across experiential and digital marketing.";
    } else if (selectedInsight) {
      title = `${selectedInsight.title} | Planning Labs`;

      description =
        selectedInsight.excerpt ||
        selectedInsight.content ||
        description;

      image = selectedInsight.image || "";
    } else if (
      selectedCareer?.type === "listing"
    ) {
      title = "Careers | Planning Labs";

      description =
        "Explore career opportunities and join Planning Labs.";
    } else if (
      selectedCareer?.type === "application"
    ) {
      title =
        "Apply | Careers | Planning Labs";

      description =
        "Apply for an opportunity at Planning Labs.";
    } else if (selectedCareer) {
      title = `${selectedCareer.title} | Careers | Planning Labs`;

      description =
        selectedCareer.shortDescription ||
        selectedCareer.description ||
        description;
    } else if (selectedContact) {
      title = "Contact Planning Labs";

      description =
        "Get in touch with Planning Labs to discuss your next project.";
    }

    updateSEO({
      title,
      description,
      path,
      image,
    });

    trackPageView(path, title);
  }, [
    selectedProject,
    selectedService,
    selectedInsight,
    selectedCareer,
    selectedContact,
  ]);

  /*
   * =====================================================
   * BROWSER BACK / FORWARD
   * =====================================================
   */

  useEffect(() => {
    const handlePopState = () => {
      const project = getProjectFromPath();
      const service = getServiceFromPath();
      const insight = getInsightFromPath();
      const career = getCareerFromPath();
      const contact = getContactFromPath();

      setSelectedProject(project);
      setSelectedService(service);
      setSelectedInsight(insight);
      setSelectedCareer(career);
      setSelectedContact(contact);

      setSearchOpen(false);
      setSearchQuery("");
      setMenuOpen(false);

      window.scrollTo(0, 0);
    };

    window.addEventListener(
      "popstate",
      handlePopState
    );

    return () =>
      window.removeEventListener(
        "popstate",
        handlePopState
      );
  }, []);

  /*
   * =====================================================
   * TESTIMONIALS
   * =====================================================
   */

  const nextTestimonial = () => {
    if (!testimonials.length) return;

    setTestimonial(
      (current) =>
        (current + 1) % testimonials.length
    );
  };

  const previousTestimonial = () => {
    if (!testimonials.length) return;

    setTestimonial(
      (current) =>
        (current - 1 + testimonials.length) %
        testimonials.length
    );
  };

  /*
   * =====================================================
   * SCROLL
   * =====================================================
   */

  const scrollToSection = (id) => {
    setMenuOpen(false);

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  /*
   * =====================================================
   * SEARCH CONTROLS
   * =====================================================
   */

  const openSearch = () => {
    setSearchOpen(true);
    setMenuOpen(false);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  /*
   * =====================================================
   * CONTACT ROUTING
   * =====================================================
   */

  const openContact = () => {
    trackEnquiryStart();

    window.history.pushState(
      {},
      "",
      "/contact"
    );

    setSelectedProject(null);
    setSelectedService(null);
    setSelectedInsight(null);
    setSelectedCareer(null);
    setSelectedContact({
      type: "contact",
    });

    setSearchOpen(false);
    setSearchQuery("");
    setEnquiryOpen(false);
    setMenuOpen(false);

    window.scrollTo(0, 0);
  };

  const closeContact = () => {
    window.history.pushState({}, "", "/");

    setSelectedContact(null);

    window.scrollTo(0, 0);
  };

  /*
   * =====================================================
   * PROJECT ROUTING
   * =====================================================
   */

  const openProject = (project) => {
    if (!project) return;

    trackProjectView(project);

    window.history.pushState(
      {},
      "",
      `/work/${project.slug}`
    );

    setSelectedProject(project);
    setSelectedService(null);
    setSelectedInsight(null);
    setSelectedCareer(null);
    setSelectedContact(null);
    setSearchOpen(false);
    setSearchQuery("");
    setMenuOpen(false);

    window.scrollTo(0, 0);
  };

  const closeProject = () => {
    window.history.pushState({}, "", "/");

    setSelectedProject(null);

    window.scrollTo(0, 0);
  };

  /*
   * =====================================================
   * SERVICE ROUTING
   * =====================================================
   */

  const openService = (service) => {
    if (!service) return;

    trackServiceView(service);

    window.history.pushState(
      {},
      "",
      `/services/${service.verticalSlug}/${service.slug}`
    );

    setSelectedProject(null);
    setSelectedService(service);
    setSelectedInsight(null);
    setSelectedCareer(null);
    setSelectedContact(null);
    setSearchOpen(false);
    setSearchQuery("");
    setMenuOpen(false);

    window.scrollTo(0, 0);
  };

  const openServiceVertical = (
    verticalSlug
  ) => {
    window.history.pushState(
      {},
      "",
      `/services/${verticalSlug}`
    );

    setSelectedProject(null);
    setSelectedInsight(null);
    setSelectedCareer(null);
    setSelectedContact(null);

    setSelectedService({
      type: "vertical",
      verticalSlug,
      title:
        verticalSlug === "experiential"
          ? "Experiential Marketing"
          : "Digital Marketing",
    });

    setSearchOpen(false);
    setSearchQuery("");
    setMenuOpen(false);

    window.scrollTo(0, 0);
  };

  const closeService = () => {
    window.history.pushState({}, "", "/");

    setSelectedService(null);

    window.scrollTo(0, 0);
  };

  const selectRelatedService = (
    service
  ) => {
    openService(service);
  };

  const startProjectFromService = () => {
    openContact();
  };

  /*
   * =====================================================
   * CASE STUDY ROUTING
   * =====================================================
   */

  const selectRelatedProject = (
    project
  ) => {
    openProject(project);
  };

  const startProjectFromCaseStudy = () => {
    openContact();
  };

  /*
   * =====================================================
   * INSIGHTS ROUTING
   * =====================================================
   */

  const openInsights = () => {
    window.history.pushState(
      {},
      "",
      "/insights"
    );

    setSelectedProject(null);
    setSelectedService(null);
    setSelectedCareer(null);
    setSelectedContact(null);

    setSelectedInsight({
      type: "listing",
    });

    setSearchOpen(false);
    setSearchQuery("");
    setMenuOpen(false);

    window.scrollTo(0, 0);
  };

  const openInsight = (insight) => {
    if (!insight) return;

    trackInsightView(insight);

    window.history.pushState(
      {},
      "",
      `/insights/${insight.slug}`
    );

    setSelectedProject(null);
    setSelectedService(null);
    setSelectedCareer(null);
    setSelectedContact(null);
    setSelectedInsight(insight);
    setSearchOpen(false);
    setSearchQuery("");
    setMenuOpen(false);

    window.scrollTo(0, 0);
  };

  const closeInsight = () => {
    window.history.pushState({}, "", "/");

    setSelectedInsight(null);

    window.scrollTo(0, 0);
  };

  /*
   * =====================================================
   * PHASE 6 — CAREERS ROUTING
   * =====================================================
   */

  const openCareers = () => {
    window.history.pushState(
      {},
      "",
      "/careers"
    );

    setSelectedProject(null);
    setSelectedService(null);
    setSelectedInsight(null);
    setSelectedContact(null);

    setSelectedCareer({
      type: "listing",
    });

    setSearchOpen(false);
    setSearchQuery("");
    setMenuOpen(false);

    window.scrollTo(0, 0);
  };

  const openCareer = (job) => {
    if (!job) return;

    trackCareerView(job);

    window.history.pushState(
      {},
      "",
      `/careers/${job.slug}`
    );

    setSelectedProject(null);
    setSelectedService(null);
    setSelectedInsight(null);
    setSelectedContact(null);

    setSelectedCareer(job);

    setSearchOpen(false);
    setSearchQuery("");
    setMenuOpen(false);

    window.scrollTo(0, 0);
  };

  const openApplication = (job) => {
    if (job) {
      window.history.pushState(
        {},
        "",
        `/careers/${job.slug}/apply`
      );
    } else {
      window.history.pushState(
        {},
        "",
        "/careers/apply"
      );
    }

    setSelectedProject(null);
    setSelectedService(null);
    setSelectedInsight(null);
    setSelectedContact(null);

    setSelectedCareer({
      type: "application",
      job: job || null,
    });

    setSearchOpen(false);
    setSearchQuery("");
    setMenuOpen(false);

    window.scrollTo(0, 0);
  };

  const closeCareer = () => {
    window.history.pushState({}, "", "/");

    setSelectedCareer(null);

    window.scrollTo(0, 0);
  };

  /*
   * =====================================================
   * PHASE 9 — SEARCH RESULT ROUTING
   * =====================================================
   */

  const openSearchResult = (result) => {
    if (!result) return;

    trackSearch(searchQuery);

    if (result.id === "page-about") {
      closeSearch();

      if (
        window.location.pathname !== "/"
      ) {
        window.history.pushState(
          {},
          "",
          "/"
        );

        setSelectedProject(null);
        setSelectedService(null);
        setSelectedInsight(null);
        setSelectedCareer(null);
        setSelectedContact(null);

        window.scrollTo(0, 0);

        window.setTimeout(() => {
          scrollToSection("about");
        }, 50);
      } else {
        scrollToSection("about");
      }

      return;
    }

    if (result.id === "page-work") {
      closeSearch();

      if (
        window.location.pathname !== "/"
      ) {
        window.history.pushState(
          {},
          "",
          "/"
        );

        setSelectedProject(null);
        setSelectedService(null);
        setSelectedInsight(null);
        setSelectedCareer(null);
        setSelectedContact(null);

        window.scrollTo(0, 0);

        window.setTimeout(() => {
          scrollToSection("work");
        }, 50);
      } else {
        scrollToSection("work");
      }

      return;
    }

    if (result.id === "page-insights") {
      closeSearch();
      openInsights();
      return;
    }

    if (result.id === "page-careers") {
      closeSearch();
      openCareers();
      return;
    }

    if (result.id === "page-contact") {
      closeSearch();
      openContact();
      return;
    }

    if (
      result.id === "page-experiential" ||
      result.id === "page-digital"
    ) {
      closeSearch();

      openServiceVertical(
        result.item.verticalSlug
      );

      return;
    }

    if (result.type === "Project") {
      closeSearch();
      openProject(result.item);
      return;
    }

    if (result.type === "Service") {
      closeSearch();
      openService(result.item);
      return;
    }

    if (result.type === "Insight") {
      closeSearch();
      openInsight(result.item);
      return;
    }

    if (result.type === "Career") {
      closeSearch();
      openCareer(result.item);
    }
  };

  /*
   * =====================================================
   * PHASE 7 — CONTACT PAGE
   * =====================================================
   */

  if (selectedContact) {
    return (
      <Contact
        onBack={closeContact}
      />
    );
  }

  /*
   * =====================================================
   * PHASE 6 — CAREERS LISTING
   * =====================================================
   */

  if (selectedCareer?.type === "listing") {
    return (
      <Careers
        careers={careers}
        onBack={closeCareer}
        onJobSelect={openCareer}
        onStartApplication={openApplication}
      />
    );
  }

  /*
   * =====================================================
   * PHASE 6 — JOB APPLICATION
   * =====================================================
   */

  if (
    selectedCareer?.type ===
    "application"
  ) {
    return (
      <JobApplication
        job={selectedCareer.job}
        onBack={() => {
          if (selectedCareer.job) {
            openCareer(
              selectedCareer.job
            );
          } else {
            openCareers();
          }
        }}
      />
    );
  }

  /*
   * =====================================================
   * PHASE 6 — INDIVIDUAL JOB
   * =====================================================
   */

  if (selectedCareer) {
    return (
      <JobDetail
        job={selectedCareer}
        careers={careers}
        onBack={openCareers}
        onJobSelect={openCareer}
        onApply={openApplication}
      />
    );
  }

  /*
   * =====================================================
   * PHASE 5 — INSIGHTS LISTING
   * =====================================================
   */

  if (
    selectedInsight?.type ===
    "listing"
  ) {
    return (
      <Insights
        insights={insights}
        onBack={closeInsight}
        onInsightSelect={openInsight}
        onStartProject={openContact}
      />
    );
  }

  /*
   * =====================================================
   * PHASE 5 — INDIVIDUAL INSIGHT
   * =====================================================
   */

  if (selectedInsight) {
    return (
      <InsightArticle
        insight={selectedInsight}
        insights={insights}
        onBack={openInsights}
        onInsightSelect={openInsight}
        onStartProject={openContact}
      />
    );
  }

  /*
   * =====================================================
   * PHASE 4 — SERVICE VERTICAL
   * =====================================================
   */

  if (
    selectedService?.type ===
    "vertical"
  ) {
    return (
      <ServiceOverview
        vertical={
          selectedService.verticalSlug
        }
        services={serviceCatalog}
        onBack={closeService}
        onServiceSelect={openService}
        onStartProject={
          startProjectFromService
        }
      />
    );
  }

  /*
   * =====================================================
   * PHASE 4 — INDIVIDUAL SERVICE
   * =====================================================
   */

  if (selectedService) {
    return (
      <ServicePage
        service={selectedService}
        services={serviceCatalog}
        onBack={() => {
          openServiceVertical(
            selectedService.verticalSlug
          );
        }}
        onServiceSelect={
          selectRelatedService
        }
        onStartProject={
          startProjectFromService
        }
      />
    );
  }

  /*
   * =====================================================
   * PHASE 3 — CASE STUDY
   * =====================================================
   */

  if (selectedProject) {
    return (
      <CaseStudy
        project={selectedProject}
        projects={projects}
        onBack={closeProject}
        onProjectSelect={
          selectRelatedProject
        }
        onStartProject={
          startProjectFromCaseStudy
        }
      />
    );
  }

  /*
   * =====================================================
   * HOMEPAGE
   * =====================================================
   */

  return (
    <div className="site">
      {/* HEADER */}
      <header className="header">
        <button
          className="brand"
          onClick={() =>
            scrollToSection("home")
          }
          aria-label="Planning Labs home"
        >
          <span>Planning</span>
          <strong>Labs</strong>
          <i>⌬</i>
        </button>

        <nav
          className={`nav ${
            menuOpen ? "nav-open" : ""
          }`}
        >
          <button
            onClick={() =>
              scrollToSection("work")
            }
          >
            Our Work
          </button>

          <button
            onClick={() =>
              scrollToSection("services")
            }
          >
            Services
          </button>

          <button
            onClick={() =>
              scrollToSection("about")
            }
          >
            About
          </button>

          <button
            onClick={() =>
              scrollToSection("clients")
            }
          >
            Our Clients
          </button>

          <button onClick={openInsights}>
            Insights
          </button>

          <button onClick={openCareers}>
            Careers
          </button>

          <button onClick={openContact}>
            Contact
          </button>
        </nav>

        <div className="header-actions">
          <button
            className="search-button"
            onClick={openSearch}
            aria-label="Search website"
          >
            ⌕
          </button>

          <button
            className="primary-button header-button"
            onClick={openContact}
          >
            Enquire <Arrow />
          </button>

          <button
            className="menu-button"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section
          className="hero"
          id="home"
        >
          <div className="hero-background" />
          <div className="hero-overlay" />

          <div className="hero-content">
            <h1>
              We create
              <br />
              <span>experiences</span>
              <br />
              that move
              <br />
              brands.
            </h1>

            <p>
              Experiential and digital marketing
              solutions designed to make brands
              impossible to ignore.
            </p>

            <div className="hero-actions">
              <button
                className="primary-button"
                onClick={() =>
                  scrollToSection("work")
                }
              >
                Explore Our Work{" "}
                <Arrow />
              </button>

              <button
                className="text-button"
                onClick={openContact}
              >
                Start a Project <Arrow />
              </button>
            </div>
          </div>

          <div className="hero-bottom">
            <span>
              SCROLL TO EXPLORE
            </span>

            <span>01 / 09</span>
          </div>
        </section>

        {/* ABOUT */}
        <section
          className="section about-section"
          id="about"
        >
          <div className="section-label">
            01 — ABOUT PLANNING LABS
          </div>

          <div className="about-grid">
            <h2>
              Ideas are only
              <br />
              <span>the beginning.</span>
            </h2>

            <div className="about-copy">
              <p className="large-copy">
                We bring together strategy,
                creativity and execution to create
                experiences that connect brands with
                people.
              </p>

              <p>
                From physical experiences and events
                to digital campaigns and creative
                content, Planning Labs brings multiple
                capabilities together under one roof.
              </p>

              <button
  className="outline-button"
  onClick={() => scrollToSection("about")}
>
  Discover Planning Labs{" "}
  <Arrow />
</button>
            </div>
          </div>
        </section>

        {/* SELECTED WORK */}
        <section
          className="section dark-section work-section"
          id="work"
        >
          <div className="work-heading phase-two-heading">
            <div>
              <div className="section-label light-label">
                02 — SELECTED WORK
              </div>

              <h2>
                Work that
                <br />
                <span>
                  speaks for itself.
                </span>
              </h2>
            </div>

            <div className="work-intro">
              <p>
                A selection of experiential and
                digital concepts designed around
                people, brands and meaningful
                interaction.
              </p>

              <span className="work-count">
                {filteredProjects.length
                  .toString()
                  .padStart(2, "0")}{" "}
                PROJECTS
              </span>
            </div>
          </div>

          <div
            className="filter-row"
            role="tablist"
            aria-label="Project filters"
          >
            {[
              "All",
              "Experiential",
              "Digital",
            ].map((filter) => (
              <button
                key={filter}
                role="tab"
                aria-selected={
                  activeProject === filter
                }
                className={
                  activeProject === filter
                    ? "filter-active"
                    : ""
                }
                onClick={() =>
                  setActiveProject(filter)
                }
              >
                {filter}

                <span>
                  {filter === "All"
                    ? projects.length
                    : projects.filter(
                        (project) =>
                          project.category ===
                          filter
                      ).length}
                </span>
              </button>
            ))}
          </div>

          <div className="project-grid phase-two-grid">
            {filteredProjects.map(
              (project, index) => (
                <article
                  className={`project-card phase-two-card ${
                    project.featured
                      ? "project-featured"
                      : ""
                  }`}
                  key={project.id}
                  onClick={() =>
                    openProject(project)
                  }
                  tabIndex="0"
                  role="button"
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" ||
                      event.key === " "
                    ) {
                      event.preventDefault();
                      openProject(project);
                    }
                  }}
                  aria-label={`View ${project.title}`}
                >
                  <div className="project-image phase-two-image">
                    <img
                      src={project.image}
                      alt=""
                      loading={
                        index > 1
                          ? "lazy"
                          : "eager"
                      }
                    />

                    <div className="project-image-shade" />

                    <span className="project-number">
                      {project.number}
                    </span>

                    <span className="project-category">
                      {project.category}
                    </span>

                    <div className="project-view">
                      <span>
                        View Case Study
                      </span>

                      <span className="project-view-arrow">
                        <Arrow />
                      </span>
                    </div>
                  </div>

                  <div className="project-meta phase-two-meta">
                    <div>
                      <span>
                        {project.type}
                      </span>

                      <span>
                        {project.location}
                      </span>
                    </div>

                    <span>
                      {project.year}
                    </span>
                  </div>

                  <h3>{project.title}</h3>
                </article>
              )
            )}
          </div>

          <div className="work-bottom">
            <span>
              {filteredProjects.length} selected{" "}
              {filteredProjects.length === 1
                ? "project"
                : "projects"}
            </span>

            <button
              className="light-button"
              onClick={() =>
                setActiveProject("All")
              }
            >
              View All Work <Arrow />
            </button>
          </div>
        </section>

        {/* SERVICES */}
        <section
          className="section services-section"
          id="services"
        >
          <div className="section-label">
            03 — WHAT WE DO
          </div>

          <div className="services-heading">
            <h2>
              Two worlds.
              <br />
              <span>
                One connected
              </span>
              <br />
              approach.
            </h2>

            <p>
              Strategy, creativity and execution
              working together across physical and
              digital brand experiences.
            </p>
          </div>

          <div className="service-columns">
            {/* EXPERIENTIAL */}
            <div className="service-panel experiential-panel">
              <div className="service-top">
                <span>01</span>
                <span>
                  EXPERIENTIAL
                </span>
              </div>

              <h3>
                Experiential Marketing
              </h3>

              <p>
                Creating meaningful brand
                experiences through events,
                activations, exhibitions and
                immersive experiences.
              </p>

              <div className="service-list">
                {services.experiential.map(
                  (service) => {
                    const serviceItem =
                      serviceCatalog.find(
                        (item) =>
                          item.title === service
                      );

                    return (
                      <button
                        key={service}
                        onClick={() =>
                          openService(
                            serviceItem
                          )
                        }
                      >
                        {service}
                        <Arrow />
                      </button>
                    );
                  }
                )}
              </div>

              <button
                className="service-link"
                onClick={() =>
                  openServiceVertical(
                    "experiential"
                  )
                }
              >
                Explore Services{" "}
                <Arrow />
              </button>
            </div>

            {/* DIGITAL */}
            <div className="service-panel digital-panel">
              <div className="service-top">
                <span>02</span>
                <span>DIGITAL</span>
              </div>

              <h3>
                Digital Marketing
              </h3>

              <p>
                Building digital experiences and
                campaigns that connect brands with
                the audiences that matter.
              </p>

              <div className="service-list">
                {services.digital.map(
                  (service) => {
                    const serviceItem =
                      serviceCatalog.find(
                        (item) =>
                          item.title === service
                      );

                    return (
                      <button
                        key={service}
                        onClick={() =>
                          openService(
                            serviceItem
                          )
                        }
                      >
                        {service}
                        <Arrow />
                      </button>
                    );
                  }
                )}
              </div>

              <button
                className="service-link"
                onClick={() =>
                  openServiceVertical(
                    "digital"
                  )
                }
              >
                Explore Services{" "}
                <Arrow />
              </button>
            </div>
          </div>
        </section>

        {/* NUMBERS */}
        <section className="section numbers-section">
          <div className="section-label">
            04 — THE NUMBERS
          </div>

          <div className="numbers-heading">
            <h2>
              Experience backed
              <br />
              by <span>execution.</span>
            </h2>

            <p>
              Selected achievements and statistics
              are managed through the CMS content
              layer and can be updated without
              changing the page structure.
            </p>
          </div>

          <div className="numbers-grid">
            {statistics.map(
              (stat) => (
                <div key={stat.label}>
                  <strong>
                    {stat.value}
                    <span>
                      {stat.suffix}
                    </span>
                  </strong>

                  <small>
                    {stat.label}
                  </small>
                </div>
              )
            )}
          </div>

          <p className="footnote">
            *Illustrative figures based on the
            current website and subject to validation
            and approval before launch.
          </p>
        </section>

        {/* INDUSTRIES */}
        <section className="section industries-section">
          <div className="section-label">
            05 — INDUSTRIES
          </div>

          <div className="industries-layout">
            <h2>
              Built for brands
              <br />
              <span>
                across industries.
              </span>
            </h2>

            <div className="industry-list">
              {industries.map(
                (industry, index) => (
                  <div key={industry}>
                    <span>
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>

                    <strong>
                      {industry}
                    </strong>

                    <Arrow />
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* CLIENTS */}
        <section
          className="section clients-section"
          id="clients"
        >
          <div className="section-label centered-label">
            06 — CLIENTS
          </div>

          <h2 className="center-heading">
            Trusted by brands
            <br />
            <span>
              that think forward.
            </span>
          </h2>

          <div className="client-grid">
            {clients.map((client) => (
              <div
                className="client-logo"
                key={client}
              >
                {client}
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="section testimonial-section">
          <div className="section-label">
            07 — TESTIMONIALS
          </div>

          <div className="testimonial-heading">
            <h2>
              What our
              <br />
              <span>
                clients say.
              </span>
            </h2>

            <div className="testimonial-controls">
              <button
                onClick={
                  previousTestimonial
                }
                aria-label="Previous testimonial"
              >
                ←
              </button>

              <button
                onClick={
                  nextTestimonial
                }
                aria-label="Next testimonial"
              >
                →
              </button>
            </div>
          </div>

          {testimonials.length > 0 && (
            <>
              <div className="testimonial-card">
                <div className="quote-mark">
                  “
                </div>

                <blockquote>
                  {
                    testimonials[
                      testimonial
                    ].quote
                  }
                </blockquote>

                <div className="testimonial-person">
                  <strong>
                    {
                      testimonials[
                        testimonial
                      ].name
                    }
                  </strong>

                  <span>
                    {
                      testimonials[
                        testimonial
                      ].role
                    }
                    ,{" "}
                    {
                      testimonials[
                        testimonial
                      ].company
                    }
                  </span>
                </div>
              </div>

              <div className="testimonial-dots">
                {testimonials.map(
                  (item, index) => (
                    <button
                      key={item.name}
                      className={
                        testimonial ===
                        index
                          ? "dot-active"
                          : ""
                      }
                      onClick={() =>
                        setTestimonial(
                          index
                        )
                      }
                      aria-label={`Testimonial ${
                        index + 1
                      }`}
                    />
                  )
                )}
              </div>
            </>
          )}
        </section>

        {/* INSIGHTS */}
        <section
          className="section insights-section"
          id="insights"
        >
          <div className="insights-heading">
            <div>
              <div className="section-label">
                08 — INSIGHTS
              </div>

              <h2>
                Ideas worth
                <br />
                <span>
                  exploring.
                </span>
              </h2>
            </div>

            <button
              className="outline-button"
              onClick={openInsights}
            >
              View All Insights{" "}
              <Arrow />
            </button>
          </div>

          <div className="insight-grid">
            {insights
              .slice(0, 3)
              .map(
                (item, index) => (
                  <article
                    className="insight-card"
                    key={item.slug}
                    onClick={() =>
                      openInsight(item)
                    }
                    tabIndex="0"
                    role="button"
                    onKeyDown={(
                      event
                    ) => {
                      if (
                        event.key ===
                          "Enter" ||
                        event.key === " "
                      ) {
                        event.preventDefault();
                        openInsight(
                          item
                        );
                      }
                    }}
                    aria-label={`Read ${item.title}`}
                  >
                    <div className="insight-image">
                      <img
                        src={item.image}
                        alt={
                          item.title
                        }
                        loading={
                          index === 0
                            ? "eager"
                            : "lazy"
                        }
                      />

                      <span>
                        {item.number}
                      </span>
                    </div>

                    <div className="insight-meta">
                      <span>
                        {
                          item.category
                        }
                      </span>

                      <span>
                        {item.readTime ||
                          "INSIGHTS"}
                      </span>
                    </div>

                    <h3>
                      {item.title}
                    </h3>

                    <button
                      className="text-button dark-text"
                      onClick={(
                        event
                      ) => {
                        event.stopPropagation();
                        openInsight(
                          item
                        );
                      }}
                    >
                      Read Article{" "}
                      <Arrow />
                    </button>
                  </article>
                )
              )}
          </div>
        </section>

        {/* CAREERS */}
        <section
          className="careers-section"
          id="careers"
        >
          <div className="careers-content">
            <div className="section-label light-label">
              09 — CAREERS
            </div>

            <h2>
              Create.
              <br />
              Collaborate.
              <br />
              <span>
                Experiment.
              </span>
            </h2>

            <p>
              Great work happens when curious people
              come together. Explore opportunities and
              become part of Planning Labs.
            </p>

            <button
              className="primary-button"
              onClick={openCareers}
            >
              Explore Careers{" "}
              <Arrow />
            </button>
          </div>

          <div className="careers-art">
            <div className="art-circle circle-one" />
            <div className="art-circle circle-two" />
            <div className="art-circle circle-three" />
          </div>
        </section>

        {/* CTA */}
        <section
          className="section cta-section"
          id="contact"
        >
          <div className="section-label">
            10 — LET'S TALK
          </div>

          <div className="cta-grid">
            <div>
              <h2>
                Have a project
                <br />
                <span>
                  in mind?
                </span>
              </h2>

              <p>
                Tell us what you're planning. Let's
                create something people remember.
              </p>
            </div>

            <div className="cta-actions">
              <button
                className="primary-button large-cta"
                onClick={openContact}
              >
                Start a Project{" "}
                <Arrow />
              </button>

              <div className="contact-links">
                <a
                  href="tel:+912240000000"
                  onClick={trackCallClick}
                >
                  Call Us <Arrow />
                </a>

                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noreferrer"
                  onClick={trackWhatsAppClick}
                >
                  WhatsApp <Arrow />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <button
              className="brand footer-logo"
              onClick={() =>
                scrollToSection("home")
              }
            >
              <span>Planning</span>
              <strong>Labs</strong>
              <i>⌬</i>
            </button>

            <p>
              Experiential and digital marketing
              solutions built around ideas, people and
              impact.
            </p>
          </div>

          <div className="footer-column">
            <h4>EXPLORE</h4>

            <button
              onClick={() =>
                scrollToSection("about")
              }
            >
              About
            </button>

            <button
              onClick={() =>
                scrollToSection("services")
              }
            >
              Services
            </button>

            <button
              onClick={() =>
                scrollToSection("work")
              }
            >
              Our Work
            </button>

            <button onClick={openInsights}>
              Insights
            </button>
          </div>

          <div className="footer-column">
            <h4>COMPANY</h4>

            <button
              onClick={() =>
                scrollToSection("clients")
              }
            >
              Clients
            </button>

            <button onClick={openCareers}>
              Careers
            </button>

            <button onClick={openContact}>
              Contact
            </button>

            <button>
              Company Profile
            </button>
          </div>

          <div className="footer-column">
            <h4>CONNECT</h4>

            <a
              href="#"
              aria-label="LinkedIn"
            >
              LinkedIn ↗
            </a>

            <a
              href="#"
              aria-label="Instagram"
            >
              Instagram ↗
            </a>

            <a
              href="#"
              aria-label="YouTube"
            >
              YouTube ↗
            </a>

            <a
              href="#"
              aria-label="Behance"
            >
              Behance ↗
            </a>
          </div>
        </div>

        <div className="footer-locations">
          {locations.map((location) => (
            <div key={location.country}>
              <strong>
                {location.country}
              </strong>

              <span>
                {location.address}
              </span>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Planning
            Labs. All rights reserved.
          </span>

          <span>
            Privacy Policy
          </span>

          <span>
            Terms & Conditions
          </span>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
  className="whatsapp-button"
  href="https://wa.me/919999999999"
  target="_blank"
  rel="noreferrer"
  onClick={trackWhatsAppClick}
  aria-label="Chat on WhatsApp"
>
  <svg
    viewBox="0 0 32 32"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="currentColor"
      d="M16 2.5A13.5 13.5 0 0 0 4.34 22.82L2.5 29.5l6.87-1.8A13.5 13.5 0 1 0 16 2.5Zm0 24.6a11.1 11.1 0 0 1-5.66-1.55l-.4-.24-4.08 1.07 1.09-3.97-.26-.41A11.1 11.1 0 1 1 16 27.1Zm6.08-8.2c-.33-.17-1.95-.96-2.25-1.07-.3-.11-.52-.17-.74.17-.22.33-.85 1.07-1.04 1.29-.19.22-.38.25-.71.08-.33-.17-1.39-.51-2.65-1.63-.98-.87-1.64-1.94-1.83-2.27-.19-.33-.02-.51.14-.68.15-.15.33-.38.49-.57.16-.19.22-.33.33-.55.11-.22.05-.41-.03-.58-.08-.17-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.58.08-.88.41-.3.33-1.15 1.12-1.15 2.73s1.18 3.17 1.34 3.39c.16.22 2.32 3.54 5.62 4.96.79.34 1.41.54 1.89.69.79.25 1.51.21 2.08.13.63-.09 1.95-.8 2.23-1.57.27-.77.27-1.43.19-1.57-.08-.14-.3-.22-.63-.39Z"
    />
  </svg>
</a>

      {/* SEARCH */}
      {searchOpen && (
        <div
          className="modal-overlay"
          onClick={closeSearch}
        >
          <div
            className="search-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-title"
          >
            <button
              className="modal-close"
              onClick={closeSearch}
              aria-label="Close search"
            >
              ×
            </button>

            <span className="section-label">
              SEARCH
            </span>

            <h2 id="search-title">
              What are you looking for?
            </h2>

            <div className="search-input-wrap">
              <input
                type="search"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(
                    event.target.value
                  )
                }
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    searchResults.length > 0
                  ) {
                    openSearchResult(
                      searchResults[0]
                    );
                  }

                  if (
                    event.key === "Escape"
                  ) {
                    closeSearch();
                  }
                }}
                placeholder="Search projects, services, insights, careers..."
                autoFocus
                aria-label="Search Planning Labs"
              />

              {searchQuery && (
                <button
                  className="search-clear"
                  onClick={() =>
                    setSearchQuery("")
                  }
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            {searchQuery.trim() ? (
              searchResults.length > 0 ? (
                <div
                  className="search-results"
                  role="listbox"
                  aria-label="Search results"
                >
                  {searchResults.map(
                    (result) => (
                      <button
                        key={result.id}
                        className="search-result"
                        onClick={() =>
                          openSearchResult(
                            result
                          )
                        }
                        role="option"
                      >
                        <span className="search-result-type">
                          {result.type}
                        </span>

                        <span className="search-result-content">
                          <strong>
                            {result.title}
                          </strong>

                          {result.meta && (
                            <span>
                              {result.meta}
                            </span>
                          )}
                        </span>

                        <span className="search-result-arrow">
                          <Arrow />
                        </span>
                      </button>
                    )
                  )}
                </div>
              ) : (
                <div className="search-empty">
                  No results found for{" "}
                  <strong>
                    "{searchQuery.trim()}"
                  </strong>
                  .
                </div>
              )
            ) : (
              <p className="search-hint">
                Search across projects, services,
                insights, careers and company
                information. Press Enter to open
                the first result.
              </p>
            )}
          </div>
        </div>
      )}

      {/* LEGACY ENQUIRY MODAL — PRESERVED */}
      {enquiryOpen && (
        <div
          className="modal-overlay"
          onClick={() =>
            setEnquiryOpen(false)
          }
        >
          <div
            className="enquiry-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="modal-close"
              onClick={() =>
                setEnquiryOpen(false)
              }
              aria-label="Close enquiry form"
            >
              ×
            </button>

            <span className="section-label">
              START A PROJECT
            </span>

            <h2>
              Tell us what you're planning.
            </h2>

            <form
              onSubmit={(event) => {
                event.preventDefault();

                trackEnquirySubmit();

                alert(
                  "Thank you. Your enquiry form is ready to connect with the backend/CMS."
                );
              }}
            >
              <div className="form-grid">
                <label>
                  Name

                  <input
                    required
                    type="text"
                    placeholder="Your name"
                  />
                </label>

                <label>
                  Email

                  <input
                    required
                    type="email"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <div className="form-grid">
                <label>
                  Phone

                  <input
                    type="tel"
                    placeholder="+91"
                  />
                </label>

                <label>
                  Service

                  <select defaultValue="">
                    <option
                      value=""
                      disabled
                    >
                      Select a service
                    </option>

                    <option>
                      Experiential Marketing
                    </option>

                    <option>
                      Digital Marketing
                    </option>

                    <option>
                      Website Development
                    </option>

                    <option>
                      Creative Design
                    </option>

                    <option>
                      Other
                    </option>
                  </select>
                </label>
              </div>

              <label>
                Project Brief

                <textarea
                  rows="5"
                  placeholder="Tell us a little about your project..."
                />
              </label>

              <label className="file-input">
                Attach Brief

                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                />

                <span>
                  PDF, DOC or PPT
                </span>
              </label>

              <button
                className="primary-button submit-button"
                type="submit"
              >
                Send Enquiry{" "}
                <Arrow />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
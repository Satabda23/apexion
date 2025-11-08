// Privacy Policy JavaScript Functions - Dental Clinic Design

/**
 * Smooth scroll to a specific section with offset
 * @param {string} sectionId - The ID of the section to scroll to
 */
export const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);

  if (section) {
    // Calculate offset for fixed headers
    const offset = 80;
    const sectionPosition =
      section.getBoundingClientRect().top + window.pageYOffset - offset;

    // Smooth scroll to section
    window.scrollTo({
      top: sectionPosition,
      behavior: "smooth",
    });

    // Add brief highlight animation
    section.style.animation = "sectionHighlight 1.5s ease";
    setTimeout(() => {
      section.style.animation = "";
    }, 1500);
  }
};

/**
 * Initialize accordion functionality
 */
export const initializeAccordion = () => {
  // Wait for DOM to be ready
  setTimeout(() => {
    const accordionBtns = document.querySelectorAll(".accordion-btn");

    accordionBtns.forEach((btn) => {
      // Remove any existing listeners to prevent duplicates
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);

      // Add click event listener
      newBtn.addEventListener("click", function (e) {
        e.preventDefault();

        const accordionItem = this.closest(".accordion-item");
        const accordionContent =
          accordionItem.querySelector(".accordion-content");
        const isActive = accordionItem.classList.contains("active");

        // Close all accordion items
        document.querySelectorAll(".accordion-item").forEach((item) => {
          if (item !== accordionItem) {
            item.classList.remove("active");
            const content = item.querySelector(".accordion-content");
            if (content) {
              content.style.maxHeight = "0";
            }
          }
        });

        // Toggle current accordion item
        if (isActive) {
          accordionItem.classList.remove("active");
          if (accordionContent) {
            accordionContent.style.maxHeight = "0";
          }
        } else {
          accordionItem.classList.add("active");
          if (accordionContent) {
            accordionContent.style.maxHeight =
              accordionContent.scrollHeight + 50 + "px";
          }
        }
      });
    });
  }, 100);
};

/**
 * Handle scroll animations for sections
 */
export const initScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all content sections
  const sections = document.querySelectorAll(".content-section");
  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });
};

/**
 * Track active section in navigation
 */
export const trackActiveSection = () => {
  const sections = document.querySelectorAll(
    '[id^="information-"], [id^="data-"], [id^="cookies"], [id^="user-"]'
  );
  const navCards = document.querySelectorAll(".nav-card");

  const updateActiveNav = () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const scrollPosition = window.pageYOffset + 150;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navCards.forEach((card) => {
      const onClick = card.getAttribute("onclick");
      if (onClick && onClick.includes(currentSection)) {
        card.style.borderColor = "#6C5DD3";
        card.style.background = "rgba(108, 93, 211, 0.05)";
      } else {
        card.style.borderColor = "";
        card.style.background = "";
      }
    });
  };

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();
};

/**
 * Add smooth reveal animation to cards
 */
export const animateCards = () => {
  const cards = document.querySelectorAll(
    ".nav-card, .content-card, .use-item, .sharing-card, .security-feature, .right-item"
  );

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 50);
      }
    });
  }, observerOptions);

  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(card);
  });
};

/**
 * Handle URL hash navigation
 */
export const handleHashNavigation = () => {
  if (window.location.hash) {
    const sectionId = window.location.hash.substring(1);
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 500);
  }

  // Listen for hash changes
  window.addEventListener("hashchange", () => {
    const sectionId = window.location.hash.substring(1);
    if (sectionId) {
      scrollToSection(sectionId);
    }
  });
};

/**
 * Add CSS animations dynamically
 */
const addAnimationStyles = () => {
  if (!document.getElementById("privacy-animations")) {
    const style = document.createElement("style");
    style.id = "privacy-animations";
    style.textContent = `
      @keyframes sectionHighlight {
        0%, 100% {
          background-color: transparent;
        }
        50% {
          background-color: rgba(108, 93, 211, 0.08);
        }
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
  }
};

/**
 * Initialize all privacy policy features
 */
export const initPrivacyPolicy = () => {
  // Add animation styles
  addAnimationStyles();

  // Initialize accordion
  initializeAccordion();

  // Initialize scroll animations
  initScrollAnimations();

  // Track active section
  trackActiveSection();

  // Animate cards on scroll
  animateCards();

  // Handle hash navigation
  handleHashNavigation();

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#") {
        e.preventDefault();
        const sectionId = href.substring(1);
        scrollToSection(sectionId);
        window.history.pushState(null, null, href);
      }
    });
  });
};

// Auto-initialize when DOM is ready
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPrivacyPolicy);
  } else {
    initPrivacyPolicy();
  }
}

// Export all functions
const privacyPolicyModule = {
  scrollToSection,
  initializeAccordion,
  initScrollAnimations,
  trackActiveSection,
  animateCards,
  handleHashNavigation,
  initPrivacyPolicy,
};

export default privacyPolicyModule;

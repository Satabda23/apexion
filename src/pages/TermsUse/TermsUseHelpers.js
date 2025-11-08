// Terms of Use Helper Functions - Dental Clinic Design

/**
 * Smooth scroll to a specific section with offset
 * @param {string} sectionId - The ID of the section to scroll to
 */
export const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);

  if (section) {
    const offset = 80;
    const sectionPosition =
      section.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: sectionPosition,
      behavior: "smooth",
    });

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
  setTimeout(() => {
    const accordionBtns = document.querySelectorAll(".accordion-btn");

    accordionBtns.forEach((btn) => {
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);

      newBtn.addEventListener("click", function (e) {
        e.preventDefault();

        const accordionItem = this.closest(".accordion-item");
        const accordionContent =
          accordionItem.querySelector(".accordion-content");
        const isActive = accordionItem.classList.contains("active");

        document.querySelectorAll(".accordion-item").forEach((item) => {
          if (item !== accordionItem) {
            item.classList.remove("active");
            const content = item.querySelector(".accordion-content");
            if (content) {
              content.style.maxHeight = "0";
            }
          }
        });

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
 * Add CSS animations dynamically
 */
const addAnimationStyles = () => {
  if (!document.getElementById("terms-animations")) {
    const style = document.createElement("style");
    style.id = "terms-animations";
    style.textContent = `
      @keyframes sectionHighlight {
        0%, 100% {
          background-color: transparent;
        }
        50% {
          background-color: rgba(108, 93, 211, 0.08);
        }
      }
    `;
    document.head.appendChild(style);
  }
};

// Auto-add animation styles when module loads
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addAnimationStyles);
  } else {
    addAnimationStyles();
  }
}

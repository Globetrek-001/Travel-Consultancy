(function () {
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  const currentPage = document.querySelector("main")?.dataset.currentPage;

  if (currentPage) {
    document.querySelectorAll(".site-nav a").forEach((link) => {
      if (link.dataset.page === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
  }

  const form = document.querySelector("#consultation-form");

  if (!form) {
    return;
  }

  const status = form.querySelector(".form-status");
  const requiredFields = Array.from(form.querySelectorAll("[required]"));

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;

    requiredFields.forEach((field) => {
      const hasValue = field.value.trim().length > 0;
      field.classList.toggle("field-error", !hasValue);

      if (!hasValue) {
        isValid = false;
      }
    });

    if (!isValid) {
      status.textContent = "Please complete the required fields before sending your inquiry.";
      return;
    }

    const data = new FormData(form);
    const message = [
      "Hello GlobeTrek Solutions, I would like to make an inquiry.",
      "",
      `Name: ${data.get("name")}`,
      `Contact: ${data.get("contact")}`,
      `Service: ${data.get("service")}`,
      `Destination/Country: ${data.get("destination") || "Not specified"}`,
      "",
      `Message: ${data.get("message")}`
    ].join("\n");

    status.textContent = "Opening WhatsApp with your inquiry...";
    window.open(`https://wa.me/2348038876566?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  });
})();

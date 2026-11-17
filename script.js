const menuButton = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
  navMenu.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
}
menuButton.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation",
  );
});
navMenu
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav-wrap")) closeMenu();
});
document.getElementById("year").textContent = new Date().getFullYear();

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.09 },
  );
  document
    .querySelectorAll(".reveal")
    .forEach((element) => revealObserver.observe(element));

  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting)
          navLinks.forEach((link) =>
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entry.target.id,
            ),
          );
      });
    },
    { rootMargin: "-25% 0px -65% 0px" },
  );
  document
    .querySelectorAll("main section[id]")
    .forEach((section) => activeObserver.observe(section));
} else {
  document
    .querySelectorAll(".reveal")
    .forEach((element) => element.classList.add("visible"));
}

// Interactive service selector in the image-free CSS showcase.
const serviceDetails = {
  web: {
    description:
      "We build beautiful digital experiences that help your business grow.",
    name: "Website Development",
  },
  data: {
    description:
      "Turn spreadsheets and business data into clear, useful insights.",
    name: "Data Analysis",
  },
  ai: {
    description: "Save time with smart AI agents and workflow automation.",
    name: "AI Automation",
  },
  whatsapp: {
    description: "Streamline customer conversations with WhatsApp automation.",
    name: "WhatsApp Automation",
  },
  video: {
    description:
      "Make your content stand out with professional videos and reels.",
    name: "Video and Reels Editing",
  },
};
const showcaseDescription = document.getElementById("showcase-description");
const showcaseLink = document.getElementById("showcase-link");
document.querySelectorAll(".showcase-service").forEach((button) => {
  button.addEventListener("click", () => {
    const service = serviceDetails[button.dataset.service];
    if (!service) return;
    document.querySelectorAll(".showcase-service").forEach((item) => {
      const selected = item === button;
      item.classList.toggle("selected", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    showcaseDescription.textContent = service.description;
    showcaseLink.href = `https://wa.me/918810401463?text=${encodeURIComponent(`Hello RABUXTECH, I am interested in ${service.name}.`)}`;
  });
});

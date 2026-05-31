const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const estimate = document.querySelector("#estimate");
const notesDialog = document.querySelector("[data-notes-dialog]");

function closeMenu() {
  header?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);

  if (header?.classList.contains("is-open")) {
    closeMenu();
  }
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuToggle?.addEventListener("click", () => {
  const open = header.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

nav?.addEventListener("click", (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && (target.matches("a") || target.matches("button"))) {
    closeMenu();
  }
});

document.querySelectorAll("[data-open-estimate]").forEach((button) => {
  button.addEventListener("click", () => {
    estimate?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll("[data-open-notes]").forEach((button) => {
  button.addEventListener("click", () => {
    if (notesDialog && typeof notesDialog.showModal === "function") {
      notesDialog.showModal();
    }
  });
});

document.querySelector("[data-close-notes]")?.addEventListener("click", () => {
  notesDialog?.close();
});

document.querySelector("[data-estimate-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = document.querySelector("[data-form-status]");
  if (status) {
    status.textContent = "Demo request captured. A live site would send this to the business.";
  }
});

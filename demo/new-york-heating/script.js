const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const callBar = document.querySelector("[data-call-bar]");
const dialog = document.querySelector("[data-dialog]");
const openEstimateButtons = document.querySelectorAll("[data-open-estimate]");
const closeDialogButton = document.querySelector("[data-close-dialog]");
const estimateForm = document.querySelector("[data-estimate-form]");
const dialogForm = document.querySelector("[data-dialog-form]");

function syncChrome() {
  const isScrolled = window.scrollY > 24;
  header.classList.toggle("is-scrolled", isScrolled);
  if (callBar) {
    callBar.classList.toggle("is-visible", window.scrollY > 420);
  }
}

function closeMenu() {
  header.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function handleFakeSubmit(event, noteSelector) {
  event.preventDefault();
  const note = document.querySelector(noteSelector);
  if (!note) return;

  note.textContent = "Demo request captured. A live site would send this to the business.";
  event.currentTarget.reset();
}

window.addEventListener("scroll", syncChrome, { passive: true });
window.addEventListener("load", syncChrome);

menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    closeMenu();
  }
});

openEstimateButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (dialog.showModal) {
      dialog.showModal();
      return;
    }

    document.querySelector("#estimate")?.scrollIntoView({ behavior: "smooth" });
  });
});

closeDialogButton.addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", (event) => {
  const dialogBounds = dialog.getBoundingClientRect();
  const clickedOutside =
    event.clientX < dialogBounds.left ||
    event.clientX > dialogBounds.right ||
    event.clientY < dialogBounds.top ||
    event.clientY > dialogBounds.bottom;

  if (clickedOutside) {
    dialog.close();
  }
});

estimateForm.addEventListener("submit", (event) => {
  handleFakeSubmit(event, "[data-form-note]");
});

dialogForm.addEventListener("submit", (event) => {
  handleFakeSubmit(event, "[data-dialog-note]");
});

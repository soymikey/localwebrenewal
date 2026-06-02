const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const callBar = document.querySelector("[data-call-bar]");
const estimateDialog = document.querySelector("[data-estimate-dialog]");
const notesDialog = document.querySelector("[data-notes-dialog]");
const openEstimateButtons = document.querySelectorAll("[data-open-estimate]");
const openNotesButtons = document.querySelectorAll("[data-open-notes]");
const closeEstimateButton = document.querySelector("[data-close-estimate]");
const closeNotesButton = document.querySelector("[data-close-notes]");
const forms = document.querySelectorAll("[data-estimate-form]");

function closeMenu() {
  header?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

function syncChrome() {
  header?.classList.toggle("is-scrolled", window.scrollY > 28);
  callBar?.classList.toggle("is-visible", window.scrollY > 520);

  if (header?.classList.contains("is-open")) closeMenu();
}

function openDialog(dialog, fallbackSelector) {
  closeMenu();

  if (dialog && typeof dialog.showModal === "function") {
    dialog.showModal();
    return;
  }

  document.querySelector(fallbackSelector)?.scrollIntoView({ behavior: "smooth" });
}

function handleFakeSubmit(event) {
  event.preventDefault();
  const status = event.currentTarget.querySelector("[data-form-status]");

  if (status) {
    status.textContent = "Demo request captured. A live site would send this to the business.";
  }
}

window.addEventListener("scroll", syncChrome, { passive: true });
syncChrome();

menuToggle?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement || event.target instanceof HTMLButtonElement) {
    closeMenu();
  }
});

openEstimateButtons.forEach((button) => {
  button.addEventListener("click", () => openDialog(estimateDialog, "#estimate"));
});

openNotesButtons.forEach((button) => {
  button.addEventListener("click", () => openDialog(notesDialog, "#sources"));
});

closeEstimateButton?.addEventListener("click", () => estimateDialog?.close());
closeNotesButton?.addEventListener("click", () => notesDialog?.close());

[estimateDialog, notesDialog].forEach((dialog) => {
  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

forms.forEach((form) => {
  form.addEventListener("submit", handleFakeSubmit);
});

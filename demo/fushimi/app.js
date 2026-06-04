const state = {
  items: [],
  filtered: [],
  currentIndex: 0,
  mode: "learn",
  answered: 0,
  correct: 0,
  wrongIds: new Set(JSON.parse(localStorage.getItem("wrongIds") || "[]")),
};

const els = {
  categorySelect: document.querySelector("#categorySelect"),
  dishImage: document.querySelector("#dishImage"),
  categoryText: document.querySelector("#categoryText"),
  dishName: document.querySelector("#dishName"),
  speakBtn: document.querySelector("#speakBtn"),
  slowSpeakBtn: document.querySelector("#slowSpeakBtn"),
  chineseName: document.querySelector("#chineseName"),
  description: document.querySelector("#description"),
  price: document.querySelector("#price"),
  choices: document.querySelector("#choices"),
  feedback: document.querySelector("#feedback"),
  progressText: document.querySelector("#progressText"),
  accuracyText: document.querySelector("#accuracyText"),
  prevBtn: document.querySelector("#prevBtn"),
  revealBtn: document.querySelector("#revealBtn"),
  nextBtn: document.querySelector("#nextBtn"),
  modes: {
    learn: document.querySelector("#modeLearn"),
    quiz: document.querySelector("#modeQuiz"),
    wrong: document.querySelector("#modeWrong"),
  },
};

function titleCase(value) {
  return value.replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
}

function shuffle(values) {
  return [...values].sort(() => Math.random() - 0.5);
}

function saveWrongIds() {
  localStorage.setItem("wrongIds", JSON.stringify([...state.wrongIds]));
}

function setMode(mode) {
  state.mode = mode;
  state.currentIndex = 0;
  Object.entries(els.modes).forEach(([key, element]) => {
    element.classList.toggle("active", key === mode);
  });
  applyFilter();
}

function applyFilter() {
  const category = els.categorySelect.value;
  let items = state.items;

  if (category !== "all") {
    items = items.filter((item) => item.category === category);
  }

  if (state.mode === "wrong") {
    items = items.filter((item) => state.wrongIds.has(item.id));
  }

  state.filtered = items;
  state.currentIndex = Math.min(state.currentIndex, Math.max(items.length - 1, 0));
  render();
}

function currentItem() {
  return state.filtered[state.currentIndex];
}

function speakCurrentName(rate = 0.9) {
  const item = currentItem();
  if (!item || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(item.name);
  utterance.lang = "en-US";
  utterance.rate = rate;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function renderScore() {
  els.progressText.textContent = `${state.currentIndex + (state.filtered.length ? 1 : 0)} / ${state.filtered.length}`;
  els.accuracyText.textContent = state.answered
    ? `${Math.round((state.correct / state.answered) * 100)}%`
    : "0%";
}

function renderChoices(item) {
  els.choices.innerHTML = "";
  if (state.mode === "learn") return;

  const candidates = state.items.filter((candidate) => candidate.id !== item.id);
  const options = shuffle([item, ...shuffle(candidates).slice(0, 3)]);

  for (const option of options) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = titleCase(option.name);
    button.addEventListener("click", () => answer(option, item, button));
    els.choices.append(button);
  }
}

function answer(option, item, button) {
  const isCorrect = option.id === item.id;
  state.answered += 1;

  if (isCorrect) {
    state.correct += 1;
    state.wrongIds.delete(item.id);
    els.feedback.textContent = "答对了";
    button.classList.add("correct");
  } else {
    state.wrongIds.add(item.id);
    els.feedback.textContent = `答错了，正确答案是 ${titleCase(item.name)}`;
    button.classList.add("wrong");
    [...els.choices.children].forEach((choice) => {
      if (choice.textContent.toLowerCase() === item.name.toLowerCase()) {
        choice.classList.add("correct");
      }
    });
  }

  saveWrongIds();
  [...els.choices.children].forEach((choice) => {
    choice.disabled = true;
  });
  renderScore();
}

function renderEmpty() {
  els.dishImage.removeAttribute("src");
  els.dishImage.alt = "";
  els.categoryText.textContent = "";
  els.dishName.textContent = state.mode === "wrong" ? "暂无错题" : "暂无菜品";
  els.chineseName.textContent = "";
  els.description.textContent = "";
  els.price.textContent = "";
  els.choices.innerHTML = "";
  els.feedback.textContent = "";
  els.prevBtn.disabled = true;
  els.nextBtn.disabled = true;
  els.revealBtn.disabled = true;
  els.revealBtn.hidden = state.mode === "learn";
  els.speakBtn.disabled = true;
  els.slowSpeakBtn.disabled = true;
  renderScore();
}

function render() {
  const item = currentItem();
  if (!item) {
    renderEmpty();
    return;
  }

  const imagePath = item.localImage || item.imageUrl;
  els.dishImage.src = imagePath;
  els.dishImage.alt = item.name;
  els.categoryText.textContent = `${item.categoryChinese || "分类"} · ${item.category}`;
  els.dishName.textContent = state.mode === "quiz" || state.mode === "wrong" ? "这道菜叫什么？" : titleCase(item.name);
  els.chineseName.textContent = state.mode === "learn" ? item.chinese || "" : "";
  els.description.textContent = state.mode === "learn" ? item.description : "";
  els.price.textContent = state.mode === "learn" && item.price ? `$${item.price}` : "";
  els.feedback.textContent = "";
  els.prevBtn.disabled = state.currentIndex === 0;
  els.nextBtn.disabled = state.currentIndex >= state.filtered.length - 1;
  els.revealBtn.disabled = false;
  els.revealBtn.hidden = state.mode === "learn";
  els.speakBtn.disabled = false;
  els.slowSpeakBtn.disabled = false;

  renderChoices(item);
  renderScore();
}

function reveal() {
  const item = currentItem();
  if (!item) return;
  els.dishName.textContent = titleCase(item.name);
  els.chineseName.textContent = item.chinese || "";
  els.description.textContent = item.description;
  els.price.textContent = item.price ? `$${item.price}` : "";
  els.feedback.textContent = "";
}

function move(delta) {
  state.currentIndex = Math.max(
    0,
    Math.min(state.filtered.length - 1, state.currentIndex + delta),
  );
  render();
}

function initCategories(categories) {
  els.categorySelect.innerHTML = "";
  els.categorySelect.append(new Option("全部分类", "all"));
  for (const category of categories) {
    const label = category.chinese
      ? `${category.chinese} · ${category.name}`
      : category.name;
    els.categorySelect.append(new Option(label, category.name));
  }
}

async function init() {
  const response = await fetch("data/menu-data.json");
  const data = await response.json();
  state.items = data.items.filter((item) => item.localImage || item.imageUrl);
  initCategories(data.categories);
  applyFilter();
}

els.categorySelect.addEventListener("change", applyFilter);
els.prevBtn.addEventListener("click", () => move(-1));
els.nextBtn.addEventListener("click", () => move(1));
els.revealBtn.addEventListener("click", reveal);
els.speakBtn.addEventListener("click", () => speakCurrentName(0.92));
els.slowSpeakBtn.addEventListener("click", () => speakCurrentName(0.62));
els.modes.learn.addEventListener("click", () => setMode("learn"));
els.modes.quiz.addEventListener("click", () => setMode("quiz"));
els.modes.wrong.addEventListener("click", () => setMode("wrong"));

init().catch((error) => {
  els.dishName.textContent = "加载失败";
  els.description.textContent = error.message;
});

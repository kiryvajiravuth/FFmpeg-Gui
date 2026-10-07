const $ = <T extends HTMLElement>(selector: string): T => {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error(`Missing element: ${selector}`);
  return el;
};

const themeToggle = $<HTMLButtonElement>("#theme-toggle");
const screenEmpty = $<HTMLElement>("#screen-empty");
const screenWork = $<HTMLElement>("#screen-work");
const screenProcessing = $<HTMLElement>("#screen-processing");
const screenResult = $<HTMLElement>("#screen-result");

type UiState = "empty" | "work" | "processing" | "result";

const THEME_KEY = "ffmpeg-gui-theme";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: "light" | "dark"): void {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  themeToggle.textContent = theme === "dark" ? "DARK" : "LIGHT";
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
  }
}

function toggleTheme(): void {
  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
}

themeToggle.addEventListener("click", toggleTheme);

function showScreen(active: UiState): void {
  screenEmpty.hidden = active !== "empty";
  screenWork.hidden = active !== "work";
  screenProcessing.hidden = active !== "processing";
  screenResult.hidden = active !== "result";
}

const initial = (document.documentElement.getAttribute("data-theme") as "light" | "dark") || getSystemTheme();
applyTheme(initial);
showScreen("empty");
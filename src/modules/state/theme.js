const STORAGE_KEY = "sdc:theme";
const THEME_META_COLORS = {
  dark: "#08080c",
  light: "#f6f3ea",
};
const listeners = new Set();

function readStoredTheme() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

let theme = readStoredTheme();

function applyTheme() {
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", THEME_META_COLORS[theme]);
}

function emit() {
  listeners.forEach((listener) => listener(theme));
}

export function getTheme() {
  return theme;
}

export function setTheme(nextTheme) {
  if (nextTheme !== "dark" && nextTheme !== "light") return;
  theme = nextTheme;
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* Almacenamiento no disponible: el tema vive solo en esta sesión. */
  }
  applyTheme();
  emit();
}

export function toggleTheme() {
  setTheme(theme === "dark" ? "light" : "dark");
}

export function subscribeTheme(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function initTheme() {
  applyTheme();
}

window.addEventListener("storage", (event) => {
  if (event.key !== STORAGE_KEY) return;
  theme = readStoredTheme();
  applyTheme();
  emit();
});

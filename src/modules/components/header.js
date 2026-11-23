import { html, toElement } from "../../global/lib/dom.js";
import { icon } from "../../global/lib/icons.js";
import { pluralize } from "../../global/lib/format.js";
import { announce } from "../../global/lib/a11y.js";
import { navigate } from "../router.js";
import { favoriteCount, subscribe } from "../state/favorites.js";
import { getTheme, subscribeTheme, toggleTheme } from "../state/theme.js";

let headerSearch = null;

export function setHeaderSearchVisible(visible) {
  if (!headerSearch) return;
  headerSearch.hidden = !visible;
}

export function mountHeader(header) {
  header.append(
    toElement(html`
      <div class="site-header__inner container">
        <a class="brand" href="#/" aria-label="Secretos de claqueta — Inicio">
          <span class="brand__mark">
            ${icon("clapper", { className: "brand__mark-icon", strokeWidth: 1 })}
          </span>
          <span class="brand__text">
            <span class="brand__name">Secretos</span>
            <span class="brand__sub">de claqueta</span>
          </span>
        </a>

        <search class="site-header__search" data-header-search hidden>
          <form class="search search--compact" data-header-search-form>
            <label class="visually-hidden" for="header-search">Buscar películas</label>
            <span class="search__icon">${icon("search")}</span>
            <input
              class="search__input"
              id="header-search"
              name="q"
              type="search"
              placeholder="Buscar una película…"
              autocomplete="off"
              spellcheck="false"
              enterkeyhint="search"
            />
            <button
              class="search__clear"
              type="button"
              data-header-search-clear
              aria-label="Borrar búsqueda"
              hidden
            >
              ${icon("close")}
            </button>
            <button class="search__submit" type="submit">Buscar</button>
          </form>
        </search>

        <div class="header-actions">
          <button class="theme-toggle" type="button" data-theme-toggle>
            <span class="theme-toggle__icon" data-theme-icon="dark">${icon("sun")}</span>
            <span class="theme-toggle__icon" data-theme-icon="light" hidden>${icon("moon")}</span>
            <span class="visually-hidden" data-theme-label></span>
          </button>

          <a class="favorites-link" href="#/favorites" data-favorites-link>
            <span class="favorites-link__label">Favoritos</span>
            <span class="favorites-link__count" data-favorites-count hidden>0</span>
          </a>
        </div>
      </div>
    `)
  );

  headerSearch = header.querySelector("[data-header-search]");
  const searchForm = header.querySelector("[data-header-search-form]");
  const searchInput = searchForm?.elements.namedItem("q");
  const clearButton = header.querySelector("[data-header-search-clear]");

  const clearSearch = () => {
    if (!searchInput) return;
    searchInput.value = "";
    if (clearButton) clearButton.hidden = true;
    searchInput.focus();
    announce("Búsqueda borrada.");
  };

  searchInput?.addEventListener("input", () => {
    if (clearButton) clearButton.hidden = searchInput.value.length === 0;
  });

  clearButton?.addEventListener("click", clearSearch);

  searchInput?.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !searchInput.value) return;
    event.preventDefault();
    clearSearch();
  });

  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const term = searchInput?.value.trim() ?? "";
    if (!term) return;
    navigate(`/search?q=${encodeURIComponent(term)}`);
  });

  const link = header.querySelector("[data-favorites-link]");
  const count = header.querySelector("[data-favorites-count]");

  const sync = () => {
    const total = favoriteCount();
    if (count) {
      count.textContent = String(total);
      count.hidden = total === 0;
    }
    if (link) {
      link.dataset.active = String(total > 0);
      link.setAttribute(
        "aria-label",
        total === 0
          ? "Favoritos"
          : `Favoritos, ${pluralize(total, "película guardada", "películas guardadas")}`
      );
    }
  };

  sync();
  subscribe(sync);

  const themeButton = header.querySelector("[data-theme-toggle]");
  const themeLabel = themeButton?.querySelector("[data-theme-label]");
  const darkIcon = themeButton?.querySelector('[data-theme-icon="dark"]');
  const lightIcon = themeButton?.querySelector('[data-theme-icon="light"]');

  const syncTheme = () => {
    const isDark = getTheme() === "dark";
    if (darkIcon) darkIcon.hidden = !isDark;
    if (lightIcon) lightIcon.hidden = isDark;
    if (themeLabel) {
      themeLabel.textContent = isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro";
    }
  };

  themeButton?.addEventListener("click", () => {
    toggleTheme();
    announce(getTheme() === "dark" ? "Tema oscuro activado." : "Tema claro activado.");
  });

  syncTheme();
  subscribeTheme(syncTheme);

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

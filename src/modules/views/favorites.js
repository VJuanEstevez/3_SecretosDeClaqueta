import { html } from "../../global/lib/dom.js";
import { swapView } from "../../global/lib/motion.js";
import { icon } from "../../global/lib/icons.js";
import { pluralize } from "../../global/lib/format.js";
import { createMovieGrid } from "../components/movie-card.js";
import { getFavorites, subscribe } from "../state/favorites.js";

function favoritesMarkup() {
  return html`
    <section class="page container" aria-labelledby="favorites-title">
      <header class="page__head">
        <h1 class="page__title" id="favorites-title">Películas guardadas</h1>
        <p class="page__lead" data-favorites-summary></p>
      </header>

      <div class="favorites-grid" data-favorites-grid></div>

      <div class="empty-state" data-favorites-empty hidden>
        <span class="empty-state__heart">${icon("heart")}</span>
        <h2>Tu lista está en blanco</h2>
        <p>
          Guarda las películas que quieras revisitar. Sus secretos de rodaje seguirán aquí cuando
          vuelvas.
        </p>
        <a class="btn btn--gold" href="#/">Explorar tendencias</a>
      </div>
    </section>
  `;
}

export async function renderFavorites({ outlet, signal }) {
  await swapView(outlet, favoritesMarkup());
  document.title = "Favoritos — Secretos de claqueta";

  const summary = outlet.querySelector("[data-favorites-summary]");
  const gridHost = outlet.querySelector("[data-favorites-grid]");
  const emptyState = outlet.querySelector("[data-favorites-empty]");

  const render = () => {
    const favorites = getFavorites();
    const focusedLink = document.activeElement?.closest?.(".movie-card__link") ?? null;
    const focusedId = focusedLink?.getAttribute("href")?.match(/\/movie\/(\d+)/)?.[1] ?? null;
    const hadFocus = Boolean(focusedLink);

    if (favorites.length === 0) {
      emptyState.hidden = false;
      gridHost.replaceChildren();
      if (hadFocus) emptyState.querySelector("a")?.focus();
      return;
    }

    emptyState.hidden = true;
    gridHost.replaceChildren(createMovieGrid(favorites, { signal }));

    if (hadFocus) {
      const previousLink = focusedId
        ? gridHost.querySelector(`a[href="#/movie/${focusedId}"]`)
        : null;
      const target = previousLink
        ? previousLink.parentElement.querySelector(".fav-toggle")
        : gridHost.querySelector(".fav-toggle");
      target?.focus();
    }
  };

  render();

  const unsubscribe = subscribe(render);
  signal.addEventListener("abort", unsubscribe, { once: true });
}

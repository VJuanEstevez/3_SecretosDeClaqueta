import { html, toElement } from "../../global/lib/dom.js";
import { icon } from "../../global/lib/icons.js";
import { formatRating } from "../../global/lib/format.js";
import { announce } from "../../global/lib/a11y.js";
import { posterUrl, placeholderUrl } from "../api/tmdb.js";
import { isFavorite, subscribe, toggleFavorite } from "../state/favorites.js";
import { prefetchMovie } from "../views/detail.js";

export function createMovieCard(movie, { signal } = {}) {
  const card = toElement(html`
    <article class="movie-card">
      <a
        class="movie-card__link"
        href="#/movie/${movie.id}"
        aria-label="Ver el detalle de ${movie.title} (${movie.year})"
      >
        <figure class="movie-card__media">
          <img
            class="movie-card__poster"
            data-poster
            src="${posterUrl(movie.posterPath)}"
            alt=""
            width="500"
            height="750"
            loading="lazy"
            decoding="async"
          />
          <span class="movie-card__shine" aria-hidden="true"></span>
        </figure>
        <div class="movie-card__body">
          <h3 class="movie-card__title">${movie.title}</h3>
          <p class="movie-card__meta">
            <span class="movie-card__year">${movie.year}</span>
            <span class="movie-card__dot" aria-hidden="true"></span>
            <span class="movie-card__rating">
              ${icon("star")}
              <span class="visually-hidden">Puntuación:</span>
              ${formatRating(movie.rating)}
              <span class="visually-hidden">de 10</span>
            </span>
          </p>
        </div>
      </a>
      <button class="fav-toggle" type="button" data-favorite>
        ${icon("heart")}
        <span class="visually-hidden" data-favorite-label></span>
      </button>
    </article>
  `);

  const poster = card.querySelector("[data-poster]");
  const button = card.querySelector("[data-favorite]");
  const label = card.querySelector("[data-favorite-label]");
  const link = card.querySelector(".movie-card__link");

  const prefetch = () => prefetchMovie(movie.id);
  let prefetchTimer = 0;

  const schedulePrefetch = () => {
    prefetchTimer = window.setTimeout(prefetch, 160);
  };
  const cancelPrefetch = () => window.clearTimeout(prefetchTimer);

  link?.addEventListener("pointerenter", schedulePrefetch, { signal });
  link?.addEventListener("pointerleave", cancelPrefetch, { signal });
  link?.addEventListener("focus", prefetch, { once: true, signal });
  signal?.addEventListener("abort", cancelPrefetch, { once: true });

  poster.addEventListener(
    "error",
    () => {
      poster.src = placeholderUrl;
    },
    { once: true, signal },
  );

  function sync() {
    const active = isFavorite(movie.id);
    button.setAttribute("aria-pressed", String(active));
    button.setAttribute(
      "aria-label",
      active ? `Quitar ${movie.title} de favoritos` : `Añadir ${movie.title} a favoritos`,
    );
    label.textContent = active ? "En tus favoritos" : "Añadir a favoritos";
  }

  button.addEventListener(
    "click",
    () => {
      const added = toggleFavorite(movie);
      sync();
      button.classList.remove("is-bumping");
      void button.offsetWidth;
      button.classList.add("is-bumping");
      announce(added ? `${movie.title} añadida a favoritos.` : `${movie.title} eliminada de favoritos.`);
    },
    { signal },
  );

  sync();

  const unsubscribe = subscribe(() => {
    if (!card.isConnected) {
      unsubscribe();
      return;
    }
    sync();
  });

  signal?.addEventListener("abort", unsubscribe, { once: true });

  return card;
}

export function createMovieGrid(movies, { signal } = {}) {
  const list = document.createElement("ul");
  list.className = "movie-grid";

  movies.forEach((movie, index) => {
    const item = document.createElement("li");
    item.className = "movie-grid__item";
    item.style.setProperty("--index", String(index));
    item.append(createMovieCard(movie, { signal }));
    list.append(item);
  });

  return list;
}

export function skeletonCardMarkup() {
  return html`
    <div class="skeleton-card" aria-hidden="true">
      <div class="skeleton-card__poster"></div>
      <div class="skeleton-card__body">
        <span class="skeleton-line skeleton-line--title"></span>
        <span class="skeleton-line skeleton-line--short"></span>
      </div>
    </div>
  `;
}

export function createSkeletonGrid(count = 8) {
  return html`
    <ul class="movie-grid" aria-hidden="true">
      ${Array.from({ length: count }, () => html`<li class="movie-grid__item">${skeletonCardMarkup()}</li>`)}
    </ul>
  `;
}

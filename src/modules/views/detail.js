import { html } from "../../global/lib/dom.js";
import { icon } from "../../global/lib/icons.js";
import { formatRating, formatRuntime, padNumber, pluralize } from "../../global/lib/format.js";
import { announce } from "../../global/lib/a11y.js";
import { backdropUrl, getMovieDetail, placeholderUrl, posterUrl, profileUrl } from "../api/tmdb.js";
import { getSecrets, PHASE_LABELS } from "../data/secrets.js";
import { isFavorite, subscribe, toggleFavorite } from "../state/favorites.js";

function castMarkup(cast) {
  if (cast.length === 0) {
    return html`<p class="detail-section__note">No hay información de reparto disponible.</p>`;
  }

  return html`
    <ul class="cast">
      ${cast.map((person) => {
        const initials = person.name
          .split(/\s+/)
          .slice(0, 2)
          .map((word) => word.charAt(0))
          .join("")
          .toUpperCase();

        return html`
          <li class="cast__item">
            ${person.profilePath
              ? html`<img
                  class="cast__avatar"
                  src="${profileUrl(person.profilePath)}"
                  alt=""
                  width="185"
                  height="185"
                  loading="lazy"
                  decoding="async"
                />`
              : html`<span class="cast__avatar cast__avatar--initials" aria-hidden="true">${initials}</span>`}
            <p class="cast__name">${person.name}</p>
            ${person.character ? html`<p class="cast__role">${person.character}</p>` : ""}
          </li>
        `;
      })}
    </ul>
  `;
}

function secretsMarkup(secrets) {
  return html`
    <ol class="secrets">
      ${secrets.map(
        (secret, index) => html`
          <li class="secret">
            <span class="secret__index" aria-hidden="true">${padNumber(index + 1)}</span>
            <div class="secret__content">
              <span class="secret__phase" data-phase="${secret.phase}">
                ${PHASE_LABELS[secret.phase] ?? "Rodaje"}
              </span>
              <h3 class="secret__title">${secret.title}</h3>
              <p class="secret__text">${secret.text}</p>
            </div>
          </li>
        `,
      )}
    </ol>
  `;
}

function detailMarkup(movie, cast, director) {
  const secrets = getSecrets(movie, { director });
  const runtime = formatRuntime(movie.runtime);

  return html`
    <article class="detail">
      <div class="detail__backdrop" data-detail-backdrop aria-hidden="true"></div>
      <div class="container detail__inner">
        <a class="detail__back" href="#/">
          ${icon("arrowLeft")}
          Volver a la cartelera
        </a>

        <div class="detail__hero">
          <div class="detail__poster-frame">
            <img
              class="detail__poster"
              data-poster-transition
              src="${posterUrl(movie.posterPath, "w780")}"
              alt="Póster de ${movie.title}"
              width="780"
              height="1170"
              decoding="async"
            />
          </div>

          <div class="detail__intro">
            <p class="eyebrow">Archivo de claqueta</p>
            <h1 class="detail__title">${movie.title}</h1>
            ${movie.tagline ? html`<p class="detail__tagline">«${movie.tagline}»</p>` : ""}

            <ul class="detail__meta">
              <li class="detail__meta-item">
                ${icon("calendar")}
                <span>${movie.year}</span>
              </li>
              ${runtime
                ? html`<li class="detail__meta-item">${icon("clock")}<span>${runtime}</span></li>`
                : ""}
              <li class="detail__meta-item">
                ${icon("star")}
                <span>${formatRating(movie.rating)}</span>
                <span class="visually-hidden">sobre 10</span>
              </li>
              ${director
                ? html`<li class="detail__meta-item">${icon("user")}<span>${director}</span></li>`
                : ""}
            </ul>

            ${movie.overview
              ? html`<p class="detail__overview">${movie.overview}</p>`
              : html`<p class="detail__overview">Sin sinopsis disponible en castellano.</p>`}

            <div class="detail__actions">
              <button class="fav-button" type="button" data-detail-favorite>
                ${icon("heart")}
                <span data-favorite-text>Guardar en favoritos</span>
              </button>
              ${movie.genres.length
                ? html`<span class="detail-section__note">${movie.genres.join(" · ")}</span>`
                : ""}
            </div>
          </div>
        </div>

        <section class="detail-section" aria-labelledby="cast-title">
          <div class="detail-section__head">
            <div>
              <p class="eyebrow">Delante de la cámara</p>
              <h2 id="cast-title">Reparto</h2>
            </div>
            <p class="detail-section__note">${cast.length ? pluralize(cast.length, "intérprete", "intérpretes") : "Sin datos de reparto"}</p>
          </div>
          ${castMarkup(cast)}
        </section>

        <section class="detail-section" aria-labelledby="secrets-title">
          <div class="detail-section__head">
            <div>
              <p class="eyebrow">Cinco puertas cerradas</p>
              <h2 id="secrets-title">Secretos de rodaje</h2>
            </div>
            <p class="detail-section__note">Contenido de archivo recreado para esta demostración.</p>
          </div>
          ${secretsMarkup(secrets)}
        </section>
      </div>
    </article>
  `;
}

function skeletonMarkup({ posterSrc, title }) {
  return html`
    <article class="detail">
      <div class="detail__backdrop" data-detail-backdrop aria-hidden="true"></div>
      <div class="container detail__inner">
        <a class="detail__back" href="#/">
          ${icon("arrowLeft")}
          Volver a la cartelera
        </a>
        <div class="detail__hero">
          <div class="detail__poster-frame">
            <img
              class="detail__poster"
              data-poster-transition
              src="${posterSrc ?? placeholderUrl}"
              alt="${title ? `Póster de ${title}` : "Cargando póster"}"
              width="780"
              height="1170"
              decoding="async"
            />
          </div>
          <div class="detail__intro">
            <p class="eyebrow">Archivo de claqueta</p>
            <h1 class="detail__title">${title || "Cargando película…"}</h1>
            <div class="skeleton-card__body" aria-hidden="true">
              <span class="skeleton-line skeleton-line--title"></span>
              <span class="skeleton-line"></span>
              <span class="skeleton-line skeleton-line--short"></span>
            </div>
          </div>
        </div>
      </div>
    </article>
  `;
}

function errorMarkup(error) {
  const isConfig = error?.kind === "config";
  const isMissing = error?.kind === "http" && error.status === 404;

  const title = isConfig
    ? "Falta la clave de TMDB"
    : isMissing
      ? "Esa película no está en el archivo"
      : "No pudimos abrir la ficha";

  const text = isConfig
    ? "Añade VITE_TMDB_API_KEY a tu archivo .env y reinicia el servidor para cargar los detalles."
    : isMissing
      ? "Puede que el enlace esté mal escrito o que TMDB ya no tenga esa referencia."
      : "Comprueba tu conexión y vuelve a intentarlo desde la cartelera.";

  return html`
    <section class="page container" aria-labelledby="detail-error-title">
      <a class="detail__back" href="#/">${icon("arrowLeft")} Volver a la cartelera</a>
      <div class="state state--error">
        <span class="state__icon">${icon("film")}</span>
        <h1 id="detail-error-title">${title}</h1>
        <p>${text}</p>
        <a class="btn btn--ghost" href="#/">Explorar tendencias</a>
      </div>
    </section>
  `;
}

const detailCache = new Map();
const DETAIL_CACHE_LIMIT = 30;

function rememberDetail(id, data) {
  if (detailCache.size >= DETAIL_CACHE_LIMIT) {
    detailCache.delete(detailCache.keys().next().value);
  }
  detailCache.set(id, data);
}

export function prefetchMovie(id) {
  const numericId = Number(id);
  if (!Number.isFinite(numericId) || detailCache.has(numericId)) return;
  getMovieDetail(numericId)
    .then((data) => rememberDetail(numericId, data))
    .catch(() => {});
}

function bindFavorite(outlet, movie, signal) {
  const button = outlet.querySelector("[data-detail-favorite]");
  const label = outlet.querySelector("[data-favorite-text]");
  if (!button || !label) return;

  const sync = () => {
    const active = isFavorite(movie.id);
    button.setAttribute("aria-pressed", String(active));
    button.setAttribute(
      "aria-label",
      active ? `Quitar ${movie.title} de favoritos` : `Añadir ${movie.title} a favoritos`,
    );
    label.textContent = active ? "En tus favoritos" : "Guardar en favoritos";
  };

  button.addEventListener(
    "click",
    () => {
      const added = toggleFavorite(movie);
      announce(added ? `${movie.title} añadida a favoritos.` : `${movie.title} eliminada de favoritos.`);
    },
    { signal },
  );

  const unsubscribe = subscribe(sync);
  signal.addEventListener("abort", unsubscribe, { once: true });
  sync();
}

function paintDetail(outlet, data, signal) {
  const { movie, cast, director } = data;
  outlet.innerHTML = String(detailMarkup(movie, cast, director));

  const backdrop = outlet.querySelector("[data-detail-backdrop]");
  const image = movie.posterPath
    ? posterUrl(movie.posterPath, "w780")
    : (backdropUrl(movie.backdropPath, "w1280") ?? placeholderUrl);
  if (backdrop) backdrop.style.backgroundImage = `url("${image}")`;

  const poster = outlet.querySelector("[data-poster-transition]");
  poster?.addEventListener(
    "error",
    () => {
      poster.src = placeholderUrl;
    },
    { once: true, signal },
  );

  bindFavorite(outlet, movie, signal);
  document.title = `${movie.title} (${movie.year}) — Secretos de claqueta`;
}

export async function renderDetail({ outlet, params, state, signal }) {
  const id = Number(params[0]);

  if (!Number.isFinite(id)) {
    outlet.innerHTML = String(errorMarkup({ kind: "http", status: 404 }));
    document.title = "Película no disponible — Secretos de claqueta";
    return;
  }

  const cached = detailCache.get(id);
  if (cached) {
    paintDetail(outlet, cached, signal);
    return;
  }

  const initial = {
    posterSrc: state?.posterSrc ?? null,
    title: state?.title ?? "",
  };

  outlet.innerHTML = String(skeletonMarkup(initial));
  document.title = "Cargando película… — Secretos de claqueta";

  try {
    const data = await getMovieDetail(id, { signal });
    if (signal.aborted) return;

    rememberDetail(id, data);
    paintDetail(outlet, data, signal);
  } catch (error) {
    if (error?.kind === "abort" || signal.aborted) return;
    outlet.innerHTML = String(errorMarkup(error));
    document.title = "Película no disponible — Secretos de claqueta";
  }
}

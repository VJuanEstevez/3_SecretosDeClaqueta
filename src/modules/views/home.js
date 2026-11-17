import { html } from "../../global/lib/dom.js";
import { combineSignals } from "../../global/lib/abort.js";
import { icon } from "../../global/lib/icons.js";
import { pluralize } from "../../global/lib/format.js";
import { announce } from "../../global/lib/a11y.js";
import {
  getTrendingMovies,
  isConfigured,
  searchMovies,
} from "../api/tmdb.js";
import {
  createMovieCard,
  createMovieGrid,
  createSkeletonGrid,
  skeletonCardMarkup,
} from "../components/movie-card.js";
import { mountHeroSlider } from "../components/hero-slider.js";
import { initCarousel } from "../components/carousel.js";
import { replaceRoute } from "../router.js";

const SEARCH_MIN_LENGTH = 2;
const SEARCH_DEBOUNCE = 380;
const TRENDING_LIMIT = 20;

function configNoticeMarkup() {
  return html`
    <div class="state">
      <span class="state__icon">${icon("film")}</span>
      <h3>Conecta tu clave de TMDB</h3>
      <p>
        Para cargar pósters y tendencias necesitas una clave de API. Crea un archivo
        <code>.env</code> en la raíz del proyecto con esta línea:
      </p>
      <p><code>VITE_TMDB_API_KEY=tu_clave</code></p>
      <p>Después reinicia el servidor de desarrollo para que Vite la lea.</p>
      <a
        class="btn btn--ghost"
        href="https://www.themoviedb.org/settings/api"
        target="_blank"
        rel="noreferrer"
      >
        Obtener una clave gratuita
        <span class="visually-hidden">en TMDB (se abre en una pestaña nueva)</span>
      </a>
    </div>
  `;
}

function errorMarkup({ title, text, retry = false }) {
  return html`
    <div class="state state--error">
      <span class="state__icon">${icon("film")}</span>
      <h3>${title}</h3>
      <p>${text}</p>
      ${retry ? html`<button class="btn btn--ghost" type="button" data-retry>Reintentar</button>` : ""}
    </div>
  `;
}

function emptyResultsMarkup(term) {
  return html`
    <div class="state">
      <span class="state__icon">${icon("search")}</span>
      <h3>Nada que proyectar</h3>
      <p>
        No encontramos coincidencias para «${term}». Prueba con el título original, otro año o
        una palabra clave distinta.
      </p>
    </div>
  `;
}

function homeMarkup(initialQuery) {
  return html`
    <div class="home">
      <section class="hero container" aria-labelledby="hero-title">
        <div class="hero__slider" data-hero-slider aria-hidden="true"></div>
        <h1 class="hero__title" id="hero-title">
          Descubre los mejores secretos de <em>Hollywood</em>
        </h1>
        <p class="hero__subtitle">
          Busca tu pelicula favorita y
          descubre lo que ocurrió antes, durante y después de la claqueta.
        </p>
        <search>
          <form class="search" data-search-form>
            <label class="visually-hidden" for="movie-search">Buscar películas</label>
            <span class="search__icon">${icon("search")}</span>
            <input
              class="search__input"
              id="movie-search"
              name="q"
              type="search"
              placeholder="Busca una película"
              autocomplete="off"
              spellcheck="false"
              enterkeyhint="search"
              value="${initialQuery}"
            />
            <button
              class="search__clear"
              type="button"
              data-search-clear
              aria-label="Borrar búsqueda"
              ${initialQuery ? "" : html`hidden`}
            >
              ${icon("close")}
            </button>
            <button class="search__submit" type="submit">Buscar</button>
          </form>
        </search>
      </section>

      <div class="container">
        <section class="section" data-trending aria-labelledby="trending-title">
          <header class="section-head">
            <div>
              <p class="eyebrow">Esta semana</p>
              <h2 id="trending-title">Tendencias ahora mismo</h2>
            </div>
            <div class="carousel-controls" data-carousel-controls>
              <button
                class="round-button"
                type="button"
                data-carousel-prev
                aria-label="Ver pósters anteriores"
              >
                ${icon("arrowLeft")}
              </button>
              <button
                class="round-button"
                type="button"
                data-carousel-toggle
                aria-label="Pausar el carrusel automático"
                aria-pressed="false"
              >
                ${icon("pause")}
              </button>
              <button
                class="round-button"
                type="button"
                data-carousel-next
                aria-label="Ver más pósters"
              >
                ${icon("arrowRight")}
              </button>
            </div>
          </header>
          <div data-trending-body>
            <div class="carousel" data-carousel>
              <ul class="carousel__track" data-carousel-track>
                ${Array.from(
    { length: 6 },
    () => html`<li class="carousel__item">${skeletonCardMarkup()}</li>`,
  )}
              </ul>
            </div>
          </div>
        </section>

        <section class="section" data-results hidden aria-labelledby="results-title">
          <header class="section-head">
            <div>
              <p class="eyebrow">Buscador</p>
              <h2 id="results-title" data-results-title>Resultados</h2>
            </div>
          </header>
          <p class="results__status" data-results-status role="status"></p>
          <div data-results-body></div>
        </section>
      </div>
    </div>
  `;
}

export async function renderHome({ outlet, query, signal }) {
  const initialQuery = (query.get("q") ?? "").trim();
  outlet.innerHTML = String(homeMarkup(initialQuery));
  document.title = "Secretos de claqueta — Historias que no salieron en los créditos";

  const form = outlet.querySelector("[data-search-form]");
  const input = form.elements.namedItem("q");
  const clearButton = outlet.querySelector("[data-search-clear]");
  const trendingSection = outlet.querySelector("[data-trending]");
  const trendingBody = outlet.querySelector("[data-trending-body]");
  const trendingControls = outlet.querySelector("[data-carousel-controls]");
  const resultsSection = outlet.querySelector("[data-results]");
  const resultsTitle = outlet.querySelector("[data-results-title]");
  const resultsStatus = outlet.querySelector("[data-results-status]");
  const resultsBody = outlet.querySelector("[data-results-body]");

  let debounceTimer = 0;
  let searchController = new AbortController();
  let searchSequence = 0;

  signal.addEventListener(
    "abort",
    () => {
      window.clearTimeout(debounceTimer);
      searchController.abort();
    },
    { once: true },
  );

  const setResultsBody = (body) => {
    resultsBody.replaceChildren();
    if (body instanceof Node) {
      resultsBody.append(body);
    } else {
      resultsBody.innerHTML = String(body);
    }
  };

  const showResults = (title, { body, status = "" }) => {
    trendingSection.hidden = true;
    resultsSection.hidden = false;
    resultsTitle.textContent = title;
    resultsStatus.textContent = status;
    setResultsBody(body);
  };

  const showTrending = () => {
    searchSequence += 1;
    searchController.abort();
    resultsSection.hidden = true;
    trendingSection.hidden = false;
    resultsStatus.textContent = "";
  };

  const bindRetry = (container, retry) => {
    container.querySelector("[data-retry]")?.addEventListener(
      "click",
      () => {
        container.innerHTML = String(
          html`<div class="state"><p>Cargando de nuevo…</p></div>`,
        );
        retry();
      },
      { signal },
    );
  };

  const loadTrending = async () => {
    if (!isConfigured) {
      trendingControls.hidden = true;
      trendingBody.innerHTML = String(configNoticeMarkup());
      return;
    }

    try {
      const movies = await getTrendingMovies({ signal });
      if (signal.aborted) return;

      mountHeroSlider(outlet.querySelector("[data-hero-slider]"), movies, { signal });

      if (movies.length === 0) {
        trendingControls.hidden = true;
        trendingBody.innerHTML = String(
          errorMarkup({
            title: "Sin tendencias disponibles",
            text: "TMDB no devolvió resultados esta vez. Inténtalo de nuevo en un momento.",
            retry: true,
          }),
        );
        bindRetry(trendingBody, loadTrending);
        return;
      }

      const track = document.createElement("ul");
      track.className = "carousel__track";
      track.dataset.carouselTrack = "";
      track.append(
        ...movies.slice(0, TRENDING_LIMIT).map((movie) => {
          const item = document.createElement("li");
          item.className = "carousel__item";
          item.append(createMovieCard(movie, { signal }));
          return item;
        }),
      );

      const carousel = document.createElement("div");
      carousel.className = "carousel";
      carousel.dataset.carousel = "";
      carousel.append(track);

      trendingControls.hidden = false;
      trendingBody.replaceChildren(carousel);
      initCarousel(trendingSection, { signal });
    } catch (error) {
      if (error?.kind === "abort" || signal.aborted) return;

      trendingControls.hidden = true;
      trendingBody.innerHTML = String(
        errorMarkup({
          title: "No pudimos cargar las tendencias",
          text:
            error?.kind === "config"
              ? "Falta la clave de API de TMDB en el archivo .env."
              : "Revisa tu conexión y vuelve a intentarlo.",
          retry: true,
        }),
      );
      bindRetry(trendingBody, loadTrending);
    }
  };

  const runSearch = async (rawTerm, { updateUrl = false } = {}) => {
    const term = rawTerm.trim();
    window.clearTimeout(debounceTimer);

    if (term.length < SEARCH_MIN_LENGTH) {
      if (term.length === 0) {
        showTrending();
        if (updateUrl) replaceRoute("#/");
      }
      return;
    }

    if (!isConfigured) {
      showResults(`Resultados para «${term}»`, {
        body: configNoticeMarkup(),
        status: "Falta la configuración de TMDB.",
      });
      if (updateUrl) replaceRoute(`#/?q=${encodeURIComponent(term)}`);
      return;
    }

    searchController.abort();
    searchController = new AbortController();
    const requestId = ++searchSequence;
    const composed = combineSignals(signal, searchController.signal);

    showResults(`Resultados para «${term}»`, {
      body: createSkeletonGrid(8),
      status: "Buscando películas…",
    });

    if (updateUrl) replaceRoute(`#/?q=${encodeURIComponent(term)}`);

    try {
      const { results, total } = await searchMovies(term, { signal: composed });
      if (requestId !== searchSequence || composed.aborted) return;

      if (results.length === 0) {
        setResultsBody(emptyResultsMarkup(term));
        resultsStatus.textContent = "Ninguna coincidencia";
        return;
      }

      setResultsBody(createMovieGrid(results, { signal }));
      resultsStatus.textContent =
        total > results.length
          ? `Mostrando ${results.length} de ${total} coincidencias`
          : pluralize(results.length, "película encontrada", "películas encontradas");
    } catch (error) {
      if (requestId !== searchSequence || error?.kind === "abort" || composed.aborted) return;
      setResultsBody(
        errorMarkup({
          title: "La búsqueda no llegó a puerto",
          text: "No pudimos consultar TMDB. Comprueba tu conexión y vuelve a intentarlo.",
        }),
      );
      resultsStatus.textContent = "Error de búsqueda";
    }
  };

  input.addEventListener(
    "input",
    () => {
      clearButton.hidden = input.value.length === 0;
      window.clearTimeout(debounceTimer);

      if (input.value.trim().length < SEARCH_MIN_LENGTH) {
        showTrending();
        if (input.value.trim().length === 0) replaceRoute("#/");
        return;
      }

      debounceTimer = window.setTimeout(() => runSearch(input.value, { updateUrl: true }), SEARCH_DEBOUNCE);
    },
    { signal },
  );

  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      runSearch(input.value, { updateUrl: true });
    },
    { signal },
  );

  clearButton.addEventListener(
    "click",
    () => {
      input.value = "";
      clearButton.hidden = true;
      showTrending();
      replaceRoute("#/");
      input.focus();
      announce("Búsqueda borrada.");
    },
    { signal },
  );

  input.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Escape" || !input.value) return;
      event.preventDefault();
      input.value = "";
      clearButton.hidden = true;
      showTrending();
      replaceRoute("#/");
      announce("Búsqueda borrada.");
    },
    { signal },
  );

  loadTrending();

  if (initialQuery.length >= SEARCH_MIN_LENGTH) {
    runSearch(initialQuery);
  }
}

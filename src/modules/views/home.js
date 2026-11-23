import { html } from "../../global/lib/dom.js";
import { swapView } from "../../global/lib/motion.js";
import { icon } from "../../global/lib/icons.js";
import { announce } from "../../global/lib/a11y.js";
import { getTrendingMovies, isConfigured } from "../api/tmdb.js";
import { createMovieCard, skeletonCardMarkup } from "../components/movie-card.js";
import { initCarousel } from "../components/carousel.js";
import { navigate, replaceRoute } from "../router.js";

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

function homeMarkup(initialQuery) {
  return html`
    <div class="home">
      <section class="hero container" aria-labelledby="hero-title">
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
      </div>
    </div>
  `;
}

export async function renderHome({ outlet, query, signal }) {
  const initialQuery = (query.get("q") ?? "").trim();
  await swapView(outlet, homeMarkup(initialQuery));
  document.title = "Secretos de claqueta — Historias que no salieron en los créditos";

  const form = outlet.querySelector("[data-search-form]");
  const input = form.elements.namedItem("q");
  const clearButton = outlet.querySelector("[data-search-clear]");
  const trendingSection = outlet.querySelector("[data-trending]");
  const trendingBody = outlet.querySelector("[data-trending-body]");

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
      trendingBody.innerHTML = String(configNoticeMarkup());
      return;
    }

    try {
      const movies = await getTrendingMovies({ signal });
      if (signal.aborted) return;

      if (movies.length === 0) {
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

      const visibleMovies = movies.slice(0, TRENDING_LIMIT);
      const createItem = (movie, mirrored = false) => {
        const item = document.createElement("li");
        item.className = "carousel__item";
        if (mirrored) {
          item.setAttribute("aria-hidden", "true");
        }
        item.append(createMovieCard(movie, { signal, hideDot: true }));
        if (mirrored) {
          item.querySelectorAll("a, button").forEach((element) => {
            element.tabIndex = -1;
          });
        }
        return item;
      };

      track.append(
        ...visibleMovies.map((movie) => createItem(movie)),
        ...visibleMovies.map((movie) => createItem(movie, true)),
      );

      const carousel = document.createElement("div");
      carousel.className = "carousel";
      carousel.dataset.carousel = "";
      carousel.append(track);

      trendingBody.replaceChildren(carousel);
      initCarousel(trendingSection, { signal });
    } catch (error) {
      if (error?.kind === "abort" || signal.aborted) return;

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

  input.addEventListener(
    "input",
    () => {
      clearButton.hidden = input.value.length === 0;
      if (input.value.trim().length === 0) replaceRoute("#/");
    },
    { signal },
  );

  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      const term = input.value.trim();
      if (term) navigate(`/search?q=${encodeURIComponent(term)}`);
    },
    { signal },
  );

  clearButton.addEventListener(
    "click",
    () => {
      input.value = "";
      clearButton.hidden = true;
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
      replaceRoute("#/");
      announce("Búsqueda borrada.");
    },
    { signal },
  );

  loadTrending();
}

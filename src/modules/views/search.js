import { html } from "../../global/lib/dom.js";
import { swapView } from "../../global/lib/motion.js";
import { icon } from "../../global/lib/icons.js";
import { createMovieGrid, createSkeletonGrid } from "../components/movie-card.js";
import { isConfigured, searchMovies } from "../api/tmdb.js";

const MIN_LENGTH = 2;

function searchMarkup(term) {
  return html`
    <section class="page container" aria-labelledby="search-title">
      <header class="page__head">
        <p class="eyebrow">Buscar</p>
        <h1 class="page__title" id="search-title">Resultados para «${term}»</h1>
      </header>
      <div data-search-body></div>
    </section>
  `;
}

export async function renderSearch({ outlet, query, signal }) {
  const term = (query.get("q") ?? "").trim();

  await swapView(outlet, searchMarkup(term));
  document.title = `Resultados para «${term}» — Secretos de claqueta`;

  const body = outlet.querySelector("[data-search-body]");

  if (term.length < MIN_LENGTH) {
    body.innerHTML = String(html`
      <div class="state">
        <span class="state__icon">${icon("search")}</span>
        <h2>Escribe al menos dos caracteres</h2>
        <p>Vuelve al buscador para introducir el título de una película.</p>
      </div>
    `);
    return;
  }

  if (!isConfigured) {
    body.innerHTML = String(html`
      <div class="state">
        <span class="state__icon">${icon("film")}</span>
        <h2>Conecta tu clave de TMDB</h2>
        <p>Añade <code>VITE_TMDB_API_KEY</code> al archivo <code>.env</code> y reinicia el servidor.</p>
      </div>
    `);
    return;
  }

  body.innerHTML = String(createSkeletonGrid(8));

  try {
    const { results } = await searchMovies(term, { signal });
    if (signal.aborted) return;

    if (results.length === 0) {
      body.innerHTML = String(html`
        <div class="state">
          <span class="state__icon">${icon("search")}</span>
          <h2>Nada que proyectar</h2>
          <p>No encontramos coincidencias para «${term}».</p>
        </div>
      `);
      return;
    }

    body.replaceChildren(createMovieGrid(results, { signal }));
  } catch (error) {
    if (error?.kind === "abort" || signal.aborted) return;
    body.innerHTML = String(html`
      <div class="state state--error">
        <span class="state__icon">${icon("film")}</span>
        <h2>La búsqueda no llegó a puerto</h2>
        <p>No pudimos consultar TMDB. Comprueba tu conexión y vuelve a intentarlo.</p>
      </div>
    `);
  }
}

import "./global/styles/main.css";
import { html } from "./global/lib/dom.js";
import { swapView, withPosterTransition } from "./global/lib/motion.js";
import { mountHeader, setHeaderSearchVisible } from "./modules/components/header.js";
import { initRouter, navigate } from "./modules/router.js";
import { initTheme } from "./modules/state/theme.js";
import { renderDetail } from "./modules/views/detail.js";
import { renderFavorites } from "./modules/views/favorites.js";
import { renderHome } from "./modules/views/home.js";
import { renderSearch } from "./modules/views/search.js";

initTheme();

const outlet = document.getElementById("main");
mountHeader(document.getElementById("site-header"));

const routes = [
  { pattern: /^\/$/, view: renderHome },
  { pattern: /^\/search$/, view: renderSearch, headerSearch: true },
  { pattern: /^\/movie\/(\d+)$/, view: renderDetail, headerSearch: true },
  { pattern: /^\/favorites$/, view: renderFavorites, headerSearch: true },
];

let controller = new AbortController();
let renderToken = 0;
let firstRender = true;

function notFoundMarkup() {
  return html`
    <section class="page container" aria-labelledby="not-found-title">
      <p class="eyebrow">Fuera de plano</p>
      <h1 class="page__title" id="not-found-title">Esta página no existe</h1>
      <p class="page__lead">
        El enlace que has seguido no forma parte del archivo. Vuelve a la cartelera para seguir
        explorando secretos de rodaje.
      </p>
      <p class="page__lead">
        <a class="btn btn--gold" href="#/">Volver a la cartelera</a>
      </p>
    </section>
  `;
}

function focusHeading() {
  const heading = outlet.querySelector("h1");
  if (!heading) return;
  heading.tabIndex = -1;
  heading.focus({ preventScroll: true });
}

async function renderRoute(route, state) {
  const token = ++renderToken;
  controller.abort();
  controller = new AbortController();

  const match = routes
    .map((definition) => ({ definition, found: route.path.match(definition.pattern) }))
    .find((candidate) => candidate.found);

  setHeaderSearchVisible(Boolean(match?.definition.headerSearch));

  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  outlet.setAttribute("aria-busy", "true");

  try {
    if (!match) {
      await swapView(outlet, notFoundMarkup());
      document.title = "Página no encontrada — Secretos de claqueta";
    } else {
      await match.definition.view({
        outlet,
        params: match.found.slice(1),
        query: route.query,
        state,
        signal: controller.signal,
      });
    }
  } catch (error) {
    if (error?.kind !== "abort") {
      console.error(error);
    }
  } finally {
    if (token === renderToken) {
      outlet.removeAttribute("aria-busy");
      if (!firstRender) focusHeading();
      firstRender = false;
    }
  }
}

document.addEventListener("click", (event) => {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const link = event.target.closest('a[href^="#/"]');
  if (!link) return;

  const href = link.getAttribute("href");
  if (!href) return;

  if (href === window.location.hash) {
    event.preventDefault();
    return;
  }

  event.preventDefault();

  const targetPath = href.slice(1);
  const poster = link.querySelector("img[data-poster]");
  const state = poster
    ? {
        posterSrc: poster.currentSrc || poster.src,
        title: link.querySelector(".movie-card__title")?.textContent?.trim() ?? "",
      }
    : null;

  if (poster && targetPath.startsWith("/movie/")) {
    withPosterTransition(poster, () => navigate(targetPath, { state }));
    return;
  }

  navigate(targetPath, { state });
});

initRouter({ render: renderRoute });

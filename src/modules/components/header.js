import { html, toElement } from "../../global/lib/dom.js";
import { icon } from "../../global/lib/icons.js";
import { pluralize } from "../../global/lib/format.js";
import { favoriteCount, subscribe } from "../state/favorites.js";

export function mountHeader(header) {
  header.append(
    toElement(html`
      <div class="site-header__inner container">
        <a class="brand" href="#/" aria-label="Secretos de claqueta — Inicio">
          <span class="brand__mark">
            ${icon("clapper", { className: "brand__mark-icon", strokeWidth: 1.5 })}
          </span>
          <span class="brand__text">
            <span class="brand__name">Secretos</span>
            <span class="brand__sub">de claqueta</span>
          </span>
        </a>
        <a class="favorites-link" href="#/favorites" data-favorites-link>
          ${icon("heart")}
          <span class="favorites-link__label">Favoritos</span>
          <span class="favorites-link__count" data-favorites-count hidden>0</span>
        </a>
      </div>
    `),
  );

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
        total === 0 ? "Favoritos" : `Favoritos, ${pluralize(total, "película guardada", "películas guardadas")}`,
      );
    }
  };

  sync();
  subscribe(sync);

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

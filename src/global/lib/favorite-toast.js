import { html, toElement } from "./dom.js";
import { icon } from "./icons.js";

const VISIBLE_DURATION = 3200;
const EXIT_DURATION = 280;

let toast = null;
let hideTimer = 0;
let exitTimer = 0;

function createToast() {
  const node = toElement(html`
    <div class="favorite-toast" aria-hidden="true" hidden>
      <span class="favorite-toast__icon">${icon("heart")}</span>
      <p class="favorite-toast__text">
        <span class="favorite-toast__title">Guardada en favoritos</span>
        <span class="favorite-toast__name" data-toast-name></span>
      </p>
    </div>
  `);
  document.body.append(node);
  return node;
}

export function showFavoriteToast(title) {
  const node = toast?.isConnected ? toast : (toast = createToast());
  node.querySelector("[data-toast-name]").textContent = title;

  window.clearTimeout(hideTimer);
  window.clearTimeout(exitTimer);

  document.body.classList.add("has-favorite-toast");
  node.hidden = false;
  node.classList.remove("is-visible");
  void node.offsetWidth;
  node.classList.add("is-visible");

  hideTimer = window.setTimeout(() => {
    node.classList.remove("is-visible");
    document.body.classList.remove("has-favorite-toast");
    exitTimer = window.setTimeout(() => {
      node.hidden = true;
    }, EXIT_DURATION);
  }, VISIBLE_DURATION);
}

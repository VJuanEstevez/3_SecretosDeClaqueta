import { prefersReducedMotion } from "./a11y.js";

const TRANSITION_NAME = "movie-poster";
const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

let posterTransitionActive = false;

export async function swapView(outlet, markup) {
  if (posterTransitionActive || prefersReducedMotion() || typeof document.startViewTransition !== "function") {
    outlet.innerHTML = String(markup);
    return;
  }

  const transition = document.startViewTransition(() => {
    outlet.innerHTML = String(markup);
  });

  await transition.updateCallbackDone;
}

export function withPosterTransition(source, update) {
  if (!source || prefersReducedMotion()) {
    update();
    return;
  }

  if (typeof document.startViewTransition !== "function") {
    flipPoster(source, update);
    return;
  }

  source.style.viewTransitionName = TRANSITION_NAME;
  posterTransitionActive = true;

  const transition = document.startViewTransition(() => {
    update();
    const target = document.querySelector("[data-poster-transition]");
    if (target) target.style.viewTransitionName = TRANSITION_NAME;
  });

  transition.finished
    .catch(() => {})
    .finally(() => {
      posterTransitionActive = false;
      source.style.viewTransitionName = "";
      const target = document.querySelector("[data-poster-transition]");
      target?.style.removeProperty("view-transition-name");
    });
}

function flipPoster(source, update) {
  posterTransitionActive = true;
  const start = source.getBoundingClientRect();
  const startRadius = getComputedStyle(source).borderRadius;
  const clone = source.cloneNode(true);

  clone.removeAttribute("data-poster");
  clone.removeAttribute("style");
  clone.setAttribute("aria-hidden", "true");
  clone.style.cssText = [
    "position: fixed",
    `top: ${start.top}px`,
    `left: ${start.left}px`,
    `width: ${start.width}px`,
    `height: ${start.height}px`,
    "margin: 0",
    "object-fit: cover",
    `border-radius: ${startRadius}`,
    "z-index: 120",
    "pointer-events: none",
  ].join(";");

  document.body.append(clone);
  update();

  const target = document.querySelector("[data-poster-transition]");
  if (!target) {
    clone.remove();
    posterTransitionActive = false;
    return;
  }

  const end = target.getBoundingClientRect();
  const frame = target.closest(".detail__poster-frame");
  const endRadius = frame
    ? getComputedStyle(frame).borderRadius
    : getComputedStyle(target).borderRadius;
  target.style.visibility = "hidden";

  const animation = clone.animate(
    [
      {
        top: `${start.top}px`,
        left: `${start.left}px`,
        width: `${start.width}px`,
        height: `${start.height}px`,
        borderRadius: startRadius,
      },
      {
        top: `${end.top}px`,
        left: `${end.left}px`,
        width: `${end.width}px`,
        height: `${end.height}px`,
        borderRadius: endRadius,
      },
    ],
    { duration: 520, easing: EASING, fill: "forwards" },
  );

  animation.finished
    .catch(() => {})
    .finally(() => {
      posterTransitionActive = false;
      clone.remove();
      target.style.visibility = "";
    });
}

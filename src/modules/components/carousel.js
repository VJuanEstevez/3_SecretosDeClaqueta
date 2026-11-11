import { icon } from "../../global/lib/icons.js";

const AUTOPLAY_DELAY = 4600;

export function initCarousel(root, { signal, autoplay = true } = {}) {
  const track = root.querySelector("[data-carousel-track]");
  const previousButton = root.querySelector("[data-carousel-prev]");
  const nextButton = root.querySelector("[data-carousel-next]");
  const toggleButton = root.querySelector("[data-carousel-toggle]");
  if (!track) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let paused = false;
  let userPaused = false;

  const step = () => {
    const firstCard = track.querySelector(".carousel__item");
    if (!firstCard) return track.clientWidth * 0.8;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || "16") || 16;
    return firstCard.getBoundingClientRect().width + gap;
  };

  const updateButtons = () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (previousButton) previousButton.disabled = track.scrollLeft <= 2;
    if (nextButton) nextButton.disabled = track.scrollLeft >= maxScroll - 2;
  };

  previousButton?.addEventListener(
    "click",
    () => track.scrollBy({ left: -step() * 2, behavior: "smooth" }),
    { signal },
  );

  nextButton?.addEventListener(
    "click",
    () => track.scrollBy({ left: step() * 2, behavior: "smooth" }),
    { signal },
  );

  track.addEventListener("scroll", updateButtons, { signal, passive: true });
  window.addEventListener("resize", updateButtons, { signal, passive: true });

  if (typeof ResizeObserver === "function") {
    const observer = new ResizeObserver(updateButtons);
    observer.observe(track);
    signal?.addEventListener("abort", () => observer.disconnect(), { once: true });
  }

  const syncToggle = () => {
    if (!toggleButton) return;
    toggleButton.setAttribute("aria-pressed", String(userPaused));
    toggleButton.setAttribute(
      "aria-label",
      userPaused ? "Reanudar el carrusel automático" : "Pausar el carrusel automático",
    );
    toggleButton.innerHTML = String(userPaused ? icon("play") : icon("pause"));
  };

  if (toggleButton) {
    toggleButton.hidden = reduceMotion.matches;
    toggleButton.addEventListener(
      "click",
      () => {
        userPaused = !userPaused;
        if (!userPaused) paused = false;
        syncToggle();
      },
      { signal },
    );
    syncToggle();
  }

  const pause = () => {
    paused = true;
  };
  const resume = () => {
    paused = false;
  };

  root.addEventListener("pointerenter", pause, { signal });
  root.addEventListener("pointerleave", resume, { signal });
  root.addEventListener("focusin", pause, { signal });
  root.addEventListener(
    "focusout",
    (event) => {
      if (!root.contains(event.relatedTarget)) resume();
    },
    { signal },
  );

  updateButtons();
  requestAnimationFrame(updateButtons);

  if (!autoplay || !signal) return;

  const timer = window.setInterval(() => {
    if (paused || userPaused || reduceMotion.matches || document.hidden) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 4) return;

    if (track.scrollLeft >= maxScroll - 8) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      track.scrollBy({ left: step(), behavior: "smooth" });
    }
  }, AUTOPLAY_DELAY);

  signal.addEventListener("abort", () => window.clearInterval(timer), { once: true });
}

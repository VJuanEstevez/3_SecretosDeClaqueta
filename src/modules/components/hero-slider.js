import { prefersReducedMotion } from "../../global/lib/a11y.js";
import { posterUrl } from "../api/tmdb.js";

const SLIDE_LIMIT = 6;
const SLIDE_INTERVAL = 5200;

let activeTimer = 0;

export function mountHeroSlider(host, movies, { signal } = {}) {
  window.clearInterval(activeTimer);
  activeTimer = 0;

  if (!host) return;

  const posters = (Array.isArray(movies) ? movies : [])
    .filter((movie) => movie.posterPath)
    .slice(0, SLIDE_LIMIT);

  if (posters.length === 0) return;

  const slides = posters.map((movie, index) => {
    const slide = document.createElement("img");
    slide.className = index === 0 ? "hero__slide is-active" : "hero__slide";
    slide.src = posterUrl(movie.posterPath, "w500");
    slide.alt = "";
    slide.width = 500;
    slide.height = 750;
    slide.decoding = "async";
    slide.loading = index === 0 ? "eager" : "lazy";
    return slide;
  });

  host.replaceChildren(...slides);

  if (slides.length < 2 || prefersReducedMotion()) return;

  let index = 0;
  const timer = window.setInterval(() => {
    if (document.hidden) return;
    slides[index].classList.remove("is-active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("is-active");
  }, SLIDE_INTERVAL);

  activeTimer = timer;

  signal?.addEventListener(
    "abort",
    () => {
      window.clearInterval(timer);
      if (activeTimer === timer) activeTimer = 0;
    },
    { once: true },
  );
}

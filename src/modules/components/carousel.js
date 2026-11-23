const SPEED = 30;

export function initCarousel(root, { signal, autoplay = true } = {}) {
  const track = root.querySelector("[data-carousel-track]");
  if (!track) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let pointerInside = false;
  let focusInside = false;
  let cycle = 0;
  let position = 0;
  let lastAssigned = 0;
  let lastTime = 0;
  let frameId = 0;

  const measure = () => {
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 16;
    cycle = (track.scrollWidth + gap) / 2;
  };

  root.addEventListener("pointerenter", () => { pointerInside = true; }, { signal });
  root.addEventListener("pointerleave", () => { pointerInside = false; }, { signal });
  root.addEventListener("focusin", () => { focusInside = true; }, { signal });
  root.addEventListener(
    "focusout",
    (event) => {
      if (!root.contains(event.relatedTarget)) focusInside = false;
    },
    { signal },
  );

  let observer = null;
  if (typeof ResizeObserver === "function") {
    observer = new ResizeObserver(measure);
    observer.observe(track);
  }
  measure();

  if (!autoplay || !signal) {
    signal?.addEventListener("abort", () => observer?.disconnect(), { once: true });
    return;
  }

  const tick = (time) => {
    if (!lastTime) lastTime = time;
    const elapsed = Math.min(time - lastTime, 120);
    lastTime = time;

    const paused = pointerInside || focusInside || reduceMotion.matches || document.hidden;
    if (!paused && cycle > track.clientWidth) {
      const current = track.scrollLeft;
      if (Math.abs(current - lastAssigned) > 2) position = current;

      position += (SPEED * elapsed) / 1000;
      while (position >= cycle) position -= cycle;

      track.scrollLeft = position;
      lastAssigned = track.scrollLeft;
    }

    frameId = requestAnimationFrame(tick);
  };

  frameId = requestAnimationFrame(tick);

  signal.addEventListener(
    "abort",
    () => {
      cancelAnimationFrame(frameId);
      observer?.disconnect();
    },
    { once: true },
  );
}

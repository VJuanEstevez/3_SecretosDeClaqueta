let region = null;

export function announce(message) {
  region ??= document.getElementById("live-region");
  if (!region) return;
  region.textContent = "";
  requestAnimationFrame(() => {
    region.textContent = message;
  });
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

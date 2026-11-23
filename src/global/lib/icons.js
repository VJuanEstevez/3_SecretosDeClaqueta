import { raw } from "./dom.js";

const paths = {
  clapper: `
    <rect x="4.8" y="11.3" width="15.6" height="8.2" rx="1.4" />
    <path d="M5.2 11.3 20.5 7.5V4.6L5.2 8.4Z" />
    <path d="m8.2 10.5 1.6-3.2M12.1 9.5l1.6-3.2M16 8.5l1.6-3.2" />
    <path d="M8 14.6h8.8M8 17.1h5.2" />
    <circle cx="4.1" cy="11.3" r=".8" fill="currentColor" stroke="none" />
  `,
  heart: `<path d="M12 20.4S4.6 16.1 4.6 11.2A4.05 4.05 0 0 1 12 8.2a4.05 4.05 0 0 1 7.4 3c0 4.9-7.4 9.2-7.4 9.2Z" />`,
  star: `<path d="m12 3.7 2.5 5.1 5.6.8-4.1 4 1 5.6-5-2.7-5 2.7 1-5.6-4.1-4 5.6-.8Z" />`,
  search: `<circle cx="11" cy="11" r="6.4" /><path d="m15.9 15.9 4.4 4.4" />`,
  arrowLeft: `<path d="M19 12H5" /><path d="m11 18-6-6 6-6" />`,
  arrowRight: `<path d="M5 12h14" /><path d="m13 6 6 6-6 6" />`,
  arrowUp: `<path d="M12 19V5" /><path d="m6 11 6-6 6 6" />`,
  download: `<path d="M12 3.5v11" /><path d="m7.5 10 4.5 4.5L16.5 10" /><path d="M4.5 19.5h15" />`,
  close: `<path d="m6 6 12 12M18 6 6 18" />`,
  calendar: `<rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M3.5 10h17M8 3.5V7M16 3.5V7" />`,
  clock: `<circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" />`,
  user: `<circle cx="12" cy="8" r="3.6" /><path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" />`,
  film: `<rect x="3" y="4.5" width="18" height="15" rx="2" /><path d="M8 4.5v15M16 4.5v15M3 9.5h5M3 14.5h5M16 9.5h5M16 14.5h5" />`,
  sparkle: `<path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3M6.2 6.2l2.1 2.1M15.7 15.7l2.1 2.1M17.8 6.2l-2.1 2.1M8.3 15.7l-2.1 2.1" />`,
  pause: `<path d="M9.2 5.5v13M14.8 5.5v13" stroke-width="2.2" />`,
  play: `<path d="M8.6 5.8v12.4L18.4 12 8.6 5.8Z" />`,
  sun: `<circle cx="12" cy="12" r="4.2" /><path d="M12 2.8v2.3M12 18.9v2.3M4.5 4.5l1.6 1.6M17.9 17.9l1.6 1.6M2.8 12h2.3M18.9 12h2.3M4.5 19.5l1.6-1.6M17.9 6.1l1.6-1.6" />`,
  moon: `<path d="M20.4 14.7A8.7 8.7 0 0 1 9.3 3.6 8.7 8.7 0 1 0 20.4 14.7Z" />`,
};

export function icon(name, { className = "icon", strokeWidth = 1.7 } = {}) {
  return raw(
    `<svg class="${className}" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${paths[name] ?? ""}</svg>`,
  );
}

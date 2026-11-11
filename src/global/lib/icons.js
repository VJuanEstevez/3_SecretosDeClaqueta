import { raw } from "./dom.js";

const paths = {
  clapper: `
    <path d="M3.5 9.5h17v9a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5v-9Z" />
    <path d="M3.5 9.5 4.6 5.6l16.9 1.6-.8 2.3" />
    <path d="m8.3 6.1 2.6.2-1 3.2-2.6-.2M13.7 6.6l2.6.2-1 3.2-2.6-.2" />
    <path d="M7.5 13.8h9M7.5 16.4h5.5" />
  `,
  heart: `<path d="M12 20.4S4.6 16.1 4.6 11.2A4.05 4.05 0 0 1 12 8.2a4.05 4.05 0 0 1 7.4 3c0 4.9-7.4 9.2-7.4 9.2Z" />`,
  star: `<path d="m12 3.7 2.5 5.1 5.6.8-4.1 4 1 5.6-5-2.7-5 2.7 1-5.6-4.1-4 5.6-.8Z" />`,
  search: `<circle cx="11" cy="11" r="6.4" /><path d="m15.9 15.9 4.4 4.4" />`,
  arrowLeft: `<path d="M19 12H5" /><path d="m11 18-6-6 6-6" />`,
  arrowRight: `<path d="M5 12h14" /><path d="m13 6 6 6-6 6" />`,
  close: `<path d="m6 6 12 12M18 6 6 18" />`,
  calendar: `<rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M3.5 10h17M8 3.5V7M16 3.5V7" />`,
  clock: `<circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" />`,
  user: `<circle cx="12" cy="8" r="3.6" /><path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" />`,
  film: `<rect x="3" y="4.5" width="18" height="15" rx="2" /><path d="M8 4.5v15M16 4.5v15M3 9.5h5M3 14.5h5M16 9.5h5M16 14.5h5" />`,
  sparkle: `<path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3M6.2 6.2l2.1 2.1M15.7 15.7l2.1 2.1M17.8 6.2l-2.1 2.1M8.3 15.7l-2.1 2.1" />`,
  pause: `<path d="M9.2 5.5v13M14.8 5.5v13" stroke-width="2.2" />`,
  play: `<path d="M8.6 5.8v12.4L18.4 12 8.6 5.8Z" />`,
};

export function icon(name, { className = "icon", strokeWidth = 1.7 } = {}) {
  return raw(
    `<svg class="${className}" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${paths[name] ?? ""}</svg>`,
  );
}

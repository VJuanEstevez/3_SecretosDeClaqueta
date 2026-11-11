export function formatRating(value) {
  const rating = Number(value);
  if (!Number.isFinite(rating) || rating <= 0) return "—";
  return rating.toLocaleString("es-ES", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export function formatYear(date) {
  const year = String(date ?? "").slice(0, 4);
  return /^\d{4}$/.test(year) ? year : "—";
}

export function formatRuntime(minutes) {
  const total = Number(minutes);
  if (!Number.isFinite(total) || total <= 0) return "";
  const hours = Math.floor(total / 60);
  const rest = total % 60;
  if (!hours) return `${rest} min`;
  return rest ? `${hours} h ${rest} min` : `${hours} h`;
}

export function pluralize(count, singular, plural) {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function padNumber(value) {
  return String(value).padStart(2, "0");
}

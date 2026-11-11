const STORAGE_KEY = "sdc:favorites";
const listeners = new Set();

function readStorage() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item) => item && Number.isFinite(Number(item.id)))
      .map((item) => ({
        id: Number(item.id),
        title: String(item.title ?? "Título desconocido"),
        posterPath: item.posterPath ?? null,
        backdropPath: item.backdropPath ?? null,
        releaseDate: String(item.releaseDate ?? ""),
        year: String(item.year ?? "—"),
        rating: Number(item.rating ?? 0),
        overview: String(item.overview ?? ""),
      }));
  } catch {
    return [];
  }
}

let items = readStorage();

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* Almacenamiento no disponible: la lista vive solo en memoria. */
  }
}

function emit() {
  listeners.forEach((listener) => listener(items));
}

function toStored(movie) {
  return {
    id: Number(movie.id),
    title: String(movie.title ?? "Título desconocido"),
    posterPath: movie.posterPath ?? null,
    backdropPath: movie.backdropPath ?? null,
    releaseDate: String(movie.releaseDate ?? ""),
    year: String(movie.year ?? "—"),
    rating: Number(movie.rating ?? 0),
    overview: String(movie.overview ?? ""),
  };
}

export function getFavorites() {
  return [...items];
}

export function favoriteCount() {
  return items.length;
}

export function isFavorite(id) {
  return items.some((movie) => movie.id === Number(id));
}

export function toggleFavorite(movie) {
  const id = Number(movie.id);
  const exists = isFavorite(id);

  items = exists ? items.filter((item) => item.id !== id) : [toStored(movie), ...items];
  persist();
  emit();

  return !exists;
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

window.addEventListener("storage", (event) => {
  if (event.key !== STORAGE_KEY) return;
  items = readStorage();
  emit();
});

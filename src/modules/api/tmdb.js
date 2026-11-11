import { formatYear } from "../../global/lib/format.js";
import { combineSignals } from "../../global/lib/abort.js";

const API_ROOT = "https://api.themoviedb.org/3";
const IMAGE_ROOT = "https://image.tmdb.org/t/p";
const API_KEY = String(import.meta.env.VITE_TMDB_API_KEY ?? "").trim();
const PLACEHOLDER = `${import.meta.env.BASE_URL}poster-placeholder.svg`;
const CACHE_TTL = 5 * 60 * 1000;
const CACHE_LIMIT = 50;

const cache = new Map();

export const isConfigured = API_KEY.length > 0;
export const placeholderUrl = PLACEHOLDER;

export class TmdbError extends Error {
  constructor(message, { kind = "request", status = 0, cause } = {}) {
    super(message, { cause });
    this.name = "TmdbError";
    this.kind = kind;
    this.status = status;
  }
}

function requestTimeout(ms = 12000) {
  return typeof AbortSignal.timeout === "function" ? AbortSignal.timeout(ms) : undefined;
}

function remember(key, data) {
  if (cache.size >= CACHE_LIMIT) {
    const oldest = cache.keys().next().value;
    cache.delete(oldest);
  }
  cache.set(key, { savedAt: Date.now(), data });
}

async function request(path, { params = {}, signal } = {}) {
  if (!isConfigured) {
    throw new TmdbError("Falta configurar la clave de TMDB.", { kind: "config" });
  }

  const url = new URL(`${API_ROOT}${path}`);
  url.searchParams.set("language", "es-ES");
  url.searchParams.set("api_key", API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  const key = url.toString();
  const cached = cache.get(key);
  if (cached && Date.now() - cached.savedAt < CACHE_TTL) {
    return cached.data;
  }

  try {
    const response = await fetch(url, {
      signal: combineSignals(signal, requestTimeout()),
      headers: { accept: "application/json" },
    });

    if (!response.ok) {
      throw new TmdbError(`TMDB respondió con el estado ${response.status}.`, {
        kind: "http",
        status: response.status,
      });
    }

    const data = await response.json();
    remember(key, data);
    return data;
  } catch (error) {
    if (error instanceof TmdbError) throw error;
    if (error?.name === "AbortError") {
      throw new TmdbError("La solicitud se canceló.", { kind: "abort", cause: error });
    }
    throw new TmdbError("No pudimos conectar con TMDB.", { kind: "network", cause: error });
  }
}

export function normalizeMovie(movie) {
  return {
    id: Number(movie.id),
    title: movie.title || movie.name || "Título desconocido",
    originalTitle: movie.original_title || movie.title || "",
    posterPath: movie.poster_path ?? null,
    backdropPath: movie.backdrop_path ?? null,
    releaseDate: movie.release_date ?? "",
    year: formatYear(movie.release_date),
    rating: Number(movie.vote_average ?? 0),
    voteCount: Number(movie.vote_count ?? 0),
    overview: movie.overview ?? "",
  };
}

function normalizeDetail(movie) {
  return {
    ...normalizeMovie(movie),
    runtime: Number(movie.runtime ?? 0),
    tagline: movie.tagline ?? "",
    genres: Array.isArray(movie.genres) ? movie.genres.map((genre) => genre.name) : [],
    originalLanguage: movie.original_language ?? "",
  };
}

function normalizeCast(cast) {
  return (Array.isArray(cast) ? cast : []).slice(0, 12).map((person) => ({
    id: Number(person.id),
    name: person.name ?? "",
    character: person.character ?? "",
    profilePath: person.profile_path ?? null,
  }));
}

export function posterUrl(path, size = "w500") {
  return path ? `${IMAGE_ROOT}/${size}${path}` : PLACEHOLDER;
}

export function backdropUrl(path, size = "w1280") {
  return path ? `${IMAGE_ROOT}/${size}${path}` : null;
}

export function profileUrl(path, size = "w185") {
  return path ? `${IMAGE_ROOT}/${size}${path}` : null;
}

export async function getTrendingMovies({ signal } = {}) {
  const data = await request("/trending/movie/week", { signal });
  return (data.results ?? []).map(normalizeMovie).filter((movie) => movie.title);
}

export async function searchMovies(query, { signal, page = 1 } = {}) {
  const data = await request("/search/movie", {
    params: { query, include_adult: "false", page },
    signal,
  });
  return {
    results: (data.results ?? []).map(normalizeMovie).filter((movie) => movie.title),
    total: Number(data.total_results ?? 0),
  };
}

export async function getMovieDetail(id, { signal } = {}) {
  const [rawMovie, credits] = await Promise.all([
    request(`/movie/${id}`, { signal }),
    request(`/movie/${id}/credits`, { signal }).catch((error) => {
      if (error?.kind === "abort") throw error;
      return { cast: [], crew: [] };
    }),
  ]);

  const director = (credits.crew ?? []).find((person) => person.job === "Director");

  return {
    movie: normalizeDetail(rawMovie),
    cast: normalizeCast(credits.cast),
    director: director?.name ?? null,
  };
}

# Secretos de claqueta

Archivo de rodajes hecho con HTML semántico, CSS nativo y JavaScript vanilla (ESM). Los
pósters, sinopsis, reparto y tendencias llegan de la API de TMDB; las cinco curiosidades de
cada película son contenido mock curado.

## Puesta en marcha

```bash
pnpm install
cp .env.example .env
```

Abre `.env` y añade tu clave de API de TMDB:

```env
VITE_TMDB_API_KEY=tu_clave_aqui
```

Puedes obtener una clave gratuita en <https://www.themoviedb.org/settings/api>. Después:

```bash
pnpm dev
```

La URL de desarrollo es <http://localhost:5173/3_SecretosDeClaqueta/> (Vite usa
`base: '/3_SecretosDeClaqueta/'`). Sin clave, la app muestra un panel de configuración en
lugar de las tendencias.

> Vite tiene `root: 'src'` y `envDir: '..'`, así que el `.env` debe quedarse en la raíz del
> proyecto. Si cambias la clave, reinicia el servidor.

## Scripts

- `pnpm dev` — servidor de desarrollo.
- `pnpm build` — compilación de producción.
- `pnpm lint` — oxlint sobre `src/` (requiere tener oxlint instalado).
- `pnpm format` — oxfmt sobre `src/` (requiere tener oxfmt instalado).

## Estructura

```
src/
├─ index.html
├─ main.js                 arranque, rutas y transición del póster
├─ public/                 favicon y póster de respaldo
├─ global/
│  ├─ lib/                 DOM, iconos, formato, accesibilidad y movimiento
│  └─ styles/              tokens, base, componentes y vistas
└─ modules/
   ├─ api/                 cliente de TMDB
   ├─ components/          cabecera, cards, carrusel
   ├─ data/                secretos curados + generador de respaldo
   ├─ state/               favoritos en localStorage
   ├─ views/               inicio, búsqueda, detalle y favoritos
   └─ router.js            rutas por hash
```

## Rutas

- `#/` — portada con buscador y tendencias.
- `#/search?q=dune` — resultados de búsqueda en una vista propia.
- `#/movie/:id` — ficha con reparto y cinco secretos.
- `#/favorites` — lista guardada en el navegador.

## Notas

- Los favoritos se guardan en `localStorage` con la clave `sdc:favorites`.
- La transición card → detalle usa View Transitions API con un fallback FLIP y respeta
  `prefers-reduced-motion`.
- La clave de TMDB se expone en el bundle: es una SPA estática sin backend. No la publiques
  si necesitas restringir su uso.
- Datos y pósters: TMDB. Este producto usa la API de TMDB pero no está avalado ni certificado
  por TMDB.

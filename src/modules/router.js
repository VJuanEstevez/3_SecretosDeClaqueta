let renderCallback = null;
let renderedPath = "";

export function parseLocation() {
  const raw = window.location.hash.replace(/^#/, "") || "/";
  const [pathPart, queryPart = ""] = raw.split("?");
  const path = pathPart.startsWith("/") ? pathPart : `/${pathPart}`;
  return {
    path,
    query: new URLSearchParams(queryPart),
    raw,
  };
}

export function initRouter({ render }) {
  renderCallback = render;

  const handleLocationChange = (state) => {
    const location = parseLocation();
    if (location.raw === renderedPath) return;
    renderedPath = location.raw;
    renderCallback(location, state ?? null);
  };

  window.addEventListener("popstate", (event) => {
    handleLocationChange(event.state?.routeState ?? null);
  });

  window.addEventListener("hashchange", () => {
    handleLocationChange(null);
  });

  const initial = parseLocation();
  renderedPath = initial.raw;
  renderCallback(initial, null);
}

export function navigate(path, { state = null, replace = false } = {}) {
  const target = path.startsWith("#") ? path.slice(1) : path;
  if (replace) {
    window.history.replaceState({ routeState: state }, "", `#${target}`);
  } else {
    window.history.pushState({ routeState: state }, "", `#${target}`);
  }
  renderedPath = target;
  return renderCallback(parseLocation(), state);
}

export function replaceRoute(path) {
  const target = path.startsWith("#") ? path.slice(1) : path;
  window.history.replaceState({ routeState: null }, "", `#${target}`);
  renderedPath = target;
}

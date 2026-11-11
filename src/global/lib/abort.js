export function combineSignals(...signals) {
  const available = signals.filter(Boolean);
  if (available.length === 0) return undefined;
  if (available.length === 1) return available[0];

  if (typeof AbortSignal.any === "function") {
    return AbortSignal.any(available);
  }

  const controller = new AbortController();
  available.forEach((signal) => {
    if (signal.aborted) {
      controller.abort(signal.reason);
      return;
    }
    signal.addEventListener("abort", () => controller.abort(signal.reason), { once: true });
  });
  return controller.signal;
}

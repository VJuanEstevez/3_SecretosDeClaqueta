import { announce } from "./a11y.js";

export async function downloadImage(url, filename) {
  try {
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();

    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    announce("Póster descargado.");
  } catch {
    window.open(url, "_blank", "noopener,noreferrer");
    announce("La descarga directa no estuvo disponible. Se abrió la imagen en una pestaña nueva.");
  }
}

import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  base: "/3_SecretosDeClaqueta/",
  envDir: "..",
  server: {
    port: 5173,
    strictPort: false,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});

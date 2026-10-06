import { defineConfig } from "vite";

const base = process.env.GH_PAGES_BASE || "/FFmpeg-Gui/";

const devBackend = process.env.VITE_DEV_BACKEND || "http://127.0.0.1:8787";

export default defineConfig({
  base,
  server: {
    proxy: {
      "/api": devBackend,
      "/health": devBackend,
    },
  },
  build: {
    target: "es2020",
  },
});

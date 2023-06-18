import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/HexagonGame/",
  plugins: [svgr(), react()],
  resolve: {
    alias: {
      //https://github.com/feross/simple-peer/issues/823
      "readable-stream": "vite-compatible-readable-stream",
    },
  },
  build: {
    outDir: "build",
  },
  define: {
    global: "globalThis",
  },
});

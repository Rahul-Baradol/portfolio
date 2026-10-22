import { defineConfig } from "vite";

export default defineConfig({
  // The page uses top-level await and loads its libraries as ES modules from esm.sh.
  build: { target: "esnext" },
});

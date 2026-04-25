import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { visualizer } from "rollup-plugin-visualizer";
import critters from "critters";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
    {
      name: "critters",
      apply: () => true,
      closeBundle: async () => {
        const fs = await import("fs");
        const path = await import("path");

        const distPath = path.resolve(__dirname, "dist");
        const htmlPath = path.join(distPath, "index.html");

        if (fs.existsSync(htmlPath)) {
          const html = fs.readFileSync(htmlPath, "utf-8");

          const crittersInstance = new critters({
            path: distPath,

            preload: "swap",

            inlineFonts: true,

            pruneSource: true,

            mergeStylesheets: true,

            reduceInlineStyles: true,

            minimumExternalSize: 0,

            preloadStrategy: "media",
          });

          const processed = await crittersInstance.process(html);

          fs.writeFileSync(htmlPath, processed);
        }
      },
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

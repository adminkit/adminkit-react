import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// BASE_PATH serves the app from a sub-path, such as /admin
const base = process.env.BASE_PATH
  ? `${process.env.BASE_PATH.replace(/\/$/, "")}/`
  : "/";

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    // The page with every Lucide icon and ApexCharts are the large chunks; each loads only
    // on the pages that use it
    chunkSizeWarningLimit: 1100,
  },
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Our own Sass only triggers "import"; the rest comes from Bootstrap 5.3
        silenceDeprecations: [
          // @import: Bootstrap 5.3 has no @use entry point, so the whole tree still uses it
          "import",
          // red(), green(), blue() in Bootstrap's color-contrast()
          "color-functions",
          // mix(), map-get() and friends without a sass: module prefix in Bootstrap
          "global-builtin",
          // Sass if() in Bootstrap's mixins
          "if-function",
        ],
      },
    },
  },
});

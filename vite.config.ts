import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // BASE_PATH, from the environment or .env, serves the app from a sub-path, such as /admin
  const { BASE_PATH } = loadEnv(mode, process.cwd(), "");

  return {
    base: BASE_PATH ? `${BASE_PATH.replace(/\/$/, "")}/` : "/",
    plugins: [react()],
    build: {
      // The page with every Lucide icon is the large chunk; it loads only on that page
      chunkSizeWarningLimit: 1100,
      // Bootstrap's Sass takes most of the build time; skip Rolldown's notice about it
      rolldownOptions: { checks: { pluginTimings: false } },
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
  };
});

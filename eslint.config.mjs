import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores([
    "dist/**",
    "public/**",
    "test-results/**",
    "playwright-report/**",
    "src/components/plugins/vector-maps/**",
  ]),
  js.configs.recommended,
  tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  {
    languageOptions: { globals: { ...globals.browser } },
  },
  {
    files: ["scripts/**", "*.config.*"],
    languageOptions: { globals: { ...globals.node } },
  },
]);

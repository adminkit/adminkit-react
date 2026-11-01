import pro from "@/data/editions/pro.json";
import pages from "@/data/pages.json";
import stats from "@/data/stats.json";

export const site = {
  title: "AdminKit Demo",
  slogan: "React Admin Template",
  description:
    "Responsive Admin & Dashboard Template based on React and Bootstrap 5",
  year: new Date().getFullYear(),
};

/** "/" or the path the app is served from, such as "/admin/" (BASE_PATH, see vite.config.ts) */
export const basePath = import.meta.env.BASE_URL;

/**
 * The URL of a file in public/: React Router adds the base path to links, but <img src>
 * and other plain attributes need it added.
 */
export const asset = (path: string) => `${basePath.replace(/\/$/, "")}${path}`;

export type Page = (typeof pages)[number];

// Counts in descriptions, such as {icons.lucide} or {editions.pro.pages.count}
const counts: unknown = { ...stats, editions: { pro } };

const withCounts = (text: string) =>
  text.replace(/\{([\w.]+)\}/g, (match, path: string) => {
    const value = path
      .split(".")
      .reduce<unknown>(
        (object, key) => (object as Record<string, unknown>)?.[key],
        counts
      );
    return typeof value === "number" ? value.toLocaleString("en-US") : match;
  });

/**
 * A page from src/data/pages.json, the list of pages that scripts/stats.mjs counts, with the
 * counts in its description filled in.
 */
export const getPage = (path: string): Page | undefined => {
  const page = pages.find((entry) => entry.path === path);
  return page && { ...page, description: withCounts(page.description) };
};

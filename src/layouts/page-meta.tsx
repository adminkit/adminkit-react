import { useEffect } from "react";
import { useLocation } from "react-router";
import { getPage, site } from "@/lib/site";

/** The document title and description of the current page, from src/data/pages.json */
export function PageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = getPage(pathname);
    document.title =
      page && pathname !== "/"
        ? `${page.title} | ${site.title}`
        : `${site.title} - ${site.slogan}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", page?.description ?? site.description);
  }, [pathname]);

  return null;
}

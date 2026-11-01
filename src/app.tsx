import { type ComponentType, lazy, Suspense } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import pages from "@/data/pages.json";
import { AuthLayout } from "@/layouts/auth-layout";
import { DashboardLayout } from "@/layouts/dashboard-layout";
import { PageEffects } from "@/layouts/page-effects";
import { PageMeta } from "@/layouts/page-meta";

// Every page is a file in src/routes, named after its URL (index.tsx is /), and is listed
// in src/data/pages.json with the layout it uses. Each page loads when it is opened.
const files = import.meta.glob<{ default: ComponentType }>("./routes/*.tsx");

const page = (name: string) => {
  const file = files[`./routes/${name}.tsx`];
  if (!file) {
    throw new Error(`src/routes/${name}.tsx is missing`);
  }
  return lazy(file);
};

const routes = pages.map((entry) => ({
  ...entry,
  Page: page(entry.path === "/" ? "index" : entry.path.slice(1)),
}));

const NotFound = page("pages-404");

const routesFor = (layout: string) =>
  routes
    .filter((route) => route.layout === layout)
    .map(({ path, Page }) => (
      <Route key={path} path={path} element={<Page />} />
    ));

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <PageMeta />
      <Routes>
        <Route
          element={
            <DashboardLayout>
              <Suspense>
                <Outlet />
              </Suspense>
            </DashboardLayout>
          }
        >
          {routesFor("dashboard")}
        </Route>
        <Route
          element={
            <AuthLayout>
              <Suspense>
                <Outlet />
              </Suspense>
            </AuthLayout>
          }
        >
          {routesFor("auth")}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <PageEffects />
    </BrowserRouter>
  );
}

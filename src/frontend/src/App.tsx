import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
} from "@tanstack/react-router";
import Layout from "./components/Layout";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: Layout,
});

const homeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/",
  component: lazyRouteComponent(() => import("./pages/Home")),
});

const jobsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/jobs",
  component: lazyRouteComponent(() => import("./pages/Jobs")),
});

const jobDetailRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/jobs/$id",
  component: lazyRouteComponent(() => import("./pages/JobDetail")),
});

const authRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/auth",
  component: lazyRouteComponent(() => import("./pages/Auth")),
});

const profileRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/profile",
  component: lazyRouteComponent(() => import("./pages/Profile")),
});

const employerDashboardRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/employer/dashboard",
  component: lazyRouteComponent(() => import("./pages/EmployerDashboard")),
});

const postJobRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/employer/post-job",
  component: lazyRouteComponent(() => import("./pages/PostJob")),
});

const editJobRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/employer/post-job/$id",
  component: lazyRouteComponent(() => import("./pages/PostJob")),
});

const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([
    homeRoute,
    jobsRoute,
    jobDetailRoute,
    authRoute,
    profileRoute,
    employerDashboardRoute,
    postJobRoute,
    editJobRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}

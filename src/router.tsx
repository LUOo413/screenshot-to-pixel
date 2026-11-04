import { createBrowserRouter, redirect, type RouteObject } from "react-router";

import { requireUser } from "@/lib/require-user";
import AuthPage from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import Index from "@/pages/Index";
import { NotFound, Root, RootError } from "@/pages/Root";

export const routes: RouteObject[] = [
  {
    element: <Root />,
    errorElement: <RootError />,
    hydrateFallbackElement: <div className="min-h-screen bg-background" />,
    children: [
      { path: "/", element: <Index /> },
      { path: "/sign-in", element: <AuthPage mode="signin" /> },
      { path: "/sign-up", element: <AuthPage mode="signup" /> },
      // Old URLs from before the SPA conversion.
      {
        path: "/auth",
        loader: ({ request }) =>
          redirect(
            new URL(request.url).searchParams.get("mode") === "signup" ? "/sign-up" : "/sign-in",
          ),
      },
      { path: "/app", loader: requireUser, element: <Dashboard /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

export const router = createBrowserRouter(routes);

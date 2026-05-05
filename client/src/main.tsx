import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/assets/styles/global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "@/routes/route.jsx";
import { Providers } from "@/components/providers";
import ErrorBoundary from "@/components/ErrorBoundary";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </ErrorBoundary>
  </StrictMode>
);




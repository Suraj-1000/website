import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/assets/styles/global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "@/routes/route.jsx";
import { Providers } from "@/components/providers";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>
);




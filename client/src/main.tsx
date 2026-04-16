import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/assets/styles/global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "@/routes/route.jsx";
import { AuthProvider } from "@/services/context/AuthContext";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);




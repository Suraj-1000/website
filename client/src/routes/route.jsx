import { Navigate } from "react-router-dom";
import CRMLayout from "@/pages/_components/layout/CRMLayout";
import Login from "@/pages/crm/Login";

export const routes = [
   {
      path: "/",
      element: <Navigate to="/crm/dashboard" />,
   },
   {
      path: "/crm",
      element: <CRMLayout />,
      children: [
         {
            path: "dashboard",
            element: <div>Dashboard</div>,
         },
      ],
   },
   {
      path: "/login",
      element: <Login />,
   },
];

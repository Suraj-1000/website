import { Navigate } from "react-router-dom";


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

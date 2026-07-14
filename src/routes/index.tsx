import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../modules/admin/dashboard/pages/DashboardPage";
import LoginPage from "../modules/admin/login/pages/LoginPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin/dashboard",
    element: <DashboardPage />,
  },
]);
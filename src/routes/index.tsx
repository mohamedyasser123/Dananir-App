import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../modules/admin/dashboard/pages/DashboardPage";
import LoginPage from "../modules/admin/login/pages/LoginPage";
import AdminLayout from "../layouts/AdminLayout";
import PlatformManagmentAdmin from "../modules/admin/platformadmin/pages/PlatformManagmentAdmin";


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
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "platform-management/admin",
        element: <PlatformManagmentAdmin />,
      },
    ],
  },
]);
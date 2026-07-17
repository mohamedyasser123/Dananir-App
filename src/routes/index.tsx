import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../modules/admin/dashboard/pages/DashboardPage";
import LoginPage from "../modules/admin/login/pages/LoginPage";
import AdminLayout from "../layouts/AdminLayout";
import PlatformManagmentAdmin from "../modules/admin/platformadmin/pages/PlatformManagmentAdmin";
import AdminDetailsPage from "../modules/admin/platformadmin/pages/AdminDetailsPage";
import RolesAndPermissionsPage from "../modules/admin/rolesandpermissions/pages/RolesAndPermissionsPage";
import MembershipsPage from "../modules/admin/rolesandpermissions/pages/memberships/MembershipsPage";
import UserSegmentPage from "../modules/admin/rolesandpermissions/pages/usersegment/UserSegmentPage";
import BanksPage from "../modules/admin/rolesandpermissions/pages/banks/BanksPage";
import PrivatePage from "../modules/admin/rolesandpermissions/pages/private/PrivatePage";
import CompanyPage from "../modules/admin/rolesandpermissions/pages/company/CompanyPage";


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
      {
        path: "platform-management/admin/:id",
        element: <AdminDetailsPage />,
      },
      {
        path: "roles-permissions",
        children: [
          {
            index: true,
            element: <RolesAndPermissionsPage />,
          },
          {
            path: "memberships",
            element: <MembershipsPage />,
          },
          {
            path: "user-segment",
            element: <UserSegmentPage />,
          },
          {
            path: "banks",
            element: <BanksPage />,
          },
          {
            path: "private",
            element: <PrivatePage />,
          },
          {
            path: "company",
            element: <CompanyPage />,
          },
        ],
      },
    ],
  },
]);
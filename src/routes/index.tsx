import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../modules/admin/dashboard/pages/DashboardPage";
import LoginPage from "../modules/admin/login/pages/LoginPage";
import AdminLayout from "../layouts/AdminLayout";
import PlatformManagmentAdmin from "../modules/admin/platformadmin/pages/PlatformManagmentAdmin";
import AdminDetailsPage from "../modules/admin/platformadmin/pages/AdminDetailsPage";
import RolesAndPermissionsPage from "../modules/admin/rolesandpermissions/pages/RolesAndPermissionsPage";
import MembershipsPage from "../modules/admin/rolesandpermissions/pages/memberships/MembershipsPage";
import BanksPage from "../modules/admin/user-segment/pages/banks/BanksPage";
import PrivatePage from "../modules/admin/user-segment/pages/private/PrivatePage";
import PrivateDetailsPage from "../modules/admin/user-segment/pages/private/PrivateDetailsPage";
import CompanyPage from "../modules/admin/user-segment/pages/company/CompanyPage";
import CompanyDetailsPage from "../modules/admin/user-segment/pages/company/CompanyDetailsPage";
import NotificationsPage from "../modules/admin/communications/pages/notifications/NotificationsPage";
import ChatsPage from "../modules/admin/communications/pages/chats/ChatsPage";
import SmsPage from "../modules/admin/communications/pages/sms/SmsPage";
import EmailsPage from "../modules/admin/communications/pages/emails/EmailsPage";
import AppAdsPage from "../modules/admin/app-ads/pages/AppAdsPage";


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
        ],
      },
      {
        path: "user-segment",
        children: [
          {
            path: "banks",
            element: <BanksPage />,
          },
          {
            path: "private",
            element: <PrivatePage />,
          },
          {
            path: "private/:id",
            element: <PrivateDetailsPage />,
          },
          {
            path: "company",
            element: <CompanyPage />,
          },
          {
            path: "company/:id",
            element: <CompanyDetailsPage />,
          },
        ],
      },
      {
        path: "communications",
        children: [
          {
            path: "notifications",
            element: <NotificationsPage />,
          },
          {
            path: "chats",
            element: <ChatsPage />,
          },
          {
            path: "sms",
            element: <SmsPage />,
          },
          {
            path: "emails",
            element: <EmailsPage />,
          },
        ],
      },
      {
        path: "app-ads",
        element: <AppAdsPage />,
      },
    ],
  },
]);

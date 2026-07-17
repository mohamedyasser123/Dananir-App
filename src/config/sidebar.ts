import {
  Home, Users, Shield, Crown, User, Landmark, Lock,
  Building2, MessageSquare, Bell, Mail, MessageCircle,
  Megaphone, DollarSign, Briefcase,
} from "lucide-react"
import type { SidebarItemConfig } from "../types/sidebar"

export const sidebarConfig: SidebarItemConfig[] = [
  {
    title: "Home",
    icon: Home,
    path: "/admin/dashboard",
  },
  {
    title: "Platform managment",
    icon: Users,
    permission: "platform_management.view",
    children: [
      {
        title: "Admin",
        icon: Users,
        path: "/admin/platform-management/admin",
        permission: "platform_management.admin.view",
      },
    ],
  },
  {
    title: "Roles & Permissions",
    icon: Shield,
    path: "/admin/roles-permissions",
    permission: "roles_permissions.view",
     children: [
      {
        title: "Memberships",
        icon: Users,
        path: "/admin/roles-permissions/memberships",
        permission: "platform_management.admin.view",
      },
    ],
  },
  {
    title: "Memberships",
    icon: Crown,
    path: "/admin/memberships",
    permission: "memberships.view",
  },
  {
    title: "User segment",
    icon: User,
    path: "/admin/user-segment",
    permission: "user_segment.view",
  },
  {
    title: "Banks",
    icon: Landmark,
    path: "/admin/banks",
    permission: "banks.view",
  },
  {
    title: "Private",
    icon: Lock,
    path: "/admin/private",
    permission: "private.view",
  },
  {
    title: "Company",
    icon: Building2,
    path: "/admin/company",
    permission: "company.view",
  },
  {
    title: "Communications",
    icon: MessageSquare,
    permission: "communications.view",
    children: [
      {
        title: "Notifications",
        icon: Bell,
        path: "/admin/communications/notifications",
      },
      {
        title: "Emails",
        icon: Mail,
        path: "/admin/communications/emails",
      },
      {
        title: "SMS",
        icon: MessageSquare,
        path: "/admin/communications/sms",
      },
      {
        title: "Chats",
        icon: MessageCircle,
        path: "/admin/communications/chats",
      },
    ],
  },
  {
    title: "App Ads",
    icon: Megaphone,
    path: "/admin/app-ads",
    permission: "app_ads.view",
  },
  {
    title: "Finance",
    icon: DollarSign,
    permission: "finance.view",
    children: [
      {
        title: "Loan Management",
        icon: Briefcase,
        path: "/admin/finance/loan-management",
      },
      {
        title: "Finance Reports",
        icon: DollarSign,
        path: "/admin/finance/reports",
      },
      {
        title: "Transactions",
        icon: DollarSign,
        path: "/admin/finance/transactions",
      },
    ],
  },
]

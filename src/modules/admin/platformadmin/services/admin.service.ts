import type { AdminDetails, AdminUser } from "../types/admin.types"
import type { CreateAdminFormValues, UpdateAdminFormValues } from "../schemas/admin.schema"
import { ROLE_PERMISSIONS } from "../constants/admin.constants"

const NETWORK_DELAY_MS = 600

function delay<T>(data: T, ms = NETWORK_DELAY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

let admins: AdminUser[] = [
  { id: "1", name: "John Smith", email: "john.smith@admin.com", role: "Super Admin", status: "ACTIVE" },
  { id: "2", name: "Sarah Johnson", email: "sarah.j@admin.com", role: "Admin", status: "ACTIVE" },
  { id: "3", name: "Michael Chen", email: "m.chen@admin.com", role: "Manager", status: "ACTIVE" },
  { id: "4", name: "Emma Wilson", email: "emma.w@admin.com", role: "Support", status: "INACTIVE" },
  { id: "5", name: "David Brown", email: "d.brown@admin.com", role: "Admin", status: "ACTIVE" },
  { id: "6", name: "Lisa Anderson", email: "l.a@admin.com", role: "Manager", status: "ACTIVE" },
  { id: "7", name: "James Taylor", email: "j.taylor@admin.com", role: "Support", status: "ACTIVE" },
  { id: "8", name: "Maria Garcia", email: "m.garcia@admin.com", role: "Admin", status: "INACTIVE" },
]

const adminDetailsMeta: Record<string, { createdAt: string; lastLoginAt: string | null }> = {
  "1": { createdAt: "2023-01-10T09:00:00.000Z", lastLoginAt: "2026-07-15T08:30:00.000Z" },
  "2": { createdAt: "2023-03-22T11:15:00.000Z", lastLoginAt: "2026-07-16T14:05:00.000Z" },
  "3": { createdAt: "2023-05-02T13:40:00.000Z", lastLoginAt: "2026-07-14T09:12:00.000Z" },
  "4": { createdAt: "2023-06-18T08:20:00.000Z", lastLoginAt: null },
  "5": { createdAt: "2023-08-09T16:05:00.000Z", lastLoginAt: "2026-07-16T10:45:00.000Z" },
  "6": { createdAt: "2023-09-27T12:30:00.000Z", lastLoginAt: "2026-07-13T17:20:00.000Z" },
  "7": { createdAt: "2024-01-14T10:00:00.000Z", lastLoginAt: "2026-07-16T07:55:00.000Z" },
  "8": { createdAt: "2024-02-05T15:50:00.000Z", lastLoginAt: null },
}

function generateId(): string {
  const maxId = admins.reduce((max, admin) => Math.max(max, Number(admin.id) || 0), 0)
  return (maxId + 1).toString()
}

export async function getAdmins(): Promise<AdminUser[]> {
  return delay([...admins])
}

export async function getAdminById(id: string): Promise<AdminDetails> {
  const admin = admins.find((item) => item.id === id)
  if (!admin) {
    throw new Error(`Admin with id "${id}" was not found`)
  }

  const meta = adminDetailsMeta[id] ?? { createdAt: new Date().toISOString(), lastLoginAt: null }

  return delay({
    ...admin,
    permissions: ROLE_PERMISSIONS[admin.role],
    createdAt: meta.createdAt,
    lastLoginAt: meta.lastLoginAt,
  })
}

export async function createAdmin(payload: CreateAdminFormValues): Promise<AdminUser> {
  const newAdmin: AdminUser = { id: generateId(), ...payload }
  admins = [...admins, newAdmin]
  return delay(newAdmin)
}

export async function updateAdmin(payload: UpdateAdminFormValues): Promise<AdminUser> {
  const existing = admins.find((admin) => admin.id === payload.id)
  if (!existing) {
    throw new Error(`Admin with id "${payload.id}" was not found`)
  }

  const updated: AdminUser = { ...existing, ...payload }
  admins = admins.map((admin) => (admin.id === payload.id ? updated : admin))
  return delay(updated)
}

export async function deleteAdmin(id: string): Promise<{ id: string }> {
  admins = admins.filter((admin) => admin.id !== id)
  return delay({ id })
}

import type { PrivateUser, PrivateUserDetails } from "../types/private.types"
import type { CreatePrivateUserFormValues, UpdatePrivateUserFormValues } from "../schemas/private.schema"

const NETWORK_DELAY_MS = 600

function delay<T>(data: T, ms = NETWORK_DELAY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

let privateUsers: PrivateUser[] = [
  { id: "1", name: "Olivia Turner", email: "olivia.turner@mail.com", phoneNumber: "+1 202-555-0142", status: "Active" },
  { id: "2", name: "Noah Bennett", email: "noah.bennett@mail.com", phoneNumber: "+1 202-555-0198", status: "Active" },
  { id: "3", name: "Ava Richardson", email: "ava.richardson@mail.com", phoneNumber: "+1 202-555-0173", status: "Inactive" },
  { id: "4", name: "Liam Coleman", email: "liam.coleman@mail.com", phoneNumber: "+1 202-555-0156", status: "Active" },
]

const privateUserDetailsMeta: Record<string, { createdAt: string; lastActivityAt: string | null }> = {
  "1": { createdAt: "2023-02-14T09:00:00.000Z", lastActivityAt: "2026-07-15T08:30:00.000Z" },
  "2": { createdAt: "2023-04-02T11:15:00.000Z", lastActivityAt: "2026-07-16T14:05:00.000Z" },
  "3": { createdAt: "2023-06-19T13:40:00.000Z", lastActivityAt: null },
  "4": { createdAt: "2023-08-01T08:20:00.000Z", lastActivityAt: "2026-07-13T17:20:00.000Z" },
}

function generateId(): string {
  const maxId = privateUsers.reduce((max, user) => Math.max(max, Number(user.id) || 0), 0)
  return (maxId + 1).toString()
}

export async function getPrivateUsers(): Promise<PrivateUser[]> {
  return delay([...privateUsers])
}

export async function getPrivateUserById(id: string): Promise<PrivateUserDetails> {
  const user = privateUsers.find((item) => item.id === id)
  if (!user) {
    throw new Error(`Private user with id "${id}" was not found`)
  }

  const meta = privateUserDetailsMeta[id] ?? { createdAt: new Date().toISOString(), lastActivityAt: null }

  return delay({
    ...user,
    createdAt: meta.createdAt,
    lastActivityAt: meta.lastActivityAt,
  })
}

export async function createPrivateUser(payload: CreatePrivateUserFormValues): Promise<PrivateUser> {
  const newUser: PrivateUser = { id: generateId(), ...payload }
  privateUsers = [...privateUsers, newUser]
  return delay(newUser)
}

export async function updatePrivateUser(payload: UpdatePrivateUserFormValues): Promise<PrivateUser> {
  const existing = privateUsers.find((user) => user.id === payload.id)
  if (!existing) {
    throw new Error(`Private user with id "${payload.id}" was not found`)
  }

  const updated: PrivateUser = { ...existing, ...payload }
  privateUsers = privateUsers.map((user) => (user.id === payload.id ? updated : user))
  return delay(updated)
}

export async function deletePrivateUser(id: string): Promise<{ id: string }> {
  privateUsers = privateUsers.filter((user) => user.id !== id)
  return delay({ id })
}

import type { PrivateUser, PrivateUserStatus } from "../types/private.types"

export function filterPrivateUsers(users: PrivateUser[], search: string, status?: PrivateUserStatus): PrivateUser[] {
  const term = search.trim().toLowerCase()

  return users
    .filter((user) => !status || user.status === status)
    .filter(
      (user) =>
        !term ||
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    )
}

export function isPrivateUsersEmpty(users: PrivateUser[]): boolean {
  return users.length === 0
}

export type PrivateUserStatus = "Active" | "Inactive"

export interface PrivateUser {
  id: string
  name: string
  email: string
  phoneNumber?: string
  status: PrivateUserStatus
}

export interface PrivateUserDetails extends PrivateUser {
  createdAt: string
  lastActivityAt: string | null
}

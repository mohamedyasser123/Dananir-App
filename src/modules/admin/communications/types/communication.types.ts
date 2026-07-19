export type NotificationType = "success" | "user" | "warning" | "info"

export interface Notification {
  id: string
  title: string
  description: string
  time: string
  isUnread: boolean
  type: NotificationType
}

export type ChatParticipantType = "user" | "admin"

export interface Chat {
  id: string
  name: string
  initials: string
  message: string
  time: string
  unread: number
  type: ChatParticipantType
  active: boolean
}

export interface ChatMessage {
  id: string
  chatId: string
  text: string
  time: string
  isMe: boolean
}

export type SmsStatus = "DELIVERED" | "PENDING" | "FAILED"

export interface Sms {
  id: string
  phone: string
  time: string
  body: string
  status: SmsStatus
}

export interface Email {
  id: string
  sender: string
  emailAddress: string
  subject: string
  preview: string
  time: string
  starred: boolean
  hasAttachment: boolean
  dateLabel: string
}

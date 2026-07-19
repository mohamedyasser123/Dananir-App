import type { Chat, Email, Notification, Sms } from "../types/communication.types"

export function isNotificationsEmpty(notifications: Notification[]): boolean {
  return notifications.length === 0
}

export function isChatsEmpty(chats: Chat[]): boolean {
  return chats.length === 0
}

export function isSmsEmpty(sms: Sms[]): boolean {
  return sms.length === 0
}

export function isEmailsEmpty(emails: Email[]): boolean {
  return emails.length === 0
}

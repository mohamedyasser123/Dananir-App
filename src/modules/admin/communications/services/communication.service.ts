import type { Chat, ChatMessage, Email, Notification, Sms } from "../types/communication.types"
import type { CreateNotificationFormValues, SendChatMessageFormValues, SendEmailFormValues, SendSmsFormValues } from "../schemas/communication.schema"

const NETWORK_DELAY_MS = 600

function delay<T>(data: T, ms = NETWORK_DELAY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

function generateId(existing: { id: string }[]): string {
  const maxId = existing.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0)
  return (maxId + 1).toString()
}

// ---------------------------------------------------------------------------
// Notifications
// ---------------------------------------------------------------------------

let notifications: Notification[] = [
  { id: "1", title: "Payment Received", description: "Payment of $5,680 received from Global Corp", time: "2 minutes ago", isUnread: true, type: "success" },
  { id: "2", title: "New User Registration", description: "Sarah Johnson has registered as a new user", time: "15 minutes ago", isUnread: true, type: "user" },
  { id: "3", title: "Pending Approval", description: "Loan application #456 requires your review", time: "1 hour ago", isUnread: true, type: "warning" },
  { id: "4", title: "Order Completed", description: "Order #12847 has been successfully completed", time: "2 hours ago", isUnread: false, type: "info" },
]

export async function getNotifications(): Promise<Notification[]> {
  return delay([...notifications])
}

export async function getNotificationById(id: string): Promise<Notification> {
  const notification = notifications.find((item) => item.id === id)
  if (!notification) {
    throw new Error(`Notification with id "${id}" was not found`)
  }
  return delay(notification)
}

export async function createNotification(payload: CreateNotificationFormValues): Promise<Notification> {
  const newNotification: Notification = {
    id: generateId(notifications),
    title: payload.title,
    description: payload.message,
    time: "Just now",
    isUnread: true,
    type: "info",
  }
  notifications = [newNotification, ...notifications]
  return delay(newNotification)
}

export async function markNotificationRead(id: string): Promise<Notification> {
  const existing = notifications.find((item) => item.id === id)
  if (!existing) {
    throw new Error(`Notification with id "${id}" was not found`)
  }
  const updated: Notification = { ...existing, isUnread: false }
  notifications = notifications.map((item) => (item.id === id ? updated : item))
  return delay(updated)
}

export async function markAllNotificationsRead(): Promise<Notification[]> {
  notifications = notifications.map((item) => ({ ...item, isUnread: false }))
  return delay([...notifications])
}

export async function deleteNotification(id: string): Promise<{ id: string }> {
  notifications = notifications.filter((item) => item.id !== id)
  return delay({ id })
}

// ---------------------------------------------------------------------------
// Chats
// ---------------------------------------------------------------------------

let chats: Chat[] = [
  { id: "1", name: "John Smith", initials: "JS", message: "Thanks for the update!", time: "2m ago", unread: 2, type: "user", active: true },
  { id: "2", name: "Sarah Johnson", initials: "SJ", message: "Can we schedule a meeting?", time: "15m ago", unread: 0, type: "user", active: false },
  { id: "3", name: "Michael Chen", initials: "MC", message: "I've sent you the document", time: "1h ago", unread: 1, type: "user", active: false },
  { id: "4", name: "Emma Wilson", initials: "EW", message: "Perfect, thank you!", time: "2h ago", unread: 0, type: "admin", active: false },
  { id: "5", name: "David Brown", initials: "DB", message: "Let me check and get back to you", time: "Yesterday", unread: 0, type: "admin", active: false },
]

let chatMessages: ChatMessage[] = [
  { id: "1", chatId: "1", text: "Hi! How are you?", time: "10:15 AM", isMe: false },
  { id: "2", chatId: "1", text: "I'm good, thanks! How about you?", time: "10:16 AM", isMe: true },
  { id: "3", chatId: "1", text: "Doing great! I wanted to ask about the new feature release.", time: "10:17 AM", isMe: false },
  { id: "4", chatId: "1", text: "Sure! It's scheduled for next week. We're finishing up the final tests.", time: "10:18 AM", isMe: true },
  { id: "5", chatId: "1", text: "That's awesome! Can you send me the documentation?", time: "10:20 AM", isMe: false },
  { id: "6", chatId: "1", text: "Of course! I'll send it right away.", time: "10:21 AM", isMe: true },
  { id: "7", chatId: "1", text: "Thanks for the update!", time: "10:22 AM", isMe: false },
  { id: "8", chatId: "2", text: "Hi, do you have a minute?", time: "09:00 AM", isMe: false },
  { id: "9", chatId: "2", text: "Sure, what's up?", time: "09:01 AM", isMe: true },
  { id: "10", chatId: "2", text: "Can we schedule a meeting?", time: "09:02 AM", isMe: false },
  { id: "11", chatId: "3", text: "I've attached the contract draft.", time: "1h ago", isMe: false },
  { id: "12", chatId: "3", text: "Got it, reviewing now.", time: "58m ago", isMe: true },
  { id: "13", chatId: "3", text: "I've sent you the document", time: "1h ago", isMe: false },
  { id: "14", chatId: "4", text: "Everything looks good on our end.", time: "2h ago", isMe: false },
  { id: "15", chatId: "4", text: "Perfect, thank you!", time: "2h ago", isMe: true },
  { id: "16", chatId: "5", text: "Any update on the pending request?", time: "Yesterday", isMe: false },
  { id: "17", chatId: "5", text: "Let me check and get back to you", time: "Yesterday", isMe: true },
]

export async function getChats(): Promise<Chat[]> {
  return delay([...chats])
}

export async function getChatById(id: string): Promise<Chat> {
  const chat = chats.find((item) => item.id === id)
  if (!chat) {
    throw new Error(`Chat with id "${id}" was not found`)
  }
  return delay(chat)
}

export async function getChatMessages(chatId: string): Promise<ChatMessage[]> {
  return delay(chatMessages.filter((message) => message.chatId === chatId))
}

export async function sendChatMessage(payload: SendChatMessageFormValues): Promise<ChatMessage> {
  const newMessage: ChatMessage = {
    id: generateId(chatMessages),
    chatId: payload.chatId,
    text: payload.text,
    time: "Just now",
    isMe: true,
  }
  chatMessages = [...chatMessages, newMessage]
  chats = chats.map((chat) => (chat.id === payload.chatId ? { ...chat, message: payload.text, time: "Just now" } : chat))
  return delay(newMessage)
}

export async function deleteChat(id: string): Promise<{ id: string }> {
  chats = chats.filter((chat) => chat.id !== id)
  chatMessages = chatMessages.filter((message) => message.chatId !== id)
  return delay({ id })
}

// ---------------------------------------------------------------------------
// SMS
// ---------------------------------------------------------------------------

let smsMessages: Sms[] = [
  { id: "1", phone: "+1 234 567 8901", time: "10:30 AM", body: "Your order #12847 has been confirmed", status: "DELIVERED" },
  { id: "2", phone: "+1 234 567 8902", time: "09:15 AM", body: "Payment received. Thank you!", status: "DELIVERED" },
  { id: "3", phone: "+1 234 567 8903", time: "Yesterday", body: "Your loan application is under review", status: "PENDING" },
  { id: "4", phone: "+1 234 567 8904", time: "Yesterday", body: "Account verification code: 123456", status: "DELIVERED" },
  { id: "5", phone: "+1 234 567 8905", time: "Mar 21", body: "Reminder: Payment due in 3 days", status: "FAILED" },
]

export async function getSms(): Promise<Sms[]> {
  return delay([...smsMessages])
}

export async function getSmsById(id: string): Promise<Sms> {
  const sms = smsMessages.find((item) => item.id === id)
  if (!sms) {
    throw new Error(`SMS with id "${id}" was not found`)
  }
  return delay(sms)
}

export async function sendSms(payload: SendSmsFormValues): Promise<Sms> {
  const newSms: Sms = {
    id: generateId(smsMessages),
    phone: payload.phone,
    time: "Just now",
    body: payload.body,
    status: "PENDING",
  }
  smsMessages = [newSms, ...smsMessages]
  return delay(newSms)
}

export async function deleteSms(id: string): Promise<{ id: string }> {
  smsMessages = smsMessages.filter((item) => item.id !== id)
  return delay({ id })
}

// ---------------------------------------------------------------------------
// Emails
// ---------------------------------------------------------------------------

let emails: Email[] = [
  { id: "1", sender: "John Smith", emailAddress: "john.smith@company.com", subject: "Q1 Financial Report Review", preview: "Please review the attached Q1 financial report and provide your feedback...", time: "10:30 AM", starred: true, hasAttachment: true, dateLabel: "10:30 AM" },
  { id: "2", sender: "Sarah Johnson", emailAddress: "sarah.j@company.com", subject: "New Marketing Campaign Proposal", preview: "I've prepared a new marketing campaign proposal for the upcoming quarter...", time: "09:15 AM", starred: false, hasAttachment: false, dateLabel: "09:15 AM" },
  { id: "3", sender: "Tech Solutions Support", emailAddress: "support@techsolutions.com", subject: "Ticket #12847 - Issue Resolved", preview: "Your support ticket has been resolved. We've implemented the fix...", time: "Yesterday", starred: false, hasAttachment: false, dateLabel: "Yesterday" },
  { id: "4", sender: "Platform Admin", emailAddress: "admin@platform.com", subject: "System Maintenance Notification", preview: "Scheduled maintenance will be performed on March 25, 2026...", time: "Yesterday", starred: true, hasAttachment: false, dateLabel: "Yesterday" },
  { id: "5", sender: "Michael Chen", emailAddress: "m.chen@partnership.com", subject: "Partnership Opportunity", preview: "I would like to discuss a potential partnership opportunity between our...", time: "Mar 21", starred: false, hasAttachment: true, dateLabel: "Mar 21" },
]

export async function getEmails(): Promise<Email[]> {
  return delay([...emails])
}

export async function getEmailById(id: string): Promise<Email> {
  const email = emails.find((item) => item.id === id)
  if (!email) {
    throw new Error(`Email with id "${id}" was not found`)
  }
  return delay(email)
}

export async function sendEmail(payload: SendEmailFormValues): Promise<Email> {
  const newEmail: Email = {
    id: generateId(emails),
    sender: "Admin",
    emailAddress: "admin@platform.com",
    subject: payload.subject,
    preview: payload.body,
    time: "Just now",
    starred: false,
    hasAttachment: false,
    dateLabel: "Just now",
  }
  emails = [newEmail, ...emails]
  return delay(newEmail)
}

export async function toggleEmailStar(id: string): Promise<Email> {
  const existing = emails.find((item) => item.id === id)
  if (!existing) {
    throw new Error(`Email with id "${id}" was not found`)
  }
  const updated: Email = { ...existing, starred: !existing.starred }
  emails = emails.map((item) => (item.id === id ? updated : item))
  return delay(updated)
}

export async function deleteEmail(id: string): Promise<{ id: string }> {
  emails = emails.filter((item) => item.id !== id)
  return delay({ id })
}

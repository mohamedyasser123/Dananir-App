import { z } from "zod"

export const createNotificationSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  targetAudience: z.string().min(1, "Target audience is required"),
  message: z.string().min(1, "Message is required"),
})

export const sendChatMessageSchema = z.object({
  chatId: z.string().min(1, "Chat id is required"),
  text: z.string().min(1, "Message is required"),
})

export const sendSmsSchema = z.object({
  phone: z.string().min(1, "Recipient phone is required"),
  template: z.string().optional(),
  body: z.string().min(1, "Message is required").max(160, "Message must be 160 characters or fewer"),
})

export const sendEmailSchema = z.object({
  recipientEmail: z.string().min(1, "Recipient email is required").email("Enter a valid email"),
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(1, "Message is required"),
})

export type CreateNotificationFormValues = z.infer<typeof createNotificationSchema>
export type SendChatMessageFormValues = z.infer<typeof sendChatMessageSchema>
export type SendSmsFormValues = z.infer<typeof sendSmsSchema>
export type SendEmailFormValues = z.infer<typeof sendEmailSchema>

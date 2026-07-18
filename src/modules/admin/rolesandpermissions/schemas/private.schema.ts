import { z } from "zod"

export const createPrivateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  phoneNumber: z.string().optional(),
  status: z.enum(["Active", "Inactive"]),
})

export const updatePrivateUserSchema = createPrivateUserSchema.partial().extend({
  id: z.string().min(1, "User id is required"),
})

export type CreatePrivateUserFormValues = z.infer<typeof createPrivateUserSchema>
export type UpdatePrivateUserFormValues = z.infer<typeof updatePrivateUserSchema>

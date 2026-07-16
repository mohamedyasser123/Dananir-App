import { z } from "zod"

export const adminRoleSchema = z.enum(["Super Admin", "Admin", "Manager", "Support"])
export const adminStatusSchema = z.enum(["ACTIVE", "INACTIVE"])

export const createAdminSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  role: adminRoleSchema,
  status: adminStatusSchema,
})

export const updateAdminSchema = createAdminSchema.partial().extend({
  id: z.string().min(1, "Admin id is required"),
})

export type CreateAdminFormValues = z.infer<typeof createAdminSchema>
export type UpdateAdminFormValues = z.infer<typeof updateAdminSchema>

import { z } from "zod"

export const createMembershipPlanSchema = z.object({
  name: z.string().min(2, "Plan name must be at least 2 characters"),
  price: z.string().min(1, "Price is required"),
  activeUsers: z.string().optional(),
  headerBg: z.string().optional(),
  isPopular: z.boolean().optional(),
  features: z.string().optional(),
})

export const updateMembershipPlanSchema = createMembershipPlanSchema.partial().extend({
  id: z.string().min(1, "Plan id is required"),
})

export type CreateMembershipPlanFormValues = z.infer<typeof createMembershipPlanSchema>
export type UpdateMembershipPlanFormValues = z.infer<typeof updateMembershipPlanSchema>

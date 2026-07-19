import { z } from "zod"

export const createAppAdSchema = z.object({
  name: z.string().min(2, "Campaign name must be at least 2 characters"),
  budget: z.string().min(1, "Budget is required"),
  status: z.enum(["ACTIVE", "COMPLETED", "SCHEDULED"]),
})

export const updateAppAdSchema = createAppAdSchema.partial().extend({
  id: z.string().min(1, "Campaign id is required"),
})

export type CreateAppAdFormValues = z.infer<typeof createAppAdSchema>
export type UpdateAppAdFormValues = z.infer<typeof updateAppAdSchema>

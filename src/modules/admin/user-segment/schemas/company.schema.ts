import { z } from "zod"

const visibilitySchema = z.object({
  scope: z.enum(["public", "private", "select_people"]),
  userIds: z.array(z.string()),
})

export const createCompanySchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  phoneNumber: z.string().optional(),
  website: z.string().optional(),
  tradeNumber: z.string().optional(),
  managerName: z.string().optional(),
  industryBranch: z.string().optional(),
  address: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  zipcode: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  tiktok: z.string().optional(),
  youtube: z.string().optional(),
  whatsapp: z.string().optional(),
  visibility: visibilitySchema.optional(),
})

export const updateCompanySchema = createCompanySchema.partial().extend({
  id: z.string().min(1, "Company id is required"),
})

export type CreateCompanyFormValues = z.infer<typeof createCompanySchema>
export type UpdateCompanyFormValues = z.infer<typeof updateCompanySchema>

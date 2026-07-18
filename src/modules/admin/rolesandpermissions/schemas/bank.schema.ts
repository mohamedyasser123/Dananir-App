import { z } from "zod"

export const createBankSchema = z.object({
  bankName: z.string().min(2, "Bank name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  phoneNumber: z.string().optional(),
  website: z.string().optional(),
  tradeNumber: z.string().optional(),
  secondWebsite: z.string().optional(),
  loanOffer: z.string().optional(),
  loanType: z.string().optional(),
  headOfficeAddress: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  zipcode: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  tiktok: z.string().optional(),
  youtube: z.string().optional(),
  whatsapp: z.string().optional(),
  visibility: z.array(z.string()).optional(),
})

export const updateBankSchema = createBankSchema.partial().extend({
  id: z.string().min(1, "Bank id is required"),
})

export type CreateBankFormValues = z.infer<typeof createBankSchema>
export type UpdateBankFormValues = z.infer<typeof updateBankSchema>

import { z } from "zod"

const permissionEntrySchema = z.object({
  id: z.string(),
  code: z.string(),
  view: z.boolean(),
  edite: z.boolean(),
  addDelete: z.boolean(),
  manage: z.boolean(),
})

const permissionCategorySchema = z.object({
  category: z.string(),
  permissions: z.array(permissionEntrySchema),
})

export const createRoleSchema = z.object({
  name: z.string().min(2, "Role name must be at least 2 characters"),
  matrix: z.array(permissionCategorySchema),
})

export const updateRoleSchema = createRoleSchema.partial().extend({
  id: z.string().min(1, "Role id is required"),
})

export type CreateRoleFormValues = z.infer<typeof createRoleSchema>
export type UpdateRoleFormValues = z.infer<typeof updateRoleSchema>

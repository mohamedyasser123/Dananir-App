import type { FormFieldConfig } from "@/components/shared/form/form.types"

export const PRIVATE_USER_FORM_FIELDS: FormFieldConfig[] = [
  { name: "name", label: "Name", type: "text", placeholder: "Enter Full Name", required: true },
  { name: "email", label: "Email", type: "email", placeholder: "Enter Email", required: true },
  { name: "phoneNumber", label: "Phone Number", type: "tel", placeholder: "1234455" },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
    ],
  },
]

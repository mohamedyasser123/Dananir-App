import type { FormFieldConfig } from "../../../../components/shared/form/form.types"

export const ADMIN_FORM_FIELDS: FormFieldConfig[] = [
  {
    name: "profileImage",
    label: "Profile Image",
    type: "image",
    uploadVariant: "avatar",
    helperText: "Image should be below 4mb",
    colSpan: 2,
  },
  {
    name: "First Name",
    label: "First Name",
    type: "text",
    placeholder: "Enter your Name",
    required: true,
  },
  {
    name: "Last Name",
    label: "Last Name",
    type: "text",
    placeholder: "Enter your Last Name",
    required: true,
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    required: true,
    options: [
      { label: "Super Admin", value: "Super Admin" },
      { label: "Admin", value: "Admin" },
      { label: "Manager", value: "Manager" },
      { label: "Support", value: "Support" },
    ],
  },
  {
    name: "Username",
    label: "Username",
    type: "text",
    placeholder: "Username",
    required: true,
  },
  {
    name: "Phone Number",
    label: "Phone Number",
    type: "number",
    placeholder: "123456",
    required: true,
  },
  {
    name: "Email",
    label: "Email",
    type: "email",
    placeholder: "Enter Your Email",
    required: true,
  },
   {
    name: "Password",
    label: "Password",
    type: "password",
    placeholder: "******",
    required: true,
  },
   {
    name: "Confirm Password",
    label: "Confirm Password",
    type: "password",
    placeholder: "******",
    required: true,
  },
   
]

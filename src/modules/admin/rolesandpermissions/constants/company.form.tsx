import { Plus } from "lucide-react"
import { SharedVisibilityControl, type SharedVisibilityValue } from "@/components/shared/inputs/SharedVisibilityControl"
import type { FormDialogTab } from "@/components/shared/form/form.types"
import { createAddressFields, createSocialProfileFields, DEFAULT_VISIBILITY_USERS } from "@/components/shared/form/commonFieldGroups"
import { INDUSTRY_BRANCH_OPTIONS } from "./company.constants"

export const COMPANY_VISIBILITY_USERS = DEFAULT_VISIBILITY_USERS

export const COMPANY_FORM_TABS: FormDialogTab[] = [
  {
    key: "basic",
    label: "Basic Information",
    fields: [
      {
        name: "profileImage",
        label: "Upload Profile Image",
        type: "image",
        uploadVariant: "avatar",
        helperText: "Image should be below 4mb",
        colSpan: 2,
      },
      { name: "companyName", label: "Company Name", type: "text", placeholder: "Enter your Name", required: true },
      { name: "email", label: "Email", type: "email", placeholder: "Enter Email", required: true },
      { name: "phoneNumber", label: "Phone Number", type: "tel", placeholder: "1234455" },
      { name: "website", label: "Website", type: "text", placeholder: "Enter Website" },
      { name: "tradeNumber", label: "Trade number", type: "text", placeholder: "1234455" },
      { name: "managerName", label: "Manager Name", type: "text", placeholder: "Enter Manager Name" },
      {
        name: "industryBranch",
        label: "Industry branch",
        type: "select",
        options: INDUSTRY_BRANCH_OPTIONS,
        placeholder: "Select",
      },
    ],
  },
  {
    key: "address",
    label: "Adress",
    fields: [
      ...createAddressFields(),
      {
        name: "addBranch",
        label: "",
        type: "custom",
        colSpan: 2,
        render: () => (
          <button
            type="button"
            onClick={() => console.log("Add branch clicked")}
            className="flex items-center gap-1.5 text-[13px] font-semibold text-[#2C4F93] hover:underline"
          >
            Add Branch <Plus className="h-3.5 w-3.5" />
          </button>
        ),
      },
    ],
  },
  {
    key: "social",
    label: "Social profiles",
    fields: createSocialProfileFields(),
  },
  {
    key: "access",
    label: "Acess",
    fields: [
      {
        name: "visibility",
        label: "",
        type: "custom",
        colSpan: 2,
        render: ({ value, onChange, disabled }) => (
          <SharedVisibilityControl
            users={COMPANY_VISIBILITY_USERS}
            value={value as SharedVisibilityValue | undefined}
            onChange={(next) => onChange(next)}
            onAddUser={() => console.log("Open add user dialog")}
            disabled={disabled}
          />
        ),
      },
    ],
  },
]

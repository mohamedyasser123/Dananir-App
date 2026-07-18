import { SharedUserSelect } from "@/components/shared/inputs/SharedUserSelect"
import type { FormDialogTab } from "@/components/shared/form/form.types"
import {
  createAddressFields,
  createSocialProfileFields,
  DEFAULT_VISIBILITY_USERS,
} from "@/components/shared/form/commonFieldGroups"

const LOAN_OFFER_OPTIONS = [
  { label: "Car", value: "car" },
  { label: "Real estate", value: "real_estate" },
  { label: "Investment", value: "investment" },
]

export const BANK_VISIBILITY_USERS = DEFAULT_VISIBILITY_USERS

export const BANK_FORM_TABS: FormDialogTab[] = [
  {
    key: "basic",
    label: "Basic Information",
    fields: [
      {
        name: "profileImage",
        label: "Upload Profile image",
        type: "image",
        uploadVariant: "avatar",
        helperText: "Image should be below 4mb",
        colSpan: 2,
      },
      { name: "bankName", label: "Bank name", type: "text", placeholder: "Enter your Name", required: true },
      { name: "email", label: "Email", type: "email", placeholder: "Enter Email", required: true },
      { name: "phoneNumber", label: "Phone Number", type: "tel", placeholder: "1234455" },
      { name: "website", label: "Website", type: "text", placeholder: "Enter Website" },
      { name: "tradeNumber", label: "Trade number", type: "text", placeholder: "1234455" },
      { name: "secondWebsite", label: "Website", type: "text", placeholder: "Enter Website" },
      { name: "loanOffer", label: "Loan offer", type: "select", options: LOAN_OFFER_OPTIONS, placeholder: "Select" },
      { name: "loanType", label: "Tag loan type", type: "text", placeholder: "Car, Real estate, Investment" },
    ],
  },
  {
    key: "address",
    label: "Adress",
    fields: createAddressFields({ addressFieldName: "headOfficeAddress" }),
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
          <SharedUserSelect
            options={BANK_VISIBILITY_USERS}
            value={(value as string[]) ?? []}
            onChange={(next) => onChange(next)}
            onAdd={() => console.log("Open add user dialog")}
            disabled={disabled}
          />
        ),
      },
    ],
  },
]

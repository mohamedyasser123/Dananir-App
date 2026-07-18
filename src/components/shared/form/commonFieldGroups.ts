import type { FormFieldConfig, SelectOption } from "./form.types"
import type { SharedUserSelectOption } from "../inputs/SharedUserSelect"

export const COUNTRY_OPTIONS: SelectOption[] = [
  { label: "Egypt", value: "egypt" },
  { label: "United States", value: "us" },
  { label: "United Kingdom", value: "uk" },
]

export const STATE_OPTIONS: SelectOption[] = [
  { label: "Cairo", value: "cairo" },
  { label: "Giza", value: "giza" },
]

export const CITY_OPTIONS: SelectOption[] = [
  { label: "Nasr City", value: "nasr_city" },
  { label: "Maadi", value: "maadi" },
]

export const ZIPCODE_OPTIONS: SelectOption[] = [
  { label: "11511", value: "11511" },
  { label: "12345", value: "12345" },
]

export const DEFAULT_VISIBILITY_USERS: SharedUserSelectOption[] = [
  { id: "1", name: "Mohamed hussein" },
  { id: "2", name: "Mohamed hussein" },
  { id: "3", name: "Mohamed hussein" },
  { id: "4", name: "Mohamed hussein" },
  { id: "5", name: "Mohamed hussein" },
]

interface AddressFieldsOptions {
  addressFieldName?: string
  addressLabel?: string
  addressPlaceholder?: string
}

export function createAddressFields({
  addressFieldName = "address",
  addressLabel = "Head office adresse",
  addressPlaceholder = "Enter your Adress",
}: AddressFieldsOptions = {}): FormFieldConfig[] {
  return [
    {
      name: addressFieldName,
      label: addressLabel,
      type: "text",
      placeholder: addressPlaceholder,
      colSpan: 2,
    },
    { name: "country", label: "Country", type: "select", options: COUNTRY_OPTIONS, placeholder: "Select" },
    { name: "state", label: "State", type: "select", options: STATE_OPTIONS, placeholder: "Select" },
    { name: "city", label: "City", type: "select", options: CITY_OPTIONS, placeholder: "Select" },
    { name: "zipcode", label: "Zipcode", type: "select", options: ZIPCODE_OPTIONS, placeholder: "Select" },
  ]
}

export function createSocialProfileFields(): FormFieldConfig[] {
  return [
    { name: "facebook", label: "Facebook", type: "text", placeholder: "......" },
    { name: "instagram", label: "Instagram", type: "text", placeholder: "......" },
    { name: "tiktok", label: "Tiktok", type: "text", placeholder: "......" },
    { name: "youtube", label: "Youtupe", type: "text", placeholder: "......" },
    { name: "whatsapp", label: "Whatspp", type: "text", placeholder: "......", colSpan: 2 },
  ]
}

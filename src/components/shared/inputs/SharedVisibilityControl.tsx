import { SharedButton } from "../SharedButton"
import { SharedUserCheckboxList, type SharedUserSelectOption } from "./SharedUserSelect"

export type VisibilityScope = "public" | "private" | "select_people"

export interface SharedVisibilityValue {
  scope: VisibilityScope
  userIds: string[]
}

interface VisibilityScopeOption {
  label: string
  value: VisibilityScope
}

const DEFAULT_SCOPE_OPTIONS: VisibilityScopeOption[] = [
  { label: "Public", value: "public" },
  { label: "Private", value: "private" },
  { label: "Select People", value: "select_people" },
]

interface SharedVisibilityControlProps {
  label?: string
  value?: SharedVisibilityValue
  onChange: (value: SharedVisibilityValue) => void
  users: SharedUserSelectOption[]
  scopeOptions?: VisibilityScopeOption[]
  onAddUser?: () => void
  addLabel?: string
  disabled?: boolean
}

export function SharedVisibilityControl({
  label = "Visibility",
  value,
  onChange,
  users,
  scopeOptions = DEFAULT_SCOPE_OPTIONS,
  onAddUser,
  addLabel = "ADD",
  disabled,
}: SharedVisibilityControlProps) {
  const scope = value?.scope ?? scopeOptions[0].value
  const userIds = value?.userIds ?? []

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium text-[#2C4F93]">{label}</span>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          {scopeOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 text-sm font-medium text-[#475569] cursor-pointer"
            >
              <input
                type="radio"
                name="visibility-scope"
                checked={scope === option.value}
                onChange={() => onChange({ scope: option.value, userIds })}
                disabled={disabled}
                className="h-4 w-4 text-[#2C4F93] focus:ring-[#2C4F93]"
              />
              {option.label}
            </label>
          ))}
        </div>

        {onAddUser && (
          <SharedButton
            type="button"
            variant="primary"
            size="sm"
            onClick={onAddUser}
            disabled={disabled}
            className="bg-[#2C4F93] hover:bg-[#1E4385]"
          >
            {addLabel}
          </SharedButton>
        )}
      </div>

      {scope === "select_people" && (
        <SharedUserCheckboxList
          options={users}
          value={userIds}
          onChange={(nextUserIds) => onChange({ scope, userIds: nextUserIds })}
          disabled={disabled}
        />
      )}
    </div>
  )
}

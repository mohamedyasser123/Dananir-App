import { SharedButton } from "../SharedButton"

export interface SharedUserSelectOption {
  id: string
  name: string
  avatarUrl?: string
}

interface SharedUserCheckboxListProps {
  options: SharedUserSelectOption[]
  value?: string[]
  onChange: (value: string[]) => void
  disabled?: boolean
}

export function SharedUserCheckboxList({
  options,
  value = [],
  onChange,
  disabled,
}: SharedUserCheckboxListProps) {
  const toggle = (id: string) => {
    onChange(value.includes(id) ? value.filter((selected) => selected !== id) : [...value, id])
  }

  return (
    <div className="flex flex-col gap-3">
      {options.map((option) => (
        <label key={option.id} className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={value.includes(option.id)}
            onChange={() => toggle(option.id)}
            disabled={disabled}
            className="h-4 w-4 rounded-full border-[#99A1AF] text-[#2C4F93] focus:ring-[#2C4F93]"
          />
          {option.avatarUrl ? (
            <img src={option.avatarUrl} alt={option.name} className="h-8 w-8 rounded-full object-cover" />
          ) : (
            <div className="h-8 w-8 shrink-0 rounded-full bg-slate-200" />
          )}
          <span className="text-sm font-medium text-[#2C4F93]">{option.name}</span>
        </label>
      ))}
    </div>
  )
}

interface SharedUserSelectProps {
  label?: string
  options: SharedUserSelectOption[]
  value?: string[]
  onChange: (value: string[]) => void
  onAdd?: () => void
  addLabel?: string
  disabled?: boolean
}

export function SharedUserSelect({
  label = "Visibility",
  options,
  value = [],
  onChange,
  onAdd,
  addLabel = "ADD",
  disabled,
}: SharedUserSelectProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#2C4F93]">{label}</span>
        {onAdd && (
          <SharedButton
            type="button"
            variant="primary"
            size="sm"
            onClick={onAdd}
            disabled={disabled}
            className="bg-[#2C4F93] hover:bg-[#1E4385]"
          >
            {addLabel}
          </SharedButton>
        )}
      </div>

      <SharedUserCheckboxList options={options} value={value} onChange={onChange} disabled={disabled} />
    </div>
  )
}

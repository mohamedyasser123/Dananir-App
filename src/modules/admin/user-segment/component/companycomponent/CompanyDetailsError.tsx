interface CompanyDetailsErrorProps {
  message?: string
  onRetry: () => void
}

export default function CompanyDetailsError({ message, onRetry }: CompanyDetailsErrorProps) {
  return (
    <div className="p-6 text-sm text-red-500">
      <p>{message ?? "Failed to load company details."}</p>
      <button type="button" onClick={onRetry} className="mt-2 underline">
        Try again
      </button>
    </div>
  )
}

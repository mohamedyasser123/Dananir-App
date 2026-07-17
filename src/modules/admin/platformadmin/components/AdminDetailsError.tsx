interface AdminDetailsErrorProps {
  message?: string
  onRetry: () => void
}

export default function AdminDetailsError({ message, onRetry }: AdminDetailsErrorProps) {
  return (
    <div className="p-6 text-sm text-red-500">
      <p>{message ?? "Failed to load admin details."}</p>
      <button type="button" onClick={onRetry} className="mt-2 underline">
        Try again
      </button>
    </div>
  )
}

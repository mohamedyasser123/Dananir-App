interface PrivateDetailsErrorProps {
  message?: string
  onRetry: () => void
}

export default function PrivateDetailsError({ message, onRetry }: PrivateDetailsErrorProps) {
  return (
    <div className="p-6 text-sm text-red-500">
      <p>{message ?? "Failed to load user details."}</p>
      <button type="button" onClick={onRetry} className="mt-2 underline">
        Try again
      </button>
    </div>
  )
}

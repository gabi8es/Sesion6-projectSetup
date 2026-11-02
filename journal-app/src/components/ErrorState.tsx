interface ErrorStateProps {
  readonly message: string
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <p
      role="alert"
      className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800 dark:border-red-700 dark:bg-red-950 dark:text-red-200"
    >
      {message}
    </p>
  )
}

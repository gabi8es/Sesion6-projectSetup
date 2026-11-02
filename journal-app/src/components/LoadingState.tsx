interface LoadingStateProps {
  readonly label?: string
}

export function LoadingState({ label = 'Loading…' }: LoadingStateProps) {
  return (
    <p
      role="status"
      className="p-6 text-center text-slate-600 dark:text-slate-300"
    >
      {label}
    </p>
  )
}

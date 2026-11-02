import type { ReactNode } from 'react'

interface EmptyStateProps {
  readonly title: string
  readonly description: string
  readonly action?: ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-600">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </h2>
      <p className="text-slate-600 dark:text-slate-300">{description}</p>
      {action}
    </div>
  )
}

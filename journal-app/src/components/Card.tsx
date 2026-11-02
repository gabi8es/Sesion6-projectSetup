import type { ReactNode } from 'react'

interface CardProps {
  readonly children: ReactNode
  readonly className?: string
}

export function Card({ children, className }: CardProps) {
  const base =
    'rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 dark:border-slate-700 dark:bg-slate-800'
  return (
    <section className={className ? `${base} ${className}` : base}>
      {children}
    </section>
  )
}

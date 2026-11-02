interface StatTileProps {
  readonly label: string
  readonly value: string
}

export function StatTile({ label, value }: StatTileProps) {
  return (
    <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
      <dt className="text-sm text-slate-600 dark:text-slate-300">{label}</dt>
      <dd className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
        {value}
      </dd>
    </div>
  )
}

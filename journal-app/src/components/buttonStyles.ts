export type ButtonVariant = 'primary' | 'secondary' | 'danger'

const BASE =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'

const VARIANTS: Readonly<Record<ButtonVariant, string>> = {
  primary:
    'bg-indigo-700 text-white hover:bg-indigo-800 active:bg-indigo-900 focus-visible:ring-indigo-600',
  secondary:
    'border border-slate-300 bg-white text-slate-900 hover:bg-slate-100 active:bg-slate-200 focus-visible:ring-indigo-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700',
  danger:
    'bg-red-700 text-white hover:bg-red-800 active:bg-red-900 focus-visible:ring-red-600',
}

export function getButtonClasses(variant: ButtonVariant): string {
  return `${BASE} ${VARIANTS[variant]}`
}

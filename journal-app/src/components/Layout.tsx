import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import type { FallbackProps } from 'react-error-boundary'
import logoUrl from '../assets/logo.png'
import { ErrorState } from './ErrorState'

const NAV_ITEMS: ReadonlyArray<{
  readonly to: string
  readonly label: string
  readonly end: boolean
}> = [
  { to: '/', label: 'Home', end: true },
  { to: '/journals', label: 'My Journals', end: true },
  { to: '/journals/new', label: 'Add New Journal', end: true },
]

function getNavLinkClasses({
  isActive,
}: {
  readonly isActive: boolean
}): string {
  const base =
    'inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none'
  return isActive
    ? `${base} bg-indigo-700 text-white`
    : `${base} text-slate-800 hover:bg-slate-200 dark:text-slate-100 dark:hover:bg-slate-700`
}

function RenderErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex flex-col items-start gap-3">
      <ErrorState message="This page ran into an unexpected problem." />
      <button
        type="button"
        onClick={resetErrorBoundary}
        className="min-h-11 rounded-lg border border-slate-300 px-4 text-sm font-semibold hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none dark:border-slate-600 dark:hover:bg-slate-700"
      >
        Try again
      </button>
    </div>
  )
}

export function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
        <div className="mx-auto flex max-w-3xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-lg font-bold">
            <img src={logoUrl} alt="" className="h-8 w-8" />
            Daily Journal
          </p>
          <nav aria-label="Main">
            <ul className="flex flex-wrap gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={getNavLinkClasses}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
        <ErrorBoundary
          FallbackComponent={RenderErrorFallback}
          resetKeys={[location.pathname]}
        >
          <Outlet />
        </ErrorBoundary>
      </main>
    </div>
  )
}

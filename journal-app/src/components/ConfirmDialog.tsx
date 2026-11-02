// Created by @gabi8es: Accessible confirmation modal dialog component
import { useEffect, useId } from 'react'
import { Button } from './Button'

interface ConfirmDialogProps {
  readonly isOpen: boolean
  readonly title: string
  readonly description: string
  readonly confirmLabel?: string
  readonly isConfirming?: boolean
  readonly onConfirm: () => void
  readonly onCancel: () => void
}

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = 'Delete',
  isConfirming = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const titleId = useId()
  const descId = useId()

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && !isConfirming) {
        onCancel()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isConfirming, onCancel])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:border dark:border-slate-700 dark:bg-slate-800">
        <h3
          id={titleId}
          className="text-lg font-bold text-slate-900 dark:text-slate-100"
        >
          {title}
        </h3>
        <p
          id={descId}
          className="mt-2 text-sm text-slate-600 dark:text-slate-300"
        >
          {description}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="secondary"
            disabled={isConfirming}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button variant="danger" disabled={isConfirming} onClick={onConfirm}>
            {isConfirming ? 'Deleting…' : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}

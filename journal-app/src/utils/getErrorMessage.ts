const FALLBACK_MESSAGE = 'Something went wrong. Please try again.'

export function getErrorMessage(error: unknown): string {
  return error instanceof Error && error.message
    ? error.message
    : FALLBACK_MESSAGE
}

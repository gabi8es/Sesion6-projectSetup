export type AsyncState<T> =
  | { readonly status: 'loading' }
  | { readonly status: 'error'; readonly message: string }
  | { readonly status: 'success'; readonly data: T }

export type MutationResult<T = void> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly message: string }

import type { ButtonHTMLAttributes } from 'react'
import { getButtonClasses } from './buttonStyles'
import type { ButtonVariant } from './buttonStyles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ButtonVariant
}

export function Button({
  variant = 'primary',
  type = 'button',
  className,
  ...rest
}: ButtonProps) {
  const classes = className
    ? `${getButtonClasses(variant)} ${className}`
    : getButtonClasses(variant)
  return <button type={type} className={classes} {...rest} />
}

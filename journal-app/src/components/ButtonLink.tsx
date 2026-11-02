import { Link } from 'react-router-dom'
import type { LinkProps } from 'react-router-dom'
import { getButtonClasses } from './buttonStyles'
import type { ButtonVariant } from './buttonStyles'

interface ButtonLinkProps extends LinkProps {
  readonly variant?: ButtonVariant
}

export function ButtonLink({
  variant = 'primary',
  className,
  ...rest
}: ButtonLinkProps) {
  const classes = className
    ? `${getButtonClasses(variant)} ${className}`
    : getButtonClasses(variant)
  return <Link className={classes} {...rest} />
}

import arrowIcon from '../assets/arrow.svg'
import arrowSmallIcon from '../assets/arrow-small.svg'
import './Button.css'

/**
 * variant: 'outline' (default) | 'solid' | 'pill'
 * Renders a link when `href` is set, otherwise a <button>.
 */
export default function Button({
  href,
  variant = 'outline',
  arrow = false,
  className = '',
  children,
  ...rest
}) {
  const Tag = href ? 'a' : 'button'
  const classes = ['btn', `btn--${variant}`, className].filter(Boolean).join(' ')

  return (
    <Tag className={classes} href={href} {...rest}>
      <span className="btn__label">{children}</span>
      {arrow && (
        <span className="btn__arrow" aria-hidden="true">
          <img src={variant === 'pill' ? arrowSmallIcon : arrowIcon} alt="" />
        </span>
      )}
    </Tag>
  )
}

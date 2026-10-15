import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

/**
 * Button variants.
 *
 * `accent` is the practice's signature gradient (--gradientColor:
 * linear-gradient(180deg,#27d4ed,#14a5eb)). It carries NAVY text, never white:
 * navy on cyan measures 10.20:1 and navy on blue 6.62:1, so the label stays
 * legible across the whole gradient. White on cyan would be 1.79:1 and fails.
 *
 * `primary` is solid navy with white text (18.26:1).
 */
const variants = {
  accent:
    'bg-brand-gradient text-navy font-semibold shadow-clinical-lg hover:brightness-[1.06] hover:shadow-clinical-lg',
  primary:
    'bg-navy text-white shadow-clinical-lg hover:bg-navy-600 hover:shadow-clinical-lg',
  coral: 'bg-coral text-white shadow-clinical hover:bg-coral-deep',
  outline:
    'border-2 border-navy-200 bg-white/90 text-navy backdrop-blur hover:border-blue hover:bg-white hover:text-blue-deep hover:shadow-clinical',
  ghost: 'text-cyan-deep hover:bg-cyan-50',
  onDark:
    'border border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:border-white/40',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-[0.98rem]',
  lg: 'px-7 py-3.5 text-base',
}

export default function Button({
  to,
  href,
  variant = 'accent',
  size = 'md',
  icon,
  iconRight = false,
  className = '',
  children,
  ...rest
}) {
  const cls = [
    'inline-flex items-center justify-center gap-2.5 rounded-clinical font-semibold',
    'transition-all duration-200 whitespace-nowrap',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
    'active:translate-y-px',
    variants[variant],
    sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const inner = (
    <>
      {icon && !iconRight && <Icon name={icon} size={18} />}
      <span>{children}</span>
      {icon && iconRight && <Icon name="arrow" size={18} />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {inner}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {inner}
      </a>
    )
  }
  return (
    <button type="button" className={cls} {...rest}>
      {inner}
    </button>
  )
}

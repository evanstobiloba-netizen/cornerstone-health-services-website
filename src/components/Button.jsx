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
 *
 * Buttons are pills in this revision, and the outline variant uses a single
 * hairline ring rather than the previous 2px border — both are part of the
 * calmer, softer surface language.
 */
const variants = {
  accent:
    'bg-brand-gradient text-navy font-semibold shadow-clinical hover:brightness-[1.05]',
  primary: 'bg-navy text-white shadow-clinical hover:bg-navy-600',
  coral: 'bg-coral text-white shadow-clinical hover:bg-coral-deep',
  outline:
    'border border-navy-200 bg-white text-navy hover:border-blue-deep hover:text-blue-deep hover:shadow-clinical',
  ghost: 'text-blue-deep hover:bg-navy-50',
  onDark:
    'border border-white/25 bg-white/10 text-white backdrop-blur hover:border-white/40 hover:bg-white/20',
}

const sizes = {
  sm: 'px-4 py-2 text-[0.85rem]',
  md: 'px-5 py-2.5 text-[0.95rem]',
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
    'inline-flex items-center justify-center gap-2.5 rounded-full font-semibold',
    'transition duration-200 whitespace-nowrap',
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

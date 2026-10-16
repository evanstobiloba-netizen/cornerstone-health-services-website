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
 * Buttons are near-square in this system: the editorial page is built from
 * rules and the grid, so a pill would fight it. `link` is the text-and-arrow
 * variant used for secondary actions inside prose, with the rule that draws
 * itself on hover.
 */
const variants = {
  accent:
    'bg-brand-gradient text-navy font-semibold hover:brightness-[1.06] shadow-clinical',
  primary: 'bg-navy text-white font-semibold hover:bg-navy-600',
  coral: 'bg-coral text-white font-semibold hover:bg-coral-deep',
  outline:
    'border border-navy-200 bg-transparent text-navy font-semibold hover:border-navy hover:bg-navy-50',
  ghost: 'text-navy font-semibold hover:bg-navy-50',
  onDark:
    'border border-white/30 bg-transparent text-white font-semibold hover:border-white hover:bg-white/10',
  link: 'text-blue-deep font-semibold !px-0 !py-0 hover:text-navy',
}

const sizes = {
  sm: 'px-4 py-2 text-[0.85rem]',
  md: 'px-5 py-2.5 text-[0.92rem]',
  lg: 'px-7 py-3.5 text-[0.97rem]',
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
  const isLink = variant === 'link'
  const cls = [
    'group inline-flex items-center justify-center gap-2.5 rounded-clinical',
    'transition duration-200 whitespace-nowrap',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
    'active:translate-y-px',
    variants[variant],
    isLink ? '' : sizes[size],
    isLink ? 'link-rule' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const inner = (
    <>
      {icon && !iconRight && <Icon name={icon} size={17} aria-hidden="true" />}
      <span>{children}</span>
      {iconRight && (
        <Icon
          name={icon || 'arrow'}
          size={16}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
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

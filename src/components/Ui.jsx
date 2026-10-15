import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { asset } from '../lib/asset.js'

/**
 * Real brand lockup, supplied as the practice's own PNG assets:
 *   /brand/logo-primary.png  - navy + cyan, for LIGHT backgrounds
 *   /brand/logo-inverse.png  - white + cyan, for DARK backgrounds
 * Both are 434x121 (ratio ~3.586) and were taken from the live site.
 */
export function Logo({ light = false, className = '', height = 38 }) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center ${className}`}
      aria-label="Cornerstone Health Services Inc — home"
    >
      <img
        src={asset(light ? 'brand/logo-inverse.png' : 'brand/logo-primary.png')}
        alt="Cornerstone Health Services Inc"
        width={Math.round(height * 3.586)}
        height={height}
        style={{ height, width: 'auto' }}
        className="shrink-0"
      />
    </Link>
  )
}

/**
 * Section heading with the practice's signature treatment:
 * a short Allison script line in brand blue, above a large Jost heading in navy.
 * Mirrors the live site's `.h1_hdng` + `h2` pairing.
 *
 * `as` lets a page hero render the document's single <h1>.
 */
export function SectionHeading({
  script,
  eyebrow,
  title,
  body,
  align = 'left',
  light = false,
  as: As = 'h2',
  size = 'lg',
}) {
  const sizes = {
    lg: 'text-3xl sm:text-4xl lg:text-[2.75rem]',
    md: 'text-2xl sm:text-3xl',
    sm: 'text-xl sm:text-2xl',
  }
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {(script || eyebrow) && (
        <p
          className={`font-script text-3xl leading-none sm:text-[2.1rem] ${
            light ? 'text-cyan' : 'text-blue-deep'
          }`}
        >
          {script || eyebrow}
        </p>
      )}
      <As
        className={`${script || eyebrow ? 'mt-1' : ''} ${sizes[size]} font-medium ${
          light ? 'text-white' : 'text-navy'
        }`}
      >
        {title}
      </As>
      {body && (
        <p
          className={`mt-4 text-[1.02rem] leading-relaxed ${
            light ? 'text-navy-100' : 'text-body'
          }`}
        >
          {body}
        </p>
      )}
    </div>
  )
}

export function Badge({ children, tone = 'cyan', icon }) {
  const tones = {
    cyan: 'bg-cyan-50 text-cyan-deep ring-cyan-200',
    navy: 'bg-navy-50 text-navy-600 ring-navy-200',
    coral: 'bg-coral-50 text-coral-deep ring-coral-100',
    light: 'bg-white/10 text-white ring-white/20',
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${tones[tone]}`}
    >
      {icon && <Icon name={icon} size={14} />}
      {children}
    </span>
  )
}

export function Card({ children, className = '', as: As = 'div', ...rest }) {
  return (
    <As
      className={`rounded-clinical-lg border border-navy-100/80 bg-white/95 p-6 shadow-clinical backdrop-blur ${className}`}
      {...rest}
    >
      {children}
    </As>
  )
}

/** Small check-list used across services, timeline and about sections. */
export function CheckList({ items, light = false, className = '' }) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span
            className={`mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full ${
              light ? 'bg-blue/25 text-cyan' : 'bg-cyan-50 text-cyan-deep'
            }`}
            aria-hidden="true"
          >
            <Icon name="check" size={11} strokeWidth={2.6} />
          </span>
          <span
            className={`text-sm leading-relaxed ${light ? 'text-navy-100' : 'text-body'}`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}

/** Google-Maps directions deep link for the practice address. */
export function directionsUrl(oneLine) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(oneLine)}`
}

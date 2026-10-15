import { insuranceLogoSrc } from '../data/insuranceLogos.js'

/** Two-letter monogram used by the wordmark fallback. */
function initials(label) {
  const words = label.replace(/[()]/g, ' ').split(/\s+/).filter(Boolean)
  if (words.length === 0) return '?'
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

/**
 * Renders one accepted plan's logo.
 *
 * When artwork exists at `public/insurance/<slug>.*` the image is used and its
 * `alt` is the plan's full name, so the plan is still announced correctly by
 * screen readers without any separate visible text. Otherwise a wordmark lockup
 * (monogram + short name) occupies the same footprint, which keeps grids and the
 * homepage ticker looking deliberate while artwork is still being collected.
 *
 * Layout only — callers supply the surrounding tile/card chrome.
 */
export default function InsuranceLogo({
  item,
  className = '',
  imgClassName = 'h-6',
}) {
  const label = item.short || item.name
  const src = insuranceLogoSrc(item.slug)

  if (src) {
    return (
      <img
        src={src}
        alt={item.name}
        loading="lazy"
        decoding="async"
        className={[imgClassName, 'w-auto object-contain', className]
          .filter(Boolean)
          .join(' ')}
      />
    )
  }

  return (
    <span
      className={['inline-flex items-center gap-2', className]
        .filter(Boolean)
        .join(' ')}
    >
      <span
        aria-hidden="true"
        className="grid h-6 w-6 shrink-0 place-items-center rounded-clinical-sm bg-navy-50 text-[0.62rem] font-bold tracking-tight text-navy-500"
      >
        {initials(label)}
      </span>
      <span className="whitespace-nowrap text-sm font-bold text-navy-600">
        {label}
      </span>
    </span>
  )
}

import Icon from './Icon.jsx'

/**
 * FAQ accordion built on native <details>/<summary>.
 *
 * Chosen over a JS accordion deliberately: it is keyboard-operable and
 * announced correctly by screen readers with zero JavaScript, and it still
 * works if the bundle fails to load.
 *
 * Editorial treatment: one ruled list rather than a stack of cards. Questions
 * are separated by hairlines the way a Q&A column would be set, and the
 * marker is a plain plus that becomes a minus when the panel is open.
 */
export default function Accordion({ items, className = '' }) {
  return (
    <div className={`border-b border-[rgba(14,15,59,0.12)] ${className}`}>
      {items.map((item, i) => (
        <details
          key={item.q}
          className="group border-t border-[rgba(14,15,59,0.12)]"
          open={i === 0}
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left transition-colors hover:text-blue-deep sm:py-6 [&::-webkit-details-marker]:hidden">
            <span className="flex items-baseline gap-5">
              <span
                aria-hidden="true"
                className="tnum t-kicker pt-1.5 text-navy-300"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="t-subtitle text-navy group-hover:text-blue-deep">
                {item.q}
              </span>
            </span>
            <span className="relative mt-0.5 block h-5 w-5 shrink-0 text-navy-400 transition-colors duration-200 group-hover:text-navy">
              <Icon
                name="plus"
                size={20}
                strokeWidth={1.9}
                aria-hidden="true"
                className="absolute inset-0 transition-opacity duration-200 group-open:opacity-0"
              />
              <Icon
                name="minus"
                size={20}
                strokeWidth={1.9}
                aria-hidden="true"
                className="absolute inset-0 opacity-0 transition-opacity duration-200 group-open:opacity-100"
              />
            </span>
          </summary>
          <div className="pb-7">
            <p className="max-w-3xl text-[1rem] leading-relaxed text-body sm:pl-[3.25rem]">
              {item.a}
            </p>
          </div>
        </details>
      ))}
    </div>
  )
}

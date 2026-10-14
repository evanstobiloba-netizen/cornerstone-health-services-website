import Icon from './Icon.jsx'

/**
 * FAQ accordion built on native <details>/<summary>.
 *
 * Chosen over a JS accordion deliberately: it is keyboard-operable and
 * announced correctly by screen readers with zero JavaScript, and it still
 * works if the bundle fails to load.
 */
export default function Accordion({ items, className = '' }) {
  return (
    <div className={`divide-y divide-navy-100 overflow-hidden rounded-clinical-lg border border-navy-100 bg-white ${className}`}>
      {items.map((item, i) => (
        <details key={item.q} className="group" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-bold text-navy transition-colors hover:bg-calm sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
            <span className="text-[0.98rem]">{item.q}</span>
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-navy-50 text-navy-600 transition-transform duration-200 group-open:rotate-180 group-open:bg-cyan-50 group-open:text-cyan-deep">
              <Icon name="chevron-down" size={16} strokeWidth={2.2} />
            </span>
          </summary>
          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
            <p className="max-w-3xl text-[0.95rem] leading-relaxed text-navy-600">
              {item.a}
            </p>
          </div>
        </details>
      ))}
    </div>
  )
}

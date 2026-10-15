import Icon from './Icon.jsx'

/**
 * FAQ accordion built on native <details>/<summary>.
 *
 * Chosen over a JS accordion deliberately: it is keyboard-operable and
 * announced correctly by screen readers with zero JavaScript, and it still
 * works if the bundle fails to load.
 *
 * Each question is its own rounded surface rather than a row in one bordered
 * list, which matches the softer card language used everywhere else.
 */
export default function Accordion({ items, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, i) => (
        <details
          key={item.q}
          className="group rounded-clinical-lg bg-white shadow-clinical ring-1 ring-navy-100/70 transition-shadow open:shadow-clinical-lg"
          open={i === 0}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left font-sans text-[1rem] font-semibold text-navy transition-colors hover:text-blue-deep sm:px-6 [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy-50 text-navy-600 transition-all duration-200 group-open:rotate-180 group-open:bg-brand-gradient group-open:text-navy">
              <Icon name="chevron-down" size={16} strokeWidth={2.4} />
            </span>
          </summary>
          <div className="px-5 pb-6 sm:px-6">
            <p className="max-w-3xl text-[0.95rem] leading-relaxed text-body">
              {item.a}
            </p>
          </div>
        </details>
      ))}
    </div>
  )
}

import Icon from './Icon.jsx'

/**
 * FAQ accordion built on native <details>/<summary>.
 *
 * Chosen over a JS accordion deliberately: it is keyboard-operable and
 * announced correctly by screen readers with zero JavaScript, and it still
 * works if the bundle fails to load.
 *
 * Treatment: each question is a soft rounded card that lifts when open, with a
 * numbered sand tile in front and a round marker that fills navy on hover. The
 * marker swaps a plus for a minus rather than rotating anything, so the state
 * is unambiguous without motion.
 */
export default function Accordion({ items, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, i) => (
        <details
          key={item.q}
          open={i === 0}
          className="group rounded-clinical-lg border border-line bg-white shadow-clinical transition-shadow duration-200 open:shadow-clinical-lg"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 transition-colors sm:px-6 [&::-webkit-details-marker]:hidden">
            <span className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="tnum grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sand text-[0.78rem] font-semibold text-navy-500"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="t-subtitle-sm text-navy transition-colors group-hover:text-blue-deep">
                {item.q}
              </span>
            </span>
            <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sand text-navy-500 transition-colors duration-200 group-hover:bg-navy group-hover:text-white">
              <Icon
                name="plus"
                size={18}
                strokeWidth={2.2}
                aria-hidden="true"
                className="absolute transition-opacity duration-200 group-open:opacity-0"
              />
              <Icon
                name="minus"
                size={18}
                strokeWidth={2.2}
                aria-hidden="true"
                className="absolute opacity-0 transition-opacity duration-200 group-open:opacity-100"
              />
            </span>
          </summary>
          <div className="px-5 pb-6 sm:px-6 sm:pl-[4.75rem]">
            <p className="max-w-3xl text-[1rem] leading-relaxed text-body">
              {item.a}
            </p>
          </div>
        </details>
      ))}
    </div>
  )
}

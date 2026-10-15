import { crisis } from '../data/site.js'
import Icon from './Icon.jsx'

/**
 * Persistent 988 crisis ribbon.
 *
 * PRD objective: "Integrated persistent 24/7 988 Lifeline ribbons across all
 * viewports to triage acute psychiatric needs safely."
 *
 * Deliberately NOT dismissible. It is the first thing in the accessibility
 * tree and the first thing in the tab order on every page.
 */
export default function CrisisRibbon() {
  return (
    <div
      className="bg-coral text-white"
      role="region"
      aria-label="Crisis support resources"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-1.5 px-5 py-2.5 text-center text-[0.8rem] leading-tight sm:px-6 sm:text-[0.85rem] lg:px-8">
        <span className="inline-flex items-center gap-2 font-semibold">
          <Icon name="heart-pulse" size={16} strokeWidth={2.1} />
          <span className="sm:hidden">{crisis.label}</span>
          <span className="hidden sm:inline">
            In a crisis? The {crisis.lifelineText} is available 24/7.
          </span>
        </span>

        <span className="flex items-center gap-3">
          <a
            href={crisis.lifelineHref}
            className="rounded-full bg-white px-3.5 py-1 font-bold text-coral-deep ring-1 ring-inset ring-white/40 transition-colors hover:bg-coral-50"
          >
            Call or text {crisis.lifeline}
          </a>
          <a
            href="tel:911"
            className="font-semibold text-white underline decoration-white/50 underline-offset-4 transition-colors hover:decoration-white"
          >
            Emergency: 911
          </a>
        </span>
      </div>
    </div>
  )
}

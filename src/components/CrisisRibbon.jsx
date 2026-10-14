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
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-2 text-center text-[0.8rem] leading-tight sm:text-[0.85rem]">
        <span className="inline-flex items-center gap-2 font-semibold">
          <Icon name="heart-pulse" size={16} strokeWidth={2} />
          <span className="sm:hidden">{crisis.label}</span>
          <span className="hidden sm:inline">
            In a crisis? The {crisis.lifelineText} is available 24/7.
          </span>
        </span>

        <span className="flex items-center gap-3">
          <a
            href={crisis.lifelineHref}
            className="rounded-full bg-white px-3 py-0.5 font-bold text-coral-deep underline-offset-2 hover:underline"
          >
            Call or text {crisis.lifeline}
          </a>
          <a
            href="tel:911"
            className="font-semibold text-white/95 underline decoration-white/50 underline-offset-2 hover:decoration-white"
          >
            Emergency: 911
          </a>
        </span>
      </div>
    </div>
  )
}

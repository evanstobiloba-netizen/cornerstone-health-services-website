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
 *
 * Treatment: a coral band, centred at every width, with the lifeline set in a
 * bright rounded pill so it reads as the single most important control on the
 * page without adding a second visual language.
 */
export default function CrisisRibbon() {
  return (
    <div
      className="bg-coral text-white"
      role="region"
      aria-label="Crisis support resources"
    >
      <div className="mx-auto flex max-w-[84rem] flex-wrap items-center justify-center gap-x-4 gap-y-1.5 px-5 py-2.5 text-center text-[0.82rem] leading-tight sm:px-7 lg:px-10">
        <span className="t-kicker inline-flex items-center gap-2 text-white">
          <Icon name="heart-pulse" size={15} strokeWidth={2.2} aria-hidden="true" />
          <span className="sm:hidden">{crisis.label}</span>
          <span className="hidden sm:inline">
            In a crisis? {crisis.lifelineText}, 24/7
          </span>
        </span>

        <span className="flex items-center gap-4">
          <a
            href={crisis.lifelineHref}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 font-bold text-coral-deep transition-transform duration-200 hover:-translate-y-px hover:bg-coral-50"
          >
            Call or text {crisis.lifeline}
          </a>
          <a href="tel:911" className="font-semibold text-white link-rule">
            Emergency: 911
          </a>
        </span>
      </div>
    </div>
  )
}

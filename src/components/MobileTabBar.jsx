import { NavLink } from 'react-router-dom'
import { practice } from '../data/site.js'
import Icon from './Icon.jsx'

/**
 * Fixed bottom tab bar for mobile - the "native app feel" the PRD asks for.
 * `Call` sits centre-stage and is raised, so one-tap calling never requires
 * scrolling or opening a menu.
 */
const tabs = [
  { label: 'Home', to: '/', icon: 'building' },
  { label: 'Services', to: '/services', icon: 'stethoscope' },
  { label: 'Get help', to: '/get-help', icon: 'heart-pulse' },
  { label: 'Book', to: '/book', icon: 'calendar' },
]

export default function MobileTabBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-50 rounded-t-clinical-lg bg-cream/95 shadow-clinical-lg backdrop-blur-md md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5 items-end px-2">
        {tabs.slice(0, 2).map((t) => (
          <Tab key={t.to} {...t} />
        ))}

        <li className="flex justify-center">
          <a
            href={practice.phoneHref}
            className="-mt-6 inline-flex flex-col items-center gap-1"
            aria-label={`Call Cornerstone Health at ${practice.phoneDisplay}`}
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-gradient text-navy shadow-clinical-lg ring-4 ring-cream">
              <Icon name="phone" size={22} strokeWidth={2} aria-hidden="true" />
            </span>
            <span className="t-kicker text-navy">Call</span>
          </a>
        </li>

        {tabs.slice(2).map((t) => (
          <Tab key={t.to} {...t} />
        ))}
      </ul>
    </nav>
  )
}

function Tab({ label, to, icon }) {
  return (
    <li>
      <NavLink
        to={to}
        end={to === '/'}
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 rounded-clinical px-1 py-2 transition-colors ${
            isActive ? 'text-navy' : 'text-navy-400 hover:text-navy-600'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <span
              className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${
                isActive ? 'bg-white shadow-clinical' : ''
              }`}
            >
              <Icon
                name={icon}
                size={19}
                strokeWidth={isActive ? 2.2 : 1.7}
                aria-hidden="true"
              />
            </span>
            <span className="t-kicker tracking-[0.1em]">{label}</span>
          </>
        )}
      </NavLink>
    </li>
  )
}

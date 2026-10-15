import { NavLink } from 'react-router-dom'
import { practice } from '../data/site.js'
import Icon from './Icon.jsx'

/**
 * Fixed bottom tab bar for mobile - the "native app feel" the PRD asks for.
 * `Call` sits centre-stage and is elevated, so one-tap calling never requires
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
      className="fixed inset-x-0 bottom-0 z-50 border-t border-navy-100 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5 items-end px-1.5">
        {tabs.slice(0, 2).map((t) => (
          <Tab key={t.to} {...t} />
        ))}

        <li className="flex justify-center">
          <a
            href={practice.phoneHref}
            className="-mt-6 inline-flex flex-col items-center gap-1"
            aria-label={`Call Cornerstone Health at ${practice.phoneDisplay}`}
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-gradient text-navy shadow-clinical-lg ring-4 ring-white">
              <Icon name="phone" size={23} strokeWidth={2} />
            </span>
            <span className="text-[0.7rem] font-bold text-navy">Call</span>
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
          `flex flex-col items-center gap-1 rounded-clinical-sm px-1 py-2.5 text-[0.7rem] font-bold transition-colors ${
            isActive ? 'text-blue-deep' : 'text-navy-400 hover:text-navy-600'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <Icon name={icon} size={20} strokeWidth={isActive ? 2.1 : 1.7} />
            <span>{label}</span>
          </>
        )}
      </NavLink>
    </li>
  )
}

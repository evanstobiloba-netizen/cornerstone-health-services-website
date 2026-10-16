import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { nav, practice } from '../data/site.js'
import { Logo } from './Ui.jsx'
import Button from './Button.jsx'
import Icon from './Icon.jsx'

/**
 * The masthead.
 *
 * A publication's masthead is always there, always ruled off, and never
 * shouts. So: a hairline under the bar at all times, a frosted surface so the
 * page slides beneath it, and a shadow that only appears once you have scrolled
 * away from the top. The standfirst ("Psychiatric care · Quincy, MA") sits
 * beside the logo on wide screens the way a paper puts its beat under its name.
 */
export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`border-b border-[rgba(14,15,59,0.12)] bg-white/85 backdrop-blur-md transition-shadow duration-200 ${
        scrolled ? 'shadow-clinical' : ''
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[84rem] items-center justify-between gap-4 px-5 sm:h-16 sm:gap-6 sm:px-7 lg:px-10">
        <div className="flex items-center gap-5">
          <Logo height={30} />
          <span
            aria-hidden="true"
            className="hidden h-7 w-px bg-[rgba(14,15,59,0.12)] lg:block"
          />
          <span className="t-kicker hidden text-navy-400 lg:block">
            Psychiatric care · Quincy, MA
          </span>
        </div>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `t-kicker relative block py-1.5 transition-colors ${
                      isActive
                        ? 'text-navy'
                        : 'text-navy-500 hover:text-navy'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-navy transition-transform duration-200 ${
                          isActive ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={practice.phoneHref}
            className="t-kicker hidden items-center gap-2 py-2 text-navy transition-colors hover:text-blue-deep xl:inline-flex"
          >
            <Icon name="phone" size={14} aria-hidden="true" />
            {practice.phoneDisplay}
          </a>

          <Button to="/book" size="sm" className="hidden sm:inline-flex">
            Book Now
          </Button>

          <a
            href={practice.phoneHref}
            className="inline-flex h-10 w-10 items-center justify-center rounded-clinical border border-navy-200 text-navy transition-colors hover:bg-navy-50 xl:hidden"
            aria-label={`Call Cornerstone Health Services at ${practice.phoneDisplay}`}
          >
            <Icon name="phone" size={17} aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-clinical border border-navy-200 text-navy transition-colors hover:bg-navy-50 lg:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} size={19} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-[rgba(14,15,59,0.12)] bg-white lg:hidden"
      >
        <nav
          aria-label="Mobile"
          className="mx-auto max-w-[84rem] px-5 py-2 sm:px-7 lg:px-10"
        >
          <ul>
            {nav.map((item, i) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `group flex items-baseline gap-5 border-b border-[rgba(14,15,59,0.12)] py-4 transition-colors ${
                      isActive ? 'text-navy' : 'text-navy-600 hover:text-navy'
                    }`
                  }
                >
                  <span
                    aria-hidden="true"
                    className="tnum t-kicker text-navy-300"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="t-subtitle">{item.label}</span>
                  <Icon
                    name="arrow"
                    size={17}
                    aria-hidden="true"
                    className="ml-auto self-center text-navy-300 transition-transform duration-200 group-hover:translate-x-1"
                  />
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-6 mb-4 grid gap-2.5 sm:grid-cols-2">
            <Button to="/book" size="lg" className="w-full">
              Book Now
            </Button>
            <Button
              to="/get-help"
              variant="outline"
              size="lg"
              className="w-full"
            >
              Get help?
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}

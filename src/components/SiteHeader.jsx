import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { nav, practice } from '../data/site.js'
import { Logo } from './Ui.jsx'
import Button from './Button.jsx'
import Icon from './Icon.jsx'

/**
 * The header.
 *
 * Warm and light: a frosted cream bar, no hairline, and navigation rendered as
 * soft pills that fill with white on hover — the same rounded language as the
 * rest of the site. Depth is a quiet shadow that only appears once you have
 * scrolled away from the top, so the opening band and the bar read as one
 * surface. The standfirst ("Psychiatric care · Quincy, MA") sits beside the logo
 * on wide screens.
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

  const pill = ({ isActive }) =>
    `t-kicker inline-flex items-center rounded-full px-3.5 py-2 transition duration-200 ${
      isActive
        ? 'bg-white text-navy shadow-clinical'
        : 'text-navy-500 hover:bg-white hover:text-navy'
    }`

  return (
    <header
      className={`bg-cream/85 backdrop-blur-md transition-shadow duration-200 ${
        scrolled ? 'shadow-clinical' : ''
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[84rem] items-center justify-between gap-2 px-3 sm:h-[4.5rem] sm:gap-4 sm:px-5 md:px-6 lg:px-10">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4 lg:gap-5">
          <Logo height={46} />
          <span
            aria-hidden="true"
            className="hidden h-7 w-px bg-line lg:block"
          />
          <span className="t-kicker hidden text-navy-400 md:block">
            Psychiatric care · Quincy, MA
          </span>
        </div>

        <nav aria-label="Primary" className="hidden lg:block min-w-0 flex-shrink-0">
          <ul className="flex flex-wrap items-center gap-1.5">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className={pill}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            href={practice.phoneHref}
            className="t-kicker hidden items-center gap-2 rounded-full px-3.5 py-2 text-navy transition-colors hover:bg-white xl:inline-flex"
          >
            <Icon name="phone" size={14} aria-hidden="true" />
            {practice.phoneDisplay}
          </a>

          <Button to="/book" size="sm" className="hidden lg:inline-flex">
            Book Now
          </Button>

          <a
            href={practice.phoneHref}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-navy transition-colors hover:border-navy-200 lg:hidden"
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-navy transition-colors hover:border-navy-200 lg:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} size={19} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="bg-cream lg:hidden"
      >
        <nav
          aria-label="Mobile"
          className="mx-auto max-w-[84rem] px-4 pb-4 pt-2 sm:px-5 md:px-6 lg:px-10"
        >
          <ul className="space-y-1.5">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `group flex items-center gap-4 rounded-clinical px-3 py-3 transition-colors ${
                      isActive
                        ? 'bg-white text-navy shadow-clinical'
                        : 'text-navy-600 hover:bg-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${
                          isActive ? 'bg-brand-gradient text-navy' : 'bg-sand text-navy-500'
                        }`}
                      >
                        <Icon name={item.icon || 'arrow'} size={17} aria-hidden="true" />
                      </span>
                      <span className="t-subtitle-sm">{item.label}</span>
                      <Icon
                        name="arrow"
                        size={17}
                        aria-hidden="true"
                        className="ml-auto text-navy-300 transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
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

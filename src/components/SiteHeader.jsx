import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { nav, practice } from '../data/site.js'
import { Logo } from './Ui.jsx'
import Button from './Button.jsx'
import Icon from './Icon.jsx'

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  /**
   * Elevate the sticky header once the page scrolls, so it separates from the
   * content sliding underneath it. Boolean state means React only re-renders
   * when the threshold is actually crossed.
   */
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
      className={`border-b border-navy-100 bg-white/95 backdrop-blur transition-shadow duration-200 supports-[backdrop-filter]:bg-white/85 ${
        scrolled ? 'shadow-clinical' : ''
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[4.75rem] lg:px-8">
        <Logo height={36} />

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `block rounded-clinical-sm px-2.5 py-2 text-[0.86rem] font-medium transition-colors ${
                      isActive
                        ? 'bg-cyan-50 text-cyan-deep'
                        : 'text-navy-600 hover:bg-navy-50 hover:text-navy'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <a
            href={practice.phoneHref}
            className="inline-flex items-center gap-2 rounded-clinical-sm px-2.5 py-2 text-sm font-bold text-navy transition-colors hover:bg-navy-50"
          >
            <Icon name="phone" size={16} />
            <span className="whitespace-nowrap">{practice.phoneDisplay}</span>
          </a>
          <Button to="/book" size="md" icon="calendar">
            Book Now
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={practice.phoneHref}
            className="inline-flex h-11 w-11 items-center justify-center rounded-clinical-sm bg-navy text-white lg:hidden"
            aria-label={`Call Cornerstone Health Services at ${practice.phoneDisplay}`}
          >
            <Icon name="phone" size={18} />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-clinical-sm border border-navy-200 text-navy xl:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-navy-100 bg-white xl:hidden"
      >
        <nav aria-label="Mobile" className="px-4 py-3">
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `block rounded-clinical px-4 py-3 text-base font-medium ${
                      isActive
                        ? 'bg-cyan-50 text-cyan-deep'
                        : 'text-navy-600 hover:bg-navy-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-3 grid gap-2 border-t border-navy-100 pt-3">
            <Button to="/book" size="lg" icon="calendar" className="w-full">
              Book Now
            </Button>
            <Button
              to="/get-help"
              variant="outline"
              size="lg"
              icon="heart-pulse"
              className="w-full"
            >
              Get help?
            </Button>
            <a
              href={practice.phoneHref}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-clinical px-4 py-3 text-base font-bold text-navy"
            >
              <Icon name="phone" size={18} />
              {practice.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}

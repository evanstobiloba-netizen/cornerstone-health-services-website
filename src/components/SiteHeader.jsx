import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { nav, practice } from '../data/site.js'
import { Logo } from './Ui.jsx'
import Button from './Button.jsx'
import Icon from './Icon.jsx'

/**
 * Sticky primary navigation.
 *
 * The bar stays opaque white so it always reads cleanly against the light page
 * surfaces; only its bottom hairline and shadow fade in once the page scrolls,
 * which is what separates it from the content sliding underneath.
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
      className={`border-b bg-white/85 backdrop-blur-md transition-[box-shadow,border-color] duration-200 ${
        scrolled ? 'border-navy-100 shadow-clinical' : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-5 px-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Logo height={34} />
          <span
            aria-hidden="true"
            className="hidden h-8 w-px bg-navy-100 xl:block"
          />
        </div>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `group relative block px-3 py-2 text-[0.9rem] font-medium transition-colors ${
                      isActive ? 'text-navy' : 'text-navy-600 hover:text-navy'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-gradient transition-transform duration-200 ${
                          isActive
                            ? 'scale-x-100'
                            : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={practice.phoneHref}
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.9rem] font-semibold text-navy transition-colors hover:bg-navy-50"
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white transition-colors hover:bg-navy-600 lg:hidden"
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-navy-200 text-navy transition-colors hover:bg-navy-50 xl:hidden"
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
        <nav aria-label="Mobile" className="mx-auto max-w-7xl px-5 py-4 sm:px-6 lg:px-8">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center justify-between border-b border-navy-100/70 py-3.5 text-lg font-medium transition-colors ${
                      isActive ? 'text-blue-deep' : 'text-navy hover:text-blue-deep'
                    }`
                  }
                >
                  <span>{item.label}</span>
                  <Icon name="arrow" size={18} className="text-navy-300" />
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-5 grid gap-2.5">
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
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-base font-bold text-navy"
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

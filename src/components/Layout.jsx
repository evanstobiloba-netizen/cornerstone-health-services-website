import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import CrisisRibbon from './CrisisRibbon.jsx'
import SiteHeader from './SiteHeader.jsx'
import SiteFooter from './SiteFooter.jsx'
import MobileTabBar from './MobileTabBar.jsx'

/**
 * Route scroll restoration: jump to top on navigation, or to the hash target
 * when a link points at a section (e.g. /book#refer).
 */
function useRouteScrollReset() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])
}

export default function Layout() {
  useRouteScrollReset()

  return (
    <div className="flex min-h-screen flex-col bg-calm">
      <a
        href="#main"
        className="sr-only-focusable fixed left-4 top-4 z-[60] rounded-clinical bg-navy px-4 py-2 text-sm font-bold text-white"
      >
        Skip to main content
      </a>

      {/* Persistent crisis ribbon + header travel together on every page. */}
      <div className="sticky top-0 z-40">
        <CrisisRibbon />
        <SiteHeader />
      </div>

      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>

      <SiteFooter />

      {/* Reserve space so the fixed tab bar never covers footer content. */}
      <div aria-hidden="true" className="h-20 md:hidden" />
      <MobileTabBar />
    </div>
  )
}

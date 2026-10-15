/**
 * Inline SVG icon set. Kept local so there is no icon-font dependency and
 * every glyph inherits `currentColor` for theme + contrast control.
 * All icons are decorative by default (aria-hidden); label the control.
 */

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
}

const paths = {
  shield: (
    <>
      <path d="M12 3 5 6v6c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6l-7-3Z" />
      <path d="m9.2 12.2 2 2 3.6-4" />
    </>
  ),
  'heart-pulse': (
    <>
      <path d="M20.4 6.6a5 5 0 0 0-7.1 0L12 7.9l-1.3-1.3a5 5 0 1 0-7.1 7.1L12 21l8.4-7.3a5 5 0 0 0 0-7.1Z" />
      <path d="M3.5 12.5h3l1.5-3 2 5 1.6-3h3.4" />
    </>
  ),
  bolt: <path d="M13.5 3 5.8 13.2h5.1L10.5 21l7.7-10.2h-5.1L13.5 3Z" />,
  phone: (
    <path d="M6.7 3.5h2.6l1.3 3.3-1.8 1.3a11.4 11.4 0 0 0 5.1 5.1l1.3-1.8 3.3 1.3v2.6a2 2 0 0 1-2.2 2A15.8 15.8 0 0 1 4.7 5.7a2 2 0 0 1 2-2.2Z" />
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3.5v3M16 3.5v3" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  'map-pin': (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  arrow: <path d="M4.5 12h15m-6-6 6 6-6 6" />,
  lock: (
    <>
      <rect x="4.5" y="10" width="15" height="10.5" rx="2.5" />
      <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
    </>
  ),
  video: (
    <>
      <rect x="2.5" y="6" width="13" height="12" rx="2.5" />
      <path d="m15.5 12 6-3.5v7l-6-3.5Z" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3.5" width="16" height="17" rx="2" />
      <path d="M9 8h2M13 8h2M9 12h2M13 12h2M10.5 20.5v-4h3v4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 6.2a3.2 3.2 0 0 1 0 6.1M17.5 20a5.5 5.5 0 0 0-2.2-4.4" />
    </>
  ),
  stethoscope: (
    <>
      <path d="M5 3.5v5a4 4 0 0 0 8 0v-5" />
      <path d="M9 12.5v2.5a5 5 0 0 0 10 0v-1.6" />
      <circle cx="19" cy="10" r="2" />
    </>
  ),
  'alert-triangle': (
    <>
      <path d="M12 4.5 2.8 20h18.4L12 4.5Z" />
      <path d="M12 10v4M12 17.2v.1" />
    </>
  ),
  document: (
    <>
      <path d="M6 3.5h7l5 5v12H6z" />
      <path d="M13 3.5v5h5M9 13h6M9 16.5h6" />
    </>
  ),
  'chevron-down': <path d="m6 9.5 6 6 6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  'external-link': (
    <>
      <path d="M13.5 4.5H19v5.5" />
      <path d="M19 4.5 11 12.5" />
      <path d="M17 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h4" />
    </>
  ),
  sparkle: <path d="M12 3.5 13.9 9l5.6 1.9-5.6 1.9L12 18.5 10.1 12.8 4.5 10.9 10.1 9 12 3.5Z" />,
  clipboard: (
    <>
      <path d="M9 4.5h6v2.5H9z" />
      <path d="M15 5.2h2.5a1.5 1.5 0 0 1 1.5 1.5v12.3a1.5 1.5 0 0 1-1.5 1.5h-11a1.5 1.5 0 0 1-1.5-1.5V6.7a1.5 1.5 0 0 1 1.5-1.5H9" />
      <path d="M9 12.5h6M9 16h4" />
    </>
  ),
  pill: (
    <>
      <rect x="2.8" y="8.5" width="18.4" height="7" rx="3.5" />
      <path d="M12 8.5v7" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="6" r="2.3" />
      <circle cx="18" cy="18" r="2.3" />
      <path d="M8.3 6h5.2a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8h6.7" />
    </>
  ),
  chat: (
    <>
      <path d="M20.5 12c0 4.1-3.8 7.4-8.5 7.4a9.9 9.9 0 0 1-2.6-.3L4.5 21l1.3-3.8A7 7 0 0 1 3.5 12C3.5 7.9 7.3 4.6 12 4.6s8.5 3.3 8.5 7.4Z" />
      <path d="M8.5 11.5h.1M12 11.5h.1M15.5 11.5h.1" />
    </>
  ),
  handshake: (
    <>
      <path d="m3.5 11 3-3 3.2 3.2a2 2 0 0 0 2.8 0L15.5 8l5 5" />
      <path d="m6.2 14.5 2.6 2.6a2 2 0 0 0 2.8 0l4.4-4.4" />
      <path d="m14 17.1.9.9a2 2 0 0 0 2.8-2.8" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H10a2.5 2.5 0 0 1 2 1 2.5 2.5 0 0 1 2-1h4.5A1.5 1.5 0 0 1 20 5.5v11a1.5 1.5 0 0 1-1.5 1.5H14a2.5 2.5 0 0 0-2 1 2.5 2.5 0 0 0-2-1H5.5A1.5 1.5 0 0 1 4 16.5v-11Z" />
      <path d="M12 5v14" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.2 2.3 3.3 5.3 3.3 8.5S14.2 18.2 12 20.5c-2.2-2.3-3.3-5.3-3.3-8.5S9.8 5.8 12 3.5Z" />
    </>
  ),
}

export default function Icon({ name, size = 20, className = '', strokeWidth }) {
  const d = paths[name]
  if (!d) return null
  return (
    <svg
      {...base}
      width={size}
      height={size}
      className={className}
      strokeWidth={strokeWidth ?? base.strokeWidth}
    >
      {d}
    </svg>
  )
}

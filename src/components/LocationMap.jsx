import { addressOneLine, practice } from '../data/site.js'
import Icon from './Icon.jsx'
import { directionsUrl } from './Ui.jsx'

/**
 * Interactive location map for the real Quincy office.
 *
 * Coordinates were geocoded from the street address (OpenStreetMap Nominatim),
 * so the pin is the actual building rather than an approximate area:
 *   21 Mayor Thomas J. McGrath Hwy → 42.2498331, -70.9983077
 *
 * OpenStreetMap is used rather than a Google embed so that no third-party
 * tracking cookie or key is required on page load. Swap `src` for a Google
 * Maps Embed API iframe if the practice prefers Google's basemap.
 */
const LAT = practice.geo.lat
const LON = practice.geo.lon
const BBOX = [LON - 0.006, LAT - 0.004, LON + 0.006, LAT + 0.004]
  .map((n) => n.toFixed(6))
  .join('%2C')

const MAP_SRC = `https://www.openstreetmap.org/export/embed.html?bbox=${BBOX}&layer=mapnik&marker=${LAT}%2C${LON}`

export default function LocationMap({ height = 'h-[22rem]' }) {
  return (
    <div className="overflow-hidden rounded-clinical-xl bg-white shadow-clinical ring-1 ring-navy-100/70">
      <div className={`relative w-full ${height}`}>
        <iframe
          title={`Map showing Cornerstone Health Services Inc at ${addressOneLine}`}
          src={MAP_SRC}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>

      <div className="flex flex-col gap-5 border-t border-navy-100 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-clinical bg-cyan-50 text-cyan-deep">
            <Icon name="map-pin" size={19} />
          </span>
          <div>
            <address className="text-[0.95rem] font-semibold not-italic text-navy">
              {practice.address.line1} {practice.address.line2}
            </address>
            <p className="mt-0.5 text-[0.95rem] text-body">
              {practice.address.city}, {practice.address.stateLong}{' '}
              {practice.address.zip}
            </p>
            <p className="mt-1.5 text-xs text-navy-400">
              In-person visits by appointment. Telehealth available statewide.
            </p>
          </div>
        </div>

        <a
          href={directionsUrl(addressOneLine)}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-navy-200 px-5 py-2.5 text-[0.95rem] font-semibold text-navy transition-colors hover:border-blue-deep hover:text-blue-deep"
        >
          Get directions
          <Icon name="external-link" size={16} />
        </a>
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import { practice } from '../data/site.js'

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center lg:px-8">
      <span className="grid h-14 w-14 place-items-center rounded-clinical-lg bg-cyan-50 text-cyan-deep">
        <Icon name="map-pin" size={26} />
      </span>
      <h1 className="mt-6 text-3xl font-medium text-navy sm:text-4xl">
        We could not find that page
      </h1>
      <p className="mt-4 max-w-lg leading-relaxed text-body">
        The link may be out of date. Everything you are likely looking for is one
        tap away — or call us and we will point you the right way.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button to="/" size="lg" icon="building">
          Back to homepage
        </Button>
        <Button
          href={practice.phoneHref}
          variant="outline"
          size="lg"
          icon="phone"
        >
          Call {practice.phoneDisplay}
        </Button>
      </div>

      <nav aria-label="Popular pages" className="mt-10">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold">
          {[
            ['Services', '/services'],
            ['Insurance Accepted', '/insurance'],
            ['About Us', '/about'],
            ['Contact & Book', '/contact'],
            ["FAQ's", '/faqs'],
            ['Get help?', '/get-help'],
          ].map(([label, to]) => (
            <li key={to}>
              <Link
                to={to}
                className="text-cyan-deep underline-offset-4 hover:underline"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}

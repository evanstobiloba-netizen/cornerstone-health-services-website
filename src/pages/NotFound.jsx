import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import { Container, IconBadge, Section } from '../components/Ui.jsx'
import { practice } from '../data/site.js'

export default function NotFound() {
  return (
    <Section tone="calm" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-56 h-[38rem] w-[38rem] rounded-full bg-brand-bloom blur-3xl"
      />
      <Container size="narrow" className="relative">
        <div className="flex flex-col items-center text-center">
          <IconBadge name="map-pin" tone="cyan" size="lg" />
          <h1 className="mt-7 text-[2rem] leading-tight text-navy sm:text-[2.5rem]">
            We could not find that page
          </h1>
          <p className="mt-4 max-w-lg leading-relaxed text-body">
            The link may be out of date. Everything you are likely looking for is
            one tap away — or call us and we will point you the right way.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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

          <nav aria-label="Popular pages" className="mt-12 w-full">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-navy-400">
              Popular pages
            </p>
            <ul className="mt-5 flex flex-wrap justify-center gap-2.5">
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
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy shadow-clinical ring-1 ring-navy-100/70 transition-colors hover:text-blue-deep"
                  >
                    {label}
                    <Icon name="arrow" size={14} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </Section>
  )
}

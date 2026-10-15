import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import { Container, Kicker, Section } from '../components/Ui.jsx'
import { practice } from '../data/site.js'

export default function NotFound() {
  const popular = [
    ['Services', '/services'],
    ['Insurance Accepted', '/insurance'],
    ['About Us', '/about'],
    ['Contact & Book', '/contact'],
    ["FAQ's", '/faqs'],
    ['Get help?', '/get-help'],
  ]

  return (
    <Section tone="white" rule>
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Kicker>404 — Page not found</Kicker>
            <h1 className="t-display mt-6 text-navy">
              We could not find that page
            </h1>
            <p className="t-lead mt-7 max-w-xl">
              The link may be out of date. Everything you are likely looking for
              is one tap away — or call us and we will point you the right way.
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
          </div>

          <div className="lg:col-span-5 lg:pt-2">
            <p className="t-kicker border-t-2 border-navy pt-5 text-navy-400">
              Popular pages
            </p>
            <ul className="mt-2 border-b border-[rgba(14,15,59,0.12)]">
              {popular.map(([label, to], i) => (
                <li key={to} className="border-t border-[rgba(14,15,59,0.12)]">
                  <Link
                    to={to}
                    className="group flex items-baseline gap-5 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
                  >
                    <span className="tnum t-kicker text-navy-300">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[0.98rem] font-semibold text-navy transition-colors group-hover:text-blue-deep">
                      {label}
                    </span>
                    <Icon
                      name="arrow"
                      size={16}
                      aria-hidden="true"
                      className="ml-auto shrink-0 text-navy-300 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  )
}

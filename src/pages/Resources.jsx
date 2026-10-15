import { practice, resources } from '../data/site.js'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import { Container, Kicker, Section } from '../components/Ui.jsx'

/**
 * Resources, set as a numbered index — the most editorial way to present a
 * directory. Each organisation is a ruled row rather than a card, so the
 * names read as a list you can scan.
 */
export default function Resources() {
  return (
    <>
      <Section tone="white" rule>
        <Container>
          <Kicker>Mental Health Resources</Kicker>
          <h1 className="t-display mt-6 max-w-4xl text-navy">
            Trusted organisations and information
          </h1>
          <p className="t-lead mt-7 max-w-2xl">
            These are the national organisations we point people to most often.
            They are independent of this practice, and their guidance is free to
            read.
          </p>
        </Container>
      </Section>

      <Section tone="calm" rule>
        <Container>
          <ul className="border-b border-[rgba(14,15,59,0.12)]">
            {resources.map((r, i) => (
              <li key={r.url} className="border-t border-[rgba(14,15,59,0.12)]">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
                >
                  <span className="tnum t-kicker text-navy-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0">
                    <span className="t-subtitle block text-navy transition-colors group-hover:text-blue-deep">
                      {r.name}
                    </span>
                    <span className="mt-1.5 block break-words text-sm font-semibold text-blue-deep">
                      {r.display}
                    </span>
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-navy-400 transition-colors group-hover:text-blue-deep">
                    <span className="hidden sm:inline">Visit site</span>
                    <Icon
                      name="external-link"
                      size={16}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-12 border-t-2 border-coral pt-6">
            <p className="t-kicker flex items-center gap-2 text-coral-deep">
              <Icon name="alert-triangle" size={15} aria-hidden="true" />
              If you need help right now
            </p>
            <p className="mt-4 max-w-3xl text-[0.97rem] leading-relaxed text-coral-deep">
              These resources are for reading, not for emergencies. If you are in
              crisis, call or text{' '}
              <a href="tel:988" className="font-bold underline underline-offset-2">
                988
              </a>{' '}
              to reach the Suicide &amp; Crisis Lifeline, free and confidential,
              24/7. For a life-threatening emergency, call{' '}
              <a
                href="tel:911"
                className="font-bold underline underline-offset-2"
              >
                911
              </a>
              .
            </p>
          </div>

          <div className="mt-12 flex flex-col items-start gap-3 sm:flex-row">
            <Button to="/book" size="lg" icon="calendar">
              Book Now
            </Button>
            <Button
              href={practice.phoneHref}
              variant="outline"
              size="lg"
              icon="phone"
            >
              {practice.phoneDisplay}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}

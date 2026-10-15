import { practice, resources } from '../data/site.js'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import {
  Container,
  IconBadge,
  Section,
  SectionHeading,
} from '../components/Ui.jsx'

export default function Resources() {
  return (
    <>
      <Section tone="calm" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-56 h-[42rem] w-[42rem] rounded-full bg-brand-bloom blur-3xl"
        />
        <Container className="relative">
          <SectionHeading
            as="h1"
            size="xl"
            eyebrow="Mental Health Resources"
            title="Trusted organisations and information"
            body="These are the national organisations we point people to most often. They are independent of this practice, and their guidance is free to read."
          />
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) => (
              <li key={r.url}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex h-full flex-col rounded-clinical-lg bg-white p-6 shadow-clinical ring-1 ring-navy-100/70 transition duration-200 hover:-translate-y-1 hover:shadow-clinical-lg hover:ring-navy-200"
                >
                  <IconBadge
                    name="globe"
                    tone="cyan"
                    className="transition-colors group-hover:bg-brand-gradient group-hover:text-navy"
                  />
                  <h2 className="mt-5 font-sans text-[1.02rem] font-semibold leading-snug text-navy">
                    {r.name}
                  </h2>
                  <span className="mt-2 flex-1 text-sm font-semibold text-blue-deep">
                    {r.display}
                  </span>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy-400 transition-colors group-hover:text-blue-deep">
                    Visit site
                    <Icon
                      name="external-link"
                      size={15}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-clinical-lg border border-coral/40 bg-coral-50 p-6">
            <h2 className="flex items-center gap-2 font-sans text-base font-semibold text-coral-deep">
              <Icon name="alert-triangle" size={18} />
              If you need help right now
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-coral-deep">
              These resources are for reading, not for emergencies. If you are in
              crisis, call or text{' '}
              <a
                href="tel:988"
                className="font-bold underline underline-offset-2"
              >
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

          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row">
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

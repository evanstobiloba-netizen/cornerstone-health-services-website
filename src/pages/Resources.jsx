import { practice, resources } from '../data/site.js'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import { Card, SectionHeading } from '../components/Ui.jsx'

export default function Resources() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-navy-100 bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-40 h-[30rem] w-[30rem] rounded-full bg-cyan-50 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-20">
          <SectionHeading
            as="h1"
            script="Mental Health Resources"
            title="Trusted organisations and information"
            body="These are the national organisations we point people to most often. They are independent of this practice, and their guidance is free to read."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => (
            <li key={r.url}>
              <a
                href={r.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex h-full flex-col rounded-clinical-lg border border-navy-100 bg-white p-6 shadow-clinical transition-all hover:-translate-y-0.5 hover:border-blue"
              >
                <span className="grid h-11 w-11 place-items-center rounded-clinical bg-cyan-50 text-cyan-deep">
                  <Icon name="globe" size={21} />
                </span>
                <h2 className="mt-4 text-[1.02rem] font-medium leading-snug text-navy">
                  {r.name}
                </h2>
                <span className="mt-2 flex-1 text-sm font-semibold text-blue-deep">
                  {r.display}
                </span>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-navy-400 group-hover:text-blue-deep">
                  Visit site
                  <Icon name="external-link" size={15} />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <Card className="mt-10 border-l-4 border-l-coral">
          <h2 className="flex items-center gap-2 font-medium text-navy">
            <Icon name="alert-triangle" size={18} className="text-coral-deep" />
            If you need help right now
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-body">
            These resources are for reading, not for emergencies. If you are in
            crisis, call or text{' '}
            <a
              href="tel:988"
              className="font-bold text-coral-deep underline underline-offset-2"
            >
              988
            </a>{' '}
            to reach the Suicide &amp; Crisis Lifeline, free and confidential,
            24/7. For a life-threatening emergency, call{' '}
            <a
              href="tel:911"
              className="font-bold text-coral-deep underline underline-offset-2"
            >
              911
            </a>
            .
          </p>
        </Card>

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
      </section>
    </>
  )
}

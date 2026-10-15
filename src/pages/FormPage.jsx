import { practice } from '../data/site.js'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import LeadForm from '../components/LeadForm.jsx'
import { Card, Container, Eyebrow, Section } from '../components/Ui.jsx'

/**
 * Shared layout for the practice's form pages: Book Now, Contact Us,
 * Refer a Loved One, Talk to a Specialist, Volunteer with Us and
 * Share Your Experience. Each page differs only by its entry in `forms`
 * (src/data/site.js), so this one component renders all of them.
 *
 * The form column sticks on large screens so the copy and reassurance cards
 * stay alongside it while a long form scrolls.
 */
export default function FormPage({ form, aside }) {
  return (
    <Section tone="calm" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-56 h-[42rem] w-[42rem] rounded-full bg-brand-bloom blur-3xl"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16">
          <div>
            <Eyebrow>{form.script}</Eyebrow>
            <h1 className="mt-4 text-[2.25rem] leading-[1.08] text-navy sm:text-[2.75rem]">
              {form.title}
            </h1>
            <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-body">
              {form.lede}
            </p>

            {aside}

            <div className="mt-8 rounded-clinical-lg border border-coral/40 bg-coral-50 p-5">
              <p className="flex items-center gap-2 font-semibold text-coral-deep">
                <Icon name="alert-triangle" size={17} />
                In a crisis? Do not use this form.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-coral-deep">
                Call or text{' '}
                <a href="tel:988" className="font-bold underline underline-offset-2">
                  988
                </a>{' '}
                — the Suicide &amp; Crisis Lifeline is free and available 24/7.
                For a life-threatening emergency, call{' '}
                <a href="tel:911" className="font-bold underline underline-offset-2">
                  911
                </a>
                .
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href={practice.phoneHref}
                className="flex items-center gap-3 rounded-clinical-lg bg-white p-4 shadow-clinical ring-1 ring-navy-100/70 transition hover:ring-navy-200"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-clinical bg-cyan-50 text-cyan-deep">
                  <Icon name="phone" size={18} />
                </span>
                <span>
                  <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-navy-400">
                    Call us
                  </span>
                  <span className="block font-semibold text-navy">
                    {practice.phoneDisplay}
                  </span>
                </span>
              </a>
              <a
                href={`mailto:${practice.email}`}
                className="flex items-center gap-3 rounded-clinical-lg bg-white p-4 shadow-clinical ring-1 ring-navy-100/70 transition hover:ring-navy-200"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-clinical bg-blue-50 text-blue-deep">
                  <Icon name="document" size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-navy-400">
                    Email us
                  </span>
                  <span className="block truncate font-semibold text-navy">
                    {practice.email}
                  </span>
                </span>
              </a>
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <LeadForm form={form} id={`page-${form.path.replace(/\//g, '')}`} />
          </div>
        </div>
      </Container>
    </Section>
  )
}

/** Small helper card used in the `aside` slot of several form pages. */
export function InfoCard({ script, title, children, tone = 'cyan' }) {
  const accent = {
    cyan: 'bg-brand-gradient',
    blue: 'bg-blue',
    navy: 'bg-navy',
  }[tone]
  return (
    <Card className="mt-8">
      {script && (
        <p className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-navy-400">
          <span
            aria-hidden="true"
            className={`h-4 w-4 shrink-0 rounded-full ${accent}`}
          />
          {script}
        </p>
      )}
      {title && (
        <h2 className="mt-3 font-sans text-base font-semibold text-navy">
          {title}
        </h2>
      )}
      <div className="mt-2 text-[0.95rem] leading-relaxed text-body">{children}</div>
    </Card>
  )
}

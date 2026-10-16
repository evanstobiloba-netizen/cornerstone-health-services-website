import { practice } from '../data/site.js'
import Icon from '../components/Icon.jsx'
import LeadForm from '../components/LeadForm.jsx'
import { Container, Kicker, Rule, Section } from '../components/Ui.jsx'

/**
 * Shared layout for the practice's form pages: Book Now, Contact Us,
 * Refer a Loved One, Talk to a Specialist, Volunteer with Us and
 * Share Your Experience. Each page differs only by its entry in `forms`
 * (src/data/site.js), so this one component renders all of them.
 *
 * The form column sticks on large screens so the copy and reassurance blocks
 * stay alongside it while a long form scrolls.
 */
export default function FormPage({ form, aside }) {
  return (
    <Section tone="white" spacing="opening">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <Kicker index="01">{form.script}</Kicker>
            <h1 className="t-title mt-6 text-navy">{form.title}</h1>
            <p className="t-lead mt-5 max-w-xl">{form.lede}</p>

            <div className="mt-10 space-y-9">
              {aside}
            </div>

            <div className="mt-8 border border-coral/40 bg-coral-50 p-5">
              <p className="t-kicker flex items-center gap-2 text-coral-deep">
                <Icon name="alert-triangle" size={15} aria-hidden="true" />
                In a crisis? Do not use this form
              </p>
              <p className="mt-3 text-sm leading-relaxed text-coral-deep">
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

            <dl className="mt-8 border-t border-[rgba(14,15,59,0.12)]">
              <div className="flex items-baseline justify-between gap-6 border-b border-[rgba(14,15,59,0.12)] py-3.5">
                <dt className="t-kicker text-navy-400">Call</dt>
                <dd>
                  <a
                    href={practice.phoneHref}
                    className="link-rule font-medium text-navy"
                  >
                    {practice.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 border-b border-[rgba(14,15,59,0.12)] py-3.5">
                <dt className="t-kicker text-navy-400">Email</dt>
                <dd className="min-w-0">
                  <a
                    href={`mailto:${practice.email}`}
                    className="link-rule break-all font-medium text-navy"
                  >
                    {practice.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <Rule className="mb-8 hidden lg:block" />
            <LeadForm form={form} id={`page-${form.path.replace(/\//g, '')}`} />
          </div>
        </div>
      </Container>
    </Section>
  )
}

/** Small ruled block used in the `aside` slot of several form pages. */
export function InfoCard({ script, title, children, tone = 'cyan' }) {
  const accent = {
    cyan: 'bg-cyan-deep',
    blue: 'bg-blue-deep',
    navy: 'bg-navy',
  }[tone]
  return (
    <div className="border-t-2 border-navy pt-5">
      {script && (
        <p className="t-kicker flex items-center gap-2.5 text-navy-400">
          <span aria-hidden="true" className={`h-2 w-2 ${accent}`} />
          {script}
        </p>
      )}
      {title && (
        <h2 className="t-subtitle mt-4 text-navy">{title}</h2>
      )}
      <div className="mt-4 text-[0.95rem] leading-relaxed text-body">
        {children}
      </div>
    </div>
  )
}

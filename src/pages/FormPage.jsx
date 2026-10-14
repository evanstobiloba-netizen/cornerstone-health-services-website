import { practice } from '../data/site.js'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import LeadForm from '../components/LeadForm.jsx'
import { Card } from '../components/Ui.jsx'

/**
 * Shared layout for the practice's form pages: Book Now, Contact Us,
 * Refer a Loved One, Talk to a Specialist, Volunteer with Us and
 * Share Your Experience. Each page differs only by its entry in `forms`
 * (src/data/site.js), so this one component renders all of them.
 */
export default function FormPage({ form, aside }) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-navy-100 bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-40 h-[30rem] w-[30rem] rounded-full bg-cyan-50 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
            <div>
              <p className="font-script text-4xl leading-none text-blue-deep sm:text-[2.75rem]">
                {form.script}
              </p>
              <h1 className="mt-2 text-3xl font-medium text-navy sm:text-4xl lg:text-[2.75rem]">
                {form.title}
              </h1>
              <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-body">
                {form.lede}
              </p>

              {aside}

              <div className="mt-8 rounded-clinical-lg border border-coral/40 bg-coral-50 p-5">
                <p className="flex items-center gap-2 font-bold text-coral-deep">
                  <Icon name="alert-triangle" size={17} />
                  In a crisis? Do not use this form.
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-coral-deep">
                  Call or text{' '}
                  <a
                    href="tel:988"
                    className="font-bold underline underline-offset-2"
                  >
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
                  className="flex items-center gap-3 rounded-clinical border border-navy-100 bg-calm p-4 transition-colors hover:border-blue"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-clinical bg-cyan-50 text-cyan-deep">
                    <Icon name="phone" size={17} />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-navy-400">
                      Call us
                    </span>
                    <span className="block font-bold text-navy">
                      {practice.phoneDisplay}
                    </span>
                  </span>
                </a>
                <a
                  href={`mailto:${practice.email}`}
                  className="flex items-center gap-3 rounded-clinical border border-navy-100 bg-calm p-4 transition-colors hover:border-blue"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-clinical bg-blue-50 text-blue-deep">
                    <Icon name="document" size={17} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-navy-400">
                      Email us
                    </span>
                    <span className="block truncate font-bold text-navy">
                      {practice.email}
                    </span>
                  </span>
                </a>
              </div>
            </div>

            <div>
              <LeadForm form={form} id={`page-${form.path.replace(/\//g, '')}`} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/** Small helper card used in the `aside` slot of several form pages. */
export function InfoCard({ script, title, children, tone = 'cyan' }) {
  const border = {
    cyan: 'border-l-cyan',
    blue: 'border-l-blue',
    navy: 'border-l-navy',
  }[tone]
  return (
    <Card className={`mt-8 border-l-4 ${border}`}>
      {script && (
        <p className="font-script text-2xl leading-none text-blue-deep">{script}</p>
      )}
      {title && (
        <h2 className="mt-1 text-base font-medium text-navy">{title}</h2>
      )}
      <div className="mt-2 text-sm leading-relaxed text-body">{children}</div>
    </Card>
  )
}

export { Button }

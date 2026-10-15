import { insurances, practice } from '../data/site.js'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import InsuranceLogo from '../components/InsuranceLogo.jsx'
import { Card, SectionHeading } from '../components/Ui.jsx'

const ORDER = ['Federal', 'Commercial', 'Behavioral health', 'Network']

const BLURB = {
  Federal: 'Government programs we are enrolled with.',
  Commercial: 'Private health plans accepted at the practice.',
  'Behavioral health':
    'Managed behavioural-health networks that administer mental health benefits.',
  Network: 'Provider networks your plan may route you through.',
}

export default function Insurance() {
  const groups = ORDER.map((group) => ({
    group,
    items: insurances.filter((i) => i.group === group),
  })).filter((g) => g.items.length > 0)

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
            script="Insurance Accepted"
            title="Plans we work with"
            body={`We are in network with ${insurances.length} plans, and we verify your coverage before your first appointment so you know what to expect.`}
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/book" size="lg" icon="calendar">
              Book Now
            </Button>
            <Button
              href={practice.phoneHref}
              variant="outline"
              size="lg"
              icon="phone"
            >
              Check my plan
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          {groups.map((g) => (
            <Card key={g.group}>
              <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-navy-400">
                {g.group}
              </h2>
              <p className="mt-1.5 text-sm text-body">{BLURB[g.group]}</p>
              <ul className="mt-5 grid grid-cols-2 gap-2.5">
                {g.items.map((i) => (
                  <li
                    key={i.slug}
                    className="flex h-14 items-center rounded-clinical border border-navy-100 bg-white px-4"
                  >
                    <InsuranceLogo item={i} imgClassName="h-6" />
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <Card className="mt-8 border-l-4 border-l-coral">
          <h2 className="flex items-center gap-2 font-medium text-navy">
            <Icon name="alert-triangle" size={18} className="text-coral-deep" />
            Please confirm before you book
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-body">
            Insurance networks and plan products change, and not every plan
            within a network covers every service. This list reflects the plans
            the practice works with, but the definitive answer comes from your
            own plan. Call the number on the back of your card, or{' '}
            <a
              href={practice.phoneHref}
              className="font-semibold text-blue-deep underline underline-offset-2"
            >
              call us on {practice.phoneDisplay}
            </a>{' '}
            and we will verify your benefits for you.
          </p>
        </Card>

        <Card className="mt-6 border-l-4 border-l-navy">
          <h2 className="text-base font-medium text-navy">
            What if you are out of network?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-body">
            You may still be able to see us. Many plans offer out-of-network
            benefits, and some will reimburse a portion of the cost. Self-pay
            arrangements are also available. Contact us and we will explain the
            options before you commit to anything.
          </p>
        </Card>
      </section>
    </>
  )
}

import { insurances, practice } from '../data/site.js'
import Button from '../components/Button.jsx'
import InsuranceLogo from '../components/InsuranceLogo.jsx'
import {
  Card,
  Container,
  IconBadge,
  Section,
  SectionHeading,
} from '../components/Ui.jsx'

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
      <Section tone="calm" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-56 h-[42rem] w-[42rem] rounded-full bg-brand-bloom blur-3xl"
        />
        <Container className="relative">
          <SectionHeading
            as="h1"
            size="xl"
            eyebrow="Insurance Accepted"
            title="Plans we work with"
            body={`We are in network with ${insurances.length} plans, and we verify your coverage before your first appointment so you know what to expect.`}
          />
          <div className="mt-9 flex flex-wrap gap-3">
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
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {groups.map((g) => (
              <Card key={g.group}>
                <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-navy-400">
                  {g.group}
                </h2>
                <p className="mt-2 text-sm text-body">{BLURB[g.group]}</p>
                <ul className="mt-6 grid grid-cols-2 gap-3">
                  {g.items.map((i) => (
                    <li
                      key={i.slug}
                      className="flex h-20 items-center rounded-clinical border border-navy-100 bg-white px-4"
                    >
                      <InsuranceLogo item={i} imgClassName="h-10" />
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <Card className="mt-6 flex gap-5">
            <IconBadge name="alert-triangle" tone="coral" />
            <div>
              <h2 className="font-sans text-base font-semibold text-navy">
                Please confirm before you book
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-body">
                Insurance networks and plan products change, and not every plan
                within a network covers every service. This list reflects the
                plans the practice works with, but the definitive answer comes
                from your own plan. Call the number on the back of your card, or{' '}
                <a
                  href={practice.phoneHref}
                  className="font-semibold text-blue-deep underline underline-offset-2"
                >
                  call us on {practice.phoneDisplay}
                </a>{' '}
                and we will verify your benefits for you.
              </p>
            </div>
          </Card>

          <Card className="mt-6 flex gap-5">
            <IconBadge name="shield" tone="navy" />
            <div>
              <h2 className="font-sans text-base font-semibold text-navy">
                What if you are out of network?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-body">
                You may still be able to see us. Many plans offer out-of-network
                benefits, and some will reimburse a portion of the cost. Self-pay
                arrangements are also available. Contact us and we will explain
                the options before you commit to anything.
              </p>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  )
}

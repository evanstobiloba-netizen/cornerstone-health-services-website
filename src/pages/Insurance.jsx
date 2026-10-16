import { insurances, practice } from '../data/site.js'
import Button from '../components/Button.jsx'
import InsuranceLogo from '../components/InsuranceLogo.jsx'
import { Card, Container, IconBadge, Kicker, Section } from '../components/Ui.jsx'

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
      <Section tone="soft" spacing="opening">
        <Container>
          <Kicker>Insurance Accepted</Kicker>
          <h1 className="t-display mt-6 max-w-4xl text-navy">
            Plans we work with
          </h1>
          <p className="t-lead mt-7 max-w-2xl">
            We are in network with {insurances.length} plans, and we verify your
            coverage before your first appointment so you know what to expect.
          </p>
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

      <Section tone="cream">
        <Container>
          <div className="space-y-4">
            {groups.map((g) => (
              <Card key={g.group}>
                <div className="grid gap-2 lg:grid-cols-12 lg:items-baseline lg:gap-10">
                  <div className="lg:col-span-4">
                    <h2 className="t-subtitle text-navy">{g.group}</h2>
                  </div>
                  <p className="text-[0.97rem] leading-relaxed text-body lg:col-span-8">
                    {BLURB[g.group]}
                  </p>
                </div>

                <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {g.items.map((i) => (
                    <li
                      key={i.slug}
                      className="flex h-20 items-center rounded-clinical bg-cream px-4"
                    >
                      <InsuranceLogo item={i} imgClassName="h-10" />
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="rounded-clinical-lg border border-coral/30 bg-coral-50 p-6 sm:p-7">
              <div className="flex gap-5">
                <IconBadge name="alert-triangle" tone="coral" />
                <div className="min-w-0">
                  <h2 className="t-subtitle text-navy">
                    Please confirm before you book
                  </h2>
                  <p className="mt-3 text-[0.97rem] leading-relaxed text-body">
                    Insurance networks and plan products change, and not every
                    plan within a network covers every service. This list
                    reflects the plans the practice works with, but the
                    definitive answer comes from your own plan. Call the number
                    on the back of your card, or{' '}
                    <a
                      href={practice.phoneHref}
                      className="font-semibold text-blue-deep underline underline-offset-2"
                    >
                      call us on {practice.phoneDisplay}
                    </a>{' '}
                    and we will verify your benefits for you.
                  </p>
                </div>
              </div>
            </div>

            <Card>
              <div className="flex gap-5">
                <IconBadge name="shield" tone="navy" />
                <div className="min-w-0">
                  <h2 className="t-subtitle text-navy">
                    What if you are out of network?
                  </h2>
                  <p className="mt-3 text-[0.97rem] leading-relaxed text-body">
                    You may still be able to see us. Many plans offer
                    out-of-network benefits, and some will reimburse a portion of
                    the cost. Self-pay arrangements are also available. Contact us
                    and we will explain the options before you commit to
                    anything.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  )
}

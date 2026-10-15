import { Link } from 'react-router-dom'
import { crisis, getHelp, practice, services } from '../data/site.js'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import {
  CheckList,
  Container,
  IconBadge,
  Kicker,
  Section,
  SectionHeading,
} from '../components/Ui.jsx'

/**
 * "Get help?" — the practice's crisis-and-first-steps page.
 *
 * The order here is deliberate. Someone landing on "Get help?" may be in
 * distress right now, so the 988 / 911 block comes first, before any
 * marketing content — and it carries the page's single <h1>.
 */
export default function GetHelp() {
  return (
    <>
      {/* Crisis first — before anything else on the page. */}
      <div className="border-t-2 border-coral bg-coral-50">
        <Container className="py-12 lg:py-16">
          <div className="max-w-4xl">
            <p className="t-kicker flex items-center gap-2 text-coral-deep">
              <Icon name="alert-triangle" size={15} strokeWidth={2.2} aria-hidden="true" />
              24/7 crisis support
            </p>
            <h1 className="t-title mt-5 text-navy">
              If you or someone else is in immediate danger, call 911
            </h1>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-body">
              For a suicidal or mental-health crisis, call or text{' '}
              <a
                href={crisis.lifelineHref}
                className="font-bold text-coral-deep underline underline-offset-4"
              >
                988
              </a>{' '}
              — free, confidential, and available 24/7.
            </p>
          </div>
        </Container>
      </div>

      <Section tone="white" rule>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <Kicker>{getHelp.script}</Kicker>
              <h2 className="t-title mt-5 text-navy">{getHelp.title}</h2>
            </div>
            <div className="lg:col-span-8">
              <p className="t-lead max-w-2xl">{getHelp.lede}</p>
              <p className="mt-6 max-w-3xl text-[1.02rem] leading-relaxed text-body">
                {getHelp.body}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button to="/book" size="lg" icon="calendar">
                  Book Now
                </Button>
                <Button
                  to="/talk-to-a-specialist"
                  variant="outline"
                  size="lg"
                  icon="chat"
                >
                  Talk to a Specialist
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
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="calm" rule>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Finding the right support"
                title="What we can help with"
                size="md"
              />
              <p className="mt-6 text-[1.02rem] leading-relaxed text-body">
                We provide outpatient psychiatric care for adults aged 18 to 80.
                You do not need a diagnosis or a referral to get started — many
                people come to us simply because something has not felt right
                for a while.
              </p>
              <CheckList
                className="mt-8"
                items={services.map((s) => s.title)}
              />
            </div>

            <div className="lg:col-span-7">
              {[
                {
                  icon: 'stethoscope',
                  tone: 'cyan',
                  title: 'What we do not provide',
                  body: (
                    <>
                      We are an outpatient practice. We do not run an emergency
                      department, we do not admit patients, and we do not treat
                      children or adolescents. If you need any of those, we will
                      help you find the right service rather than leave you
                      without an answer.
                    </>
                  ),
                },
                {
                  icon: 'users',
                  tone: 'blue',
                  title: 'Someone you care about is struggling',
                  body: (
                    <>
                      If you are worried about a friend, partner or family
                      member, you can reach out on their behalf — see{' '}
                      <Link
                        to="/refer-a-loved-one"
                        className="font-semibold text-blue-deep underline underline-offset-2"
                      >
                        Refer a Loved One
                      </Link>
                      . In an emergency, do not wait for an appointment: call 988
                      or 911.
                    </>
                  ),
                },
                {
                  icon: 'external-link',
                  tone: 'navy',
                  title: 'Other places to get help',
                  body: (
                    <>
                      Our{' '}
                      <Link
                        to="/resources"
                        className="font-semibold text-blue-deep underline underline-offset-2"
                      >
                        Resources page
                      </Link>{' '}
                      lists national organisations with free information, and the
                      988 Lifeline also runs a text and chat service at{' '}
                      <a
                        href="https://988lifeline.org/"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="font-semibold text-blue-deep underline underline-offset-2"
                      >
                        988lifeline.org
                      </a>
                      .
                    </>
                  ),
                },
              ].map((c, i, arr) => (
                <div
                  key={c.title}
                  className={`border-t border-[rgba(14,15,59,0.12)] py-7 ${
                    i === arr.length - 1
                      ? 'border-b border-[rgba(14,15,59,0.12)]'
                      : ''
                  }`}
                >
                  <div className="flex gap-5">
                    <IconBadge name={c.icon} tone={c.tone} />
                    <div>
                      <h3 className="t-subtitle text-navy">{c.title}</h3>
                      <p className="mt-2.5 text-[0.97rem] leading-relaxed text-body">
                        {c.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

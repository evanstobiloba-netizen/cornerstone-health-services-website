import { Link } from 'react-router-dom'
import { crisis, getHelp, practice, services } from '../data/site.js'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import { Card, CheckList, SectionHeading } from '../components/Ui.jsx'

/**
 * "Get help?" — the practice's crisis-and-first-steps page.
 *
 * The order here is deliberate. Someone landing on "Get help?" may be in
 * distress right now, so the 988 / 911 block comes first, before any
 * marketing content.
 */
export default function GetHelp() {
  return (
    <>
      {/* Crisis first — before anything else on the page. */}
      <section className="border-b border-coral/30 bg-coral-50">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
          <div className="max-w-4xl">
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-coral-deep">
              <Icon name="alert-triangle" size={16} />
              24/7 crisis support
            </p>
            <h1 className="mt-2 text-2xl font-medium text-navy sm:text-3xl">
              If you or someone else is in immediate danger, call 911
            </h1>
            <p className="mt-3 text-[1.02rem] leading-relaxed text-body">
              For a suicidal or mental-health crisis, call or text{' '}
              <a
                href={crisis.lifelineHref}
                className="font-bold text-coral-deep underline underline-offset-2"
              >
                988
              </a>{' '}
              — free, confidential, and available 24/7.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-navy-100 bg-mesh-calm">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-[-12%] h-[32rem] w-[32rem] rounded-full bg-cyan-50/70 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 right-[-10%] h-[32rem] w-[32rem] rounded-full bg-blue-50/60 blur-[120px]"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:px-8 lg:py-24">
          <SectionHeading
            script={getHelp.script}
            title={getHelp.title}
            body={getHelp.lede}
          />
          <p className="mt-6 max-w-3xl text-[1.05rem] leading-relaxed text-body">
            {getHelp.body}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button to="/book" size="lg" icon="calendar">
              Book Now
            </Button>
            <Button to="/talk-to-a-specialist" variant="outline" size="lg" icon="chat">
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
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div>
            <SectionHeading
              script="Finding the right support"
              title="What we can help with"
              size="md"
            />
            <p className="mt-5 text-[1.02rem] leading-relaxed text-body">
              We provide outpatient psychiatric care for adults aged 18 to 80.
              You do not need a diagnosis or a referral to get started — many
              people come to us simply because something has not felt right for
              a while.
            </p>
            <CheckList
              className="mt-6"
              items={services.map((s) => s.title)}
            />
          </div>

          <div className="space-y-5">
            <Card className="border-l-4 border-l-cyan">
              <h2 className="flex items-center gap-2 font-medium text-navy">
                <Icon name="stethoscope" size={18} className="text-cyan-deep" />
                What we do not provide
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-body">
                We are an outpatient practice. We do not run an emergency
                department, we do not admit patients, and we do not treat
                children or adolescents. If you need any of those, we will help
                you find the right service rather than leave you without an
                answer.
              </p>
            </Card>

            <Card className="border-l-4 border-l-blue">
              <h2 className="flex items-center gap-2 font-medium text-navy">
                <Icon name="users" size={18} className="text-blue-deep" />
                Someone you care about is struggling
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-body">
                If you are worried about a friend, partner or family member, you
                can reach out on their behalf — see{' '}
                <Link
                  to="/refer-a-loved-one"
                  className="font-semibold text-blue-deep underline underline-offset-2"
                >
                  Refer a Loved One
                </Link>
                . In an emergency, do not wait for an appointment: call 988 or
                911.
              </p>
            </Card>

            <Card className="border-l-4 border-l-navy">
              <h2 className="flex items-center gap-2 font-medium text-navy">
                <Icon name="external-link" size={18} className="text-navy-400" />
                Other places to get help
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-body">
                Our{' '}
                <Link
                  to="/resources"
                  className="font-semibold text-blue-deep underline underline-offset-2"
                >
                  Resources page
                </Link>{' '}
                lists national organisations with free information, and the 988
                Lifeline also runs a text and chat service at{' '}
                <a
                  href="https://988lifeline.org/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-semibold text-blue-deep underline underline-offset-2"
                >
                  988lifeline.org
                </a>
                .
              </p>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}

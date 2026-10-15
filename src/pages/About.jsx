import { about, practice } from '../data/site.js'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import { Card, CheckList, SectionHeading } from '../components/Ui.jsx'

export default function About() {
  return (
    <>
      <Intro />
      <MissionVision />
      <Facts />
      <Cta />
    </>
  )
}

function Intro() {
  return (
    <section className="relative isolate overflow-hidden border-b border-navy-100 bg-white">
      <img
        src="/about-hero.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center lg:left-auto lg:right-0 lg:w-[58%]"
        loading="eager"
        decoding="async"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-hero-scrim" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-[-12%] h-[40rem] w-[40rem] rounded-full bg-cyan-50/70 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-60 -left-20 h-[32rem] w-[32rem] rounded-full bg-blue-50/60 blur-[120px]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20 lg:px-8 lg:py-24">
        <div>
          <SectionHeading
            as="h1"
            script="About Us"
            title={`About ${practice.legalName}`}
          />
          <p className="mt-6 text-[1.05rem] leading-relaxed text-body">
            {about.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/book" size="lg" icon="calendar">
              Book Now
            </Button>
            <Button to="/services" variant="outline" size="lg">
              Our services
            </Button>
          </div>

          <div className="mt-10 rounded-clinical-lg border border-navy-100/80 bg-white/90 p-6 shadow-clinical backdrop-blur">
            <p className="font-script text-3xl leading-none text-blue-deep">
              At a glance
            </p>
            <dl className="mt-5 space-y-4 text-sm">
              {[
                ['Founded', practice.founded],
                ['We serve', practice.serves],
                ['Based in', `${practice.address.city}, ${practice.address.state}`],
                ['Visits', 'In person & telehealth'],
                ['Emergency care', 'Not provided — call 911'],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-start justify-between gap-4 border-b border-navy-100/60 pb-3.5 last:border-0 last:pb-0"
                >
                  <dt className="text-navy-600">{k}</dt>
                  <dd className="text-right font-bold text-navy">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div aria-hidden="true" className="hidden lg:block" />
      </div>
    </section>
  )
}

function MissionVision() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <Card className="border-t-4 border-t-cyan">
          <h2 className="font-script text-4xl leading-none text-blue-deep">
            Our Mission
          </h2>
          <p className="mt-3 text-[1.02rem] leading-relaxed text-body">
            {about.mission}
          </p>
        </Card>

        <Card className="border-t-4 border-t-blue">
          <h2 className="font-script text-4xl leading-none text-cyan-deep">
            Our Vision
          </h2>
          <p className="mt-3 text-[1.02rem] leading-relaxed text-body">
            {about.vision}
          </p>
        </Card>
      </div>
    </section>
  )
}

function Facts() {
  const commitments = [
    'Psychiatric diagnosis, medication management, treatment management and psychotherapy',
    'Care for adults aged 18 to 80, across a wide range of mental health concerns',
    'In-person appointments in Quincy, or telehealth anywhere in Massachusetts',
    'Most major insurance plans accepted, with coverage verified before your first visit',
    'A stigma-free, welcoming environment focused on reducing barriers to care',
  ]

  return (
    <section className="border-y border-navy-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              script="What we stand for"
              title="Care designed around the person, not the paperwork"
            />
            <p className="mt-6 text-[1.02rem] leading-relaxed text-body">
              {about.homepageWelcome}
            </p>
            <CheckList items={commitments} className="mt-8" />
          </div>

          <div className="space-y-5">
            <Card className="border-l-4 border-l-cyan">
              <h3 className="flex items-center gap-2 font-medium text-navy">
                <Icon name="shield" size={18} className="text-cyan-deep" />
                Privacy and confidentiality
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-body">
                Your information is handled in line with HIPAA and our{' '}
                <a
                  href={practice.privacyUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-semibold text-blue-deep underline underline-offset-2"
                >
                  Privacy Policy
                </a>
                . We share only what is necessary, and only with your consent.
              </p>
            </Card>

            <Card className="border-l-4 border-l-coral">
              <h3 className="flex items-center gap-2 font-medium text-navy">
                <Icon name="alert-triangle" size={18} className="text-coral-deep" />
                Clear about our limits
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-body">
                We provide outpatient care for adults. We do not provide
                emergency or inpatient services, and we do not treat children or
                adolescents. In a crisis, call or text{' '}
                <a
                  href="tel:988"
                  className="font-bold text-coral-deep underline underline-offset-2"
                >
                  988
                </a>{' '}
                or call 911.
              </p>
            </Card>

            <Card className="border-l-4 border-l-navy">
              <h3 className="flex items-center gap-2 font-medium text-navy">
                <Icon name="external-link" size={18} className="text-navy-400" />
                Verify us independently
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-body">
                You can check any licence or certification we hold with the
                issuing body, and read our full{' '}
                <a
                  href={practice.privacyUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-semibold text-blue-deep underline underline-offset-2"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

function Cta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
      <div className="rounded-clinical-lg bg-navy p-8 sm:p-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-script text-4xl leading-none text-cyan">
              Ready when you are
            </p>
            <h2 className="mt-2 text-2xl font-medium text-white sm:text-3xl">
              Let&rsquo;s take the next step together
            </h2>
            <p className="mt-3 leading-relaxed text-navy-100">
              Book an appointment, or reach out with any question you have before
              you do.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:shrink-0">
            <Button to="/book" variant="accent" size="lg" icon="calendar">
              Book Now
            </Button>
            <Button
              href={practice.phoneHref}
              variant="onDark"
              size="lg"
              icon="phone"
            >
              {practice.phoneDisplay}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

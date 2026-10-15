import { Link } from 'react-router-dom'
import {
  about,
  crisis,
  faqs,
  insurances,
  practice,
  resources,
  services,
  stats,
} from '../data/site.js'
import Accordion from '../components/Accordion.jsx'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import LocationMap from '../components/LocationMap.jsx'
import { Card, CheckList, SectionHeading } from '../components/Ui.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBand />
      <Welcome />
      <ServicesGrid />
      <PathToHealing />
      <InsuranceStrip />
      <GetSupport />
      <FaqPreview />
      <Location />
      <ClosingCta />
    </>
  )
}

/* ------------------------------------------------------------------ Hero */

function Hero() {
  const trust = [
    { icon: 'map-pin', text: practice.serves },
    { icon: 'video', text: 'In person & telehealth' },
    { icon: 'shield', text: 'Most insurance accepted' },
  ]

  return (
    <section className="relative isolate overflow-hidden border-b border-navy-100 bg-white">
      {/* Photographic backdrop, held back so it reads as texture, not subject. */}
      <img
        src="/hero.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center lg:left-auto lg:right-0 lg:w-[58%]"
        loading="eager"
        decoding="async"
        fetchPriority="high"
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

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20 lg:px-8 lg:py-28">
        <div>
          <p className="font-script text-4xl leading-none text-blue-deep sm:text-[2.85rem]">
            Mental Wellness, Within Reach
          </p>
          <h1 className="mt-2 text-4xl font-medium leading-[1.06] tracking-[-0.025em] text-navy sm:text-5xl lg:text-[3.5rem]">
            Compassionate psychiatric care for adults across Massachusetts
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">
            {about.homepageWelcome}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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

          <ul className="mt-10 grid gap-2.5 rounded-clinical-lg border border-navy-100/70 bg-white/85 p-3 shadow-clinical backdrop-blur sm:grid-cols-3">
            {trust.map((t) => (
              <li
                key={t.text}
                className="flex items-center gap-2.5 rounded-clinical-sm px-2 py-1.5"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-gradient text-navy">
                  <Icon name={t.icon} size={16} />
                </span>
                <span className="text-[0.85rem] font-semibold leading-snug text-navy-600">
                  {t.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Reserves the photographic column on large screens. */}
        <div aria-hidden="true" className="hidden lg:block" />
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ Stats band */

function StatsBand() {
  return (
    <section aria-label="Practice at a glance" className="relative overflow-hidden bg-mesh-navy">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 pattern-dots text-white/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[48rem] -translate-x-1/2 rounded-full bg-cyan/25 blur-[140px]"
      />

      <dl className="relative mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-4 py-16 sm:grid-cols-4 lg:px-8">
        {stats.map((s) => (
          <div key={s.label} className="group text-center">
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <span className="block bg-gradient-to-b from-white via-cyan-50 to-cyan bg-clip-text text-4xl font-semibold leading-none tracking-tight text-transparent sm:text-5xl">
                {s.value}
              </span>
              <span className="mt-3 block text-[0.8rem] font-semibold uppercase leading-snug tracking-[0.12em] text-navy-200">
                {s.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

/* -------------------------------------------------------------- Welcome */

function Welcome() {
  return (
    <section className="relative overflow-hidden bg-mesh-calm">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-cyan-50/60 blur-[120px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <SectionHeading
              script={practice.welcome.script}
              title={practice.welcome.title}
            />
            <p className="mt-6 text-[1.05rem] leading-relaxed text-body">
              {about.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/about" variant="primary" size="lg" icon="arrow" iconRight>
                About Us
              </Button>
              <Button to="/services" variant="outline" size="lg">
                Our services
              </Button>
            </div>
          </div>

          <div className="space-y-5">
            <Card className="border-l-4 border-l-cyan">
              <h3 className="font-script text-3xl leading-none text-blue-deep">
                Our Mission
              </h3>
              <p className="mt-2.5 text-[0.98rem] font-medium leading-relaxed text-navy">
                {about.mission}
              </p>
            </Card>
            <Card className="border-l-4 border-l-navy">
              <h3 className="font-script text-3xl leading-none text-cyan-deep">
                Our Vision
              </h3>
              <p className="mt-2.5 text-[0.98rem] font-medium leading-relaxed text-navy">
                {about.vision}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------- Services grid */

function ServicesGrid() {
  return (
    <section className="relative overflow-hidden border-y border-navy-100/80 bg-mesh-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-[32rem] w-[32rem] rounded-full bg-blue-50/60 blur-[120px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-24 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            script="Available Services"
            title="Our Mental Health Offerings"
            body="Explore our wide range of services designed to promote mental wellness and personal growth."
          />
          <Button
            to="/services"
            variant="outline"
            icon="arrow"
            iconRight
            className="shrink-0 self-start lg:self-auto"
          >
            View all services
          </Button>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                to={`/services/${s.slug}`}
                className="group flex h-full flex-col rounded-clinical-lg border border-navy-100/80 bg-white/95 p-6 shadow-clinical backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:border-blue/40 hover:shadow-clinical-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
              >
                <span className="grid h-14 w-14 place-items-center rounded-clinical bg-brand-gradient text-navy shadow-clinical">
                  <Icon name={s.icon} size={25} />
                </span>
                <h3 className="mt-5 text-[1.08rem] font-medium tracking-tight text-navy">
                  {s.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-body">
                  {s.card}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-deep">
                  Read more
                  <Icon
                    name="arrow"
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ------------------------------------------------------- Path to healing */

function PathToHealing() {
  const steps = [
    {
      step: '01',
      title: 'Reach out',
      body: 'Fill in the Book Now form or call us. A member of our team contacts you to confirm your appointment.',
      icon: 'clipboard',
    },
    {
      step: '02',
      title: 'Assessment & diagnosis',
      body: 'A thorough evaluation to understand what is happening and identify the right path forward.',
      icon: 'stethoscope',
    },
    {
      step: '03',
      title: 'Ongoing treatment',
      body: 'Medication management, psychotherapy, or both — reviewed regularly and adjusted with you.',
      icon: 'route',
    },
  ]

  return (
    <section className="relative overflow-hidden bg-mesh-calm">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-blue-50/60 blur-[120px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-24 lg:px-8">
        <SectionHeading
          script="Your Path to Healing"
          title="Start Your Healing Journey"
          body="Take the first step toward a healthier, more balanced life. Our compassionate care team is here to guide you every step of the way."
          align="center"
        />

        <ol className="mt-12 grid gap-6 lg:grid-cols-3">
          {steps.map((s) => (
            <li key={s.step}>
              <Card className="h-full">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-clinical bg-navy text-white shadow-clinical">
                    <Icon name={s.icon} size={22} />
                  </span>
                  <span className="font-script text-4xl leading-none text-cyan-deep">
                    {s.step}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-medium text-navy">{s.title}</h3>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-body">
                  {s.body}
                </p>
              </Card>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button to="/book" size="lg" icon="calendar">
            Request an appointment
          </Button>
          <Button to="/get-help" variant="outline" size="lg" icon="heart-pulse">
            Get help?
          </Button>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------- Insurance strip */

function InsuranceStrip() {
  return (
    <section className="relative overflow-hidden border-y border-navy-100/80 bg-mesh-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 pattern-dots text-navy-200 opacity-40"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          <div>
            <SectionHeading
              script="Insurance Accepted"
              title="We work with most major plans"
              body="Coverage is verified before your first appointment so there are no surprises about what you owe."
              size="md"
            />
            <Button
              to="/insurance"
              variant="primary"
              size="md"
              icon="arrow"
              iconRight
              className="mt-6"
            >
              See all {insurances.length} plans
            </Button>
          </div>
          <ul className="flex flex-wrap gap-2">
            {insurances.map((i) => (
              <li
                key={i.name}
                className="rounded-full border border-navy-100 bg-white/90 px-3.5 py-1.5 text-[0.82rem] font-semibold text-navy-600 shadow-clinical transition-colors hover:border-cyan hover:text-navy"
              >
                {i.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------- Get support */

function GetSupport() {
  const tiles = [
    {
      title: 'Refer a Loved One',
      body: 'Help someone you care about get the support they need.',
      to: '/refer-a-loved-one',
      icon: 'users',
    },
    {
      title: 'Talk to a Specialist',
      body: 'Connect with our experienced mental health professionals.',
      to: '/talk-to-a-specialist',
      icon: 'chat',
    },
    {
      title: 'Volunteer with Us',
      body: 'Make a difference in the lives of others in our community.',
      to: '/volunteer-with-us',
      icon: 'handshake',
    },
    {
      title: 'Share Your Experience',
      body: 'Your story can inspire and uplift others on their journey.',
      to: '/share-your-experience',
      icon: 'sparkle',
    },
  ]

  return (
    <section className="relative overflow-hidden bg-mesh-calm">
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-24 lg:px-8">
        <SectionHeading
          script="How you can reach us"
          title="More ways to get support"
          align="center"
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((t) => (
            <li key={t.to}>
              <Link
                to={t.to}
                className="group flex h-full flex-col rounded-clinical-lg border border-navy-100/80 bg-white/95 p-6 shadow-clinical backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:border-blue/40 hover:shadow-clinical-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
              >
                <span className="grid h-12 w-12 place-items-center rounded-clinical bg-cyan-50 text-cyan-deep transition-colors group-hover:bg-brand-gradient group-hover:text-navy">
                  <Icon name={t.icon} size={22} />
                </span>
                <h3 className="mt-4 text-[1.02rem] font-medium text-navy">
                  {t.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-body">
                  {t.body}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-deep">
                  Continue
                  <Icon
                    name="arrow"
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ FAQ block */

function FaqPreview() {
  return (
    <section className="relative overflow-hidden border-y border-navy-100/80 bg-mesh-white">
      <div className="relative mx-auto max-w-4xl px-4 py-20 sm:py-24 lg:px-8">
        <SectionHeading
          script="Questions"
          title="Frequently Asked Questions"
          align="center"
        />
        <Accordion items={faqs} className="mt-12" />
        <div className="mt-8 text-center">
          <Button to="/faqs" variant="outline" size="md" icon="arrow" iconRight>
            All frequently asked questions
          </Button>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- Location */

function Location() {
  return (
    <section className="relative overflow-hidden bg-mesh-calm">
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-24 lg:px-8">
        <SectionHeading
          script="Keep in Touch"
          title="Contact information"
          body="Your path to better mental well-being begins with just one conversation. Connect with us today."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <LocationMap height="h-[24rem]" />

          <div className="space-y-5">
            <Card>
              <h3 className="font-script text-3xl leading-none text-blue-deep">
                Need assistance?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-body">
                Reach out to our team with any questions or concerns and we will
                provide the support and guidance you need.
              </p>
              <Button
                href={practice.phoneHref}
                size="md"
                icon="phone"
                className="mt-4 w-full"
              >
                {practice.phoneDisplay}
              </Button>
              <Button
                href={`mailto:${practice.email}`}
                variant="outline"
                size="md"
                icon="document"
                className="mt-2 w-full"
              >
                Message us
              </Button>
            </Card>

            <Card>
              <h3 className="text-base font-medium text-navy">
                Also listed on Zocdoc
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-body">
                Prefer to see live availability and book a slot yourself?
              </p>
              <Button
                href={practice.zocdocUrl}
                target="_blank"
                rel="noreferrer noopener"
                variant="primary"
                size="md"
                icon="external-link"
                className="mt-4 w-full"
              >
                Book on Zocdoc
              </Button>
            </Card>

            <Card>
              <h3 className="text-base font-medium text-navy">Resources</h3>
              <CheckList
                items={resources.slice(0, 3).map((r) => r.name)}
                className="mt-4"
              />
              <Link
                to="/resources"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-deep underline-offset-4 hover:underline"
              >
                All resources
                <Icon name="arrow" size={15} />
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------- Closing CTA */

function ClosingCta() {
  const expectations = [
    'Tell us a little about what you need',
    'We verify your insurance before booking',
    'We contact you within 24–48 business hours',
  ]
  return (
    <section className="relative overflow-hidden bg-mesh-navy">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 pattern-dots text-white/[0.08]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-20 h-96 w-96 rounded-full bg-cyan/25 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-blue/20 blur-[140px]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-8">
        <div>
          <p className="font-script text-4xl leading-none text-cyan sm:text-[2.85rem]">
            Struggling with your mental health?
          </p>
          <h2 className="mt-2 text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            We&rsquo;re here to help.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy-100">
            Book now and let us guide you toward a brighter tomorrow. If you
            would rather speak to someone first, call us — a real person answers
            during office hours.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={practice.phoneHref} variant="accent" size="lg" icon="phone">
              {practice.phoneDisplay}
            </Button>
            <Button
              href={`mailto:${practice.email}`}
              variant="onDark"
              size="lg"
              icon="document"
            >
              Email us
            </Button>
          </div>

          <div className="mt-8 rounded-clinical-lg border border-coral/60 bg-coral/20 p-5 backdrop-blur">
            <p className="flex items-center gap-2 font-bold text-white">
              <Icon name="alert-triangle" size={17} />
              24/7 crisis support
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-white/95">
              Call or text{' '}
              <a
                href={crisis.lifelineHref}
                className="font-bold text-white underline underline-offset-2"
              >
                988
              </a>{' '}
              — free and confidential, any time.
            </p>
          </div>
        </div>

        <div className="rounded-clinical-lg border border-white/15 bg-white/10 p-6 shadow-clinical-lg backdrop-blur sm:p-8">
          <p className="font-script text-3xl leading-none text-cyan sm:text-[2.25rem]">
            Start your healing journey
          </p>
          <h3 className="mt-2 text-xl font-medium text-white sm:text-2xl">
            Request an appointment
          </h3>
          <CheckList items={expectations} light className="mt-6" />
          <Button to="/book" size="lg" icon="calendar" className="mt-6 w-full">
            Book Now
          </Button>
          <p className="mt-2 text-center text-xs text-navy-200">
            Takes about 2 minutes. We reply within 24–48 business hours.
          </p>
        </div>
      </div>
    </section>
  )
}

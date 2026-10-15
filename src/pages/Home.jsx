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
import HeroSlideshow from '../components/HeroSlideshow.jsx'
import Icon from '../components/Icon.jsx'
import InsuranceLogo from '../components/InsuranceLogo.jsx'
import LocationMap from '../components/LocationMap.jsx'
import {
  Badge,
  Card,
  CheckList,
  Container,
  Eyebrow,
  IconBadge,
  Section,
  SectionHeading,
  Stat,
} from '../components/Ui.jsx'
import { asset } from '../lib/asset.js'

export default function Home() {
  return (
    <>
      <Hero />
      <InsuranceMarquee />
      <Welcome />
      <ServicesGrid />
      <PathToHealing />
      <StatsBand />
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
    <Section className="relative overflow-hidden bg-mesh-calm">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-52 top-[-18rem] h-[46rem] w-[46rem] rounded-full bg-brand-bloom blur-3xl"
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
          <div>
            <Badge tone="white" className="mb-6">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyan opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-gradient" />
              </span>
              Accepting new patients
            </Badge>

            <SectionHeading
              as="h1"
              size="xl"
              eyebrow="Mental Wellness, Within Reach"
              title="Compassionate psychiatric care for adults across Massachusetts"
            />

            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-body">
              {about.homepageWelcome}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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

            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-navy-100 pt-7">
              {trust.map((t) => (
                <li
                  key={t.text}
                  className="inline-flex items-center gap-2 text-[0.9rem] font-medium text-navy-600"
                >
                  <Icon name={t.icon} size={17} className="text-cyan-deep" />
                  {t.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-clinical-xl shadow-clinical-xl ring-1 ring-navy-100/70 sm:aspect-[5/4] lg:aspect-[4/5]">
              <HeroSlideshow className="absolute inset-0 h-full w-full" />
              {/* Sits at the top so it never collides with the slide dots. */}
              <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-[0.72rem] font-semibold text-navy shadow-clinical backdrop-blur">
                <Icon name="video" size={14} className="text-cyan-deep" />
                In person &amp; telehealth
              </span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ---------------------------------------------------- Insurance marquee */

/**
 * Slim auto-scrolling ticker of the accepted plans.
 *
 * The track holds the same list twice. Each copy carries a trailing `pr-2.5`
 * equal to the internal item gap, so one copy's width is exactly one period and
 * a `-50%` translate loops with no visible seam.
 *
 * The first copy stays in the accessibility tree; the second is a clone marked
 * `aria-hidden` and is removed entirely under `prefers-reduced-motion`, where
 * the ticker becomes a plain wrapped row instead of moving.
 */
function InsuranceMarquee() {
  const track = (
    <ul className="flex items-center gap-3 pr-3">
      {insurances.map((i) => (
        <li
          key={i.slug}
          className="flex h-16 items-center justify-center rounded-clinical border border-navy-100 bg-white px-6"
        >
          <InsuranceLogo item={i} imgClassName="h-9" />
        </li>
      ))}
    </ul>
  )

  return (
    <section
      aria-label="Insurance plans accepted"
      className="relative border-y border-navy-100/80 bg-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px rule-brand"
      />
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-6 sm:px-6 lg:px-8">
        <p className="hidden shrink-0 items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-navy-400 sm:flex">
          <Icon name="shield" size={15} className="text-cyan-deep" />
          Insurance accepted
        </p>

        <div className="marquee-mask group relative min-w-0 flex-1 overflow-hidden">
          <div className="marquee-track flex w-max items-center [--marquee-duration:64s] group-hover:[animation-play-state:paused]">
            {track}
            <div aria-hidden="true" data-marquee-clone="" className="flex">
              {track}
            </div>
          </div>
        </div>

        <Link
          to="/insurance"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-blue-deep underline-offset-4 hover:underline"
        >
          All {insurances.length} plans
          <Icon name="arrow" size={15} />
        </Link>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- Welcome */

function Welcome() {
  return (
    <Section tone="calm" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-[-14rem] h-[40rem] w-[40rem] rounded-full bg-brand-bloom blur-3xl"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={practice.welcome.script}
              title={practice.welcome.title}
            />
            <p className="mt-6 text-[1.05rem] leading-relaxed text-body">
              {about.intro}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button to="/about" variant="primary" size="lg" icon="arrow" iconRight>
                About Us
              </Button>
              <Button to="/services" variant="outline" size="lg">
                Our services
              </Button>
            </div>
          </div>

          <div className="space-y-5">
            <Card className="flex gap-5">
              <IconBadge name="heart-pulse" tone="gradient" />
              <div>
                <h3 className="text-xl font-medium text-navy">Our Mission</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-body">
                  {about.mission}
                </p>
              </div>
            </Card>
            <Card className="flex gap-5">
              <IconBadge name="sparkle" tone="cyan" />
              <div>
                <h3 className="text-xl font-medium text-navy">Our Vision</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-body">
                  {about.vision}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* --------------------------------------------------------- Services grid */

function ServicesGrid() {
  return (
    <Section tone="white" className="relative overflow-hidden">
      <Container className="relative">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Available Services"
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

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                to={`/services/${s.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-clinical-lg bg-white shadow-clinical ring-1 ring-navy-100/70 transition duration-200 hover:-translate-y-1 hover:shadow-clinical-lg hover:ring-navy-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[2/1] overflow-hidden bg-navy-50">
                  <img
                    src={asset(`services/${s.slug}.jpg`)}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-navy/45 to-transparent" />
                  <span className="absolute bottom-3 left-3 grid h-10 w-10 place-items-center rounded-clinical bg-white/95 text-navy shadow-clinical backdrop-blur">
                    <Icon name={s.icon} size={20} />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-sans text-[1.05rem] font-semibold leading-snug text-navy">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-body">
                    {s.card}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-deep">
                    Read more
                    <Icon
                      name="arrow"
                      size={15}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
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
    <Section tone="calm" className="relative overflow-hidden">
      <Container className="relative">
        <SectionHeading
          eyebrow="Your Path to Healing"
          title="Start Your Healing Journey"
          body="Take the first step toward a healthier, more balanced life. Our compassionate care team is here to guide you every step of the way."
          align="center"
        />

        <ol className="mt-14 grid gap-6 lg:grid-cols-3">
          {steps.map((s) => (
            <li key={s.step}>
              <Card className="h-full">
                <div className="flex items-center gap-4">
                  <IconBadge name={s.icon} tone="navy" size="lg" />
                  <span className="font-display text-4xl font-medium leading-none text-navy-200">
                    {s.step}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-medium text-navy">{s.title}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-body">
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
      </Container>
    </Section>
  )
}

/* ------------------------------------------------------------ Stats band */

function StatsBand() {
  return (
    <Section
      tone="navy"
      tight
      className="relative overflow-hidden"
      aria-label="Practice at a glance"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 pattern-dots text-white/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-cyan/20 blur-[150px]"
      />

      <Container className="relative">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <Stat value={s.value} label={s.label} light />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
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
    <Section tone="white">
      <Container>
        <SectionHeading
          eyebrow="How you can reach us"
          title="More ways to get support"
          align="center"
        />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((t) => (
            <li key={t.to}>
              <Link
                to={t.to}
                className="group flex h-full flex-col rounded-clinical-lg bg-white p-6 shadow-clinical ring-1 ring-navy-100/70 transition duration-200 hover:-translate-y-1 hover:shadow-clinical-lg hover:ring-navy-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
              >
                <IconBadge
                  name={t.icon}
                  tone="cyan"
                  className="transition-colors group-hover:bg-brand-gradient group-hover:text-navy"
                />
                <h3 className="mt-5 font-sans text-[1.02rem] font-semibold text-navy">
                  {t.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-body">
                  {t.body}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-deep">
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
      </Container>
    </Section>
  )
}

/* ------------------------------------------------------------ FAQ block */

function FaqPreview() {
  return (
    <Section tone="calm" className="relative overflow-hidden">
      <Container size="narrow" className="relative">
        <SectionHeading
          eyebrow="Questions"
          title="Frequently Asked Questions"
          align="center"
        />
        <Accordion items={faqs} className="mt-12" />
        <div className="mt-9 text-center">
          <Button to="/faqs" variant="outline" size="md" icon="arrow" iconRight>
            All frequently asked questions
          </Button>
        </div>
      </Container>
    </Section>
  )
}

/* ------------------------------------------------------------- Location */

function Location() {
  return (
    <Section tone="white">
      <Container>
        <SectionHeading
          eyebrow="Keep in Touch"
          title="Contact information"
          body="Your path to better mental well-being begins with just one conversation. Connect with us today."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <LocationMap height="h-[24rem]" />

          <div className="space-y-5">
            <Card>
              <h3 className="text-xl font-medium text-navy">Need assistance?</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-body">
                Reach out to our team with any questions or concerns and we will
                provide the support and guidance you need.
              </p>
              <Button
                href={practice.phoneHref}
                size="md"
                icon="phone"
                className="mt-5 w-full"
              >
                {practice.phoneDisplay}
              </Button>
              <Button
                href={`mailto:${practice.email}`}
                variant="outline"
                size="md"
                icon="document"
                className="mt-2.5 w-full"
              >
                Message us
              </Button>
            </Card>

            <Card>
              <h3 className="font-sans text-base font-semibold text-navy">
                Also listed on Zocdoc
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-body">
                Prefer to see live availability and book a slot yourself?
              </p>
              <Button
                href={practice.zocdocUrl}
                target="_blank"
                rel="noreferrer noopener"
                variant="primary"
                size="md"
                icon="external-link"
                className="mt-5 w-full"
              >
                Book on Zocdoc
              </Button>
            </Card>

            <Card>
              <h3 className="font-sans text-base font-semibold text-navy">
                Resources
              </h3>
              <CheckList
                items={resources.slice(0, 3).map((r) => r.name)}
                className="mt-4"
              />
              <Link
                to="/resources"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-deep underline-offset-4 hover:underline"
              >
                All resources
                <Icon name="arrow" size={15} />
              </Link>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
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
    <Section tone="navy" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 pattern-dots text-white/[0.08]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-40 h-[28rem] w-[28rem] rounded-full bg-cyan/25 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-blue/20 blur-[150px]"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <Eyebrow light>Struggling with your mental health?</Eyebrow>
            <h2 className="mt-4 text-[2rem] leading-[1.08] text-white sm:text-[2.6rem] lg:text-[3rem]">
              We&rsquo;re here to help.
            </h2>
            <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-navy-100">
              Book now and let us guide you toward a brighter tomorrow. If you
              would rather speak to someone first, call us — a real person answers
              during office hours.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                href={practice.phoneHref}
                variant="accent"
                size="lg"
                icon="phone"
              >
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

            <div className="mt-9 rounded-clinical-lg border border-coral/50 bg-coral/15 p-5 backdrop-blur">
              <p className="flex items-center gap-2 font-semibold text-white">
                <Icon name="alert-triangle" size={17} />
                24/7 crisis support
              </p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-white/95">
                Call or text{' '}
                <a
                  href={crisis.lifelineHref}
                  className="font-bold text-white underline underline-offset-4"
                >
                  988
                </a>{' '}
                — free and confidential, any time.
              </p>
            </div>
          </div>

          <div className="rounded-clinical-xl border border-white/15 bg-white/10 p-7 shadow-clinical-lg backdrop-blur sm:p-9">
            <Eyebrow light>Start your healing journey</Eyebrow>
            <h3 className="mt-4 text-2xl font-medium text-white">
              Request an appointment
            </h3>
            <CheckList items={expectations} light className="mt-7" />
            <Button to="/book" size="lg" icon="calendar" className="mt-7 w-full">
              Book Now
            </Button>
            <p className="mt-3 text-center text-xs text-navy-200">
              Takes about 2 minutes. We reply within 24–48 business hours.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}

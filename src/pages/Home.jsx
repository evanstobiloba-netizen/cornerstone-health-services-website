import { Link } from 'react-router-dom'
import {
  about,
  addressOneLine,
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
  CheckList,
  Container,
  IconBadge,
  Kicker,
  MetaList,
  PullQuote,
  Section,
  SectionHeading,
  Stat,
} from '../components/Ui.jsx'
import { asset } from '../lib/asset.js'

/**
 * The front page.
 *
 * Built like the opening spread of a publication rather than a stack of
 * feature bands: a dark cover carrying the single <h1>, then a numbered spine
 * of sections (01 Welcome, 02 Offerings, 03 Journey, 04 Support, 05 Questions,
 * 06 Contact) separated by hairlines, with the interstitials — the insurance
 * ticker, the figures band, the vision pull quote — carrying no number.
 *
 * Every word of copy is unchanged from the previous build. Only the order,
 * the grouping and the setting are new.
 */
export default function Home() {
  return (
    <>
      <Cover />
      <InsuranceMarquee />
      <Welcome />
      <ServicesIndex />
      <PathToHealing />
      <StatsBand />
      <VisionQuote />
      <GetSupport />
      <FaqPreview />
      <Location />
      <ClosingCta />
    </>
  )
}

/* ------------------------------------------------------------------ Cover */

function Cover() {
  const trust = [
    { icon: 'map-pin', text: practice.serves },
    { icon: 'video', text: 'In person & telehealth' },
    { icon: 'shield', text: 'Most insurance accepted' },
  ]

  return (
    <Section tone="navy" spacing="opening" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 pattern-dots text-white/[0.07]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-44 h-[36rem] w-[36rem] rounded-full bg-cyan/20 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 right-0 h-[30rem] w-[30rem] rounded-full bg-blue/20 blur-[150px]"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Badge tone="light">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyan opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-gradient" />
              </span>
              Accepting new patients
            </Badge>

            <p className="t-kicker mt-8 text-cyan">
              Mental Wellness, Within Reach
            </p>

            <h1 className="t-display mt-5 text-white">
              Compassionate psychiatric care for adults across Massachusetts
            </h1>

            <p className="t-lead mt-7 max-w-xl text-navy-100">
              {about.homepageWelcome}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button to="/book" size="lg" icon="calendar">
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

            <ul className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/15 pt-7">
              {trust.map((t) => (
                <li
                  key={t.text}
                  className="inline-flex items-center gap-2.5 text-[0.9rem] font-medium text-navy-100"
                >
                  <Icon name={t.icon} size={17} className="text-cyan" />
                  {t.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-clinical-lg ring-1 ring-white/15">
              <HeroSlideshow className="absolute inset-0 h-full w-full" />
              {/* Sits at the top so it never collides with the slide dots. */}
              <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-clinical-sm bg-white/90 px-3 py-1.5 text-[0.72rem] font-semibold text-navy shadow-clinical backdrop-blur">
                <Icon name="video" size={14} className="text-cyan-deep" />
                In person &amp; telehealth
              </span>
            </div>
            <p className="t-kicker mt-3 text-navy-200">
              Cornerstone Health Services Inc — Quincy, Massachusetts
            </p>
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
 * The track holds the same list twice. Each copy carries a trailing `pr-3`
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
          className="flex h-16 items-center justify-center rounded-clinical-sm border border-[rgba(14,15,59,0.12)] bg-white px-6"
        >
          <InsuranceLogo item={i} imgClassName="h-9" />
        </li>
      ))}
    </ul>
  )

  return (
    <section
      aria-label="Insurance plans accepted"
      className="relative border-b border-[rgba(14,15,59,0.12)] bg-white"
    >
      <div className="mx-auto flex max-w-[84rem] items-center gap-6 px-5 py-6 sm:px-7 lg:px-10">
        <p className="t-kicker hidden shrink-0 items-center gap-2 text-navy-400 sm:flex">
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
          className="link-rule inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-blue-deep"
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
    <Section tone="white" spacing="opening">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Kicker index="01">{practice.welcome.script}</Kicker>
            <h2 className="t-title mt-5 text-navy">{practice.welcome.title}</h2>
            <p className="t-lead drop-cap mt-7 max-w-2xl">{about.intro}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button to="/about" variant="primary" size="lg" icon="arrow" iconRight>
                About Us
              </Button>
              <Button to="/services" variant="outline" size="lg">
                Our services
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-2">
            <div className="border-t-2 border-navy pt-6">
              <span className="flex items-center gap-3">
                <IconBadge name="heart-pulse" tone="gradient" size="sm" />
                <h3 className="t-subtitle text-navy">Our Mission</h3>
              </span>
              <p className="mt-4 text-[0.97rem] leading-relaxed text-body">
                {about.mission}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* -------------------------------------------------------- Services index */

function ServicesIndex() {
  return (
    <Section tone="calm" rule className="relative overflow-hidden">
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <Kicker index="02">Available Services</Kicker>
            <h2 className="t-title mt-5 text-navy">
              Our Mental Health Offerings
            </h2>
            <p className="t-lead mt-5">
              Explore our wide range of services designed to promote mental
              wellness and personal growth.
            </p>
            <Button
              to="/services"
              variant="outline"
              icon="arrow"
              iconRight
              className="mt-7"
            >
              View all services
            </Button>
          </div>

          <div className="lg:col-span-8">
            <ul className="border-b border-[rgba(14,15,59,0.12)]">
              {services.map((s, i) => (
                <li key={s.slug} className="border-t border-[rgba(14,15,59,0.12)]">
                  <Link
                    to={`/services/${s.slug}`}
                    className="group grid grid-cols-[auto_1fr] items-start gap-5 py-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 sm:grid-cols-[auto_1fr_11rem] sm:gap-7"
                  >
                    <span
                      aria-hidden="true"
                      className="tnum t-kicker pt-2 text-navy-300"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <span className="min-w-0">
                      <span className="t-subtitle block text-navy transition-colors group-hover:text-blue-deep">
                        {s.title}
                      </span>
                      <span className="mt-2.5 block max-w-xl text-[0.97rem] leading-relaxed text-body">
                        {s.card}
                      </span>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-deep">
                        Read more
                        <Icon
                          name="arrow"
                          size={15}
                          className="transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                      </span>
                    </span>

                    <span className="hidden sm:block">
                      <span className="relative block aspect-[3/2] overflow-hidden rounded-clinical bg-navy-50">
                        <img
                          src={asset(`services/${s.slug}.jpg`)}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.05]"
                        />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
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
    <Section tone="white">
      <Container>
        <SectionHeading
          index="03"
          eyebrow="Your Path to Healing"
          title="Start Your Healing Journey"
          body="Take the first step toward a healthier, more balanced life. Our compassionate care team is here to guide you every step of the way."
        />

        <ol className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {steps.map((s) => (
            <li key={s.step} className="border-t-2 border-navy pt-6">
              <span className="inline-flex items-center gap-3">
                <Icon name={s.icon} size={19} className="text-cyan-deep" />
                <span className="tnum t-kicker text-navy-400">{s.step}</span>
              </span>
              <h3 className="t-subtitle mt-5 text-navy">{s.title}</h3>
              <p className="mt-3 text-[0.97rem] leading-relaxed text-body">
                {s.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
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
      tone="mist"
      tight
      className="border-t-2 border-navy"
      aria-label="Practice at a glance"
    >
      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <Stat value={s.value} label={s.label} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  )
}

/* ------------------------------------------------------- Vision pull quote */

function VisionQuote() {
  return (
    <Section tone="paper" tight rule>
      <Container size="narrow">
        <PullQuote attribution="Our vision">{about.vision}</PullQuote>
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
    <Section tone="calm" rule>
      <Container>
        <SectionHeading
          index="04"
          eyebrow="How you can reach us"
          title="More ways to get support"
        />

        <ul className="mt-12 grid border-b border-[rgba(14,15,59,0.12)] sm:grid-cols-2">
          {tiles.map((t, i) => (
            <li
              key={t.to}
              className="border-t border-[rgba(14,15,59,0.12)] sm:odd:border-r"
            >
              <Link
                to={t.to}
                className="group flex h-full flex-col p-7 transition-colors hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="tnum t-kicker text-navy-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <IconBadge
                    name={t.icon}
                    tone="cyan"
                    size="sm"
                    className="transition-colors group-hover:bg-brand-gradient group-hover:text-navy"
                  />
                </span>
                <h3 className="t-subtitle mt-6 text-navy transition-colors group-hover:text-blue-deep">
                  {t.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.97rem] leading-relaxed text-body">
                  {t.body}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-deep">
                  Learn more
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
    <Section tone="white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <Kicker index="05">Questions</Kicker>
            <h2 className="t-title mt-5 text-navy">
              Frequently Asked Questions
            </h2>
            <Button
              to="/faqs"
              variant="outline"
              size="md"
              icon="arrow"
              iconRight
              className="mt-7"
            >
              All frequently asked questions
            </Button>
          </div>

          <div className="lg:col-span-8">
            <Accordion items={faqs} />
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ------------------------------------------------------------- Location */

function Location() {
  return (
    <Section tone="calm" rule>
      <Container>
        <SectionHeading
          index="06"
          eyebrow="Keep in Touch"
          title="Contact information"
          body="Your path to better mental well-being begins with just one conversation. Connect with us today."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <LocationMap height="h-[26rem]" />
            <MetaList
              className="mt-8"
              items={[
                ['Visit', addressOneLine],
                [
                  'Call',
                  <a
                    key="call"
                    href={practice.phoneHref}
                    className="link-rule text-navy"
                  >
                    {practice.phoneDisplay}
                  </a>,
                ],
                [
                  'Email',
                  <a
                    key="email"
                    href={`mailto:${practice.email}`}
                    className="link-rule break-all text-navy"
                  >
                    {practice.email}
                  </a>,
                ],
              ]}
            />
          </div>

          <div className="space-y-9">
            <Panel title="Need assistance?">
              <p className="text-[0.97rem] leading-relaxed text-body">
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
            </Panel>

            <Panel title="Also listed on Zocdoc">
              <p className="text-[0.97rem] leading-relaxed text-body">
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
            </Panel>

            <Panel title="Resources">
              <CheckList items={resources.slice(0, 3).map((r) => r.name)} />
              <Link
                to="/resources"
                className="link-rule mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-deep"
              >
                All resources
                <Icon name="arrow" size={15} />
              </Link>
            </Panel>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/** A ruled editorial aside block. */
function Panel({ title, children }) {
  return (
    <div className="border-t-2 border-navy pt-5">
      <h3 className="t-subtitle text-navy">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
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
    <Section tone="navy" spacing="opening" className="relative overflow-hidden">
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
            <Kicker light>Struggling with your mental health?</Kicker>
            <h2 className="t-title mt-5 text-white">
              We&rsquo;re here to help.
            </h2>
            <p className="t-lead mt-6 max-w-xl text-navy-100">
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

            <div className="mt-9 border border-coral/50 bg-coral/15 p-5">
              <p className="t-kicker flex items-center gap-2 text-white">
                <Icon name="alert-triangle" size={15} aria-hidden="true" />
                24/7 crisis support
              </p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-white/95">
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

          <div className="border border-white/20 bg-white/[0.07] p-7 backdrop-blur sm:p-9">
            <Kicker light>Start your healing journey</Kicker>
            <h3 className="t-subtitle mt-5 text-white">
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

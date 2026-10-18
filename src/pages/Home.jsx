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
  Card,
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
 * The front page, rebuilt for the "warm & human" concept.
 *
 * The old front page was an editorial cover: a dark opening spread, numbered
 * folios and hairline lists. This one opens the way a kind practice would —
 * light, rounded and unhurried. It leads with a warm hero over a photograph,
 * answers "are you covered?" immediately with the insurance ticker, then walks
 * through who we are, what we offer, how it works, and how to reach us.
 *
 * The single dark moment is now the closing panel, which grounds the page just
 * before the footer instead of competing with the opening. Every word of copy
 * is unchanged; only the order, the grouping and the setting are new.
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
    <Section tone="soft" spacing="opening" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-cyan/20 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-28 h-[30rem] w-[30rem] rounded-full bg-coral/10 blur-[140px]"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="t-kicker text-blue-deep">
              Mental Wellness, Within Reach
            </p>

            <h1 className="t-display mt-5 text-navy">
              Compassionate psychiatric care for adults across Massachusetts
            </h1>

            <p className="t-lead mt-7 max-w-xl">{about.homepageWelcome}</p>

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

            <ul className="mt-10 flex flex-wrap gap-2.5">
              {trust.map((t) => (
                <li
                  key={t.text}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[0.9rem] font-medium text-navy-600 shadow-clinical"
                >
                  <Icon name={t.icon} size={16} className="text-cyan-deep" />
                  {t.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-clinical-xl shadow-clinical-xl sm:aspect-[16/11] lg:aspect-[4/5]">
              <HeroSlideshow className="absolute inset-0 h-full w-full" />
              {/* Sits at the top so it never collides with the slide dots. */}
              <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-[0.75rem] font-semibold text-navy shadow-clinical backdrop-blur">
                <Icon name="video" size={14} className="text-cyan-deep" />
                In person &amp; telehealth
              </span>
            </div>
            <p className="t-kicker mt-4 text-navy-400">
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
          className="flex h-16 items-center justify-center rounded-clinical bg-cream px-6"
        >
          <InsuranceLogo item={i} imgClassName="h-9" />
        </li>
      ))}
    </ul>
  )

  return (
    <section aria-label="Insurance plans accepted" className="bg-white">
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
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full text-sm font-semibold text-blue-deep transition-colors hover:text-navy"
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
    <Section tone="cream" spacing="opening">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Kicker index="01">{practice.welcome.script}</Kicker>
            <h2 className="t-title mt-6 text-navy">{practice.welcome.title}</h2>
            <p className="t-lead mt-7 max-w-2xl">{about.intro}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button to="/about" variant="primary" size="lg" icon="arrow" iconRight>
                About Us
              </Button>
              <Button to="/services" variant="outline" size="lg">
                Our services
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Card className="h-full">
              <span className="flex items-center gap-3">
                <IconBadge name="heart-pulse" tone="gradient" size="md" />
                <h3 className="t-subtitle text-navy">Our Mission</h3>
              </span>
              <p className="mt-5 text-[1rem] leading-relaxed text-body">
                {about.mission}
              </p>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* -------------------------------------------------------- Services index */

function ServicesIndex() {
  return (
    <Section tone="sand">
      <Container>
        <SectionHeading
          align="center"
          index="02"
          eyebrow="Available Services"
          title="Our Mental Health Offerings"
          body="Explore our wide range of services designed to promote mental wellness and personal growth."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2">
          {services.map((s, i) => (
            <li key={s.slug} className="h-full">
              <Card interactive padded={false} className="h-full overflow-hidden">
                <Link
                  to={`/services/${s.slug}`}
                  className="group flex h-full flex-col rounded-clinical-lg focus-visible:outline-none"
                >
                  <span className="relative block aspect-[3/2] overflow-hidden bg-cream">
                    <img
                      src={asset(`services/${s.slug}.jpg`)}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.05]"
                    />
                  </span>

                  <span className="flex flex-1 flex-col p-6 sm:p-7">
                    <span className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="tnum grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sand text-[0.78rem] font-semibold text-navy-500"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="t-subtitle text-navy transition-colors group-hover:text-blue-deep">
                        {s.title}
                      </span>
                    </span>

                    <span className="mt-4 flex-1 text-[0.97rem] leading-relaxed text-body">
                      {s.card}
                    </span>

                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-deep">
                      Read more
                      <Icon
                        name="arrow"
                        size={15}
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </span>
                  </span>
                </Link>
              </Card>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <Button to="/services" variant="outline" size="lg" icon="arrow" iconRight>
            View all services
          </Button>
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
    <Section tone="cream">
      <Container>
        <SectionHeading
          align="center"
          index="03"
          eyebrow="Your Path to Healing"
          title="Start Your Healing Journey"
          body="Take the first step toward a healthier, more balanced life. Our compassionate care team is here to guide you every step of the way."
        />

        <ol className="mt-14 grid gap-6 sm:grid-cols-3">
          {steps.map((s) => (
            <li key={s.step} className="h-full">
              <Card className="h-full">
                <span className="flex items-start justify-between gap-4">
                  <IconBadge name={s.icon} tone="gradient" size="md" />
                  <span
                    aria-hidden="true"
                    className="tnum font-display text-[1.7rem] font-semibold leading-none text-navy-100"
                  >
                    {s.step}
                  </span>
                </span>
                <h3 className="t-subtitle mt-6 text-navy">{s.title}</h3>
                <p className="mt-3 text-[0.97rem] leading-relaxed text-body">
                  {s.body}
                </p>
              </Card>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
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
    <Section tone="white" aria-label="Practice at a glance">
      <Container>
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {stats.map((s) => (
            <div key={s.label} className="h-full">
              <dt className="sr-only">{s.label}</dt>
              <dd className="h-full">
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
    <Section tone="blush" tight>
      <Container>
        <Card className="sm:p-10">
          <PullQuote attribution="Our vision">{about.vision}</PullQuote>
        </Card>
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
    <Section tone="cream">
      <Container>
        <SectionHeading
          align="center"
          index="04"
          eyebrow="How you can reach us"
          title="More ways to get support"
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2">
          {tiles.map((t) => (
            <li key={t.to} className="h-full">
              <Card interactive padded={false} className="h-full">
                <Link
                  to={t.to}
                  className="group flex h-full flex-col rounded-clinical-lg p-7 focus-visible:outline-none"
                >
                  <IconBadge
                    name={t.icon}
                    tone="cyan"
                    size="md"
                    className="transition-colors duration-300 group-hover:bg-brand-gradient group-hover:text-navy"
                  />
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
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Card>
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
            <h2 className="t-title mt-6 text-navy">
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
    <Section tone="cream">
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
                    className="text-navy"
                  >
                    {practice.phoneDisplay}
                  </a>,
                ],
                [
                  'Email',
                  <a
                    key="email"
                    href={`mailto:${practice.email}`}
                    className="break-all text-navy"
                  >
                    {practice.email}
                  </a>,
                ],
              ]}
            />
          </div>

          <div className="space-y-6">
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
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-deep transition-colors hover:text-navy"
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

/** A soft card aside block. */
function Panel({ title, children }) {
  return (
    <Card>
      <h3 className="t-subtitle text-navy">{title}</h3>
      <div className="mt-4">{children}</div>
    </Card>
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
    <Section tone="cream" spacing="opening">
      <Container>
        <div className="relative overflow-hidden rounded-clinical-xl bg-mesh-navy p-6 sm:p-10 lg:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 pattern-dots text-white/[0.06]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-32 h-[26rem] w-[26rem] rounded-full bg-cyan/25 blur-[130px]"
          />

          <div className="relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
            <div>
              <Kicker light>Struggling with your mental health?</Kicker>
              <h2 className="t-title mt-6 text-white">
                We&rsquo;re here to help.
              </h2>
              <p className="t-lead mt-6 max-w-xl text-navy-100">
                Book now and let us guide you toward a brighter tomorrow. If you
                would rather speak to someone first, call us — a real person
                answers during office hours.
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

              <div className="mt-9 rounded-clinical-lg border border-coral/50 bg-coral/15 p-5">
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

            <div className="rounded-clinical-lg bg-white p-7 shadow-clinical-xl sm:p-9">
              <Kicker>Start your healing journey</Kicker>
              <h3 className="t-subtitle mt-6 text-navy">
                Request an appointment
              </h3>
              <CheckList items={expectations} className="mt-7" />
              <Button to="/book" size="lg" icon="calendar" className="mt-7 w-full">
                Book Now
              </Button>
              <p className="mt-3 text-center text-xs text-navy-400">
                Takes about 2 minutes. We reply within 24–48 business hours.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

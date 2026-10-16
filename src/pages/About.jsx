import { about, practice } from '../data/site.js'
import Button from '../components/Button.jsx'
import {
  Card,
  CheckList,
  Container,
  Deck,
  IconBadge,
  Kicker,
  MetaList,
  Section,
  SectionHeading,
} from '../components/Ui.jsx'
import { asset } from '../lib/asset.js'

/**
 * About, set as a warm profile piece: a standfirst with an "at a glance" card
 * beside it, a full-bleed figure, then mission and vision as two soft cards and
 * what we stand for as a column of rounded cards. Copy is unchanged.
 */
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
  const atAGlance = [
    ['Founded', practice.founded],
    ['We serve', practice.serves],
    ['Based in', `${practice.address.city}, ${practice.address.state}`],
    ['Visits', 'In person & telehealth'],
    ['Emergency care', 'Not provided — call 911'],
  ]

  return (
    <Section tone="soft" spacing="opening">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
          <div className="lg:col-span-7">
            <Kicker>About Us</Kicker>
            <h1 className="t-display mt-6 text-navy">
              About {practice.legalName}
            </h1>
            <p className="t-lead mt-8 max-w-2xl">{about.intro}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button to="/book" size="lg" icon="calendar">
                Book Now
              </Button>
              <Button to="/services" variant="outline" size="lg">
                Our services
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-2">
            <p className="t-kicker text-navy-400">At a glance</p>
            <MetaList items={atAGlance} className="mt-4" />
          </div>
        </div>

        <div className="mt-16">
          <div className="relative aspect-[16/9] overflow-hidden rounded-clinical-xl bg-sand shadow-clinical-lg sm:aspect-[2/1] lg:aspect-[3/1]">
            <img
              src={asset('about-hero.jpg')}
              alt=""
              aria-hidden="true"
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}

function MissionVision() {
  const blocks = [
    { icon: 'heart-pulse', tone: 'gradient', title: 'Our Mission', body: about.mission },
    { icon: 'sparkle', tone: 'cyan', title: 'Our Vision', body: about.vision },
  ]

  return (
    <Section tone="white">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2">
          {blocks.map((b) => (
            <Card key={b.title} className="h-full">
              <span className="flex items-center gap-3">
                <IconBadge name={b.icon} tone={b.tone} size="md" />
                <h2 className="t-subtitle text-navy">{b.title}</h2>
              </span>
              <p className="mt-5 text-[1.02rem] leading-relaxed text-body">
                {b.body}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
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

  const cards = [
    {
      icon: 'shield',
      tone: 'cyan',
      title: 'Privacy and confidentiality',
      body: (
        <>
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
        </>
      ),
    },
    {
      icon: 'alert-triangle',
      tone: 'coral',
      title: 'Clear about our limits',
      body: (
        <>
          We provide outpatient care for adults. We do not provide emergency or
          inpatient services, and we do not treat children or adolescents. In a
          crisis, call or text{' '}
          <a
            href="tel:988"
            className="font-bold text-coral-deep underline underline-offset-2"
          >
            988
          </a>{' '}
          or call 911.
        </>
      ),
    },
    {
      icon: 'external-link',
      tone: 'navy',
      title: 'Verify us independently',
      body: (
        <>
          You can check any licence or certification we hold with the issuing
          body, and read our full{' '}
          <a
            href={practice.privacyUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="font-semibold text-blue-deep underline underline-offset-2"
          >
            Privacy Policy
          </a>
          .
        </>
      ),
    },
  ]

  return (
    <Section tone="sand">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="What we stand for"
              title="Care designed around the person, not the paperwork"
            />
            <p className="mt-6 text-[1.02rem] leading-relaxed text-body">
              {about.homepageWelcome}
            </p>
            <CheckList items={commitments} className="mt-8" />
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-4">
              {cards.map((c) => (
                <Card key={c.title}>
                  <div className="flex gap-5">
                    <IconBadge name={c.icon} tone={c.tone} />
                    <div>
                      <h3 className="t-subtitle text-navy">{c.title}</h3>
                      <p className="mt-2.5 text-[0.97rem] leading-relaxed text-body">
                        {c.body}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

function Cta() {
  return (
    <Section tone="cream" spacing="opening">
      <Container>
        <div className="relative overflow-hidden rounded-clinical-xl bg-mesh-navy p-8 sm:p-10 lg:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 pattern-dots text-white/[0.06]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-cyan/25 blur-[120px]"
          />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <Kicker light>Ready when you are</Kicker>
              <h2 className="t-title mt-6 text-white">
                Let&rsquo;s take the next step together
              </h2>
              <p className="mt-4 leading-relaxed text-navy-100">
                Book an appointment, or reach out with any question you have
                before you do.
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
      </Container>
    </Section>
  )
}

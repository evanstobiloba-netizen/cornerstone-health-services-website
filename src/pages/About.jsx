import { about, practice } from '../data/site.js'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import {
  Card,
  CheckList,
  Container,
  Eyebrow,
  IconBadge,
  Section,
  SectionHeading,
} from '../components/Ui.jsx'
import { asset } from '../lib/asset.js'

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
    <Section tone="calm" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-52 top-[-18rem] h-[46rem] w-[46rem] rounded-full bg-brand-bloom blur-3xl"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
          <div>
            <SectionHeading
              as="h1"
              size="xl"
              eyebrow="About Us"
              title={`About ${practice.legalName}`}
            />
            <p className="mt-6 text-[1.05rem] leading-relaxed text-body">
              {about.intro}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button to="/book" size="lg" icon="calendar">
                Book Now
              </Button>
              <Button to="/services" variant="outline" size="lg">
                Our services
              </Button>
            </div>
          </div>

          <Card className="lg:mt-2">
            <Eyebrow>At a glance</Eyebrow>
            <dl className="mt-6 space-y-4 text-sm">
              {atAGlance.map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-start justify-between gap-4 border-b border-navy-100/70 pb-3.5 last:border-0 last:pb-0"
                >
                  <dt className="text-navy-500">{k}</dt>
                  <dd className="text-right font-semibold text-navy">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>

        <div className="relative mt-14 aspect-[16/9] overflow-hidden rounded-clinical-xl shadow-clinical-lg ring-1 ring-navy-100/70 sm:aspect-[2/1] lg:aspect-[3/1]">
          <img
            src={asset('about-hero.jpg')}
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </Container>
    </Section>
  )
}

function MissionVision() {
  return (
    <Section tone="white">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Card className="relative overflow-hidden p-8 sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-bloom blur-2xl"
            />
            <div className="relative">
              <IconBadge name="heart-pulse" tone="gradient" size="lg" />
              <h2 className="mt-6 text-2xl font-medium text-navy sm:text-[2rem]">
                Our Mission
              </h2>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-body">
                {about.mission}
              </p>
            </div>
          </Card>

          <Card className="relative overflow-hidden p-8 sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-bloom blur-2xl"
            />
            <div className="relative">
              <IconBadge name="sparkle" tone="cyan" size="lg" />
              <h2 className="mt-6 text-2xl font-medium text-navy sm:text-[2rem]">
                Our Vision
              </h2>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-body">
                {about.vision}
              </p>
            </div>
          </Card>
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
    <Section tone="calm">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="What we stand for"
              title="Care designed around the person, not the paperwork"
            />
            <p className="mt-6 text-[1.02rem] leading-relaxed text-body">
              {about.homepageWelcome}
            </p>
            <CheckList items={commitments} className="mt-8" />
          </div>

          <div className="space-y-5">
            {cards.map((c) => (
              <Card key={c.title} className="flex gap-5">
                <IconBadge name={c.icon} tone={c.tone} />
                <div>
                  <h3 className="font-sans text-base font-semibold text-navy">
                    {c.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-body">
                    {c.body}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

function Cta() {
  return (
    <Section tone="white" tight>
      <Container>
        <div className="relative overflow-hidden rounded-clinical-xl bg-mesh-navy p-8 sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-cyan/25 blur-[120px]"
          />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <Eyebrow light>Ready when you are</Eyebrow>
              <h2 className="mt-4 text-2xl font-medium text-white sm:text-[2rem]">
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

import { Link } from 'react-router-dom'
import { services } from '../data/site.js'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import {
  Card,
  Container,
  Deck,
  IconBadge,
  Kicker,
  Section,
  SectionHeading,
} from '../components/Ui.jsx'
import { asset } from '../lib/asset.js'

/**
 * Services, rebuilt for the warm concept.
 *
 * The old page was a contents list followed by four editorial feature spreads
 * divided by hairlines. This one opens with a soft "in this section" picker of
 * rounded rows, then presents each service as a single rounded card that pairs
 * the photograph with its copy, alternating sides. Copy is unchanged.
 */
export default function Services() {
  return (
    <>
      <Hero />
      <ServiceList />
      <WhatSetsUsApart />
      <Cta />
    </>
  )
}

function Hero() {
  return (
    <Section tone="soft" spacing="opening">
      <Container>
        <Kicker>Services</Kicker>
        <h1 className="t-display mt-6 max-w-4xl text-navy">
          Mental Health Care Services
        </h1>
        <Deck className="mt-7 max-w-2xl">
          Comprehensive, evidence-based psychiatric care for adults — from first
          assessment through to ongoing treatment.
        </Deck>

        <p className="t-kicker mt-14 text-navy-400">In this section</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                to={`/services/${s.slug}`}
                className="group flex items-center gap-4 rounded-clinical border border-line bg-white px-5 py-4 shadow-clinical transition duration-200 hover:-translate-y-0.5 hover:shadow-clinical-lg focus-visible:outline-none"
              >
                <IconBadge
                  name={s.icon}
                  tone="cyan"
                  size="sm"
                  className="transition-colors duration-300 group-hover:bg-brand-gradient group-hover:text-navy"
                />
                <span className="min-w-0 text-[0.98rem] font-semibold leading-snug text-navy transition-colors group-hover:text-blue-deep">
                  {s.title}
                </span>
                <Icon
                  name="arrow"
                  size={17}
                  aria-hidden="true"
                  className="ml-auto shrink-0 text-navy-300 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

function ServiceList() {
  return (
    <Section tone="cream">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Our Mental Health Offerings"
          title="Services We Offer"
          body="Take the first step toward wellness today. Let us guide you forward."
        />

        <div className="mt-14 space-y-8 lg:mt-20 lg:space-y-12">
          {services.map((s, i) => {
            const flip = i % 2 === 1
            return (
              <article key={s.slug} id={s.slug} className="scroll-mt-32">
                <Card padded={false} className="overflow-hidden">
                  <div className="grid gap-0 lg:grid-cols-2">
                    <div
                      className={`relative min-h-[15rem] bg-sand lg:min-h-[26rem] ${
                        flip ? 'lg:order-2' : ''
                      }`}
                    >
                      <img
                        src={asset(`services/${s.slug}.jpg`)}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                      />
                    </div>

                    <div
                      className={`flex flex-col justify-center p-7 sm:p-9 lg:p-12 ${
                        flip ? 'lg:order-1' : ''
                      }`}
                    >
                      <Kicker index={String(i + 1).padStart(2, '0')}>
                        {s.tagline}
                      </Kicker>
                      <h2 className="t-title mt-6 text-navy">{s.title}</h2>
                      <p className="mt-5 text-[1.02rem] leading-relaxed text-body">
                        {s.body}
                      </p>

                      <div className="mt-7 flex flex-wrap gap-3">
                        <Button to="/book" size="md" icon="calendar">
                          Book this service
                        </Button>
                        <Button
                          to={`/services/${s.slug}`}
                          variant="outline"
                          size="md"
                          icon="arrow"
                          iconRight
                        >
                          Full details
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </article>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

function WhatSetsUsApart() {
  const points = [
    {
      icon: 'users',
      title: 'The same team, every visit',
      body: 'You are not passed between rotating providers. The clinician who assesses you stays involved in your care.',
    },
    {
      icon: 'shield',
      title: 'Evidence-based, explained clearly',
      body: 'Every recommendation comes with the reasoning behind it, so you can make an informed decision about your own treatment.',
    },
    {
      icon: 'map-pin',
      title: 'Quincy, or wherever you are',
      body: 'Meet in person at our Quincy office, or by telehealth anywhere in Massachusetts.',
    },
  ]

  return (
    <Section tone="sand">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="What Sets Us Apart"
              title="Expert care, with a human touch"
              body="At CORNERSTONE HEALTH SERVICES INC, we provide compassionate, personalized mental health care designed to meet your unique needs. Our dedicated team offers a safe, supportive environment where healing begins — because your well-being matters most."
            />
          </div>

          <div className="space-y-4 lg:col-span-7">
            {points.map((p) => (
              <Card key={p.title}>
                <div className="flex gap-5">
                  <IconBadge name={p.icon} tone="cyan" />
                  <div>
                    <h3 className="t-subtitle text-navy">{p.title}</h3>
                    <p className="mt-2.5 text-[0.97rem] leading-relaxed text-body">
                      {p.body}
                    </p>
                  </div>
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
              <Kicker light>Not sure where to start?</Kicker>
              <h2 className="t-title mt-6 text-white">
                That is exactly what the first visit is for.
              </h2>
              <p className="mt-4 leading-relaxed text-navy-100">
                Most people are not sure which service they need. Book an
                appointment and we will work it out together.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:shrink-0">
              <Button to="/book" variant="accent" size="lg" icon="calendar">
                Book Now
              </Button>
              <Button to="/contact" variant="onDark" size="lg" icon="chat">
                Contact us
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

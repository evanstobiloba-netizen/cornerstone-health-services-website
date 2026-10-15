import { Link } from 'react-router-dom'
import { practice, services } from '../data/site.js'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import {
  Card,
  Container,
  Eyebrow,
  IconBadge,
  Section,
  SectionHeading,
} from '../components/Ui.jsx'
import { asset } from '../lib/asset.js'

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
    <Section tone="calm" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-56 h-[42rem] w-[42rem] rounded-full bg-brand-bloom blur-3xl"
      />

      <Container className="relative">
        <SectionHeading
          as="h1"
          size="xl"
          eyebrow="Services"
          title="Mental Health Care Services"
          body="Comprehensive, evidence-based psychiatric care for adults — from first assessment through to ongoing treatment."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className="group flex items-center gap-3 rounded-clinical-lg bg-white p-4 shadow-clinical ring-1 ring-navy-100/70 transition duration-200 hover:-translate-y-0.5 hover:shadow-clinical-lg hover:ring-navy-200"
            >
              <IconBadge
                name={s.icon}
                tone="cyan"
                size="sm"
                className="transition-colors group-hover:bg-brand-gradient group-hover:text-navy"
              />
              <span className="text-[0.92rem] font-semibold leading-snug text-navy">
                {s.title}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function ServiceList() {
  return (
    <Section tone="white">
      <Container>
        <SectionHeading
          eyebrow="Our Mental Health Offerings"
          title="Services We Offer"
          body="Take the first step toward wellness today. Let us guide you forward."
        />

        <div className="mt-16 space-y-20 lg:space-y-28">
          {services.map((s, i) => {
            const flip = i % 2 === 1
            return (
              <article
                key={s.slug}
                id={s.slug}
                className="grid scroll-mt-32 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16"
              >
                <div className={flip ? 'lg:order-2' : ''}>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-clinical-xl shadow-clinical-lg ring-1 ring-navy-100/70">
                    <img
                      src={asset(`services/${s.slug}.jpg`)}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>

                <div className={flip ? 'lg:order-1' : ''}>
                  <Eyebrow>{s.tagline}</Eyebrow>
                  <h2 className="mt-4 text-[1.75rem] leading-tight text-navy sm:text-[2.1rem]">
                    {s.title}
                  </h2>
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
    <Section tone="calm" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-[-16rem] h-[40rem] w-[40rem] rounded-full bg-brand-bloom blur-3xl"
      />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <SectionHeading
            eyebrow="What Sets Us Apart"
            title="Expert care, with a human touch"
            body="At CORNERSTONE HEALTH SERVICES INC, we provide compassionate, personalized mental health care designed to meet your unique needs. Our dedicated team offers a safe, supportive environment where healing begins — because your well-being matters most."
          />

          <div className="space-y-5">
            {points.map((p) => (
              <Card key={p.title} className="flex gap-5">
                <IconBadge name={p.icon} tone="cyan" />
                <div>
                  <h3 className="font-sans text-base font-semibold text-navy">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-body">
                    {p.body}
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
              <Eyebrow light>Not sure where to start?</Eyebrow>
              <h2 className="mt-4 text-2xl font-medium text-white sm:text-[2rem]">
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

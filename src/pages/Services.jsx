import { Link } from 'react-router-dom'
import { practice, services } from '../data/site.js'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import { Card, CheckList, SectionHeading } from '../components/Ui.jsx'

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
          as="h1"
          script="Services"
          title="Compassionate psychiatric care tailored to your needs"
          body="We are here to stand by you because your mental health truly matters. Our compassionate team provides personalized care tailored to your unique needs, in a safe and understanding space where healing and growth begin."
        />
        <div className="mt-8 flex flex-wrap gap-3">
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
      </div>
    </section>
  )
}

function ServiceList() {
  return (
    <section className="relative overflow-hidden bg-mesh-calm">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 h-[30rem] w-[30rem] rounded-full bg-cyan-50/70 blur-[120px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-24 lg:px-8">
      <SectionHeading
        script="Our Mental Health Offerings"
        title="Services We Offer"
        body="Take the first step toward wellness today. Let us guide you forward."
      />

      <div className="mt-14 space-y-16 lg:space-y-20">
        {services.map((s, i) => (
          <article
            key={s.slug}
            id={s.slug}
            className="grid scroll-mt-32 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16"
          >
            <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
              <p className="font-script text-3xl leading-none text-blue-deep">
                {s.tagline}
              </p>
              <h2 className="mt-2 text-2xl font-medium text-navy sm:text-3xl">
                {s.title}
              </h2>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-body">
                {s.body}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
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

            <Card className={i % 2 === 1 ? 'lg:order-1' : ''}>
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-clinical bg-brand-gradient text-navy">
                  <Icon name={s.icon} size={22} />
                </span>
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-navy-400">
                  What is included
                </h3>
              </div>
              <CheckList items={s.includes} className="mt-5" />
            </Card>
          </article>
        ))}
      </div>
      </div>
    </section>
  )
}

function WhatSetsUsApart() {
  return (
    <section className="relative overflow-hidden border-y border-navy-100/80 bg-mesh-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-blue-50/60 blur-[120px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <SectionHeading
            script="What Sets Us Apart"
            title="Expert care, with a human touch"
            body="At CORNERSTONE HEALTH SERVICES INC, we provide compassionate, personalized mental health care designed to meet your unique needs. Our dedicated team offers a safe, supportive environment where healing begins — because your well-being matters most."
          />
          <div className="space-y-5">
            <Card className="border-l-4 border-l-cyan">
              <h3 className="flex items-center gap-2 font-medium text-navy">
                <Icon name="users" size={18} className="text-cyan-deep" />
                The same team, every visit
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-body">
                You are not passed between rotating providers. The clinician who
                assesses you stays involved in your care.
              </p>
            </Card>
            <Card className="border-l-4 border-l-blue">
              <h3 className="flex items-center gap-2 font-medium text-navy">
                <Icon name="shield" size={18} className="text-blue-deep" />
                Evidence-based, explained clearly
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-body">
                Every recommendation comes with the reasoning behind it, so you
                can make an informed decision about your own treatment.
              </p>
            </Card>
            <Card className="border-l-4 border-l-navy">
              <h3 className="flex items-center gap-2 font-medium text-navy">
                <Icon name="map-pin" size={18} className="text-navy-400" />
                Quincy, or wherever you are
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-body">
                Meet in person at our Quincy office, or by telehealth anywhere
                in Massachusetts.
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
              Not sure where to start?
            </p>
            <h2 className="mt-2 text-2xl font-medium text-white sm:text-3xl">
              That is exactly what the first visit is for.
            </h2>
            <p className="mt-3 leading-relaxed text-navy-100">
              Most people are not sure which service they need. Book an
              appointment and we will work it out together.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:shrink-0">
            <Button to="/book" variant="accent" size="lg" icon="calendar">
              Book Now
            </Button>
            <Button
              to="/contact"
              variant="onDark"
              size="lg"
              icon="chat"
            >
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

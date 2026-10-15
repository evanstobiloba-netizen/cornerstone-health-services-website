import { Link, Navigate, useParams } from 'react-router-dom'
import { practice, services } from '../data/site.js'
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

/**
 * Individual service page. The four services share one layout driven by the
 * `services` data, matching the live site's four child pages
 * (diagnosis-of-mental-illness, medications-management, treatment-management,
 * psychotherapy).
 */
export default function ServiceDetail() {
  const { slug } = useParams()
  const service = services.find((s) => s.slug === slug)

  if (!service) return <Navigate to="/services" replace />

  const others = services.filter((s) => s.slug !== slug)

  return (
    <>
      <Section tone="white" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-56 h-[38rem] w-[38rem] rounded-full bg-brand-bloom blur-3xl"
        />
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="mb-9">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold text-navy-400">
              <li>
                <Link to="/" className="underline-offset-4 hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  to="/services"
                  className="underline-offset-4 hover:underline"
                >
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-navy-600" aria-current="page">
                {service.title}
              </li>
            </ol>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <div>
              <IconBadge name={service.icon} tone="gradient" size="lg" />
              <div className="mt-6">
                <SectionHeading
                  as="h1"
                  eyebrow={service.tagline}
                  title={service.title}
                />
              </div>
              <p className="mt-6 text-[1.05rem] leading-relaxed text-body">
                {service.body}
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
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

            <div className="relative aspect-[16/10] overflow-hidden rounded-clinical-xl shadow-clinical-lg ring-1 ring-navy-100/70">
              <img
                src={asset(`services/${service.slug}.jpg`)}
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

      <Section tone="calm">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-12">
            <Card>
              <Eyebrow>What is included</Eyebrow>
              <CheckList items={service.includes} className="mt-6" />
            </Card>

            <div className="relative overflow-hidden rounded-clinical-xl bg-mesh-navy p-8 sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-cyan/25 blur-[110px]"
              />
              <div className="relative">
                <Eyebrow light>Still deciding?</Eyebrow>
                <h2 className="mt-4 text-2xl font-medium text-white">
                  Not sure if this is right for you?
                </h2>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-navy-100">
                  Book an evaluation and we will work out the right approach
                  together — that is what the first visit is for.
                </p>
                <Button
                  to="/book"
                  variant="accent"
                  size="lg"
                  icon="calendar"
                  className="mt-7 w-full"
                >
                  Request an appointment
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <SectionHeading
            eyebrow="Keep exploring"
            title="Other services"
            size="md"
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-3">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/services/${s.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-clinical-lg bg-white shadow-clinical ring-1 ring-navy-100/70 transition duration-200 hover:-translate-y-1 hover:shadow-clinical-lg hover:ring-navy-200"
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
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-sans text-[1.02rem] font-semibold text-navy">
                      {s.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-body">
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
    </>
  )
}

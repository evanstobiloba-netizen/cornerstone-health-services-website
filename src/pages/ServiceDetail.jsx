import { Link, Navigate, useParams } from 'react-router-dom'
import { practice, services } from '../data/site.js'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import {
  Card,
  CheckList,
  Container,
  Figure,
  Kicker,
  Section,
  SectionHeading,
} from '../components/Ui.jsx'
import { asset } from '../lib/asset.js'

/**
 * Individual service page, set as an article: breadcrumb, standfirst, one
 * figure, the "what is included" list as a ruled column, and a "keep
 * exploring" contents list. The four services share one layout driven by the
 * `services` data, matching the live site's four child pages
 * (diagnosis-of-mental-illness, medications-management, treatment-management,
 * psychotherapy).
 */
export default function ServiceDetail() {
  const { slug } = useParams()
  const service = services.find((s) => s.slug === slug)

  if (!service) return <Navigate to="/services" replace />

  const index = services.findIndex((s) => s.slug === slug)
  const others = services.filter((s) => s.slug !== slug)

  return (
    <>
      <Section tone="soft" spacing="opening">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="t-kicker flex flex-wrap items-center gap-2.5 text-navy-400">
              <li>
                <Link to="/" className="link-rule hover:text-navy">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/services" className="link-rule hover:text-navy">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-navy" aria-current="page">
                {service.title}
              </li>
            </ol>
          </nav>

          <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
            <div className="lg:col-span-6">
              <Kicker index={String(index + 1).padStart(2, '0')}>
                {service.tagline}
              </Kicker>
              <h1 className="t-display mt-6 text-navy">{service.title}</h1>
              <p className="t-lead mt-7 max-w-xl">{service.body}</p>

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

            <div className="lg:col-span-6">
              <Figure
                src={asset(`services/${service.slug}.jpg`)}
                alt=""
                aspect="aspect-[3/2]"
                eager
                caption={service.tagline}
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <h2 className="t-title text-navy">What is included</h2>
              <CheckList items={service.includes} className="mt-8" />
            </div>

            <div className="lg:col-span-5">
              <Card>
                <Kicker>Still deciding?</Kicker>
                <h3 className="t-subtitle mt-5 text-navy">
                  Not sure if this is right for you?
                </h3>
                <p className="mt-4 text-[0.97rem] leading-relaxed text-body">
                  Book an evaluation and we will work out the right approach
                  together — that is what the first visit is for.
                </p>
                <Button
                  to="/book"
                  variant="primary"
                  size="lg"
                  icon="calendar"
                  className="mt-7 w-full"
                >
                  Request an appointment
                </Button>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Keep exploring"
            title="Other services"
            size="md"
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s) => (
              <li key={s.slug} className="h-full">
                <Card interactive padded={false} className="h-full overflow-hidden">
                  <Link
                    to={`/services/${s.slug}`}
                    className="group flex h-full flex-col rounded-clinical-lg focus-visible:outline-none"
                  >
                    <span className="relative block aspect-[3/2] overflow-hidden bg-sand">
                      <img
                        src={asset(`services/${s.slug}.jpg`)}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.05]"
                      />
                    </span>
                    <span className="flex flex-1 flex-col p-6">
                      <span className="t-subtitle text-navy transition-colors group-hover:text-blue-deep">
                        {s.title}
                      </span>
                      <span className="mt-3 flex-1 text-[0.97rem] leading-relaxed text-body">
                        {s.card}
                      </span>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-deep">
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
        </Container>
      </Section>
    </>
  )
}

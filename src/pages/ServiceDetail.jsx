import { Link, Navigate, useParams } from 'react-router-dom'
import { practice, services } from '../data/site.js'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import { Card, CheckList, SectionHeading } from '../components/Ui.jsx'

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
      <section className="relative overflow-hidden border-b border-navy-100 bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-40 h-[30rem] w-[30rem] rounded-full bg-cyan-50 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold text-navy-400">
              <li>
                <Link to="/" className="underline-offset-4 hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">»</li>
              <li>
                <Link to="/services" className="underline-offset-4 hover:underline">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">»</li>
              <li className="text-navy-600" aria-current="page">
                {service.title}
              </li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-16">
            <div>
              <span className="grid h-14 w-14 place-items-center rounded-clinical-lg bg-brand-gradient text-navy">
                <Icon name={service.icon} size={28} />
              </span>
              <SectionHeading
                as="h1"
                script={service.tagline}
                title={service.title}
              />
              <p className="mt-6 text-[1.05rem] leading-relaxed text-body">
                {service.body}
              </p>

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

            <Card>
              <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-navy-400">
                What is included
              </h2>
              <CheckList items={service.includes} className="mt-5" />
              <div className="mt-6 border-t border-navy-100 pt-5">
                <p className="font-script text-2xl leading-none text-blue-deep">
                  Not sure if this is right for you?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  Book an evaluation and we will work out the right approach
                  together — that is what the first visit is for.
                </p>
                <Button to="/book" size="md" icon="calendar" className="mt-4 w-full">
                  Request an appointment
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <SectionHeading
          script="Keep exploring"
          title="Other services"
          size="md"
        />
        <ul className="mt-10 grid gap-6 sm:grid-cols-3">
          {others.map((s) => (
            <li key={s.slug}>
              <Link
                to={`/services/${s.slug}`}
                className="group flex h-full flex-col rounded-clinical-lg border border-navy-100 bg-white p-6 shadow-clinical transition-all hover:-translate-y-0.5 hover:border-blue"
              >
                <span className="grid h-11 w-11 place-items-center rounded-clinical bg-cyan-50 text-cyan-deep">
                  <Icon name={s.icon} size={21} />
                </span>
                <h3 className="mt-4 font-medium text-navy">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-body">
                  {s.card}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-deep">
                  Read more
                  <Icon name="arrow" size={15} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

import { Link } from 'react-router-dom'
import {
  crisis,
  forms,
  insurances,
  practice,
  services,
  stats,
} from '../data/site.js'
import Icon from '../components/Icon.jsx'
import LeadForm from '../components/LeadForm.jsx'
import Button from '../components/Button.jsx'
import { asset } from '../lib/asset.js'

/**
 * Dedicated mobile home screen from the PRD inventory.
 *
 * The main site is already mobile-first and responsive, so /mobile is the
 * explicit app-shell variant: sticky crisis header and one-tap calling, with
 * no desktop chrome at all. Content is constrained to a phone-width column so
 * it renders identically in a device frame or on a desktop preview. Copy is
 * unchanged.
 */
export default function MobileHome() {
  return (
    <div className="min-h-screen bg-calm">
      {/* Sticky crisis header - always the first thing on screen. */}
      <div className="sticky top-0 z-40">
        <div className="bg-coral text-white">
          <div className="mx-auto flex max-w-lg items-center justify-between gap-3 px-4 py-2.5">
            <a
              href={crisis.lifelineHref}
              className="t-kicker flex items-center gap-2"
            >
              <Icon name="heart-pulse" size={15} strokeWidth={2.2} aria-hidden="true" />
              In a crisis? Call or text 988
            </a>
            <a
              href="tel:911"
              className="shrink-0 rounded-clinical-sm border border-white/40 px-2.5 py-1 text-[0.7rem] font-bold"
            >
              911
            </a>
          </div>
        </div>

        <div className="border-b border-[rgba(14,15,59,0.12)] bg-white/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-lg items-center justify-between gap-3 px-4 py-3">
            <Link to="/" aria-label="Cornerstone Health Services Inc — home">
              <img
                src={asset('brand/logo-primary.png')}
                alt="Cornerstone Health Services Inc"
                height={30}
                style={{ height: 30, width: 'auto' }}
              />
            </Link>
            <Link
              to="/"
              className="link-rule text-xs font-bold text-blue-deep"
            >
              Full site
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 pb-8 pt-6">
        {/* Hero */}
        <p className="t-kicker text-blue-deep">
          Mental Wellness, Within Reach
        </p>
        <h1 className="mt-3 font-display text-[2rem] font-medium leading-[1.05] tracking-[-0.03em] text-navy">
          Compassionate care for adults across Massachusetts
        </h1>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-body">
          Psychiatric evaluation, medication management and psychotherapy for
          adults 18–80. Telehealth, or in person in Quincy.
        </p>

        {/* One-tap actions */}
        <div className="mt-6 grid gap-3">
          <a
            href={practice.phoneHref}
            className="flex items-center gap-3 rounded-clinical bg-navy px-5 py-4 text-left text-white"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-clinical bg-white/15">
              <Icon name="phone" size={20} aria-hidden="true" />
            </span>
            <span>
              <span className="t-kicker block text-navy-200">One-tap call</span>
              <span className="mt-1 block text-lg font-bold leading-tight">
                {practice.phoneDisplay}
              </span>
            </span>
          </a>

          <Link
            to="/book"
            className="flex items-center gap-3 rounded-clinical bg-brand-gradient px-5 py-4 text-left"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-clinical bg-navy/15 text-navy">
              <Icon name="calendar" size={20} aria-hidden="true" />
            </span>
            <span>
              <span className="t-kicker block text-navy/70">Online</span>
              <span className="mt-1 block text-lg font-bold leading-tight text-navy">
                Request an appointment
              </span>
            </span>
          </Link>
        </div>

        {/* Stats */}
        <dl className="mt-6 grid grid-cols-2 gap-3">
          {stats.map((m) => (
            <div
              key={m.label}
              className="rounded-clinical border border-[rgba(14,15,59,0.12)] bg-white px-4 py-3"
            >
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="tnum block font-display text-xl font-medium text-navy">
                  {m.value}
                </span>
                <span className="mt-1 block text-[0.7rem] leading-snug text-body">
                  {m.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        {/* Services */}
        <h2 className="t-subtitle mt-9 text-navy">Our services</h2>
        <ul className="mt-4 border-b border-[rgba(14,15,59,0.12)]">
          {services.map((s) => (
            <li key={s.slug} className="border-t border-[rgba(14,15,59,0.12)]">
              <Link to={`/services/${s.slug}`} className="flex items-center gap-3 py-3.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-clinical bg-cyan-50 text-cyan-deep">
                  <Icon name={s.icon} size={18} aria-hidden="true" />
                </span>
                <span className="flex-1 text-[0.9rem] font-semibold text-navy">
                  {s.title}
                </span>
                <Icon name="arrow" size={16} aria-hidden="true" className="text-navy-300" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Insurance */}
        <h2 className="t-subtitle mt-9 text-navy">Insurance accepted</h2>
        <p className="mt-2 text-sm text-body">
          {insurances.length} plans, including Medicare and MassHealth.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {insurances.map((i) => (
            <li
              key={i.name}
              className="t-kicker inline-flex items-center gap-1.5 rounded-clinical-sm border border-[rgba(14,15,59,0.12)] bg-white px-2.5 py-1.5 text-navy"
            >
              <Icon
                name="check"
                size={12}
                strokeWidth={2.8}
                aria-hidden="true"
                className="text-cyan-deep"
              />
              {i.name}
            </li>
          ))}
        </ul>
        <Link
          to="/insurance"
          className="link-rule mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-deep"
        >
          See all accepted plans
          <Icon name="arrow" size={15} aria-hidden="true" />
        </Link>

        {/* Quick request */}
        <h2 className="t-subtitle mt-9 text-navy">Request an appointment</h2>
        <p className="mt-2 text-sm text-body">
          Takes about three minutes. Submissions are encrypted.
        </p>
        <div className="mt-4">
          <LeadForm form={forms.book} id="mobile-book" />
        </div>

        <div className="mt-6 grid gap-2.5">
          <Button to="/services" variant="outline" size="lg" className="w-full">
            Clinical services
          </Button>
          <Button to="/get-help" variant="outline" size="lg" className="w-full">
            Get help?
          </Button>
        </div>

        <p className="mt-9 text-center text-xs leading-relaxed text-navy-400">
          {practice.legalName}
          <br />
          {practice.address.line1} {practice.address.line2},{' '}
          {practice.address.city}, {practice.address.state}{' '}
          {practice.address.zip}
          <br />
          This site is general information, not medical advice.
        </p>
      </div>
    </div>
  )
}

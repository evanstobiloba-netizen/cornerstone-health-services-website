import { Link } from 'react-router-dom'
import { practice } from '../data/site.js'
import Icon from '../components/Icon.jsx'
import LocationMap from '../components/LocationMap.jsx'
import LeadForm from '../components/LeadForm.jsx'
import { Card } from '../components/Ui.jsx'
import { forms } from '../data/site.js'

/**
 * Contact Us. Matches the PRD's combined "Contact & Book Now" screen: contact
 * details, location, and the enquiry form on one page, with the `#refer` and
 * `#providers` anchors retained for deep links.
 *
 * NOTE ON HOURS: the practice publishes no opening hours anywhere on its live
 * site, so none are invented here. Appointments are scheduled by request, which
 * is what the copy says instead.
 */
export default function Contact() {
  const form = forms.contact

  return (
    <>
      <section className="relative overflow-hidden border-b border-navy-100 bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-40 h-[30rem] w-[30rem] rounded-full bg-cyan-50 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="font-script text-4xl leading-none text-blue-deep sm:text-[2.75rem]">
              {form.script}
            </p>
            <h1 className="mt-2 text-3xl font-medium text-navy sm:text-4xl lg:text-[2.75rem]">
              {form.title}
            </h1>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-body">
              {form.lede}
            </p>
          </div>

          {/* Contact channels */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href={practice.phoneHref}
              className="flex items-start gap-3 rounded-clinical-lg border border-navy-100 bg-calm p-5 transition-colors hover:border-blue"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-clinical bg-cyan-50 text-cyan-deep">
                <Icon name="phone" size={19} />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-navy-400">
                  Phone
                </span>
                <span className="mt-1 block font-bold text-navy">
                  {practice.phoneDisplay}
                </span>
              </span>
            </a>

            <a
              href={`mailto:${practice.email}`}
              className="flex items-start gap-3 rounded-clinical-lg border border-navy-100 bg-calm p-5 transition-colors hover:border-blue"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-clinical bg-blue-50 text-blue-deep">
                <Icon name="document" size={19} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-navy-400">
                  Email
                </span>
                <span className="mt-1 block break-all font-bold text-navy">
                  {practice.email}
                </span>
              </span>
            </a>

            <div className="flex items-start gap-3 rounded-clinical-lg border border-navy-100 bg-calm p-5 sm:col-span-2 lg:col-span-1">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-clinical bg-navy-50 text-navy-600">
                <Icon name="map-pin" size={19} />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-navy-400">
                  Office
                </span>
                <address className="mt-1 not-italic font-bold leading-snug text-navy">
                  {practice.address.line1} {practice.address.line2}
                  <br />
                  {practice.address.city}, {practice.address.stateLong}{' '}
                  {practice.address.zip}
                </address>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Map + form */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14">
          <div>
            <LocationMap height="h-[20rem]" />

            <Card className="mt-6">
              <p className="font-script text-3xl leading-none text-blue-deep">
                Appointments
              </p>
              <h2 className="mt-1 text-base font-medium text-navy">
                How we schedule
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-body">
                Visits are by appointment. Send a request using the form and a
                member of our team will contact you to confirm a time that works.
                If you would rather book a slot yourself, our full availability
                is also listed on Zocdoc.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={practice.zocdocUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-clinical bg-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-600"
                >
                  Book on Zocdoc
                  <Icon name="external-link" size={15} />
                </a>
                <a
                  href={practice.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-clinical border-2 border-navy-200 px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-blue hover:text-blue-deep"
                >
                  {practice.domain}
                  <Icon name="external-link" size={15} />
                </a>
              </div>
            </Card>

            {/* PRD anchor: referrals */}
            <Card id="refer" className="mt-6 scroll-mt-32 border-l-4 border-l-cyan">
              <p className="font-script text-3xl leading-none text-blue-deep">
                For referrers
              </p>
              <h2 className="mt-1 text-base font-medium text-navy">
                Referring a patient
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-body">
                Physicians, therapists and community organisations can refer a
                patient directly. Use the{' '}
                <Link
                  to="/refer-a-loved-one"
                  className="font-semibold text-blue-deep underline underline-offset-2"
                >
                  Refer a Loved One
                </Link>{' '}
                form, or call us to discuss a case before sending it.
              </p>
            </Card>

            {/* PRD anchor: providers */}
            <Card
              id="providers"
              className="mt-6 scroll-mt-32 border-l-4 border-l-navy"
            >
              <p className="font-script text-3xl leading-none text-cyan-deep">
                Our clinicians
              </p>
              <h2 className="mt-1 text-base font-medium text-navy">
                Who you will see
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-body">
                You will be seen by a licensed psychiatric provider at
                CORNERSTONE HEALTH SERVICES INC. To protect our clinicians from
                unsolicited contact, individual biographies are shared at your
                first appointment rather than published here — but if you would
                like to know who you will be seeing before you book, just ask.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-navy-400">
                Credentials and licence numbers can be verified with the issuing
                board on request.
              </p>
            </Card>
          </div>

          <div>
            <LeadForm form={form} id="contact" />
          </div>
        </div>
      </section>
    </>
  )
}

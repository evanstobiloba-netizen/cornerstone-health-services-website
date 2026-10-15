import { Link } from 'react-router-dom'
import { forms, practice } from '../data/site.js'
import Icon from '../components/Icon.jsx'
import LocationMap from '../components/LocationMap.jsx'
import LeadForm from '../components/LeadForm.jsx'
import {
  Card,
  Container,
  Eyebrow,
  IconBadge,
  Section,
  SectionHeading,
} from '../components/Ui.jsx'

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
      <Section tone="calm" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-56 h-[42rem] w-[42rem] rounded-full bg-brand-bloom blur-3xl"
        />
        <Container className="relative">
          <SectionHeading
            as="h1"
            size="xl"
            eyebrow={form.script}
            title={form.title}
            body={form.lede}
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href={practice.phoneHref}
              className="flex items-start gap-4 rounded-clinical-lg bg-white p-5 shadow-clinical ring-1 ring-navy-100/70 transition hover:-translate-y-0.5 hover:shadow-clinical-lg"
            >
              <IconBadge name="phone" tone="cyan" />
              <span>
                <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-navy-400">
                  Phone
                </span>
                <span className="mt-1 block font-semibold text-navy">
                  {practice.phoneDisplay}
                </span>
              </span>
            </a>

            <a
              href={`mailto:${practice.email}`}
              className="flex items-start gap-4 rounded-clinical-lg bg-white p-5 shadow-clinical ring-1 ring-navy-100/70 transition hover:-translate-y-0.5 hover:shadow-clinical-lg"
            >
              <IconBadge name="document" tone="blue" />
              <span className="min-w-0">
                <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-navy-400">
                  Email
                </span>
                <span className="mt-1 block break-all font-semibold text-navy">
                  {practice.email}
                </span>
              </span>
            </a>

            <div className="flex items-start gap-4 rounded-clinical-lg bg-white p-5 shadow-clinical ring-1 ring-navy-100/70 sm:col-span-2 lg:col-span-1">
              <IconBadge name="map-pin" tone="navy" />
              <span>
                <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-navy-400">
                  Office
                </span>
                <address className="mt-1 not-italic font-semibold leading-snug text-navy">
                  {practice.address.line1} {practice.address.line2}
                  <br />
                  {practice.address.city}, {practice.address.stateLong}{' '}
                  {practice.address.zip}
                </address>
              </span>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14">
            <div>
              <LocationMap height="h-[20rem]" />

              <Card className="mt-6">
                <Eyebrow>Appointments</Eyebrow>
                <h2 className="mt-3 font-sans text-base font-semibold text-navy">
                  How we schedule
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  Visits are by appointment. Send a request using the form and a
                  member of our team will contact you to confirm a time that
                  works. If you would rather book a slot yourself, our full
                  availability is also listed on Zocdoc.
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <a
                    href={practice.zocdocUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-600"
                  >
                    Book on Zocdoc
                    <Icon name="external-link" size={15} />
                  </a>
                  <a
                    href={practice.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-full border border-navy-200 px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-blue-deep hover:text-blue-deep"
                  >
                    {practice.domain}
                    <Icon name="external-link" size={15} />
                  </a>
                </div>
              </Card>

              {/* PRD anchor: referrals */}
              <Card id="refer" className="mt-6 scroll-mt-32">
                <Eyebrow>For referrers</Eyebrow>
                <h2 className="mt-3 font-sans text-base font-semibold text-navy">
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
              <Card id="providers" className="mt-6 scroll-mt-32">
                <Eyebrow>Our clinicians</Eyebrow>
                <h2 className="mt-3 font-sans text-base font-semibold text-navy">
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
                  Credentials and licence numbers can be verified with the
                  issuing board on request.
                </p>
              </Card>
            </div>

            <div>
              <LeadForm form={form} id="contact" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

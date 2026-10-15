import { Link } from 'react-router-dom'
import { forms, practice } from '../data/site.js'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import LocationMap from '../components/LocationMap.jsx'
import LeadForm from '../components/LeadForm.jsx'
import {
  Container,
  IconBadge,
  Kicker,
  Section,
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
      <Section tone="white" rule>
        <Container>
          <Kicker>{form.script}</Kicker>
          <h1 className="t-display mt-6 max-w-4xl text-navy">{form.title}</h1>
          <p className="t-lead mt-7 max-w-2xl">{form.lede}</p>

          <div className="mt-14 grid border-t border-[rgba(14,15,59,0.12)] sm:grid-cols-2 lg:grid-cols-3">
            <a
              href={practice.phoneHref}
              className="flex items-start gap-4 border-b border-[rgba(14,15,59,0.12)] py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 lg:border-b-0 lg:border-r lg:pr-7"
            >
              <IconBadge name="phone" tone="cyan" />
              <span>
                <span className="t-kicker block text-navy-400">Phone</span>
                <span className="mt-2 block font-medium text-navy">
                  {practice.phoneDisplay}
                </span>
              </span>
            </a>

            <a
              href={`mailto:${practice.email}`}
              className="flex items-start gap-4 border-b border-[rgba(14,15,59,0.12)] py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 lg:border-b-0 lg:border-r lg:px-7"
            >
              <IconBadge name="document" tone="blue" />
              <span className="min-w-0">
                <span className="t-kicker block text-navy-400">Email</span>
                <span className="mt-2 block break-all font-medium text-navy">
                  {practice.email}
                </span>
              </span>
            </a>

            <div className="flex items-start gap-4 border-b border-[rgba(14,15,59,0.12)] py-6 sm:col-span-2 lg:col-span-1 lg:border-b-0 lg:pl-7">
              <IconBadge name="map-pin" tone="navy" />
              <span>
                <span className="t-kicker block text-navy-400">Office</span>
                <address className="mt-2 not-italic font-medium leading-snug text-navy">
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

      <Section tone="calm" rule>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14">
            <div>
              <LocationMap height="h-[20rem]" />

              <div id="appointments" className="mt-10 scroll-mt-32 border-t-2 border-navy pt-6">
                <Kicker>Appointments</Kicker>
                <h2 className="t-subtitle mt-5 text-navy">How we schedule</h2>
                <p className="mt-4 text-[0.97rem] leading-relaxed text-body">
                  Visits are by appointment. Send a request using the form and a
                  member of our team will contact you to confirm a time that
                  works. If you would rather book a slot yourself, our full
                  availability is also listed on Zocdoc.
                </p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  <Button
                    href={practice.zocdocUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    variant="primary"
                    size="sm"
                    icon="external-link"
                  >
                    Book on Zocdoc
                  </Button>
                  <Button
                    href={practice.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    variant="outline"
                    size="sm"
                    icon="external-link"
                  >
                    {practice.domain}
                  </Button>
                </div>
              </div>

              {/* PRD anchor: referrals */}
              <div id="refer" className="mt-10 scroll-mt-32 border-t border-[rgba(14,15,59,0.12)] pt-6">
                <Kicker>For referrers</Kicker>
                <h2 className="t-subtitle mt-5 text-navy">
                  Referring a patient
                </h2>
                <p className="mt-4 text-[0.97rem] leading-relaxed text-body">
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
              </div>

              {/* PRD anchor: providers */}
              <div id="providers" className="mt-10 scroll-mt-32 border-t border-[rgba(14,15,59,0.12)] pt-6">
                <Kicker>Our clinicians</Kicker>
                <h2 className="t-subtitle mt-5 text-navy">Who you will see</h2>
                <p className="mt-4 text-[0.97rem] leading-relaxed text-body">
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
              </div>
            </div>

            <div className="lg:pt-1">
              <LeadForm form={form} id="contact" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

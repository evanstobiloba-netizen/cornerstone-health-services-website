import { Link } from 'react-router-dom'
import { practice } from '../data/site.js'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import { Card, SectionHeading } from '../components/Ui.jsx'

/**
 * Privacy Policy.
 *
 * IMPORTANT: the authoritative legal policy belongs to the practice and is
 * published on their live site. We deliberately do NOT reproduce or invent
 * legal text here — doing so would risk stating terms the practice has not
 * agreed to. This page summarises the plain facts about THIS website and
 * links to the canonical policy.
 */
export default function Privacy() {
  return (
    <>
      <section className="border-b border-navy-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-20">
          <SectionHeading
            as="h1"
            script="Your information"
            title="Privacy Policy"
            body="How this website handles your information, and where to read the practice's full policy."
          />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-20">
        <Card className="border-l-4 border-l-cyan">
          <h2 className="flex items-center gap-2 font-medium text-navy">
            <Icon name="external-link" size={18} className="text-cyan-deep" />
            The authoritative policy
          </h2>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-body">
            The full privacy policy for {practice.legalName} is published on the
            practice&rsquo;s main website. That document is the one that governs
            how your information is collected, used and protected — please read
            it there rather than relying on this summary.
          </p>
          <Button
            href={practice.privacyUrl}
            target="_blank"
            rel="noreferrer noopener"
            size="md"
            icon="external-link"
            className="mt-5"
          >
            Read the full policy on {practice.domain}
          </Button>
        </Card>

        <div className="mt-8 space-y-6">
          <section>
            <h2 className="text-lg font-medium text-navy">
              What this website collects
            </h2>
            <p className="mt-2 text-[0.98rem] leading-relaxed text-body">
              This site collects information only when you choose to type it into
              one of the contact or appointment forms — such as your name, email
              address, phone number, insurance plan and a short message. Nothing
              is collected in the background while you browse.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-navy">
              How form submissions are handled
            </h2>
            <p className="mt-2 text-[0.98rem] leading-relaxed text-body">
              Form submissions are sent over an encrypted (HTTPS) connection and
              are used only to respond to your enquiry and arrange care. Please
              do not use the forms to send detailed clinical information — we
              have deliberately worded them for scheduling and logistics so that
              you do not need to disclose medical detail in a web form.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-navy">
              Medical confidentiality
            </h2>
            <p className="mt-2 text-[0.98rem] leading-relaxed text-body">
              Once you become a patient, the information you share in your care
              is protected by HIPAA and by professional confidentiality rules.
              That protection is separate from, and stronger than, anything a
              website can offer.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-navy">Third-party links</h2>
            <p className="mt-2 text-[0.98rem] leading-relaxed text-body">
              Pages here link to outside organisations — for example the{' '}
              <Link
                to="/resources"
                className="font-semibold text-blue-deep underline underline-offset-2"
              >
                Resources page
              </Link>{' '}
              and{' '}
              <a
                href={practice.zocdocUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold text-blue-deep underline underline-offset-2"
              >
                Zocdoc
              </a>
              . Those sites have their own privacy policies, which we do not
              control.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-navy">Questions</h2>
            <p className="mt-2 text-[0.98rem] leading-relaxed text-body">
              If you have a question about your information, contact us on{' '}
              <a
                href={practice.phoneHref}
                className="font-semibold text-blue-deep underline underline-offset-2"
              >
                {practice.phoneDisplay}
              </a>{' '}
              or at{' '}
              <a
                href={`mailto:${practice.email}`}
                className="font-semibold text-blue-deep underline underline-offset-2"
              >
                {practice.email}
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </>
  )
}

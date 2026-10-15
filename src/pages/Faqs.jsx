import { crisis, faqs, practice } from '../data/site.js'
import Accordion from '../components/Accordion.jsx'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import { Card, SectionHeading } from '../components/Ui.jsx'

export default function Faqs() {
  return (
    <>
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
            script="Questions"
            title="Frequently Asked Questions"
            body="Answers to the things people ask us most. If your question is not here, please just ask."
          />
        </div>
      </section>

      <section className="relative overflow-hidden bg-mesh-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-cyan-50/70 blur-[120px]"
        />
        <div className="relative mx-auto max-w-4xl px-4 py-20 sm:py-24 lg:px-8">
        <Accordion items={faqs} />

        <Card className="mt-10 border-l-4 border-l-cyan">
          <p className="font-script text-3xl leading-none text-blue-deep">
            Still have a question?
          </p>
          <h2 className="mt-1 text-base font-medium text-navy">
            We are happy to answer it
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-body">
            Call us on{' '}
            <a
              href={practice.phoneHref}
              className="font-semibold text-blue-deep underline underline-offset-2"
            >
              {practice.phoneDisplay}
            </a>
            , email{' '}
            <a
              href={`mailto:${practice.email}`}
              className="font-semibold text-blue-deep underline underline-offset-2"
            >
              {practice.email}
            </a>
            , or send a message and we will get back to you.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button to="/contact" size="md" icon="chat">
              Contact us
            </Button>
            <Button to="/book" variant="outline" size="md" icon="calendar">
              Book Now
            </Button>
          </div>
        </Card>

        <div className="mt-8 rounded-clinical-lg border border-coral/40 bg-coral-50 p-5">
          <p className="flex items-center gap-2 font-bold text-coral-deep">
            <Icon name="alert-triangle" size={17} />
            If you need help right now
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-coral-deep">
            Call or text{' '}
            <a href={crisis.lifelineHref} className="font-bold underline underline-offset-2">
              {crisis.lifeline}
            </a>{' '}
            for the Suicide &amp; Crisis Lifeline, free and confidential, 24/7.
            For a life-threatening emergency, call{' '}
            <a href="tel:911" className="font-bold underline underline-offset-2">
              911
            </a>
            .
          </p>
        </div>
      </section>
    </>
  )
}

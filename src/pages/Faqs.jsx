import { crisis, faqs, practice } from '../data/site.js'
import Accordion from '../components/Accordion.jsx'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import { Container, Kicker, Section } from '../components/Ui.jsx'

export default function Faqs() {
  return (
    <>
      <Section tone="white" rule>
        <Container>
          <Kicker>Questions</Kicker>
          <h1 className="t-display mt-6 max-w-4xl text-navy">
            Frequently Asked Questions
          </h1>
          <p className="t-lead mt-7 max-w-2xl">
            Answers to the things people ask us most. If your question is not
            here, please just ask.
          </p>
        </Container>
      </Section>

      <Section tone="calm" rule>
        <Container>
          <Accordion items={faqs} />

          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="border-t-2 border-navy pt-6">
              <Kicker>Still have a question?</Kicker>
              <h2 className="t-subtitle mt-5 text-navy">
                We are happy to answer it
              </h2>
              <p className="mt-4 text-[0.97rem] leading-relaxed text-body">
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
                  className="break-all font-semibold text-blue-deep underline underline-offset-2"
                >
                  {practice.email}
                </a>
                , or send a message and we will get back to you.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button to="/contact" size="md" icon="chat">
                  Contact us
                </Button>
                <Button to="/book" variant="outline" size="md" icon="calendar">
                  Book Now
                </Button>
              </div>
            </div>

            <div className="border-t-2 border-coral pt-6">
              <p className="t-kicker flex items-center gap-2 text-coral-deep">
                <Icon name="alert-triangle" size={15} aria-hidden="true" />
                If you need help right now
              </p>
              <p className="mt-4 text-[0.97rem] leading-relaxed text-coral-deep">
                Call or text{' '}
                <a
                  href={crisis.lifelineHref}
                  className="font-bold underline underline-offset-2"
                >
                  {crisis.lifeline}
                </a>{' '}
                for the Suicide &amp; Crisis Lifeline, free and confidential,
                24/7. For a life-threatening emergency, call{' '}
                <a
                  href="tel:911"
                  className="font-bold underline underline-offset-2"
                >
                  911
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

import FormPage, { InfoCard } from './FormPage.jsx'
import { forms } from '../data/site.js'

export default function Volunteer() {
  return (
    <FormPage
      form={forms.volunteer}
      aside={
        <InfoCard script="Giving your time" title="Ways to help">
          Our volunteers support the practice in non-clinical ways — community
          outreach, event help, and sharing mental-health resources with the
          people who need them. Tell us what you are interested in and how much
          time you can offer, and we will find the right fit.
        </InfoCard>
      }
    />
  )
}

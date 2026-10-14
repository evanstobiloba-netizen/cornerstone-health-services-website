import FormPage, { InfoCard } from './FormPage.jsx'
import { forms } from '../data/site.js'

export default function Share() {
  return (
    <FormPage
      form={forms.share}
      aside={
        <InfoCard script="How your story is used" title="You stay in control">
          Nothing is published without your explicit permission, and we will not
          publish your full name unless you ask us to. Please avoid naming other
          people, and leave out details about your clinical care — we are only
          looking for your experience of the practice.
        </InfoCard>
      }
    />
  )
}

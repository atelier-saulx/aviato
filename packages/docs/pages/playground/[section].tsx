import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { Conditional } from '@aviato/ui'

const Section = () => {
  const router = useRouter()
  const { section = '' } = router.query

  const mappedSection = {
    inputs: dynamic(() => import('./sections/inputs')),
  }

  const TargetSection = (mappedSection as any)[section as string]
  const sectionExists = Boolean(TargetSection)

  return (
    <>
      <Conditional test={sectionExists}>
        <TargetSection />
      </Conditional>
      <Conditional test={!sectionExists}>
        <div>This section does not exist</div>
      </Conditional>
    </>
  )
}

export default Section

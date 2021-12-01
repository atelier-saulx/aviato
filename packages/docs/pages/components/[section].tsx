import { FunctionComponent } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { styled } from '@aviato/ui'

const WrapperDiv = styled('div', {
  padding: '20px',
})

const Section: FunctionComponent = () => {
  const router = useRouter()
  const { section = '' } = router.query

  if (!section) {
    return null
  }

  if (Array.isArray(section)) {
    return <div>This section does not exist</div>
  }

  const matchingComponent = dynamic(() => import(`./sections/${section}`))

  const TargetSection = matchingComponent
  if (!TargetSection) {
    return <WrapperDiv>This section does not exist.</WrapperDiv>
  }

  return <TargetSection />
}

export default Section

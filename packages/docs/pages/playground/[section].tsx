import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'

const Section = () => {
  const router = useRouter()
  const { section = '' } = router.query

  if (Array.isArray(section)) {
    return <div>This section does not exist</div>
  }

  type SectionMap = {
    [key: string]: FunctionComponent
  }

  const mappedSection: SectionMap = {
    menu: dynamic(() => import('./sections/menu')) as FunctionComponent,
    buttons: dynamic(() => import('./sections/buttons')) as FunctionComponent,
    text: dynamic(() => import('./sections/text')) as FunctionComponent,
    icons: dynamic(() => import('./sections/icons')) as FunctionComponent,
    display: dynamic(() => import('./sections/display')) as FunctionComponent,
  }

  const TargetSection = mappedSection[section]
  if (!TargetSection) {
    return <div>This section does not exist</div>
  }

  return (
    <>
      <TargetSection />
    </>
  )
}

export default Section

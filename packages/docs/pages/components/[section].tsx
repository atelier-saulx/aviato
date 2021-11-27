import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'

const Section = () => {
  const router = useRouter()
  const { section = '' } = router.query

  if (Array.isArray(section)) {
    return <div>This section does not exist</div>
  }

  const matchingComponent = dynamic(() => import(`./sections/${section}`))

  const TargetSection = matchingComponent
  if (!TargetSection) {
    return (
      <div
        style={{
          padding: 20,
        }}
      >
        This section does not exist.
      </div>
    )
  }

  return (
    <>
      <TargetSection />
    </>
  )
}

export default Section

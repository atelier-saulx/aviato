import type { NextPage } from 'next'
import Link from 'next/link'

import { Title, Text } from '@based/ui-next'

const Home: NextPage = () => {
  const ExamplesLink = (
    <Link href="/examples">
      <a style={{ color: 'orange' }}>Examples</a>
    </Link>
  )

  const PlaygroundLink = (
    <Link href="/playground">
      <a style={{ color: 'orange' }}>Playground</a>
    </Link>
  )

  return (
    <div>
      <div
        style={{
          padding: '20px',
        }}
      >
        <Title
          fontWeight="bold"
          style={{
            marginBottom: '20px',
          }}
        >
          Introduction to Aviato-UI
        </Title>

        <Text>
          Aviato-UI is a component-suite to enrich your web applications, or to
          create CMS/DMS interfaces.
        </Text>

        <div style={{ marginTop: '30px' }}>
          <p>To see our component suite, go to {ExamplesLink}.</p>
          <p style={{ marginTop: '10px' }}>
            To play around with the components, go to {PlaygroundLink}.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home

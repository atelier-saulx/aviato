import type { NextPage } from 'next'
import Link from 'next/link'

import { Title, Text } from '@aviato/ui'

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
        <div
          style={{
            paddingBottom: 20,
          }}
        >
          <Title fontWeight="bold">Introduction to Aviato-UI</Title>
        </div>

        <Text>
          Aviato-UI is a component-suite to enrich your web applications, or to
          create CMS/DMS interfaces.
        </Text>

        <div style={{ marginTop: '20px' }}>
          <Text>To see our component suite, go to {ExamplesLink}.</Text>
          <Text>
            To play around with the components, go to {PlaygroundLink}.
          </Text>
        </div>
      </div>
    </div>
  )
}

export default Home

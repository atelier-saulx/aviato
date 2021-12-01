import type { NextPage } from 'next'

import { Title, Text } from '@aviato/ui'

const Home: NextPage = () => {
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
          <Title weight="Bold">Introduction to Aviato-UI</Title>
        </div>

        <Text>
          Aviato-UI is a component-suite to enrich your web applications, or to
          create CMS/DMS interfaces.
        </Text>
      </div>
    </div>
  )
}

export default Home

import type { NextPage } from 'next'
import { styled, Page } from '@aviato/ui'

import { NextTitle, NextText } from '../components'

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
})

const Row = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'no-wrap',
})

const BigSpacer = styled('div', {
  width: '100%',
  height: 20,
})

const Home: NextPage = () => {
  const Line = ({ children }: any) => {
    return (
      <Row>
        <NextText>{children}</NextText>
      </Row>
    )
  }

  return (
    <Page>
      <NextTitle size="small">Introduction</NextTitle>

      <NextText>
        Aviato is UI component library with a focus on customization and
        developer experience (DX).
        <br />
        You can use these components either as the base layer of your
        application, or adopt them incrementally.
      </NextText>

      <NextText>
        Aviato is meant to be used to facilitate building high-quality CMS or
        DMS interfaces and web applications.
      </NextText>

      <BigSpacer />

      <Container>
        <Row>
          <NextText weight="bold" size="large">
            Features
          </NextText>
        </Row>
        <Line>📦 - A set of high-quality React components out of the box.</Line>
        <Line>🛡 - Written in TypeScript with predictable static types.</Line>
        <Line>🎨 - Powerful theme customization.</Line>
        <Line>🪝 - Contains a comprehensive collection of basic Hooks.</Line>
      </Container>
    </Page>
  )
}

export default Home

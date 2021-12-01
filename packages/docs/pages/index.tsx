import type { NextPage } from 'next'
import { styled, Text } from '@aviato/ui'

import { Page, NextTitle, NextText } from '../components'

const Wrapper = styled('div', {
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
        <Text>{children}</Text>
      </Row>
    )
  }

  return (
    <Page>
      <NextTitle weight="Bold">Introduction to Aviato-UI</NextTitle>

      <NextText>
        Aviato is UI component library with a focus on customization and
        developer experience (DX).
      </NextText>

      <NextText>
        You can use these components either as the base layer of your
        application, or adopt them incrementally.
      </NextText>

      <NextText>
        The goal with Aviato is to facilitate building high-quality CMS or DMS
        interfaces and web apps.
      </NextText>

      <BigSpacer />
      <Wrapper>
        <Row>
          <NextText weight="Bold">✨ Features ✨</NextText>
        </Row>
        <Line>📦 - A set of high-quality React components out of the box.</Line>
        <Line>🛡 - Written in TypeScript with predictable static types.</Line>
        <Line>🎨 - Powerful theme customization.</Line>
        <Line>🪝 - Contains a comprehensive collection of basic Hooks.</Line>
      </Wrapper>
    </Page>
  )
}

export default Home

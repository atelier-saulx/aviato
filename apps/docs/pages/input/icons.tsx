import { Page, styled, icons, useHasLoaded, CodeSnippet } from '@aviato/ui'

import { NextTitle, NextText } from '../../components'

const GridItem = styled('div', {
  padding: 20,
  minWidth: 20,
  minHeight: 20,
})

const Item = styled('div', {
  display: 'flex',
  alignItems: 'center',
  paddingBottom: 20,
})

const CustomSpacer = styled('div', {
  marginLeft: 20,
})

const CodeToDisplay = `
import { IconPlus, icons } from '@aviato/ui'

const TestComponent = () => {
  return <IconPlus />
}

Object.keys(icons).forEach((iconName) => {
  console.log('Icon name: ', iconName)
})

const OtherTestComponent = () => {
  const { IconPlus } = icons

  return <IconPlus />
}
`

const IconsPage = () => {
  const hasLoaded = useHasLoaded()
  if (!hasLoaded) {
    return null
  }

  const mappedIconNames = Object.keys(icons).map((keyName, index) => {
    const TargetIcon = icons[keyName]

    return (
      <Item key={`Icons${index}`}>
        <TargetIcon />
        <CustomSpacer />
        <p>{keyName}</p>
      </Item>
    )
  })

  return (
    <Page>
      <NextTitle>Icons</NextTitle>

      <NextText color="Secondary">
        Aviato provides multiple ways to use icons in your project
      </NextText>

      <CodeSnippet language="tsx">{CodeToDisplay}</CodeSnippet>

      <GridItem>
        <>{mappedIconNames}</>
      </GridItem>
    </Page>
  )
}

export default IconsPage

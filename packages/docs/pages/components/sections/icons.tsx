import { styled } from '@aviato/ui'
import { icons, Column, Row } from '@aviato/ui'
import { NextTitle, NextText } from '../../../components'

import { Page, ShowcaseComponent } from '../../../components'

const BigSpacer = styled('div', {
  width: '100%',
  height: 20,
})

const Spacer = styled('div', {
  width: 6,
  height: 6,
})

const capitalize = (input: string) => {
  return input.charAt(0).toUpperCase() + input.slice(1)
}

const IconButtonsPage = () => {
  const mappedIcons = Object.values(icons).map((Icon, index) => (
    <Icon key={`Icons-${index}`} />
  ))

  const getMappedIcons = (color: string) => {
    const mappedIcons = Object.values(icons).map((Icon, index) => (
      <Icon key={`Icons-${index}`} fill={color} width="20px" height="20px" />
    ))

    return mappedIcons
  }

  const ShowIcons = ({ color }: { color: string }) => {
    return (
      <>
        <Column>
          <Row>{getMappedIcons(color)}</Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle weight="Bold" size="ExtraLarge">
        Icons
      </NextTitle>

      <ShowcaseComponent>
        <ShowIcons color="white" />
      </ShowcaseComponent>

      <ShowcaseComponent>
        <ShowIcons color="black" />
      </ShowcaseComponent>
    </Page>
  )
}

export default IconButtonsPage

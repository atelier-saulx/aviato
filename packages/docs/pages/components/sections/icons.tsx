import { styled } from '@aviato/ui'
import { icons, Column, Row } from '@aviato/ui'
import { NextTitle, NextText } from '../../../components'

import { Page, ShowcaseComponent } from '../../../components'

const Wrapper = styled('div', {
  width: 20,
  height: 20,
  margin: 6,
})

const IconButtonsPage = () => {
  const getMappedIcons = (color: string) => {
    const mappedIcons = Object.values(icons).map((Icon, index) => (
      <Wrapper css={{ color }} key={`IconWrapper-${index}`}>
        <Icon key={`Icon-${index}`} width="inherit" height="inherit" />
      </Wrapper>
    ))

    return mappedIcons
  }

  const ShowIcons = ({ color }: { color: string }) => {
    return (
      <>
        <Column>
          <Row css={{ flexWrap: 'wrap', maxWidth: '200px' }}>
            {getMappedIcons(color)}
          </Row>
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
        <ShowIcons color="black" />
      </ShowcaseComponent>

      <ShowcaseComponent>
        <ShowIcons color="red" />
      </ShowcaseComponent>
    </Page>
  )
}

export default IconButtonsPage

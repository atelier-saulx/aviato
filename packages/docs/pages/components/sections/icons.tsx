import { icons, Column, Row } from '@aviato/ui'
import { NextTitle } from '../../../components'

import { Page, ShowcaseComponent } from '../../../components'

const IconButtonsPage = () => {
  const getMappedIcons = (color: string) => {
    const mappedIcons = Object.values(icons).map((Icon, index) => (
      <Icon key={`Icons-${index}`} fill={color} width="24px" height="24px" />
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
        <ShowIcons color="red" />
      </ShowcaseComponent>
    </Page>
  )
}

export default IconButtonsPage

import { Column, Row, Page } from '@aviato/ui'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const ContextMenuPage = () => {
  const ShowContextMenu = () => {
    return (
      <>
        <Column>
          <Row>Context Menu</Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle>Context Menu</NextTitle>

      <NextText color="Secondary">
        This component can be used anywhere to prompt a menu near the area where
        you click a select or button component.
      </NextText>

      <ShowcaseComponent background="transparent">
        <ShowContextMenu />
      </ShowcaseComponent>
    </Page>
  )
}

export default ContextMenuPage

import { ContextMenu, ContextItem, Column, Row, Page } from '@aviato/ui'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const ContextMenuPage = () => {
  const ShowContextMenu = () => {
    return (
      <>
        <Column>
          <Row>
            <ContextMenu>
              <ContextItem>Test 1</ContextItem>
              <ContextItem>Test 2</ContextItem>
              <ContextItem>Test 3</ContextItem>
            </ContextMenu>
          </Row>
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

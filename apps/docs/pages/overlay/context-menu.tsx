import {
  ContextMenu,
  ContextItem,
  ContextToggle,
  Column,
  Row,
  Page,
  styled,
} from '@aviato/ui'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const BigSpacer = styled('div', {
  width: '100%',
  height: 20,
})

const ContextMenuPage = () => {
  const ShowContextMenu = () => {
    return (
      <>
        <Column>
          <Row>
            <ContextMenu>
              <ContextItem>Test 1</ContextItem>
              <ContextItem>Test 2</ContextItem>
              <ContextToggle>Test 3</ContextToggle>
            </ContextMenu>
          </Row>

          <BigSpacer />

          <Row>
            <ContextMenu>
              <ContextItem>Floop 1</ContextItem>
              <ContextItem>Floop 2</ContextItem>
              <ContextToggle>Floop 3</ContextToggle>
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

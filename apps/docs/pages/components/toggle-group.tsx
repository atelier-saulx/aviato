import { Column, Row, Page, ToggleGroup, ToggleItem } from '@aviato/ui'
import { log } from '@aviato/utils'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const ToggleGroupPage = () => {
  const ShowToggleGroup = () => {
    return (
      <>
        <Column>
          <Row>
            <ToggleGroup
              defaultValue="first"
              onValueChange={(value) => {
                log.global.debug('ToggleGroup change: ', { value })
              }}
            >
              <ToggleItem value="first">First</ToggleItem>
              <ToggleItem value="second">Second</ToggleItem>
              <ToggleItem value="third">Third</ToggleItem>
              <ToggleItem value="fourth">Fourth</ToggleItem>
            </ToggleGroup>
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle>Toggle Group</NextTitle>

      <NextText color="Secondary">
        A set of two-state buttons that can be toggled on or off.
      </NextText>

      <ShowcaseComponent background="transparent">
        <ShowToggleGroup />
      </ShowcaseComponent>
    </Page>
  )
}

export default ToggleGroupPage

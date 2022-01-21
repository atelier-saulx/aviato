import { Column, Row, Page, ToggleGroup } from '@aviato/ui'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const ToggleGroupPage = () => {
  const ShowToggleGroup = () => {
    return (
      <>
        <Column>
          <Row>
            <ToggleGroup />
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

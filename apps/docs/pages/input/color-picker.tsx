import { Column, Row, Page } from '@aviato/ui'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const ColorPickerPage = () => {
  const ShowColorPicker = () => {
    return (
      <>
        <Column>
          <Row>ColorPicker</Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle>ColorPicker</NextTitle>

      <NextText color="Secondary">Capture color data from user.</NextText>

      <ShowcaseComponent background="transparent">
        <ShowColorPicker />
      </ShowcaseComponent>
    </Page>
  )
}

export default ColorPickerPage

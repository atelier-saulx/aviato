import { Column, Row, Page } from '@aviato/ui'

import { ShowcaseHeader, ShowcaseComponent } from '../../components'

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
      <ShowcaseHeader
        title="ColorPicker"
        description={`
          Capture color data from user.
        `}
      />

      <ShowcaseComponent background="transparent">
        <ShowColorPicker />
      </ShowcaseComponent>
    </Page>
  )
}

export default ColorPickerPage

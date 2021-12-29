import { Column, Row, Slider, Page } from '@aviato/ui'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const SliderPage = () => {
  const ShowSlider = () => {
    return (
      <>
        <Column>
          <Row>
            <Slider />
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle weight="Bold" size="ExtraLarge">
        Slider
      </NextTitle>

      <NextText size="Medium" color="Secondary">
        Sliders allow users to make selections from a range of values.
      </NextText>

      <ShowcaseComponent background="transparent">
        <ShowSlider />
      </ShowcaseComponent>
    </Page>
  )
}

export default SliderPage

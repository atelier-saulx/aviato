import { Column, Row, Slider, Page, styled } from '@aviato/ui'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const BigSpacer = styled('div', {
  width: '100%',
  height: 20,
})

const SliderPage = () => {
  const ShowSlider = () => {
    return (
      <>
        <Column>
          <Row css={{}}>
            <Slider />
          </Row>

          <BigSpacer />

          <Row css={{}}>
            <Slider
              marks={[
                { value: 20, label: '20%' },
                { value: 50, label: '50%' },
                { value: 75, label: '75%' },
              ]}
            />
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

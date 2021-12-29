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
        <Column css={{ width: '90%' }}>
          <Row css={{ width: '90%' }}>
            <Slider />
          </Row>

          <BigSpacer />

          <Row css={{ width: '90%' }}>
            <Slider
              marks={[
                { value: 0, label: '0%' },
                { value: 25, label: '25%' },
                { value: 50, label: '50%' },
                { value: 75, label: '75%' },
                { value: 100, label: '100%' },
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

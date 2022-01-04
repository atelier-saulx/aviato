import { Column, Row, Slider, Page, styled } from '@aviato/ui'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'
import { log } from '@aviato/utils'

const SmallSpacer = styled('div', {
  width: '100%',
  height: 30,
})

const BigSpacer = styled('div', {
  width: '100%',
  height: 50,
})

const SliderPage = () => {
  const simpleMarks = [
    { value: 10 },
    { value: 20 },
    { value: 30 },
    { value: 40 },
    { value: 50 },
    { value: 60 },
    { value: 70 },
    { value: 80 },
    { value: 90 },
    { value: 100 },
  ]

  const marks = [
    { value: 0, label: 'xs' },
    { value: 25, label: 'sm' },
    { value: 50, label: 'md' },
    { value: 75, label: 'lg' },
    { value: 100, label: 'xl' },
  ]

  const ShowSlider = () => {
    return (
      <>
        <Column css={{ width: '90%' }}>
          <NextText>Basic slider.</NextText>
          <Row css={{ width: '90%' }}>
            <Slider
              onChange={(value) => {
                log.global.debug('Slider change: ', { value })
              }}
            />
          </Row>

          <BigSpacer />

          <NextText>
            Clamp steps to increment of 10, do not show label when hovering.
          </NextText>
          <Row css={{ width: '90%' }}>
            <Slider step={10} showLabelOnHover={false} marks={simpleMarks} />
          </Row>

          <BigSpacer />

          <NextText>Negative values are fine (min -10, max 10).</NextText>
          <Row css={{ width: '90%' }}>
            <Slider
              defaultValue={5}
              min={-10}
              max={10}
              label={(value) => value.toFixed(1)}
            />
          </Row>

          <BigSpacer />

          <NextText>Example with percentage marks, always show label.</NextText>
          <SmallSpacer />
          <Row css={{ width: '90%' }}>
            <Slider
              showLabelOnHover={false}
              labelAlwaysVisible
              defaultValue={75}
              marks={[
                { value: 0, label: '0%' },
                { value: 25, label: '25%' },
                { value: 50, label: '50%' },
                { value: 75, label: '75%' },
                { value: 100, label: '100%' },
              ]}
            />
          </Row>

          <BigSpacer />

          <NextText>
            Example with large steps; default to 50, steps of 25.
          </NextText>
          <Row css={{ width: '90%' }}>
            <Slider
              defaultValue={50}
              step={25}
              marks={[
                { value: 0, label: 'xs' },
                { value: 25, label: 'sm' },
                { value: 50, label: 'md' },
                { value: 75, label: 'lg' },
                { value: 100, label: 'xl' },
              ]}
            />
          </Row>

          <BigSpacer />

          <NextText>Above example without smooth-dragging.</NextText>
          <Row css={{ width: '90%' }}>
            <Slider
              defaultValue={50}
              step={25}
              smoothDrag={false}
              marks={[
                { value: 0, label: 'xs' },
                { value: 25, label: 'sm' },
                { value: 50, label: 'md' },
                { value: 75, label: 'lg' },
                { value: 100, label: 'xl' },
              ]}
            />
          </Row>

          <BigSpacer />

          <NextText>Custom label format.</NextText>
          <SmallSpacer />
          <Row css={{ width: '90%' }}>
            <Slider
              label={(value) => `${value} °C`}
              labelAlwaysVisible
              defaultValue={15}
            />
          </Row>

          <BigSpacer />

          <NextText>Custom mark label setup.</NextText>
          <SmallSpacer />
          <Row css={{ width: '90%' }}>
            <Slider
              defaultValue={50}
              step={25}
              marks={marks}
              label={(value) =>
                marks.find((mark) => mark.value === value)?.label ?? ''
              }
            />
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle>Slider</NextTitle>

      <NextText color="Secondary">
        Sliders allow users to make selections from a range of values.
      </NextText>

      <ShowcaseComponent background="transparent">
        <ShowSlider />
      </ShowcaseComponent>
    </Page>
  )
}

export default SliderPage

import { log } from '@aviato/utils'
import { Column, Row, Switch, SwitchSize, Page, styled } from '@aviato/ui'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const Spacer = styled('div', {
  width: 6,
  height: 6,
})

const SwitchPage = () => {
  const ShowSwitch = ({ size }: { size: SwitchSize }) => {
    return (
      <>
        <Column>
          <Row>
            <Switch
              size={size}
              onChange={(event) => {
                log.global.debug('Switch change: ', event)
              }}
            />
            <Spacer />
            <Switch size={size} checked />
            <Spacer />
            <Switch size={size} disabled />
            <Spacer />
            <Switch size={size} disabled checked />
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle>Switch</NextTitle>

      <NextText color="Secondary">Capture boolean input from user.</NextText>

      <ShowcaseComponent background="transparent">
        <ShowSwitch size="normal" />
      </ShowcaseComponent>
    </Page>
  )
}

export default SwitchPage

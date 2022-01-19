import { Page, Tooltip } from '@aviato/ui'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const TooltipPage = () => {
  return (
    <Page>
      <NextTitle>Tooltip</NextTitle>

      <NextText color="Secondary">
        Renders tooltip at given element on mouse over or any other event
      </NextText>

      <ShowcaseComponent background="transparent">
        <Tooltip label="I'm a tooltip!">Hover me!</Tooltip>
      </ShowcaseComponent>
    </Page>
  )
}

export default TooltipPage

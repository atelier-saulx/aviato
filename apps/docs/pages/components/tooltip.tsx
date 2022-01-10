import { Page, Tooltip } from '@aviato/ui'
import { useHasLoaded } from '@aviato/hooks'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const TooltipPage = () => {
  const hasLoaded = useHasLoaded()
  if (!hasLoaded) {
    return null
  }

  return (
    <Page>
      <NextTitle>Tooltip</NextTitle>

      <NextText color="Secondary">
        Renders tooltip at given element on mouse over or any other event
      </NextText>

      <ShowcaseComponent background="transparent">
        <Tooltip content={"I'm a tooltip!"}>Hover me!</Tooltip>
      </ShowcaseComponent>
    </Page>
  )
}

export default TooltipPage

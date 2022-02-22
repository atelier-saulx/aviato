import { Button, Page, Tooltip } from '@aviato/ui'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const TooltipPage = () => {
  return (
    <Page>
      <NextTitle>Tooltip</NextTitle>

      <NextText color="Secondary">
        Renders tooltip at given element on mouse over or any other event
      </NextText>

      <ShowcaseComponent
        background="transparent"
        codeBlock={`
import { Tooltip } from '@aviato/ui'

<Tooltip label="I'm a tooltip!">Hover me!</Tooltip>
      `}
      >
        <Tooltip label="I'm a tooltip!">Hover me!</Tooltip>
      </ShowcaseComponent>

      <ShowcaseComponent
        background="transparent"
        codeBlock={`
import { Button, Tooltip } from '@aviato/ui'

<Tooltip label="Action Label">
  <Button>Action Button</Button>
</Tooltip>
      `}
      >
        <Tooltip label="Action Label">
          <Button>Action Button</Button>
        </Tooltip>
      </ShowcaseComponent>
    </Page>
  )
}

export default TooltipPage

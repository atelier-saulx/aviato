import { log } from '@aviato/utils'
import { Column, Row, Switch, SwitchSize, Page } from '@aviato/ui'

import { ShowcaseHeader, ShowcaseComponent } from '../../components'

const ComponentProps = `
interface SwitchProps {
  size?: SwitchSize
  checked?: boolean
  disabled?: boolean
  text?: string
  label?: string
  description?: string
  error?: string
  onChange?: (value: boolean, payload: OnSwitchChange) => void
}

type SwitchSize = 'normal' | 'large'
`

const SwitchPage = () => {
  const ShowSwitch = ({ size }: { size: SwitchSize }) => {
    return (
      <>
        <Column>
          <Row>
            <Switch
              label="This is a switch"
              description="With a description"
              text="This text is beside the switch"
              size={size}
              onChange={(value, payload) => {
                log.global.debug('Switch change: ', { value, payload })
              }}
            />
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <ShowcaseHeader
        title="Switch"
        description={`
          Capture boolean input from user.
        `}
        props={ComponentProps}
      />

      <ShowcaseComponent
        background="transparent"
        codeBlock={`
import { Switch } from '@aviato/ui'

<Switch
  label="This is a switch"
  description="With a description"
  text="This text is beside the switch"
  size={size}
  onChange={(value, payload) => {
    console.log('Switch change: ', { value, payload })
  }}
/>
        `}
      >
        <ShowSwitch size="normal" />
      </ShowcaseComponent>
    </Page>
  )
}

export default SwitchPage

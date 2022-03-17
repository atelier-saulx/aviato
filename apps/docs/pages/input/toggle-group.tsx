import {
  Column,
  Row,
  Page,
  ToggleGroup,
  ToggleItem,
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconAlignJustify,
} from '@aviato/ui'
import { log } from '@aviato/utils'

import { ShowcaseHeader, ShowcaseComponent, BigSpacer } from '../../components'

const ComponentProps = `
interface ToggleGroupProps {
  type?: 'single' | 'multiple'
  value?: string
  defaultValue: string
  children: any
  onValueChange?(value: string | string[]): void
  disabled?: boolean
}

interface ToggleItemProps {
  value: string
  disabled?: boolean
}
`

const ToggleGroupPage = () => {
  const ShowToggleGroup = () => {
    return (
      <>
        <Column>
          <Row>
            <ToggleGroup
              defaultValue="first"
              onValueChange={(value) => {
                log.global.debug('ToggleGroup change: ', { value })
              }}
            >
              <ToggleItem value="first">First</ToggleItem>
              <ToggleItem value="second">Second</ToggleItem>
              <ToggleItem value="third">Third</ToggleItem>
              <ToggleItem value="fourth">Fourth</ToggleItem>
            </ToggleGroup>
          </Row>

          <BigSpacer />

          <Row>
            <ToggleGroup defaultValue="first">
              <ToggleItem value="first">
                <IconAlignLeft />
              </ToggleItem>
              <ToggleItem value="second">
                <IconAlignCenter />
              </ToggleItem>
              <ToggleItem value="third">
                <IconAlignRight />
              </ToggleItem>
              <ToggleItem value="fourth">
                <IconAlignJustify />
              </ToggleItem>
            </ToggleGroup>
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <ShowcaseHeader
        title="Toggle Group"
        description={`
          A set of two-state buttons that can be toggled on or off.
        `}
        props={ComponentProps}
      />

      <ShowcaseComponent
        background="transparent"
        codeBlock={`
<ToggleGroup
  defaultValue="first"
  onValueChange={(value) => {
    console.log('ToggleGroup change: ', { value })
  }}
>
  <ToggleItem value="first">First</ToggleItem>
  <ToggleItem value="second">Second</ToggleItem>
  <ToggleItem value="third">Third</ToggleItem>
  <ToggleItem value="fourth">Fourth</ToggleItem>
</ToggleGroup>
        `}
      >
        <ShowToggleGroup />
      </ShowcaseComponent>
    </Page>
  )
}

export default ToggleGroupPage

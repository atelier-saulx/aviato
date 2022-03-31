import { Column, Row, Page } from '@aviato/ui'
// import { log } from '@aviato/utils'

// Select

import { ShowcaseHeader, ShowcaseComponent } from '../../components'

const ComponentProps = `
interface SelectProps extends BaseInputProps {
  value?: string
  defaultValue?: string
  data: SelectItem[]
  label?: string
  description?: string
  error?: string
  invalid?: boolean
  searchable?: boolean
  disabled?: boolean
  limit?: number
  filter?(value: string, item: SelectItem): boolean
}

interface BaseInputProps {
  value?: string
  defaultValue?: string
  component?: ElementType
  type?: InputType
  placeholder?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  variant?: InputVariant
  disabled?: boolean
  invalid?: boolean
  multiline?: boolean
  maxRows?: number
  minRows?: number
  onChange?: (value: string, payload: OnInputChange) => void
  autoFocus?: boolean
}
`

const SelectPage = () => {
  const ShowSelect = () => {
    return (
      <>
        <Column css={{ width: '100%', maxWidth: '400px' }}>
          <Row css={{ width: '100%' }}>
            {/* <Select
              placeholder="Select a thing"
              label="This is a label"
              description="This is a description"
              onChange={(value, payload) => {
                log.global.debug('Select change: ', { value, payload })
              }}
              data={[
                { value: 'flurpy', label: 'Flurpy' },
                { value: 'snark', label: 'Snark' },
                { value: 'snorkles', label: 'Snorkles' },
              ]}
            /> */}
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <ShowcaseHeader
        title="Select"
        description={`
          Select component is a component that allows users to
          pick a value from predefined options. Ideally, it should be used when
          there are more than 5 options, otherwise you might consider using
          a <RadioGroup /> instead.
        `}
        props={ComponentProps}
      />

      <ShowcaseComponent
        background="transparent"
        codeBlock={`
<Select
  placeholder="Select a thing"
  label="This is a label"
  description="This is a description"
  onChange={(value, payload) => {
    log.global.debug('Select change: ', { value, payload })
  }}
  data={[
    { value: 'flurpy', label: 'Flurpy' },
    { value: 'snark', label: 'Snark' },
    { value: 'snorkles', label: 'Snorkles' },
  ]}
/>
      `}
      >
        <ShowSelect />
      </ShowcaseComponent>
    </Page>
  )
}

export default SelectPage

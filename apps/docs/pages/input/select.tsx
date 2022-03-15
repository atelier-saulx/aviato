import { Column, Row, Select, Page } from '@aviato/ui'
import { log } from '@aviato/utils'

import { ShowcaseHeader, ShowcaseComponent } from '../../components'

const SelectPage = () => {
  const ShowSelect = () => {
    return (
      <>
        <Column css={{ width: '100%', maxWidth: '400px' }}>
          <Row css={{ width: '100%' }}>
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
      />

      <ShowcaseComponent background="transparent">
        <ShowSelect />
      </ShowcaseComponent>
    </Page>
  )
}

export default SelectPage

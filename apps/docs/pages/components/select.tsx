import { Column, Row, Select, Page } from '@aviato/ui'
import { log } from '@aviato/utils'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const SelectPage = () => {
  const ShowSelect = () => {
    return (
      <>
        <Column css={{ width: '100%' }}>
          <Row css={{ width: '100%' }}>
            <Select
              placeholder="Type something here"
              onChange={(value, payload) => {
                log.global.debug('Select change: ', { value, payload })
              }}
            >
              <option value="">-- Please choose an option --</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="hamster">Hamster</option>
              <option value="parrot">Parrot</option>
              <option value="spider">Spider</option>
              <option value="goldfish">Goldfish</option>
            </Select>
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle>Select</NextTitle>

      <NextText color="Secondary">
        Select component is a component that allows users pick a value from
        predefined options. Ideally, it should be used when there are more than
        5 options, otherwise you might consider using a radio group instead.
      </NextText>

      <ShowcaseComponent background="transparent">
        <ShowSelect />
      </ShowcaseComponent>
    </Page>
  )
}

export default SelectPage

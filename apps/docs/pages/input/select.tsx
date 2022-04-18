import { Column, Page, Select, MultiSelect } from '@aviato/ui'
import { log } from '@aviato/utils'
import { ShowcaseHeader, ShowcaseComponent } from '../../components'

const ComponentProps = `
type SelectProps {
  options: (Option | Value)[],
  value?: Value,
  onChange?: (value: Value) => void,
  color?: Color,
  placeholder?: string
  filterable?: boolean,
}
`

const SelectPage = () => {
  const ShowSelect = () => {
    return (
      <>
        <Column css={{ width: '100%', maxWidth: '400px' }}>
          <Select
            css={{
              marginBottom: 32,
            }}
            // placeholder="Select a thing"
            // label="This is a label"
            // description="This is a description"
            onChange={(value) => {
              log.global.debug('Select change: ', { value })
            }}
            options={[
              { value: 'flurpy', label: 'Flurpy' },
              { value: 'snark', label: 'Snark' },
              { value: 'snorkles', label: 'Snorkles' },
            ]}
          />

          <Select
            label="Env"
            css={{
              marginBottom: 32,
            }}
            onChange={(value) => {
              log.global.debug('Select change: ', { value })
            }}
            options={[
              { value: 'flurpy', label: 'Flurpy' },
              { value: 'snark', label: 'Snark' },
              { value: 'snorkles', label: 'Snorkles' },
            ]}
          />

          <Select
            label="Env (add)"
            css={{
              marginBottom: 32,
            }}
            onChange={(value) => {
              log.global.debug('Select change: ', { value })
            }}
            value="flurpy"
            options={[
              { value: 'flurpy', label: 'Flurpy' },
              { value: 'snark', label: 'Snark' },
              { value: 'snorkles', label: 'Snorkles' },
              {
                label: 'Add item',
                divider: true,
                icon: 'IconPlus',
                onSelect: () => {
                  // eslint-disable-next-line
                  alert('Add icon')
                },
              },
            ]}
          />

          <Select
            css={{
              marginBottom: 32,
            }}
            overlay={{
              width: 300,
              position: 'right',
              variant: 'detatched',
            }}
            placeholder="Select a thing"
            onChange={(value) => {
              log.global.debug('Select change: ', { value })
            }}
            options={[
              { value: 'flurpy', label: 'Flurpy' },
              { value: 'snark', label: 'Snark' },
              { value: 'snorkles', label: 'Snorkles' },
            ]}
          />

          <Select
            css={{
              marginBottom: 32,
            }}
            overlay={{
              variant: 'detatched',
            }}
            placeholder="Select a thing"
            onChange={(value) => {
              log.global.debug('Select change: ', { value })
            }}
            options={[
              { value: 'flurpy', label: 'Flurpy' },
              { value: 'snark', label: 'Snark' },
              { value: 'snorkles', label: 'Snorkles' },
            ]}
          />

          <MultiSelect
            css={{ marginBottom: 32 }}
            filterable
            placeholder="Select many things"
            onChange={(value) => {
              console.info('Select change: ', { value })
            }}
            values={['flurpy', 'snark', 'snorkels']}
            options={[
              { value: 'flurpy', label: 'Flurpy' },
              { value: 'snark', label: 'Snark' },
              { value: 'snorkels', label: 'Snorkles' },
              { value: 'gurken', label: 'Gurken' },
              { value: 'bedroloeloe', label: 'Bedroloeloe' },
              { value: 'kakkie', label: 'Kakkie' },
              { value: 'snak', label: 'Snak' },
            ]}
          />

          <MultiSelect
            label="Hello"
            filterable="create"
            placeholder="Faka snorkles"
            onChange={(value) => {
              console.info('Select change: ', { value })
            }}
            values={['flurpy', 'snark', 'snorkels']}
            options={[
              'flurpy',
              'snark',
              'snorkels',
              'gurken',
              'bedroloeloe',
              'kakkie',
              'snak',
            ]}
          />

          <MultiSelect
            label="Hello"
            filterable="create"
            placeholder="Faka snorkles"
            onChange={(value) => {
              console.info('Select change: ', { value })
            }}
            options={['flurpy', 'snark', 'snorkels']}
          />
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
          placeholder="Pick a snurkels!"
          onChange={(value) => {
            log.global.debug('Select change: ', { value })
          }}
          options={[
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

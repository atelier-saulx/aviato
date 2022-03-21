import { Column, Page, BasedSelect, BasedOverlay } from '@aviato/ui'
import { ShowcaseHeader, ShowcaseComponent } from '../../components'

const SelectPage = () => {
  return (
    <>
      <Page>
        <ShowcaseHeader
          title="Select"
          description={`
          Select component is a component that allows users to
          pick a value from predefined options. Ideally, it should be used when
          there are more than 5 options, otherwise you might consider using
          a <RadioGroup /> instead.
        `}
          // props={ComponentProps}
        />

        <ShowcaseComponent
          background="transparent"
          codeBlock={`
<BasedSelect
  onChange={(v) => {
    console.log(v)
  }}
  border
  multi
  placeholder="Select some things"
  items={[
    {
      icon: 'time',
      value: 'on time',
    },
    {
      icon: 'date',
      value: 'too late',
    },
  ]}
  value={[{ value: 'too late' }]}
/>
      `}
        >
          <Column css={{ width: '100%', maxWidth: '400px' }}>
            <BasedSelect
              onChange={(v) => {
                console.log(v)
              }}
              border
              multi
              placeholder="Select some things"
              items={[
                {
                  icon: 'time',
                  value: 'on time',
                },
                {
                  icon: 'date',
                  value: 'too late',
                },
              ]}
              value={[{ value: 'too late' }]}
            />
          </Column>
        </ShowcaseComponent>

        <ShowcaseComponent
          background="transparent"
          codeBlock={`
<BasedSelect
  onChange={() => {}}
  border
  placeholder="Select some things"
  items={[
    {
      value: undefined,
      children: 'Clear!',
    },
    {
      value: 'on time',
    },
    {
      value: 'too late',
    },
    {
      value: 'punana',
      children: ({ isActive }) => (
        <div
          style={{
            borderRadius: '50%',
            width: 20,
            height: 20,
            background: isActive ? 'purple' : 'yellow',
          }}
        />
      ),
    },
  ]}
/>
      `}
        >
          <Column css={{ width: '100%', maxWidth: '400px' }}>
            <BasedSelect
              onChange={() => {}}
              border
              placeholder="Select some things"
              items={[
                {
                  value: undefined,
                  children: 'Clear!',
                },
                {
                  value: 'on time',
                },
                {
                  value: 'too late',
                },
                {
                  value: 'punana',
                  children: ({ isActive }) => (
                    <div
                      style={{
                        borderRadius: '50%',
                        width: 20,
                        height: 20,
                        background: isActive ? 'purple' : 'yellow',
                      }}
                    />
                  ),
                },
              ]}
            />
          </Column>
        </ShowcaseComponent>
      </Page>

      <BasedOverlay />
    </>
  )
}

export default SelectPage

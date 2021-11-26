import ShowcaseComponent, { ShowcaseComponentProps } from './showcaseComponent'

import { Title } from '@aviato/ui'

const Playground = () => {
  const components: ShowcaseComponentProps[] = [
    // {
    //   component: <Button>Button</Button>,
    //   code: '<Button>Button</Button>',
    // },
  ]

  return (
    <div
      style={{
        paddingTop: 20,
        paddingBottom: 20,
      }}
    >
      <div
        style={{
          paddingLeft: 20,
        }}
      >
        <Title fontWeight="bold">Examples</Title>
      </div>

      <div>
        {components.map((component, index) => (
          <ShowcaseComponent
            key={`ShowcaseComponent-${index}`}
            {...component}
          />
        ))}
      </div>
    </div>
  )
}

export default Playground

import { styled, Title } from '@aviato/ui'

import { NextTitle } from '../../components'
import ShowcaseComponent, { ShowcaseComponentProps } from './showcaseComponent'

const RootDiv = styled('div', {
  paddingTop: 20,
  paddingBottom: 20,
})

const Playground = () => {
  const components: ShowcaseComponentProps[] = [
    {
      component: <Title>Title</Title>,
      code: '<Title>Title</Title>',
    },
  ]

  return (
    <RootDiv>
      <NextTitle weight="Bold">Examples</NextTitle>

      <div>
        {components.map((component, index) => (
          <ShowcaseComponent
            key={`ShowcaseComponent-${index}`}
            {...component}
          />
        ))}
      </div>
    </RootDiv>
  )
}

export default Playground

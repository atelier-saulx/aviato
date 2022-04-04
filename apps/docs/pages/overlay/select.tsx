import { Page, Button, useSelect, styled } from '@aviato/ui'
import { ShowcaseHeader, ShowcaseComponent } from '../../components'

const SimpleSelect = () => {
  const [value, open] = useSelect(['x', 'y', 'z'], 'x')
  return (
    <Button css={{ marginBottom: 24 }} onClick={open}>
      Select ({value})
    </Button>
  )
}

const LabelSelect = () => {
  const [value, open] = useSelect(
    [
      { label: 'my label X', value: 'x' },
      { label: 'my label Y', value: 'y' },
    ],
    'y'
  )
  return (
    <Button css={{ marginBottom: 24 }} onClick={open}>
      Select label ({value})
    </Button>
  )
}

const LabelSelectFilter = () => {
  const x = []
  for (let i = 0; i < 200; i++) {
    x.push(i + ' my snur')
  }

  const [value, open] = useSelect(x, null, {
    filterable: true,
    position: 'right',
    css: {
      maxHeight: 300,
    },
  })

  return (
    <Button css={{ marginBottom: 24 }} onClick={open}>
      Select label filter ({value})
    </Button>
  )
}

const AnimatingLabel = styled('div', {
  animationName: 'fadeIn',
  border: '1px solid black',
  padding: 3,
  animationIterationCount: 'infinite',
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
})

const LabelSelectWithElement = () => {
  const [value, open] = useSelect(
    [
      { label: <AnimatingLabel>X for you</AnimatingLabel>, value: 'x' },
      { label: 'my label Y', value: 'y' },
    ],
    'y'
  )
  return (
    <Button css={{ marginBottom: 24 }} onClick={open}>
      Select select with element ({value})
    </Button>
  )
}

const ContextMenuPage = () => {
  return (
    <Page>
      <ShowcaseHeader
        title="Dropdown"
        description={`
          A dropdown for you!
        `}
      />
      <ShowcaseComponent background="transparent">
        <div>
          <SimpleSelect />
          <LabelSelect />
          <LabelSelectWithElement />
          <LabelSelectFilter />
        </div>
      </ShowcaseComponent>
    </Page>
  )
}

export default ContextMenuPage

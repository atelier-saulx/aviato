import { Page, Button, useSelect, useMultiSelect, styled } from '@aviato/ui'
import { ShowcaseHeader, ShowcaseComponent } from '../../components'

// deselect

const SimpleSelect = () => {
  const [value, open] = useSelect(['x', 'y', 'z'])
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

const LabelSelectFilterCreate = () => {
  const x = []
  for (let i = 0; i < 5; i++) {
    x.push(i + ' my snur')
  }

  const [value, open] = useSelect(x, null, {
    filterable: 'create',
  })
  return (
    <Button css={{ marginBottom: 24 }} onClick={open}>
      Select label filter + create ({value})
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

const MultiSelect = () => {
  const [values, open] = useMultiSelect([1, 2, 3, 4], [1, 2])
  return (
    <Button css={{ marginBottom: 24 }} onClick={open}>
      MultiSelect ({values.join(', ')})
    </Button>
  )
}

const MultiSelectFilter = () => {
  const [values, open] = useMultiSelect([1, 2, 3, 4], [1, 2], {
    filterable: true,
    placement: 'right',
  })
  return (
    <Button css={{ marginBottom: 24 }} onClick={open}>
      MultiSelect + filter ({values.join(', ')})
    </Button>
  )
}

const MultiSelectFilterLabel = () => {
  const [values, open] = useMultiSelect(
    [
      { label: 'Maarten de Winter', value: 1 },
      { label: 'Jim de Beer', value: 2 },
      { label: 'Maarten de Winter!', value: 3 },
      { label: 'Jim de Beer!', value: 4 },
    ],
    [1, 2],
    {
      filterable: true,
      placement: 'left',
    }
  )
  return (
    <Button css={{ marginBottom: 24 }} onClick={open}>
      MultiSelect + filter ({values.join(', ')})
    </Button>
  )
}

const CreateSomething = () => {
  const [values, open] = useMultiSelect(
    ['hello', 'snapje', 'snurx', 'yes'],
    ['hello'],
    {
      // also on single
      filterable: 'create',
      placement: 'left',
    }
  )
  return (
    <Button css={{ marginBottom: 24 }} onClick={open}>
      MultiSelect + create filter ({values.join(', ')})
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
          <MultiSelect />
          <MultiSelectFilter />
          <MultiSelectFilterLabel />
          <CreateSomething />
          <LabelSelectFilterCreate />
        </div>
      </ShowcaseComponent>
    </Page>
  )
}

export default ContextMenuPage

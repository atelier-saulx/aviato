import { DisplayComponent, DisplayComponentProps } from './displayComponent'

import { Title, Menu, MenuItem, MenuDivider } from '@aviato/ui'

const Playground = () => {
  const components: DisplayComponentProps[] = [
    <div
      style={{ background: 'var(--color-background)', width: '250px' }}
      key="test-1"
    >
      <Menu>
        <MenuItem title="Item 1" onClick={() => console.log('1')} />
        <MenuItem title="Item 2" onClick={() => console.log('2')} />
        <MenuDivider />
        <MenuItem title="Item Accordion">
          <div style={{ padding: 10 }}>
            <MenuItem title="Item Inner" onClick={() => console.log('Inner')} />
          </div>
        </MenuItem>
      </Menu>
    </div>,
  ]

  return (
    <div
      style={{
        paddingTop: '20px',
        paddingBottom: '20px',
      }}
    >
      <Title fontWeight="bold">Playground</Title>

      <div>
        {components.map((component, index) => (
          <DisplayComponent key={`DisplayComponent-${index}`}>
            {component}
          </DisplayComponent>
        ))}
      </div>
    </div>
  )
}

export default Playground

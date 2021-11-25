import { DisplayComponent, DisplayComponentProps } from './displayComponent'

import { Title, Menu, MenuItem, MenuDivider } from '@aviato/ui'

const Playground = () => {
  const components: DisplayComponentProps[] = [
    <>
      <div style={{ background: 'var(--color-background)', width: '220px' }}>
        <Menu>
          <MenuItem title="MenuItem 1" />
          <MenuItem title="MenuItem 2" />
          <MenuItem title="MenuItem 3" />
          <MenuDivider />
          <MenuItem title="MenuItem 4" />
          <MenuItem title="MenuItem 5" />
        </Menu>
      </div>
    </>,
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

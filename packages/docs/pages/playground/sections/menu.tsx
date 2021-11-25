import { DisplayComponent } from '../displayComponent'

import { Title, Menu, MenuItem, Divider } from '@aviato/ui'

const MenuPage = () => {
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
        <Title fontWeight="bold">Menu</Title>
      </div>

      <DisplayComponent name="Menu">
        <div style={{ background: 'var(--color-background)', width: '250px' }}>
          <Menu>
            <MenuItem title="Item 1" onClick={() => console.log('1')} />
            <MenuItem title="Item 2" onClick={() => console.log('2')} />
            <Divider />
            <MenuItem
              title="Item Accordion"
              onClick={() => console.log('Accordion')}
            >
              <MenuItem
                title="Item Inner"
                onClick={() => console.log('Inner')}
              />
            </MenuItem>
            <MenuItem title="Item Accordion">
              <MenuItem
                title="Item Inner"
                onClick={() => console.log('Inner')}
              />
            </MenuItem>
          </Menu>
        </div>
      </DisplayComponent>
    </div>
  )
}

export default MenuPage

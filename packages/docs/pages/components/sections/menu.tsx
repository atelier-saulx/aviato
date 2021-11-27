import DisplayComponent from '../displayComponent'

import { Title, Menu, MenuItem } from '@aviato/ui'
import { styled, log } from '@aviato/ui'

const StyledDiv = styled('div', {
  width: '250px',
  background: '$background',
})

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
        <StyledDiv>
          <Menu>
            <MenuItem title="Item 1" onClick={() => log.info('1')} />
            <MenuItem title="Item 2" onClick={() => log.info('2')} />
            <MenuItem
              title="Item Accordion"
              onClick={() => log.info('Accordion')}
            >
              <MenuItem title="Item Inner" onClick={() => log.info('Inner')} />
            </MenuItem>
            <MenuItem title="Item Accordion">
              <MenuItem title="Item Inner" onClick={() => log.info('Inner')} />
            </MenuItem>
          </Menu>
        </StyledDiv>
      </DisplayComponent>
    </div>
  )
}

export default MenuPage

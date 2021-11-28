import { styled } from '@aviato/ui'
import { log } from '@aviato/ui'
import { Title, Menu, MenuItem } from '@aviato/ui'

import DisplayComponent from '../displayComponent'

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
            <MenuItem
              title="Item 1"
              onClick={() => log.global.info('Item 1')}
            />
            <MenuItem
              title="Item 2"
              onClick={() => log.global.info('Item 2')}
            />
            <MenuItem
              title="Item Accordion"
              onClick={() => log.global.info('Accordion')}
            >
              <MenuItem
                title="Item Inner"
                onClick={() => log.global.info('Item Inner')}
              />
            </MenuItem>
            <MenuItem title="Item Accordion">
              <MenuItem
                title="Item Inner"
                onClick={() => log.global.info('Item Inner')}
              />
            </MenuItem>
          </Menu>
        </StyledDiv>
      </DisplayComponent>
    </div>
  )
}

export default MenuPage

import { log } from '@aviato/utils'
import { styled } from '@aviato/ui'
import { Menu, MenuItem } from '@aviato/ui'

import { ShowcaseComponent } from '../../../components'

const RootDiv = styled('div', {
  paddingTop: 20,
  paddingBottom: 20,
})

const StyledDiv = styled('div', {
  width: '250px',
  padding: '10px',
  background: '#F7F7F8',
  borderRadius: '4px',
})

const MenuPage = () => {
  return (
    <RootDiv>
      <ShowcaseComponent title="Menu">
        <StyledDiv>
          <Menu>
            <MenuItem
              title="Item Header"
              onClick={() => log.global.info('Accordion')}
              isHeader={true}
            >
              <MenuItem
                title="Item Inner"
                onClick={() => log.global.info('Item Inner')}
              />
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
      </ShowcaseComponent>

      <ShowcaseComponent title="Header, Not collapsible.">
        <StyledDiv>
          <Menu>
            <MenuItem
              title="Item Header"
              onClick={() => log.global.info('Accordion')}
              isHeader={true}
            >
              <MenuItem
                title="Content 1"
                onClick={() => log.global.info('Content 1')}
              />
              <MenuItem
                title="Content 2"
                onClick={() => log.global.info('Content 2')}
              />
            </MenuItem>
          </Menu>
        </StyledDiv>
      </ShowcaseComponent>
    </RootDiv>
  )
}

export default MenuPage

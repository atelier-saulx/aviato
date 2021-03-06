import { Page, Column, SideMenu, Menu, MenuItem, styled } from '@aviato/ui'

import { ShowcaseHeader, ShowcaseComponent, AviatoLogo } from '../../components'

const HeaderDiv = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  padding: '8px',
  paddingBottom: '20px',
  cursor: 'pointer',
  color: '$TextPrimary',
})

const SideMenuPage = () => {
  return (
    <Page>
      <ShowcaseHeader
        title="Side Menu"
        description={`
          A navigational list of primary sections combined into a single
          interactive area.
        `}
      />

      <ShowcaseComponent>
        <Column>
          <SideMenu
            css={{
              position: 'relative',
              height: 300,
              minWidth: 224,
              maxWidth: 224,
            }}
          >
            <HeaderDiv>
              <AviatoLogo />
            </HeaderDiv>

            <Menu>
              <MenuItem title="Accordion 1" startOpen>
                <MenuItem title="Menu-item 1" />
                <MenuItem title="Menu-item 2" />
                <MenuItem title="Menu-item 3" />
              </MenuItem>

              <MenuItem title="Accordion 2">
                <MenuItem title="Menu-item 1" />
                <MenuItem title="Menu-item 2" />
                <MenuItem title="Menu-item 3" />
              </MenuItem>
            </Menu>
          </SideMenu>
        </Column>
      </ShowcaseComponent>
    </Page>
  )
}

export default SideMenuPage

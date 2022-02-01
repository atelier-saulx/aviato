import { useRouter } from 'next/router'
import {
  Group,
  Header,
  styled,
  ToggleMenuButton,
  ToggleThemeButton,
} from '@aviato/ui'
import { AviatoLogo } from '../logo'

const LogoContainer = styled('div', {
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  padding: '8px',
  cursor: 'pointer',
  color: '$Primary',
  display: 'none',

  '@breakpoint1': {
    display: 'flex',
  },
})

const MenuButton = styled(ToggleMenuButton, {
  display: 'flex',

  '@breakpoint1': {
    display: 'none',
  },
})

const Container = styled('span', {
  display: 'inline-flex',
  alignSelf: 'center',
  flexShrink: 0,

  variants: {
    type: {
      start: {
        marginRight: 10,
      },
      end: {
        marginLeft: 'auto',
        paddingLeft: 10,
      },
    },
  },
})

const MainHeader = () => {
  const router = useRouter()

  function setRoute(targetRoute: string) {
    router.push({
      pathname: targetRoute,
    })
  }

  return (
    <Header>
      <Container type="start">
        <Group>
          <LogoContainer onClick={() => setRoute('/')}>
            <AviatoLogo />
          </LogoContainer>

          <MenuButton />
        </Group>
      </Container>

      <Container type="end">
        <Group>
          <ToggleThemeButton />
        </Group>
      </Container>
    </Header>
  )
}

export { MainHeader as Header }

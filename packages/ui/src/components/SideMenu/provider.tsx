import { createContext, Dispatch, SetStateAction } from 'react'

interface MenuStateContextType {
  isMenuOpen: boolean
  setIsMenuOpen?: Dispatch<SetStateAction<boolean>>
}

export const MenuStateContext = createContext<MenuStateContextType>({
  isMenuOpen: false,
  setIsMenuOpen: () => {},
})

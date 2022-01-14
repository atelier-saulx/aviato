import { createContext, Dispatch, SetStateAction, useContext } from 'react'

interface MenuStateContextType {
  isMenuOpen: boolean
  setIsMenuOpen?: Dispatch<SetStateAction<boolean>>
}

export const MenuStateContext = createContext<MenuStateContextType>({
  isMenuOpen: false,
  setIsMenuOpen: () => {},
})

export const useMenuContext: () => MenuStateContextType = () => {
  return useContext(MenuStateContext)
}

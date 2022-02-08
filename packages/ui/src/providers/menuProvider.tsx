import React, {
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'

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

export const MenuProvider: FunctionComponent = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const value = useMemo(() => ({ isMenuOpen, setIsMenuOpen }), [isMenuOpen])

  return (
    <MenuStateContext.Provider value={value}>
      {children}
    </MenuStateContext.Provider>
  )
}

MenuProvider.displayName = 'MenuProvider'

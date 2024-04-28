'use client'

import { Task, User } from '@prisma/client'
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

// type ModalProviderProps =

export type ModalData = {
  user?: User
  task?: Task
}

type ModalContextType = {
  data?: ModalData
  isOpen: boolean
  setOpen: (Modal: ReactNode, fetchData?: () => Promise<any>) => void
  setClose: () => void
}

// create context with initial values
const ModalContext = createContext<ModalContextType>({
  data: {},
  isOpen: false,
  setOpen: () => {},
  setClose: () => {},
})

const ModalProvider = ({ children }: PropsWithChildren) => {
  const [isMounted, setIsMounted] = useState(false)
  const [data, setData] = useState<ModalData>({})
  const [isOpen, setIsOpen] = useState(false)
  const [showingModal, setShowingModal] = useState<ReactNode>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const setOpen = async (Modal: ReactNode, fetchData?: () => Promise<any>) => {
    if (Modal) {
      if (fetchData) {
        setData({ ...data, ...(await fetchData()) } || {})
      }
      setShowingModal(Modal)
      setIsOpen(true)
    }
  }

  const setClose = () => {
    setIsOpen(false)
    setData({})
  }

  if (!isMounted) return null

  return (
    <ModalContext.Provider value={{ data, isOpen, setOpen, setClose }}>
      {children}
      {showingModal}
    </ModalContext.Provider>
  )
}

export default ModalProvider

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within the modal provider')
  }
  return context
}

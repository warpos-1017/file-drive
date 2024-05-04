import { PropsWithChildren } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useModal } from '@/providers/modal-provider'

type CustomModalProps = {
  title: string
  subtitle?: string
  defaultOpen?: boolean
} & PropsWithChildren

const CustomModal = ({
  children,
  title,
  subtitle,
  defaultOpen,
}: CustomModalProps) => {
  const { isOpen, setClose } = useModal()
  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
      <DialogContent className='overflow-scroll md:max-h-[700px] md:h-fit h-screen bg-card'>
        <DialogHeader className='pt-6 text-left'>
          <DialogTitle className='text-2xl font-bold'>{title}</DialogTitle>
          {!!subtitle && <DialogDescription>{subtitle}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default CustomModal

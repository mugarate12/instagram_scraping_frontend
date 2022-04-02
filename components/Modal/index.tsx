import {
  SetStateAction,
  Dispatch,
  KeyboardEvent
} from 'react'

interface Props {
  setShowModal: Dispatch<SetStateAction<boolean>>,
  children?: React.ReactNode,
  className?: string,
}

const Modal = ({ children, className, setShowModal }: Props) => {
  function closeModal(event: KeyboardEvent<HTMLDivElement>) {
    event.preventDefault()

    if (event.key === 'Escape') {
      setShowModal(false)
    }
  }

  return (
    <div 
      className={`absolute top-0 left-0 h-screen w-full bg-transparent z-20 ${className}`}
      onKeyDown={(event) => closeModal(event)}
    >
      {children}
    </div>
  )
}

export default Modal

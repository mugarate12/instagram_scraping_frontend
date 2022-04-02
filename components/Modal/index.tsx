import {
  SetStateAction,
  Dispatch,
  KeyboardEvent
} from 'react'

interface Props {
  children: React.ReactNode,
  setShowModal: Dispatch<SetStateAction<boolean>>,
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
      className={`  ${className}`}
      onKeyDown={(event) => closeModal(event)}
    >
      {children}
    </div>
  )
}

export default Modal

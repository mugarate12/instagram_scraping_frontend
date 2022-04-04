import {
  useEffect,

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
  function closeModal() {
    setShowModal(false)
  }

  function closeModalWithEscapeKey(event: any) {
    if(event.keyCode === 27) {
      closeModal()
    }
  }

  useEffect(() => {
    const clientSideRendering = typeof window !== "undefined"

    if (clientSideRendering) {
      document.addEventListener("keydown", closeModalWithEscapeKey, false);
    }
  }, [])

  return (
    <div 
      className={`fixed top-0 left-0 h-screen w-full bg-transparent z-20 ${className}`}
      onClick={closeModal}
    >
      {children}
    </div>
  )
}

export default Modal

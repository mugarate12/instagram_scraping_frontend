import {
  useEffect,

  SetStateAction,
  Dispatch,
  KeyboardEvent
} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'

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

  function handleCloseModal() {
    if (!!window && window.innerWidth >= 1024) {
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
      onClick={handleCloseModal}
    >
      <button 
        className='absolute top-[30px] right-[15px] animate-bounce' 
        onClick={closeModal}
      >
        <FontAwesomeIcon icon={faXmarkCircle} width='30px' height='30px' className='text-white'/>
      </button>

      {children}
    </div>
  )
}

export default Modal

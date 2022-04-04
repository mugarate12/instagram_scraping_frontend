import {
  SetStateAction,
  Dispatch
} from 'react'

import {
  Modal
} from './../../components'

import {
  posts
} from './../../interfaces'

import styles from './ImageModal.module.css'

interface Props {
  post: posts.postInterface | undefined,
  showModalState: boolean,
  setShowModal: Dispatch<SetStateAction<boolean>>,
}

const ImageModal = ({ post, showModalState, setShowModal }: Props) => {
  function goToPost() {
    if (!!post) {
      window.open(post.ref, '_blank')
    }
  }

  function setShowModalClass() {
    if (!showModalState) {
      return "hidden"
    }
  }

  return (
    <Modal
      setShowModal={setShowModal}
      className={`${setShowModalClass()} flex justify-center items-center bg-black ${styles.modal}`}
    >
      <img 
        src={!!post ? post.source : ""}
        alt="post"
        onClick={() => goToPost()}
        className={`h-5/6 w-2/4 min-w-[250px] min-h-[400px] max-w-lg object-cover ${styles.img}`}
      />
    </Modal>
  )
}

export default ImageModal

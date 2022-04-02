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

interface Props {
  post: posts.postInterface,
  setShowModal: Dispatch<SetStateAction<boolean>>,
}

const ImageModal = ({ post, setShowModal }: Props) => {
  function goToPost() {
    window.open(post.ref, '_blank')
  }

  return (
    <Modal
      setShowModal={setShowModal}
      className="flex justify-center items-center"
    >
      <img 
        src={post.source}
        alt="post"
        onClick={() => goToPost()}
        className='h-5/6 w-4/5'
      />
    </Modal>
  )
}

export default ImageModal

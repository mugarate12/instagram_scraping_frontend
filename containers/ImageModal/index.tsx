import {
  useState,
  useEffect,

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
  const [ postContent, setPostContent ] = useState<string>('')
  const [ postContentTags, setPostContentTags ] = useState<string>('')

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

  function getTagsOfPostContent() {
    if (!!post) {
      let tagsText = ''

      const postContentSplitted = post.content.split(' ')
      const tags = postContentSplitted.filter(word => word.startsWith('#'))
      
      tags.forEach((tag, index) => {
        if ((index + 1) <= 3) {
          tagsText += `${tag} `
        }
      })

      if (tags.length > 3) {
        tagsText += '...'
      }

      console.log(tagsText);
      setPostContentTags(tagsText)
    }
  }

  function excludeTagsOfPostContent() {
    if (!!post) {
      const indexOfFirstTag = post.content.indexOf('#')
      const isHaveTags = indexOfFirstTag !== -1

      if (isHaveTags) {
        const contentWithoutTags = post.content.slice(0, indexOfFirstTag)
        setPostContent(contentWithoutTags)
      } else {
        setPostContent(post.content)
      }
    }
  }

  useEffect(() => {
    excludeTagsOfPostContent()
    getTagsOfPostContent()
  }, [ post ])

  return (
    <Modal
      setShowModal={setShowModal}
      className={`${setShowModalClass()} flex flex-col justify-center items-center bg-black ${styles.modal}`}
    >
      <p
        className={`max-w-sm md:max-w-md lg:max-w-lg mb-8 font-mono text-3xl text-center antialiased italic font-semibold text-white tracking-tighter line-clamp-2`}
      >{postContent}</p>

      <div className='h-5/6 w-2/4 min-w-[300px] min-h-[400px] max-w-lg flex flex-col justify-center items-center'>
        <img 
          src={!!post ? post.source : ""}
          alt="post"
          onClick={() => goToPost()}
          className={`h-full w-full object-cover ${styles.img}`}
        />

        <p className='mb-4 text-white text-2xl self-end'>{postContentTags}</p>
      </div>

    </Modal>
  )
}

export default ImageModal

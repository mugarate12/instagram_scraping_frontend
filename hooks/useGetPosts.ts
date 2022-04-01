import {
  useState,
  useEffect
} from 'react'

import {
  api
} from '../config'

import {
  posts
} from '../interfaces'

interface getPostsResponse {
  posts: posts.postInterface[]
}

export default function useGetPosts() {
  const [ posts, setPosts ] = useState<posts.postInterface[]>([])

  async function get() {
    const response = await api.get<getPostsResponse>('/posts')
      .then(response => {
        setPosts(response.data.posts)
      })
      .catch(error => {
        console.log('erro ao adquirir posts: ', error)
      })
  }

  useEffect(() => {
    get()
  }, [  ])
    
  return posts
}

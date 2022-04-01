import {
  useState,
  useEffect
} from 'react'

import {
  api
} from '../config'

interface postsInterface {
  id: number,
  content: string,
  ref: string,
  source: string,
}

interface getPostsResponse {
  posts: postsInterface[]
}

export default function useGetPosts() {
  const [ posts, setPosts ] = useState<postsInterface[]>([])

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

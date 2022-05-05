import {
  useState,
  useEffect
} from 'react'
import https from 'https'	

import {
  api
} from '../config'

import {
  posts
} from '../interfaces'

interface getPostsResponse {
  posts: posts.postInterface[]
}

const agent = new https.Agent({  
  rejectUnauthorized: false
});

export default function useGetPosts() {
  const [ posts, setPosts ] = useState<posts.postInterface[]>([])

  async function get() {
    await api.get<getPostsResponse>('/posts')
      .then(response => {
        console.log(`requisitando informações de ${response.config.baseURL}`);
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

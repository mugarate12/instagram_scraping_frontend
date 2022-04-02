import {
  useState,
  useEffect
} from 'react'

interface Params {
  state?: boolean
}


/**
 * @descripition use this hook to disable scroll on page
 * @param state if you want control disable scroll on page use this param with state to manipulate this. If this true, disable scroll on page.
 */
export default function useDisableScrollPage({ state }: Params) {
  const [ scrollTop, setScrollTop ] = useState<number>(0)
  const [ scrollLeft, setScrollLeft ] = useState<number>(0)

  function disabelScroll() {
    if (!!document) {
      const body = document.getElementsByTagName('body')[0]
      
      if (!!body) {
        const bodyScrollTop = body.scrollTop
        const bodyScrollLeft = body.scrollLeft
        
        setScrollTop(bodyScrollTop)
        setScrollLeft(bodyScrollLeft)

        body.style.overflow = 'hidden'
        
      }
    }
  }

  function ableScroll() {
    if (!!document) {
      const body = document.getElementsByTagName('body')[0]
      
      if (!!body) {
        const bodyScrollTop = scrollTop
        const bodyScrollLeft = scrollLeft

        body.style.overflow = 'auto'
        
      }
    }
  }

  useEffect(() => {
    if (!!state) {
      disabelScroll()
    } else {
      ableScroll()
    }
  }, [ state ])
}
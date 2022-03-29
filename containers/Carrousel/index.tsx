import {
  useRef, 
  useEffect,
  useState
} from 'react'

import styles from './Carrousel.module.css'

interface Props {

}

const width = 'w-64' /* 256px */
const middleWidth = 'w-80' /* 320px */
const itemWidth = 'w-64' /* 256px */

const primaryHeight = 'h-96'
const SecondaryHeight = 'h-60'

const wrapperClassName = `${primaryHeight} ${width} md:w-[28rem]`
const itemsClassName = `flex items-center overflow-x-auto snap-mandatory snap-x scroll-smooth`

const itemContainerActive = `${primaryHeight} ${itemWidth} flex-none snap-center pointer-events-none duration-75`
const itemContainerNonActive = `${SecondaryHeight} ${itemWidth} flex-none snap-center pointer-events-none md:blur-sm duration-75`
const imgItemContainer = `h-full w-full object-cover`

const Carrousel = () => {
  const primary = 'center' // vai virar props

  const itemsRef = useRef<HTMLElement>(null)
  
  const [ activeItem, setActiveItem ] = useState<number>(primary === 'center' ? 2 : 1)
  const [ firstItemStyle, setFirstItemStyle ] = useState<string>(itemContainerNonActive)
  const [ secondItemStyle, setSecondItemStyle ] = useState<string>(itemContainerActive)
  const [ ThirtyItemStyle, setThirtyItemStyle ] = useState<string>(itemContainerNonActive)

  const firstImageSrc= 'http://localhost:3333/Cbde461Dp4o.png'
  const secondImageSrc = 'http://localhost:3333/Cba6dcGuWL9.png'
  const thirtyImageSrc= 'http://localhost:3333/Cbf_X39O-fP.png'
  
  // center element is default element apresented
  useEffect(() => {
    const items = itemsRef.current
    
    if (items) {
      const scrollToSecondImage = items.scrollWidth / 3
      items.scrollLeft = scrollToSecondImage
    }
  }, [])

  // add wheel of mouse event to scroll images
  useEffect(() => {
    if (!!itemsRef.current) {
      const items = itemsRef.current

      items.addEventListener('wheel', (event) => {
        event.preventDefault()
        
        const delta = event.deltaY
        const currentScroll = items.scrollLeft
        const newScroll = currentScroll + delta

        items.scrollLeft = newScroll
      })
    }
  }, [])

  // add event scroll to identify item active
  useEffect(() => {
    if (!!itemsRef.current) {
      const items = itemsRef.current
      
      items.addEventListener('scroll', () => {
        const currentScroll = items.scrollLeft

        const scrollWidth = items.scrollWidth
        const clientWidth = items.clientWidth

        const scrollPercentage = currentScroll / (scrollWidth - clientWidth)
        const firstImage = scrollPercentage === 0
        const secondImage = scrollPercentage === 0.5 // scrolled to the middle
        const thirtyImage = scrollPercentage === 1 // scrolled to the end
        
        if (firstImage) {
          setActiveItem(1)
        } else if (secondImage) {
          setActiveItem(2)
        } else if (thirtyImage) {
          setActiveItem(3)
        }
      })
    }
  }, [])

  // set primary style in active item
  useEffect(() => {
    if (activeItem === 1) {
      setFirstItemStyle(itemContainerActive)
      setSecondItemStyle(itemContainerNonActive)
      setThirtyItemStyle(itemContainerNonActive)
    } else if (activeItem === 2) {
      setFirstItemStyle(itemContainerNonActive)
      setSecondItemStyle(itemContainerActive)
      setThirtyItemStyle(itemContainerNonActive)
    } else if (activeItem === 3) {
      setFirstItemStyle(itemContainerNonActive)
      setSecondItemStyle(itemContainerNonActive)
      setThirtyItemStyle(itemContainerActive)
    }
  }, [ activeItem ])

  return (
    <section 
      className={wrapperClassName}
    >
      <p>opa</p>

      <section 
        className={`${itemsClassName} ${styles.itemsWrapper}`} 
        ref={itemsRef}
      >
        <div className={firstItemStyle}>
          <img 
            src={firstImageSrc} 
            className={imgItemContainer} 
          />
        </div>
        
        <div className={secondItemStyle}>
          <img 
            src={secondImageSrc}
            className={imgItemContainer}
          />
        </div>
      
        <div className={ThirtyItemStyle}>
          <img 
            src={thirtyImageSrc} 
            className={imgItemContainer} 
          />
        </div>
      </section>
    </section>
  )
}

export default Carrousel;

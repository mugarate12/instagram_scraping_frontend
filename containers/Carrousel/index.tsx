import {
  useRef, 
  useEffect,
  useState,

  UIEvent,
  WheelEvent
} from 'react'

import {
  CarrouselItem
} from '../../components'

import styles from './Carrousel.module.css'

interface Props {
  elements: Array<{
    id: number, 
    source: string,
    content: string
  }>
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

const Carrousel = ({ elements }: Props) => {
  const primary = 'center' // vai virar props

  const itemsRef = useRef<HTMLElement>(null)
  
  const [ activeItem, setActiveItem ] = useState<number>(primary === 'center' ? 2 : 1)
  const [ firstItemStyle, setFirstItemStyle ] = useState<string>(itemContainerNonActive)
  const [ secondItemStyle, setSecondItemStyle ] = useState<string>(itemContainerActive)
  const [ ThirtyItemStyle, setThirtyItemStyle ] = useState<string>(itemContainerNonActive)

  // add wheel of mouse event to scroll images
  function onWheelEvent(event: WheelEvent<HTMLElement>) {
    const items = event.currentTarget

    const delta = event.deltaY
    const currentScroll = items.scrollLeft
    const newScroll = currentScroll + delta

    items.scrollLeft = newScroll
  }

  // add event scroll to identify item active
  function onScrollEvent(event: UIEvent<HTMLElement, globalThis.UIEvent>) {
    event.preventDefault()
    const items = event.currentTarget

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
  }

  // center element is default element apresented
  useEffect(() => {
    const items = itemsRef.current
    
    if (items) {
      console.log('da', items.scrollWidth);
      const scrollToSecondImage = (items.scrollWidth / 3) - 100
      items.scrollLeft = scrollToSecondImage
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

  function renderItems() {
    return elements.map((element, index) => {
      let itemStyle = ''
      
      if (index === 0) {
        itemStyle = firstItemStyle
      } else if (index === 1) {
        itemStyle = secondItemStyle
      } else if (index === 2) {
        itemStyle = ThirtyItemStyle
      }

      return (
        <CarrouselItem 
          key={index}
          containerClassName={itemStyle}
          imgClassName={imgItemContainer}
          imgSrc={element.source}
        />
      )
    })
  }

  return (
    <section 
      className={wrapperClassName}
    >
      <p>opa</p>

      <section 
        className={`${itemsClassName} ${styles.itemsWrapper}`} 
        ref={itemsRef}
        onScroll={(e) => onScrollEvent(e)}
        onWheel={(e) => onWheelEvent(e)}
      >
        {renderItems()}
      </section>
    </section>
  )
}

export default Carrousel;

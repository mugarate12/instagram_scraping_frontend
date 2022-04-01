import {
  useRef, 
  useEffect,
  useState,

  UIEvent,
  WheelEvent
} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import {
  CarrouselItem
} from '../../components'

import {
  posts
} from '../../interfaces'

import styles from './Carrousel.module.css'

interface Props {
  elements: posts.postInterface[]
}

const width = 'w-64' /* 256px */
const middleWidth = 'md:w-[28rem]' /* more than 384px */
const largeWidth = 'lg:w-full lg:max-w-5xl' /* more than 512px */

const itemWidth = 'w-64' /* 256px */
const itemWidthActiveLargeScreen = 'lg:w-72'
const largeScreenItemWidth = 'lg:w-72' /* more than 512px */

const wrapperHeight = 'h-auto'

const primaryHeight = 'h-96 lg:h-[476px]' /* 384px */
const SecondaryHeight = 'h-60 lg:h-72 lg:h-[380px]' /* 288px */

const wrapperClassName = `relative mb-8 lg:mb-0 ${wrapperHeight} ${width} ${middleWidth} ${largeWidth}`

const itemsClassNameToLargeScreens = 'lg:h-[710px] lg:grid lg:grid-cols-3 lg:justify-items-center lg:content-center lg:overflow-x-auto'
const itemsClassNameToSmallAndMediumScreens = `h-[384px] flex md:items-center overflow-x-auto snap-mandatory snap-x scroll-smooth`
const itemsClassName = `relative ${itemsClassNameToSmallAndMediumScreens} ${itemsClassNameToLargeScreens}`

const itemMiddleScreenActiveStyle = 'flex-none snap-center pointer-events-none duration-75'
const itemMiddleScreenNonActiveStyle = 'flex-none snap-center pointer-events-none blur-sm duration-75 lg:blur-none'

const itemContainerActive = `${primaryHeight} ${itemWidth} ${itemWidthActiveLargeScreen} ${itemMiddleScreenActiveStyle}`
const itemContainerNonActive = `${SecondaryHeight} ${itemWidth} ${largeScreenItemWidth} ${itemMiddleScreenNonActiveStyle}`
const imgItemContainer = `h-full w-full object-cover`

const middleImgText = `lg:hidden ${width} ${middleWidth} mb-3 font-sans text-2xl text-center antialiased italic font-semibold truncate break-words`
const largeScreensImgText = "hidden lg:block mb-8 font-mono text-3xl text-center antialiased italic font-semibold tracking-tighter truncate break-words"

const buttonLeftStyle = "lg:hidden absolute top-[calc(50%+25px)] left-1 w-12 h-12 py-2 px-2 flex justify-center items-center rounded-[50%] bg-stone-200 hover:bg-stone-400 text-gray-800 font-semibold drop-shadow-md duration-1000 z-10"
const buttonRightStyle = "lg:hidden absolute top-[calc(50%+25px)] right-1 w-12 h-12 py-2 px-2 flex justify-center items-center rounded-[50%] bg-stone-200 hover:bg-stone-400 text-gray-800 font-semibold drop-shadow-md duration-1000 z-10"

const Carrousel = ({ elements }: Props) => {
  const primary = 'center' // vai virar props

  const itemsRef = useRef<HTMLElement>(null)
  
  const [ activeItem, setActiveItem ] = useState<number>(primary === 'center' ? 2 : 1)
  const [ firstItemStyle, setFirstItemStyle ] = useState<string>(itemContainerNonActive)
  const [ secondItemStyle, setSecondItemStyle ] = useState<string>(itemContainerActive)
  const [ ThirtyItemStyle, setThirtyItemStyle ] = useState<string>(itemContainerNonActive)

  const [ imagesContents, setImagesContents ] = useState<Array<string>>([])

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

  useEffect(() => {
    const contents = elements.map(element => element.content)

    setImagesContents(contents)
  }, [ elements ])

  function nextItem() {
    const items = itemsRef.current

    if (items) {
      const scroll = items.scrollLeft
      const scrollCount = 160

      if (scroll !== 320) {
        items.scrollLeft += scrollCount
      }
    }
  }

  function previousItem() {
    const items = itemsRef.current

    if (items) {
      const scroll = items.scrollLeft
      const scrollCount = 160

      if (scroll !== 0) {
        items.scrollLeft -= scrollCount
      }
    }
  }

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
          textClassName={largeScreensImgText}
          imgClassName={imgItemContainer}
          imgSrc={element.source}
          text={element.content}
        />
      )
    })
  }

  function renderImgText() {
    if (imagesContents.length > 0) {
      return imagesContents[activeItem - 1]
    }
  }

  return (
    <section 
      className={wrapperClassName}
    >
      <h2 className={middleImgText}>{renderImgText()}</h2>

      <button 
        className={buttonLeftStyle}
        onClick={previousItem}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          height='30px'
          width='30px' 
        />
      </button>
      
      <button 
        className={buttonRightStyle}
        onClick={nextItem}
      >
        <FontAwesomeIcon
          icon={faArrowRight}
          height='30px'
          width='30px' 
        />
      </button>

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

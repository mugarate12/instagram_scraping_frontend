interface Props {
  containerClassName?: string,
  imgClassName?: string,
  textClassName?: string,

  imgSrc?: string,
  alt?: string,

  text?: string,

  onClick?: Function
}

const CarrouselItem = ({ containerClassName, imgClassName, textClassName, imgSrc, alt, text, onClick }: Props) => {
  return (
    <div className={containerClassName}>
      <p className={textClassName}>{text}</p>

      <img 
        className={imgClassName}
        src={imgSrc} 
        alt={alt}
        onClick={() => {
          if (onClick) onClick()
        }}
      />
    </div>
  )
}

export default CarrouselItem
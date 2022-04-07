interface Props {
  containerClassName?: string,
  imgClassName?: string,
  textClassName?: string,

  imgSrc?: string,
  alt?: string,

  text?: string,
}

const CarrouselItem = ({ containerClassName, imgClassName, textClassName, imgSrc, alt, text }: Props) => {
  return (
    <div className={containerClassName} onClick={() => {
      console.log('object');
    }}>
      <p className={textClassName}>{text}</p>

      <img 
        className={imgClassName}
        src={imgSrc} 
        alt={alt} 
      />
    </div>
  )
}

export default CarrouselItem
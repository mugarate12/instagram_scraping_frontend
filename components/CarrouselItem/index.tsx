interface Props {
  containerClassName?: string,
  imgClassName?: string,
  imgSrc?: string,
  alt?: string
}

const CarrouselItem = ({ containerClassName, imgClassName, imgSrc, alt }: Props) => {
  return (
    <div className={containerClassName}>
      <img 
        className={imgClassName}
        src={imgSrc} 
        alt={alt} 
      />
    </div>
  )
}

export default CarrouselItem
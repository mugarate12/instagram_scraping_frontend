import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

const Header = () => {
  return (
    <header className="w-full h-16 py-1.5 pbg-transparent flex flex-row">
      <section></section>
      <section>
        <FontAwesomeIcon icon={faInstagram} width='25px' height='25px'/>
      </section>
    </header>
  )
}

export default Header
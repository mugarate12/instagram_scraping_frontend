import Image from 'next/image'
// import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'

import {
  Link
} from './../../components'

const Header = () => {
  return (
    <header className="w-full h-20 px-0.5 bg-white flex flex-row items-center justify-between">
      <section className='flex flex-row items-center gap-1'>
        <Image 
          src="/images/logo.jpg"
          alt="logo"
          width={50}
          height={50}
          layout="fixed"
        />

        <h1 className='font-mono font-semibold text-yellow-300'>Raio</h1>
        <h1 className='font-mono font-semibold'>Celular</h1>
      </section>

      <section className='flex flex-row items-center gap-4'>
          <Link href="https://www.instagram.com/raiocelular/" target='_blank'>
            <FontAwesomeIcon icon={faInstagram} width='30px' height='30px'/>
          </Link>
          <Link href="https://api.whatsapp.com/send?phone=5582996111526" target='_blank'>
            <FontAwesomeIcon icon={faWhatsapp} width='30px' height='30px'/>
          </Link>
      </section>
    </header>
  )
}

export default Header
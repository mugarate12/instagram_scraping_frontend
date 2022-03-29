import '../styles/globals.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import type { AppProps } from 'next/app'

import {
  Header
} from './../containers'

function MyApp({ Component, pageProps }: AppProps) {


  return (
    <>
      <Header />

      <Component {...pageProps}/>
  </>
  )
}

export default MyApp

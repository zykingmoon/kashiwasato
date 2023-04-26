import '@/styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>KASHIWA SATO - CREATIVE DIRECTOR  /  SAMURAI INC. TOKYO</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

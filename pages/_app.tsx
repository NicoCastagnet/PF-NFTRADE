import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import '../styles/globals.css'

import { CartProvider } from '@context/cart'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <>
      <SessionProvider session={session}>
        <CartProvider>
          <Hydrated>
            <Component {...pageProps} />
          </Hydrated>
        </CartProvider>
      </SessionProvider>
    </>
  )
}

const Hydrated = ({ children }: { children: React.ReactElement }) => {
  const [hydration, setHydration] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHydration(true)
    }
  }, [])
  return hydration ? children : <></>
}

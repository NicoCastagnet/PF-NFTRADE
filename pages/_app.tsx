// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useEffect, useState } from 'react'
import '../styles/globals.css'

import { CartProvider } from '@context/cart'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'

TimeAgo.setDefaultLocale(en.locale)
TimeAgo.addLocale(en)

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  useEffect(() => {
    const handleRouteStart = () => NProgress.start()
    const handleRouteDone = () => NProgress.done()

    NProgress.configure({ showSpinner: false })
    Router.events.on('routeChangeStart', handleRouteStart)
    Router.events.on('routeChangeComplete', handleRouteDone)
    Router.events.on('routeChangeError', handleRouteDone)

    return () => {
      // Make sure to remove the event handler on unmount!
      Router.events.off('routeChangeStart', handleRouteStart)
      Router.events.off('routeChangeComplete', handleRouteDone)
      Router.events.off('routeChangeError', handleRouteDone)
    }
  }, [])
  return (
    <>
      <SessionProvider session={session}>
        <CartProvider>
          <Hydrated>
            <ThemeProvider attribute="class">
              <Component {...pageProps} />
            </ThemeProvider>
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

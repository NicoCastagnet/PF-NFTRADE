// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect, useState } from 'react'

export default function useNearScreen({ distance = '100px', externalRef }) {
  const [isNearScreen, setShow] = useState(false)

  const onChange = (entries) => {
    entries[0].isIntersecting ? setShow(true) : setShow(false)
  }

  useEffect(() => {
    let observer

    if (!externalRef.current) return

    Promise.resolve(
      typeof IntersectionObserver !== 'undefined'
        ? IntersectionObserver
        : import('intersection-observer'),
    ).then(() => {
      observer = new IntersectionObserver(onChange, {
        rootMargin: distance,
      })

      observer.observe(externalRef.current)
    })

    return () => observer && observer.disconnect()
  }, [distance, externalRef])

  return { isNearScreen }
}

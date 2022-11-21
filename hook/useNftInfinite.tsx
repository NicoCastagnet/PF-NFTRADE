// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import fetcher from '@lib/fetcher'
import debounce from 'just-debounce-it'
import { useCallback, useEffect, useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import type { NftsResponse } from 'types/api-responses'

const LIMIT = 12

const useNftInfiniteScroll = (
  order = '',
  { minPrice, maxPrice },
  fallbackData,
  externalRef,
) => {
  const [isNearScreen, setShow] = useState(false)
  const [page, setPage] = useState({
    index: 1,
    limit: 6,
  })

  const getKey = (previousPageData: NftsResponse) => {
    if (previousPageData && !previousPageData.length) return null
    return `/api/nfts?page=${page.index}&limit=${page.limit}&order=${order}&minPrice=${minPrice}&maxPrice=${maxPrice}`
  }

  const {
    data: nfts,
    size,
    setSize,
    error,
  } = useSWRInfinite(getKey, fetcher, {
    fallbackData,
  })

  const onChange = (entries) => {
    entries[0].isIntersecting ? setShow(true) : setShow(false)
  }

  const handleDebounceNextPage = useCallback(
    debounce(() => {
      setPage((state) => ({ ...state, limit: state.limit + 6 }))
      // setSize(size + 1);
    }, 200),
    [],
  )

  useEffect(() => {
    let observer

    if (!externalRef?.current) return

    Promise.resolve(
      typeof IntersectionObserver !== 'undefined'
        ? IntersectionObserver
        : import('intersection-observer'),
    ).then(() => {
      observer = new IntersectionObserver(onChange, {
        rootMargin: '100px',
      })

      observer.observe(externalRef?.current)
    })

    return () => observer && observer.disconnect()
  }, [externalRef])

  useEffect(() => {
    if (isNearScreen) handleDebounceNextPage()
  }, [isNearScreen, handleDebounceNextPage])

  return {
    nfts,
    isLoading: !nfts && !error,
    error,
  }
}
export default useNftInfiniteScroll

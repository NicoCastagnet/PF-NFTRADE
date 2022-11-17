// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import fetcher from '@lib/fetcher'
import useSWR from 'swr'
import type { CollectionDetailResponse } from 'types/api-responses'

const useCollections = (order = '', { minPrice, maxPrice }) => {
  const URL = '/api/collections/findAll'

  const { data: collections, error } = useSWR<CollectionDetailResponse>(
    [URL, `?order=${order}&minPrice=${minPrice}&maxPrice=${maxPrice}`],
    fetcher,
  )

  return {
    collections,
    isLoading: !error && !collections,
    error,
  }
}
export default useCollections

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import fetcher from '@lib/fetcher'
import useSWR from 'swr'
import type { NftsResponse } from 'types/api-responses'

const useNfts = (order = '', { minPrice, maxPrice }) => {
  const URL = '/api/nfts'

  const { data: nfts, error } = useSWR<NftsResponse>(
    [URL, `?order=${order}&minPrice=${minPrice}&maxPrice=${maxPrice}`],
    fetcher,
  )

  return {
    nfts,
    isLoading: !error && !nfts,
    error,
  }
}
export default useNfts

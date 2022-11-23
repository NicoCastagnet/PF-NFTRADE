import fetcher from '@lib/fetcher'
import useSWR from 'swr'

const useCollections = (
  order = '',
  {
    minPrice,
    maxPrice,
  }: { minPrice: string | number; maxPrice: string | number },
) => {
  const URL = '/api/collections/findAll'

  const { data: collections, error } = useSWR(
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

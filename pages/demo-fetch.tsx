import fetcher from '@lib/fetcher'
import type { NextPage } from 'next'
import useSWR from 'swr'
import type { NftsResponse } from 'types/api-responses'

const DemoFetch: NextPage = () => {
  const { data: nfts, error } = useSWR<NftsResponse>('/api/nfts', fetcher)
  /*  */
  // If fetch fails: display some error or redirect
  if (error) return <div>Something went wrong</div>

  // if no data: loading  feedback
  if (!nfts)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    )

  // if data
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      {nfts.length &&
        nfts.map((nft) => (
          <div className="text-xl" key={nft.id}>
            {nft.name}
          </div>
        ))}
    </div>
  )
}

export default DemoFetch

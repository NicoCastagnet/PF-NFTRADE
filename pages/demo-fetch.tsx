import Search from '@components/search'
import fetcher from '@lib/fetcher'
import type { GetServerSideProps, NextPage } from 'next'
import useSWR from 'swr'
import type { NftsResponse } from 'types/api-responses'

const URL = 'http://localhost:3000/api/nfts'

interface DemoProps {
  fallbackData: NftsResponse
}

const DemoFetch: NextPage<DemoProps> = ({ fallbackData }) => {
  const { data: nfts, error } = useSWR<NftsResponse>(URL, fetcher, {
    fallbackData,
  })
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
      <Search />
      {nfts.length &&
        nfts.map((nft) => (
          <div className="text-xl" key={nft.id}>
            {nft.name}
          </div>
        ))}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetcher(URL)
  return {
    props: {
      fallbackData: data,
    },
  }
}

export default DemoFetch

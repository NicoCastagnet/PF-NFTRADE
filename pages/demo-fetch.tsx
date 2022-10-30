import Search from '@components/search'
import { getAllNfts } from '@lib/api'
import type { GetServerSideProps, NextPage } from 'next'
import type { NftsResponse } from 'types/api-responses'

interface DemoProps {
  nfts: NftsResponse
}

const DemoFetch: NextPage<DemoProps> = ({ nfts }) => {
  // if no data: loading  feedback
  if (!nfts.length)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">No items for show</h1>
      </div>
    )

  // if data
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <Search />
      {nfts.map((nft) => (
        <div className="text-xl" key={nft.id}>
          {nft.name}
        </div>
      ))}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getAllNfts()
  return {
    props: {
      nfts: data,
    },
  }
}

export default DemoFetch

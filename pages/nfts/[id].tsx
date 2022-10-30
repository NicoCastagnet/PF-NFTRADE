import getNftById from '@lib/api/nfts/getById'
import type { GetServerSideProps, NextPage } from 'next'
import type { NftDetailResponse } from 'types/api-responses'

interface NftDetailProps {
  nft: NftDetailResponse
}

const NftDetail: NextPage<NftDetailProps> = ({ nft }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Nft Detail</h1>
      <div className="max-w-3xl mt-4">{JSON.stringify(nft)}</div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = await getNftById({ id: params?.id as string })
  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      nft: data,
    },
  }
}

export default NftDetail

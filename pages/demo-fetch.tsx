import CartSideBar from '@components/cart'
import Search from '@components/search'
import { getAllNfts } from '@lib/api'
import fetcher from '@lib/fetcher'
import { useCart } from 'context/cart'
import type { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import type { NftResponse, NftsResponse } from 'types/api-responses'

interface DemoProps {
  fallbackData: NftsResponse
}

const LIMIT = 5

const getKey = (pageIndex: number, previousPageData: NftsResponse) => {
  if (previousPageData && !previousPageData.length) return null
  return `/api/nfts?page=${pageIndex}&limit=${LIMIT}`
}

const DemoFetch: NextPage<DemoProps> = ({ fallbackData }) => {
  const { data, size, setSize, error } = useSWRInfinite(getKey, fetcher, {
    fallbackData,
  })
  const [open, setOpen] = useState(false)
  const { cart, addItem, clearCart, removeItem } = useCart()

  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < LIMIT)

  if (!data) return <div>Loading...</div>

  // if no data: loading  feedback
  let totalNfts = 0
  for (let i = 0; i < data.length; i++) {
    totalNfts += data[i].length
  }

  // if data
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <CartSideBar isOpen={open} handleClose={setOpen} />
      <Search />
      <div className="border rounded-sm p-6 w-96 flex flex-col items-center">
        <h1 className="font-bold text-xl">Cart</h1>
        <button
          className="text-slate-700 underline"
          onClick={() => setOpen(true)}
        >
          Open Panel
        </button>
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="flex items-center gap-4">
              <span>{item.name}</span>{' '}
              <button
                className="text-red-500"
                onClick={() => removeItem(item.id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => clearCart()}
          className="bg-red-300 py-2 px-4 mt-6"
        >
          Clear
        </button>
      </div>
      <p>total nfts listed: {totalNfts}</p>
      {data.map((nfts) => {
        return nfts.map((nft: NftResponse) => (
          <>
            <h1 key={nft.id}>{nft.name}</h1>
            <button
              className="bg-slate-700 text-white py-2 px-4 rounded-sm"
              onClick={() => addItem(nft)}
            >
              Add to cart
            </button>
          </>
        ))
      })}
      <button
        className="bg-slate-900 text-white px-6 py-3 rounded-lg disabled:bg-slate-500 disabled:cursor-not-allowed"
        disabled={isLoadingMore || isReachingEnd}
        onClick={() => setSize(size + 1)}
      >
        {isLoadingMore
          ? 'loading...'
          : isReachingEnd
          ? 'no more issues'
          : 'load more'}
      </button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getAllNfts({ page: 1, limit: LIMIT })
  return {
    props: {
      nfts: data,
    },
  }
}

export default DemoFetch

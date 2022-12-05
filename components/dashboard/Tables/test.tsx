// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import SvgLoading from '@components/icons/svgLoading'
import SvgNewTab from '@components/icons/svgNewTab'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import useDetail from '../../../hook/useDetail'

const Test = ({ e, mutate }) => {
  const { session, subState, setSubState, handlePublished, putPrice } =
    useDetail(e)

  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    toast.success('NFT successffully deleted!')
    await axios.put(`${process.env.NEXT_PUBLIC_APP_URL}/api/put/nftPutErased`, {
      id: e?.id,
      collectionId: e?.collectionId,
    }),
      mutate(`/api/user/${session?.user.id}`)
    setLoading(false)
  }

  return (
    <tr key={e.id}>
      <td className="px-6 pt-2">
        <div className="border border-[#303339] rounded-full h-10 w-10">
          <Image
            src={e.image}
            alt={'img'}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-400 whitespace-nowrap">
        {e.id}
      </td>
      <td className="px-6 py-4 text-sm text-gray-400 whitespace-nowrap">
        {e.name}
      </td>
      <td className="px-6 py-4 text-sm text-gray-400 whitespace-nowrap">
        {e.owner.name}
      </td>
      <td className="px-6 py-4 text-sm text-gray-400 text-center whitespace-nowrap">
        {e.price}
      </td>
      {loading ? (
        <div className="flex justify-center items-center rounded-full my-2 text-lg">
          <SvgLoading className="w-5 h-5 animate-spin mr-2" />{' '}
        </div>
      ) : subState.erased === true ? (
        <td className="px-6 py-4 text-sm text-gray-400 text-center whitespace-nowrap">
          <span className="text-green-500">Yes</span>
        </td>
      ) : (
        <td className="px-6 py-4 text-sm text-gray-400 text-center whitespace-nowrap">
          <span
            className="text-red-500 cursor-pointer"
            onClick={() => handleDelete()}
          >
            No
          </span>
        </td>
      )}

      {subState.loadingPublished ? (
        <div className="flex justify-center items-center rounded-full my-2 text-lg">
          <SvgLoading className="w-5 h-5 animate-spin mr-2" />{' '}
        </div>
      ) : subState.published === true ? (
        <td className="px-6 py-4 text-sm text-gray-400 text-center whitespace-nowrap">
          <span
            className="text-green-500 cursor-pointer"
            onClick={() => handlePublished(!subState.published)}
          >
            Yes
          </span>
        </td>
      ) : (
        <td className="px-6 py-4 text-sm text-gray-400 text-center whitespace-nowrap">
          <span
            className="text-red-500 cursor-pointer"
            onClick={() => handlePublished(!subState.published)}
          >
            No
          </span>
        </td>
      )}
      <td className="px-9 py-4 text-sm flex font-medium justify-center whitespace-nowrap">
        <a
          href={`${process.env.NEXT_PUBLIC_APP_URL}/nfts/${e.id}`}
          target="_blank"
          rel="noreferrer"
        >
          <SvgNewTab className="cursor-pointer text-gray-400 hover:text-blue-600 transition-all" />
        </a>
      </td>
    </tr>
  )
}

export default Test

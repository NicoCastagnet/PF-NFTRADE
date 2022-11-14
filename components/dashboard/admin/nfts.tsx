import SvgBan from '@components/icons/svgBan'
import SvgLoading from '@components/icons/svgLoading'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import defaultAvatar from '/assets/avataricon.png'

interface Nfts {
  price: number
  erased: boolean
  id: string
  creatorId: string
  ownerId: string
  image: string | null
  name: string
  collectionId: string
}

interface Props {
  data: Nfts[]
}

const Nfts: NextPage<Props> = ({ data }) => {
  const [nfts, setNfts] = useState(data)

  const [refresh, setRefresh] = useState(false)

  function refreshing() {
    setRefresh(!refresh)
  }

  const [deleteLoading, setDeleteLoading] = useState(false)

  async function handleBan(id: string, boolean: boolean, collectionId: string) {
    setDeleteLoading(true)
    await fetch('/api/admin/nftPutErased', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        boolean: boolean,
        collectionId: collectionId,
      }),
    })
    setDeleteLoading(false)
    const nftsCopy = nfts
    const u = nftsCopy.find((u) => u.id === id)
    u.erased = !u.erased
    setNfts([])
    setNfts(nftsCopy)
    refreshing()
  }

  return (
    <div>
      <div className="flex w-full ">
        <div className=" w-1/12 border-r-[1px] border-b-[1px] p-[5px] flex items-center border-gray-400 ">
          <p className=" font-[600] overflow-hidden ">Image</p>
        </div>
        <div className=" w-2/12 border-r-[1px] border-b-[1px] p-[5px] flex items-center border-gray-400 ">
          <p className=" font-[600] overflow-hidden ">Name</p>
        </div>
        <div className=" w-2/12 border-r-[1px] border-b-[1px] p-[5px] flex items-center border-gray-400 ">
          <p className=" font-[600] overflow-hidden ">Creator Id</p>
        </div>
        <div className=" w-2/12 border-r-[1px] border-b-[1px] p-[5px] flex items-center border-gray-400 ">
          <p className=" font-[600] overflow-hidden ">Owner Id</p>
        </div>
        <div className=" w-2/12 border-r-[1px] border-b-[1px] p-[5px] flex items-center border-gray-400 ">
          <p className=" font-[600] overflow-hidden ">Nft Id</p>
        </div>
        <div className=" w-2/12 border-r-[1px] border-b-[1px] p-[5px] flex items-center border-gray-400 ">
          <p className=" font-[600] overflow-hidden ">State</p>
        </div>
        <div className=" w-1/12 border-r-[1px] border-b-[1px] p-[5px] flex items-center border-gray-400 ">
          <p className=" font-[600] overflow-hidden ">Price</p>
        </div>
      </div>
      {nfts.map((u) => (
        <div key={u.id}>
          <div className="flex w-full ">
            <div className=" w-1/12 border-r-[1px] p-[5px] border-gray-400 border-b-[1px] flex justify-center ">
              <div className="w-[35px] h-[35px] ">
                <Image
                  width={175}
                  height={175}
                  className=" bg-white rounded-full object-cover"
                  src={u.image || defaultAvatar}
                  alt={u.name}
                />
              </div>
            </div>
            <div className=" overflow-hidden w-2/12 border-r-[1px] border-b-[1px] p-[5px] flex items-center border-gray-400 ">
              <Link href={`/nfts/${u.id}`}>
                <p className=" cursor-pointer hover:text-gray-600 ">{u.name}</p>
              </Link>
            </div>
            <div className=" w-2/12 overflow-hidden border-r-[1px] border-b-[1px] p-[5px] flex items-center border-gray-400 ">
              <Link href={`/users/${u.creatorId}`}>
                <p className=" cursor-pointer hover:text-gray-600 ">
                  {u.creatorId}
                </p>
              </Link>
            </div>
            <div className=" w-2/12 overflow-hidden border-r-[1px] border-b-[1px] p-[5px] flex items-center border-gray-400 ">
              <Link href={`/users/${u.ownerId}`}>
                <p className=" cursor-pointer hover:text-gray-600 ">
                  {u.ownerId}
                </p>
              </Link>
            </div>
            <div className=" w-2/12 overflow-hidden border-r-[1px] border-b-[1px] p-[5px] flex items-center border-gray-400 ">
              <p>{u.id}</p>
            </div>
            <div className=" w-2/12 border-r-[1px] border-b-[1px] p-[5px] flex items-center justify-between border-gray-400 ">
              <p>{u.erased === true ? 'Disabled' : 'Enabled'}</p>
              {deleteLoading === true ? (
                <div className="animate-spin flex justify-center items-center ml-1 w-[18px] h-[18px] rounded-full">
                  <SvgLoading />
                </div>
              ) : (
                <SvgBan
                  onClick={() => handleBan(u.id, !u.erased, u.collectionId)}
                  className={`cursor-pointer w-[18px] h-[18px] ${
                    u.erased === true
                      ? ' fill-red-700 hover:fill-green-700 '
                      : 'fill-green-700 hover:fill-red-700 '
                  }`}
                />
              )}
            </div>
            <div className=" overflow-hidden w-1/12 border-r-[1px] border-b-[1px] p-[5px] flex items-center border-gray-400 ">
              <p>{u.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Nfts

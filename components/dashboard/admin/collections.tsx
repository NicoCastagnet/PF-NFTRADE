// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import defaultAvatar from '@assets/avataricon.png'
import SvgBan from '@components/icons/svgBan'
import SvgLoading from '@components/icons/svgLoading'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface Collections {
  price: number
  erased: boolean
  id: string
  creatorId: string
  ownerId: string
  image: string | null
  name: string
  collectionId: string
  nfts: string[]
  _count: object[]
}

interface Props {
  data: Collections[]
}

const Collections: NextPage<Props> = ({ data }) => {
  const [collections, setCollections] = useState(data)

  const [refresh, setRefresh] = useState(false)

  function refreshing() {
    setRefresh(!refresh)
  }

  const [deleteLoading, setDeleteLoading] = useState(false)

  async function handleBan(id: string, boolean: boolean, nfts: object[]) {
    if (boolean !== true) {
      setDeleteLoading(true)
      const ids = nfts.map((nft) => nft.id)
      await fetch('/api/admin/collectionPutErased', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          nftsId: ids,
        }),
      })
      setDeleteLoading(false)
      const CollectionsCopy = collections
      const u = CollectionsCopy.find((u) => u.id === id)
      u.erased = !u.erased
      setCollections([])
      setCollections(CollectionsCopy)
      refreshing()
    }
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
      {collections.map((u) => (
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
              <Link href={`/collections/${u.id}`}>
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
            <div className="  w-2/12 overflow-hidden border-r-[1px] border-b-[1px] p-[5px] flex items-center border-gray-400 ">
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
                  onClick={() => handleBan(u.id, u.erased, u.nfts)}
                  className={`cursor-pointer w-[18px] h-[18px] ${
                    u.erased === true
                      ? ' fill-gray-400 cursor-default'
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

export default Collections

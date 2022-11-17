import SvgBan from '@components/icons/svgBan'
import SvgLoading from '@components/icons/svgLoading'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import defaultAvatar from '@assets/avataricon.png'

interface Users {
  coins: number
  email: string
  erased: boolean
  id: string
  image: string | null
  name: string
}

interface Props {
  data: Users[]
}

const Users: NextPage<Props> = ({ data }) => {
  const [users, setUsers] = useState(data)

  const [refresh, setRefresh] = useState(false)

  function refreshing() {
    setRefresh(!refresh)
  }

  const [deleteLoading, setDeleteLoading] = useState(false)

  async function handleBan(id: string, boolean: boolean) {
    setDeleteLoading(true)
    await fetch('/api/admin/userPutErased', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        boolean: boolean,
      }),
    })
    setDeleteLoading(false)
    const usersCopy = users
    const u = usersCopy.find((u) => u.id === id)
    u.erased = !u.erased
    setUsers([])
    setUsers(usersCopy)
    refreshing()
  }

  return (
    <div>
      <div className="flex w-full ">
        <div className="overflow-hidden w-1/12 border-r-[1px] border-b-[1px] p-[5px] flex items-center border-gray-400 ">
          <p className=" font-[600] ">Image</p>
        </div>
        <div className="overflow-hidden w-2/12 border-r-[1px] border-b-[1px] p-[5px] flex items-center border-gray-400 ">
          <p className=" font-[600] ">Name</p>
        </div>
        <div className="overflow-hidden w-3/12 border-r-[1px] border-b-[1px] p-[5px] flex items-center border-gray-400 ">
          <p className=" font-[600] ">Mail</p>
        </div>
        <div className="overflow-hidden w-3/12 border-r-[1px] border-b-[1px] p-[5px] flex items-center border-gray-400 ">
          <p className=" font-[600] ">Id</p>
        </div>
        <div className="  overflow-hidden w-2/12 border-r-[1px] border-b-[1px] p-[5px] flex items-center border-gray-400 ">
          <p className=" font-[600] ">State</p>
        </div>
        <div className=" overflow-hidden w-1/12 border-r-[1px] border-b-[1px] p-[5px] flex items-center border-gray-400 ">
          <p className=" font-[600] ">Coins</p>
        </div>
      </div>
      {users.map((u) => (
        <div key={u.id}>
          <div className="flex w-full ">
            <div className=" w-1/12 border-r-[1px] p-[5px] border-gray-400 border-b-[1px] flex justify-center ">
              <div className="rounded-full w-[35px] h-[35px] ">
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
              <Link href={`/users/${u.id}`}>
                <p className=" cursor-pointer hover:text-gray-600 ">{u.name}</p>
              </Link>
            </div>
            <div className=" overflow-hidden w-3/12 border-r-[1px] border-b-[1px] p-[5px] flex items-center border-gray-400 ">
              <p>{u.email}</p>
            </div>
            <div className=" overflow-hidden w-3/12 border-r-[1px] border-b-[1px] p-[5px] flex items-center border-gray-400 ">
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
                  onClick={() => handleBan(u.id, !u.erased)}
                  className={`cursor-pointer w-[18px] h-[18px] ${
                    u.erased === true
                      ? ' fill-red-700 hover:fill-green-700 '
                      : 'fill-green-700 hover:fill-red-700 '
                  }`}
                />
              )}
            </div>
            <div className=" overflow-hidden w-1/12 border-r-[1px] border-b-[1px] p-[5px] flex items-center border-gray-400 ">
              <p>{u.coins}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Users

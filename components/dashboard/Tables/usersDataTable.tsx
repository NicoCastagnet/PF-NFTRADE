// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Avatar from '@assets/avataricon.png'
import SvgLoading from '@components/icons/svgLoading'
import SvgNewTab from '@components/icons/svgNewTab'
import fetcher from '@lib/fetcher'
import Image from 'next/image'
import useSWR from 'swr'

const UsersDataTable = () => {
  const { data } = useSWR(`/api/user`, fetcher)
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="w-full inline-block align-middle">
          <div className="overflow-hidden border border-[#303339] rounded-b-lg">
            <table className="min-w-full divide-y divide-[#303339]">
              <thead className="bg-[#303339]">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-center text-gray-400 uppercase"
                  />
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-400 uppercase"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-400 uppercase"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-400 uppercase"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-center text-gray-400 uppercase"
                  >
                    Coins
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-center text-gray-400 uppercase"
                  >
                    Banned
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-center text-gray-400 uppercase"
                  >
                    See User
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#303339]">
                {data ? (
                  data?.map((e: any) => (
                    <>
                      <tr key={e.id}>
                        <td className="px-6 pt-2">
                          <div className="border border-[#303339] rounded-full h-10 w-10">
                            <Image
                              src={e.image ? e.image : Avatar}
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
                          {e.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400 text-center whitespace-nowrap">
                          {parseInt(e.coins).toLocaleString('es-AR')}
                        </td>
                        <td className="px-6 py-4 text-sm text-green-500 text-center whitespace-nowrap">
                          Not banned
                        </td>
                        <td className="px-9 py-4 text-sm flex font-medium justify-center whitespace-nowrap">
                          <a
                            href={`${process.env.NEXT_PUBLIC_APP_URL}/users/${e.id}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <SvgNewTab className="cursor-pointer text-gray-400 hover:text-blue-600 transition-all" />
                          </a>
                        </td>
                      </tr>
                    </>
                  ))
                ) : (
                  <tr>
                    <td className="px-6 pt-2 flex items-center justify-center">
                      <SvgLoading className="animate-spin" />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersDataTable

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Avatar from '@assets/image-placeholder.png'
import SvgLoading from '@components/icons/svgLoading'
import SvgNewTab from '@components/icons/svgNewTab'
import fetcher from '@lib/fetcher'
import Image from 'next/image'
import useSWR from 'swr'

const CollectionsDataTable = () => {
  const { data } = useSWR(`/api/dashboardata/getAllCollections`, fetcher)
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
                    Owner
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-center text-gray-400 uppercase"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-center text-gray-400 uppercase"
                  >
                    Discount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-center text-gray-400 uppercase"
                  >
                    Erased
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-center text-gray-400 uppercase"
                  >
                    Published
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-center text-gray-400 uppercase"
                  >
                    See collection
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#303339]">
                {data ? (
                  data?.collections.map((e: any) => (
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
                          {e.owner.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400 text-center whitespace-nowrap">
                          {e.price ? (
                            e.price
                          ) : (
                            <span className="text-red-500">Without price</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400 text-center whitespace-nowrap">
                          {e.discount ? `${e.discount}%` : 'Without discount'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400 text-center whitespace-nowrap">
                          {e.erased ? (
                            <span className="text-green-500 cursor-pointer">
                              Yes
                            </span>
                          ) : (
                            <span className="text-red-500 cursor-pointer">
                              No
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400 text-center whitespace-nowrap">
                          {e.published ? (
                            <span className="text-green-500 cursor-pointer">
                              Yes
                            </span>
                          ) : (
                            <span className="text-red-500 cursor-pointer">
                              No
                            </span>
                          )}
                        </td>
                        <td className="px-9 py-4 text-sm flex font-medium justify-center whitespace-nowrap">
                          <a
                            href={`${process.env.NEXT_PUBLIC_APP_URL}collections/${e.id}`}
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

export default CollectionsDataTable

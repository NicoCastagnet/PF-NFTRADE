// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import SvgLoading from '@components/icons/svgLoading'
import fetcher from '@lib/fetcher'
import useSWR, { mutate } from 'swr'
import Test from './test'

const NftsDataTable = () => {
  const { data } = useSWR(`/api/dashboardata/getAllNfts`, fetcher)
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
                    See nft
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#303339]">
                {data ? (
                  data?.nfts.map((e: any) => (
                    <>
                      <Test e={e} mutate={mutate} />
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

export default NftsDataTable

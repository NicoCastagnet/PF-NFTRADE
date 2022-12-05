// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import fetcher from '@lib/fetcher'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

const useCoins = () => {
  const { data: session, status } = useSession()
  const { data } = useSWR(`/api/user/${session?.user.id}`, fetcher)

  return { session, status, coins: data?.coins }
}

export default useCoins

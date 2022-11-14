import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const useCoins = () => {
  const { data: session, status } = useSession()
  const [coins, setCoins] = useState(0)

  useEffect(() => {
    session &&
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/${session?.user.id}`)
        .then((res) => res.json())
        .then((res) => {
          setCoins(res.coins)
        })
  }, [session])

  return { session, status, coins }
}

export default useCoins

import type { NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const getUserInfo = () => {
    if(status === 'loading') return
    fetch(`/api/users?id=${session?.user?.id}`)
  }

  useEffect(() => {
    getUserInfo()
  },[status])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <h1 className="text-3xl font-medium text-slate-800">Working</h1>

      {session && (
        <button
          onClick={async () => {
            await signOut()
          }}
          className="bg-black text-white rounded-full py-2 px-6"
        >
          SignOut
        </button>
      )}

      {!session && (
        <button
          onClick={() => {
            router.push('/signIn')
          }}
          className="bg-black text-white rounded-full py-2 px-6"
        >
          SignIn
        </button>
      )}
    </div>
  )
}

export default Home

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../styles/form.module.css'

const UserMenuNavBar = ({ menu }: { menu: boolean }) => {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <>
      {session ? (
        <div
          className={`relative ${
            menu ? '' : 'hidden'
          } before:absolute before:z-20 ${styles.menuLogIn}`}
        >
          <div
            className={` z-[999] w-44 shadow bg-gray-700 divide-gray-600 absolute top-9 right-5 rounded-xl `}
          >
            <div className="py-3 px-4 text-sm text-white hover:rounded-t-xl">
              <div className="font-medium truncate">{session?.user.email}</div>
            </div>
            <ul
              className="py-1 text-sm text-gray-200 border-y-white border-y-2"
              aria-labelledby="dropdownInformationButton"
            >
              <li className="block py-2 px-4 hover:bg-gray-600 hover:text-white xl:hidden">
                <Link href="#">Explore</Link>
              </li>
              <li className="block py-2 px-4 hover:bg-gray-600 hover:text-white xl:hidden">
                <Link href="/marketplace">Marketplace</Link>
              </li>
              <li className="block py-2 px-4 hover:bg-gray-600 hover:text-white">
                <Link href="#">Dashboard</Link>
              </li>
              <li className="block py-2 px-4 hover:bg-gray-600 hover:text-white">
                <Link href="#">Settings</Link>
              </li>
              <li className="block py-2 px-4 hover:bg-gray-600 hover:text-white">
                <Link href="/nfts/create">Create NFT</Link>
              </li>
            </ul>
            <div
              className="block py-3 px-4 text-sm hover:bg-gray-600 hover:rounded-b-xl text-gray-200 hover:text-white"
              onClick={async () => {
                await signOut()
              }}
            >
              <a href="#">Sign out</a>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`relative ${
            menu ? '' : 'hidden'
          } before:absolute before:z-20 ${styles.menuLogOut}`}
        >
          <div
            className={` z-[999] w-44 shadow bg-gray-700 absolute top-9 right-[-2rem] rounded-xl `}
          >
            <div className="py-3 px-4 text-sm text-white">Welcome user !</div>
            <ul
              className=" text-sm text-gray-200 border-t-2 border-gray-600"
              aria-labelledby="dropdownInformationButton"
            >
              <li className="block py-2 px-4 hover:bg-gray-600 hover:text-white min-[1145px]:hidden">
                <Link href="#">Explore</Link>
              </li>
              <li className="block py-2 px-4 hover:bg-gray-600 hover:text-white min-[1145px]:hidden">
                <Link href="/marketplace">Marketplace</Link>
              </li>
              <li
                className="block py-3 px-4 hover:bg-gray-600 hover:text-white cursor-pointer"
                onClick={() => {
                  router.push('/login')
                }}
              >
                LogIn
              </li>
              <li
                className="block py-3 pb-4 px-4 hover:bg-gray-600 hover:text-white hover:rounded-b-xl cursor-pointer"
                onClick={() => {
                  router.push('/register')
                }}
              >
                Register
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default UserMenuNavBar

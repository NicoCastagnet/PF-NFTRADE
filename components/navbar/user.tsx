import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../styles/form.module.css'

const UserMenuNavBar = ({ menu }: { menu: boolean }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  return (
    <>
      {session ? (
        <div
          className={`relative ${
            menu ? '' : 'hidden'
          } before:absolute before:z-20 ${styles.menuLogIn}`}
        >
          <div
            className={` z-[999] w-44 shadow bg-gray-700 divide-gray-600 dark:bg-[#303339] dark:divide-[#393b41] absolute top-9 right-5 rounded-xl `}
          >
            <div className="py-3 px-4 text-sm text-white hover:rounded-t-xl">
              <div className="font-medium truncate">{session?.user.email}</div>
            </div>
            <ul
              className="py-1 text-sm text-gray-200 border-y-white border-y-2"
              aria-labelledby="dropdownInformationButton"
            >
              <li className="block py-2 px-4 hover:bg-gray-600 dark:hover:bg-[#393b41] hover:text-white xl:hidden">
                <Link href="#">
                  <a>Explore</a>
                </Link>
              </li>

              <li className="block py-2 px-4 hover:bg-gray-600 hover:text-white xl:hidden">
                <Link href="/marketplace">
                  <a>Marketplace</a>
                </Link>
              </li>
              <li className="block py-2 px-4 hover:bg-gray-600 hover:text-white xl:hidden">
                <Link href="/collectionmarket">
                  <a>Collections</a>
                </Link>
              </li>
              <li className="block py-2 px-4 hover:bg-gray-600 hover:text-white dark:hover:bg-[#393b41] cursor-pointer">
                <Link href={`/users/${session.user.id}`}>
                  <a>My profile</a>
                </Link>
              </li>
              <li className="block py-2 px-4 hover:bg-gray-600 hover:text-white dark:hover:bg-[#393b41] cursor-pointer">
                <Link href="/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li className="block py-2 px-4 hover:bg-gray-600 dark:hover:bg-[#393b41] hover:text-white cursor-pointer">
                <Link href="/buy">
                  <a>Buy coins</a>
                </Link>
              </li>
              <li
                className="block py-2 px-4 hover:bg-gray-600 dark:hover:bg-[#393b41] hover:text-white cursor-pointer"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              >
                Toggle to {theme === 'light' ? 'dark' : 'light'} mode.
              </li>
            </ul>
            <div
              className="block py-3 px-4 text-sm hover:bg-gray-600 dark:hover:bg-[#393b41] hover:rounded-b-xl text-gray-200 hover:text-white cursor-pointer"
              onClick={async () => {
                await signOut()
              }}
            >
              <Link href="#">
                <a>Log out</a>
              </Link>
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
            className={` z-[999] w-44 shadow bg-gray-700 absolute top-9 right-[-0.2rem] rounded-xl `}
          >
            <div className="py-3 px-4 text-sm text-white">
              Welcome! Get started
            </div>
            <ul
              className=" text-sm text-gray-200 border-t-2 border-gray-600"
              aria-labelledby="dropdownInformationButton"
            >
              <li className="block py-2 px-4 hover:bg-gray-600 hover:text-white min-[1145px]:hidden">
                <Link href="#">
                  <a>Explore</a>
                </Link>
              </li>
              <li className="block py-2 px-4 hover:bg-gray-600 hover:text-white min-[1145px]:hidden">
                <Link href="/marketplace">
                  <a>Marketplace</a>
                </Link>
              </li>
              <li
                className="block py-3 px-4 hover:bg-gray-600 hover:text-white cursor-pointer"
                onClick={() => {
                  router.push('/login')
                }}
              >
                Login
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

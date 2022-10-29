import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import styles from '../../styles/form.module.css'
import { useRef } from 'react'

const User = ({ menu }) => {
  const router = useRouter()
  const { data: session } = useSession()

  return (
    <>
      {session ? (
        <div
          id="dropdownInformation"
          ref={menu}
          className={`relative ${styles.menu}`}
        >
          <div
            className={` z-10 w-44 shadow bg-gray-700 divide-gray-600 absolute top-9 right-5 rounded-xl `}
          >
            <div className="py-3 px-4 text-sm text-white hover:bg-gray-600 hover:rounded-t-xl">
              {/* <div>
                {session?.user.name || session?.user.email.split('@')[0]}
              </div> */}
              <div className="font-medium truncate">{session?.user.email}</div>
            </div>
            <ul
              className="py-1 text-sm text-gray-200 border-y-white border-y-2"
              aria-labelledby="dropdownInformationButton"
            >
              <li className="block py-2 px-4 hover:bg-gray-600 hover:text-white">
                <a href="#">Dashboard</a>
              </li>
              <li className="block py-2 px-4 hover:bg-gray-600 hover:text-white">
                <a href="#">Settings</a>
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
          id="dropdownInformation"
          ref={menu}
          className="hidden z-10 w-44 rounded divide-y shadow bg-gray-700 divide-gray-600 absolute top-[5.5rem] right-[3rem]"
        >
          <div className="py-3 px-4 text-sm text-white">
            <div>Welcome user!</div>
            <div className="font-medium truncate">{session?.user.email}</div>
          </div>
          <ul
            className="py-1 text-sm text-gray-200"
            aria-labelledby="dropdownInformationButton"
          >
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-600 hover:text-white"
                onClick={() => {
                  router.push('/logIn')
                }}
              >
                Log in
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-600 hover:text-white"
                onClick={() => {
                  router.push('/signIn')
                }}
              >
                Register
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default User

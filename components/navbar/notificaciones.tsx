import SvgBell from '@components/icons/svgBell'
import styles from '../../styles/form.module.css'

const Notificaciones = () => {
  return (
    <section className={`relative ${styles.notify}`}>
      {/* ///////////////////////////////////////////////// */}
      <button className="relative">
        <span className="h-4 w-4 bg-red-500 rounded-full inline-flex absolute top-[0.35rem] border-[3px] border-gray-900 z-10"></span>
        <span className="animate-ping h-4 w-4 bg-red-500 rounded-full inline-flex absolute top-[0.35rem] z-10"></span>
        <SvgBell className={`m-3 ${styles.bell}`} width={'25'} height={'25'} />
      </button>
      {/* ///////////////////////////////////////////////// */}
      <section className="absolute">
        <div
          id="dropdownNotification"
          className={`z-20 w-full bg-white divide-y divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-700 rounded-lg`}
          aria-labelledby="dropdownNotificationButton"
          data-popper-reference-hidden=""
          data-popper-escaped=""
          data-popper-placement="bottom"
          // style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(0px, 10px);"
        >
          {/* ----------------------------------------------------------------------------- */}
          <div className="block py-2 px-4 font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white rounded-t-xl">
            Notifications
          </div>
          {/* ----------------------------------------------------------------------------- */}

          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            <a
              href="#"
              className="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="flex-shrink-0">
                {/* <img className="w-11 h-11 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image"> */}
                <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-blue-600 rounded-full border border-white dark:border-gray-800">
                  <svg
                    className="w-3 h-3 text-white"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                  </svg>
                </div>
              </div>
              <div className="pl-3 w-full">
                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                  New message from{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Jese Leos
                  </span>
                  {`: "Hey, what's up? All set for the presentation?"`}
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-500">
                  a few moments ago
                </div>
              </div>
            </a>
            <a
              href="#"
              className="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="flex-shrink-0">
                {/* <img className="w-11 h-11 rounded-full" src="/docs/images/people/profile-picture-2.jpg" alt="Joseph image"> */}
                <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-gray-900 rounded-full border border-white dark:border-gray-800">
                  <svg
                    className="w-3 h-3 text-white"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                  </svg>
                </div>
              </div>
              <div className="pl-3 w-full">
                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Joseph Mcfall
                  </span>{' '}
                  and{' '}
                  <span className="font-medium text-gray-900 dark:text-white">
                    5 others
                  </span>{' '}
                  started following you.
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-500">
                  10 minutes ago
                </div>
              </div>
            </a>
            <a
              href="#"
              className="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="flex-shrink-0">
                {/* <img className="w-11 h-11 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"> */}
                <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-red-600 rounded-full border border-white dark:border-gray-800">
                  <svg
                    className="w-3 h-3 text-white"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="pl-3 w-full">
                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Bonnie Green
                  </span>{' '}
                  and{' '}
                  <span className="font-medium text-gray-900 dark:text-white">
                    141 others
                  </span>{' '}
                  love your story. See it and view more stories.
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-500">
                  44 minutes ago
                </div>
              </div>
            </a>
            <a
              href="#"
              className="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="flex-shrink-0">
                {/* <img className="w-11 h-11 rounded-full" src="/docs/images/people/profile-picture-4.jpg" alt="Leslie image"> */}
                <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-green-400 rounded-full border border-white dark:border-gray-800">
                  <svg
                    className="w-3 h-3 text-white"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="pl-3 w-full">
                {/* <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span className="font-semibold text-gray-900 dark:text-white">Leslie Livingston</span> mentioned you in a comment: <span className="font-medium text-blue-500" href="#">@bonnie.green</span> what do you say?</div> */}
                <div className="text-xs text-blue-600 dark:text-blue-500">
                  1 hour ago
                </div>
              </div>
            </a>
            <a
              href="#"
              className="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="flex-shrink-0">
                {/* <img className="w-11 h-11 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Robert image"> */}
                <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-purple-500 rounded-full border border-white dark:border-gray-800">
                  <svg
                    className="w-3 h-3 text-white"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                  </svg>
                </div>
              </div>
              <div className="pl-3 w-full">
                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Robert Brown
                  </span>{' '}
                  posted a new video: Glassmorphism - learn how to implement the
                  new design trend.
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-500">
                  3 hours ago
                </div>
              </div>
            </a>
          </div>

          {/* ----------------------------------------------------------------------------- */}
          <a
            href="#"
            className="block py-2 text-sm font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white rounded-b-xl"
          >
            <div className="inline-flex items-center ">
              <svg
                className="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                <path
                  fill-rule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              View all
            </div>
          </a>
          {/* ----------------------------------------------------------------------------- */}
        </div>
      </section>
    </section>
  )
}

export default Notificaciones

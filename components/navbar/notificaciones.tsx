import SvgBell from '@components/icons/svgBell'
import styles from '../../styles/form.module.css'

const Notificaciones = () => {
  return (
    <section
      className={`flex justify-center items-center relative ${styles.notify}`}
    >
      <button className="relative group">
        <span className="h-4 w-4 bg-red-500 rounded-full inline-flex absolute top-[0.35rem] border-[3px] border-gray-900 z-10"></span>
        <span className="animate-ping h-4 w-4 bg-red-500 rounded-full inline-flex absolute top-[0.35rem] z-10"></span>
        <SvgBell
          className={`m-3 ${styles.bell} group-hover:text-yellow-500 transition-all`}
          width={'25'}
          height={'25'}
        />
      </button>
      <section className="absolute top-16 -right-40 w-full before:absolute before:-top-4 before:right-40 before:border-b-[1rem] before:border-b-gray-700 dark:before:border-b-[#303339]">
        <div
          className={`bg-gray-700 dark:bg-[#303339] divide-gray-800 dark:divide-gray-700 z-20 w-full shadow rounded-lg before:border-b-8 before:border-b-gray-700 dark:before:border-b-[#303339]`}
          data-popper-placement="bottom"
        >
          <div className="block py-2 px-4 font-medium text-center bg-gray-700 dark:bg-[#303339] text-white rounded-t-xl">
            Notifications
          </div>

          <div className="divide-y divide-gray-800 dark:divide-gray-700">
            <a
              href="#"
              className="flex py-3 px-4 hover:bg-gray-600 dark:hover:bg-[#393b41]"
            >
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
              className="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-[#393b41]"
            >
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
              className="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-[#393b41]"
            >
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
              className="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-[#393b41]"
            >
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

          <a
            href="#"
            className="block py-2 text-sm font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-[#303339] dark:hover:bg-[#393b41] dark:text-white rounded-b-xl"
          >
            <div className="inline-flex items-center ">View all</div>
          </a>
        </div>
      </section>
    </section>
  )
}

export default Notificaciones

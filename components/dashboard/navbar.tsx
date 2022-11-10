import SvgChartBar from '@components/icons/svgChartBar'
import SvgChevronDown from '@components/icons/svgChevronDown'
import type { NextPage } from 'next'
import Link from 'next/link'

const NavBar: NextPage = () => {
  return (
    <div className="dashboard__home-nav">
      <nav className="flex px-5 py-5 bg-gray-200 text-gray-600 dark:text-gray-400 border-b border-b-gray-400 dark:border-b-gray-600 dark:bg-[#202225] transition-all">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="#">
              <div className="inline-flex items-center text-sm font-medium">
                <SvgChartBar className="w-4 h-4 mr-2" />
                Dashboard
              </div>
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <SvgChevronDown className="w-6 h-6 -rotate-90" />
              <p className="ml-1 text-sm font-medium md:ml-2">Home</p>
            </div>
          </li>
        </ol>
      </nav>
    </div>
  )
}

export default NavBar

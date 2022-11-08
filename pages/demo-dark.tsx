import type { NextPage } from 'next'
import { useTheme } from 'next-themes'

const DemoDark: NextPage = () => {
  const { theme, setTheme } = useTheme()
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl">Dark/Light theme test</h1>
      <button
        className="w-auto h-auto p-5 m-5 border rounded-xl bg-black dark:bg-white text-white dark:text-black"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        Toggle to {theme === 'light' ? 'Dark' : 'Light'}
      </button>
    </div>
  )
}

export default DemoDark

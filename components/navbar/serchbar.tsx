import { FaSearch } from 'react-icons/fa'

const Serchbar = () => {
  return (
    <form className="navbar__searchbar relative">
      <button type="submit" className="absolute left-[3.2rem] top-[0.7rem]">
        <FaSearch size={20} className=" fill-slate-500 z-10" />
      </button>
      <input
        className="lg:w-96 h-11 rounded-md lg:ml-10 p-3 lg:pl-11 text-white hover:bg-slate-700 ease duration-150 focus: outline-none focus:bg-slate-700"
        type="text"
        placeholder="Search articles, colections & accounts"
      />
    </form>
  )
}

export default Serchbar

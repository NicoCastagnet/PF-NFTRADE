import Image from 'next/image'
import Link from 'next/link'

interface ItemProps {
  id: string
  name: string
  image: string
  price: number
}

const AutocompleteItem: React.FC<ItemProps> = ({ id, name, image, price }) => {
  return (
    <li className="border-b border-slate-600">
      <Link href={`/nfts/${id}`}>
        <a className="hover:bg-slate-600 flex gap-4 p-4">
          <Image
            src={image}
            alt={name}
            width={48}
            height={48}
            layout="fixed"
            className="rounded-md"
          />
          <div className="text-white text-left">
            <h3 className="text-sm font-semibold">{name}</h3>
            <p className="text-sm text-gray-300">₿ {price}</p>
          </div>
        </a>
      </Link>
    </li>
  )
}

export default AutocompleteItem

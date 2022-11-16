import SvgX from '@components/icons/svgX'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { mutate } from 'swr'

const ClearView = ({ id, setView }: { id: string; setView: any }) => {
  const { data: session } = useSession()
  const URL = `/api/notificaciones?user=${session?.user.id}`

  const handleNotView = async () => {
    setView(true)
    await axios.put(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/notificaciones?id=${id}`,
    )
    mutate(URL)
  }

  return (
    <div onClick={handleNotView}>
      <SvgX className="fill-red-600 mr-2" height={24} width={24} />
    </div>
  )
}

export default ClearView

import SvgX from '@components/icons/svgX'
import axios from 'axios'

const ClearView = ({ id, setView }: { id: string; setView: any }) => {
  const handleNotView = async () => {
    setView(true)
    await axios.put(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/notificaciones?id=${id}`,
    )
  }

  return (
    <div onClick={handleNotView}>
      <SvgX className="fill-red-600 " height={24} width={24} />
    </div>
  )
}

export default ClearView

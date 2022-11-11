import SvgLoading from '@components/icons/svgLoading'
import fetcher from '@lib/fetcher'
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import useSWR from 'swr'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

const BarChart = () => {
  const { data: session } = useSession()
  const { data: userData } = useSWR(
    `/api/dashboardata?user=${session?.user.id}`,
    fetcher,
  )

  const [chartData, setChartData] = useState({
    labels: userData?.staticDashData.buyerDates,
    datasets: [
      {
        label: 'Spent coins',
        tension: 0.3,
        data: userData?.staticDashData.buyerCoins,
        borderColor: 'lightblue',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        pointRadius: 6,
      },
    ],
  })

  const options = {
    fill: true,
    animations: {
      y: {
        easing: 'easeInOutElastic',
        from: (ctx: any) => {
          if (ctx.type === 'data') {
            if (ctx.mode === 'default' && !ctx.dropped) {
              ctx.dropped = true
              return 0
            }
          }
        },
      },
    },
    responsive: true,
    scales: {
      y: {
        display: true,
        ticks: {
          color: 'white',
        },
      },
      x: {
        display: true,
        ticks: {
          color: 'white',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  }

  return (
    <div>
      {chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <SvgLoading className="animate-spin h-6 w-6" />
      )}
    </div>
  )
}

export default BarChart

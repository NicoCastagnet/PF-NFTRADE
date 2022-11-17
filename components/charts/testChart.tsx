// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import SvgLoading from '@components/icons/svgLoading'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

const BarChart2 = ({ userData }: { userData: any }) => {
  let dates = userData?.staticDashData.buyerDates

  dates = dates?.map((e: any) => {
    const d = new Date(e)
    return `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}`
  })

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'NFT Price',
        tension: 0.3,
        data: userData?.staticDashData.buyerCoins,
        borderColor: 'lightblue',
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
        pointRadius: 6,
      },
    ],
  }

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
        <Bar data={chartData} options={options} />
      ) : (
        <SvgLoading className="animate-spin h-6 w-6" />
      )}
    </div>
  )
}

export default BarChart2

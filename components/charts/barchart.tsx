// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import SvgLoading from '@components/icons/svgLoading'
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
import { Line } from 'react-chartjs-2'

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

const BarChart = ({ userData }: { userData: any }) => {
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
        data: userData?.staticDashData.buyerCoins,
        tension: 0.3,
        borderColor: 'rgba(70, 203, 255, 0.5)',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderWidth: 2,
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
          color: 'rgb(156 163 175 / 1)',
        },
      },
      x: {
        display: true,
        ticks: {
          color: 'rgb(156 163 175 / 1)',
        },
      },
    },
    plugins: {
      title: {
        fontSize: 30,
        text: "NFT's Purchases",
        display: true,
        font: { size: 20 },
        color: 'rgb(156 163 175 / 1)',
      },
      legend: {
        labels: {
          font: { size: 14 },
          color: 'rgb(156 163 175 / 1)',
        },
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

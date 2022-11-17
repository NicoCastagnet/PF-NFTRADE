// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

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

const AdminBarChart = () => {
  const { data: totalSales } = useSWR(`/api/dashboardata`, fetcher)

  const dates = totalSales?.adminSellerDate.map((e) => e.createdAt)
  const spentCoins = totalSales?.adminSellerDate.map((e) => e.coins)
  const totalSalesPDay = totalSales?.adminSellerDate.map((e) => e.total)

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Total spent coins',
        data: spentCoins,
        tension: 0.3,
        borderColor: 'rgba(70, 203, 255, 0.5)',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderWidth: 2,
        pointRadius: 6,
      },
      {
        label: 'Total sales',
        data: totalSalesPDay,
        tension: 0.3,
        borderColor: 'rgba(255, 255, 69, 0.5)',
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
        text: "Total NFT's sales",
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

export default AdminBarChart

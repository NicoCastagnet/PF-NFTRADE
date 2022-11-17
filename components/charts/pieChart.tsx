// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import SvgLoading from '@components/icons/svgLoading'
import {
  ArcElement,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

const PieChart = ({ userData }: { userData: any }) => {
  const chartData = {
    labels: ['Approved', 'Rejected', 'In process'],
    datasets: [
      {
        data: [
          userData?.userSells.approved,
          userData?.userSells.rejected,
          userData?.userSells.in_process,
        ],
        backgroundColor: [
          'rgba(104, 242, 29, 0.2)',
          'rgba(242, 29, 29, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(104, 242, 29, 1)',
          'rgba(242, 29, 29, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 2,
        offset: [25, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      title: {
        fontSize: 30,
        text: 'Coins purchases status',
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
        <Pie data={chartData} options={options} />
      ) : (
        <SvgLoading className="animate-spin h-6 w-6" />
      )}
    </div>
  )
}

export default PieChart

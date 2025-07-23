import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Income({labels, dataPoints}) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Income',
        data: dataPoints,
        borderColor: '#60a5fa',
        backgroundColor: '#60a5fa',
        tension: 0.4,
        fill: false,
        pointBackgroundColor: '#1d4ed8',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Income graph Line' },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
        <Line data={data} options={options} className='bg-white w-100 p-2 rounded my-3'/>
  );
}

export default Income;

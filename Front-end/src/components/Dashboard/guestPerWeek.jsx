import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function guestPerWeek({labels, dataPoints}) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Guest',
        data: dataPoints,
        backgroundColor: [
          '#f87171',
          '#60a5fa',
          '#facc15',
          '#34d399',
          '#a78bfa',
          '#fb923c',
          '#f472b6',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display : false, position: 'top' },
      title: { display: true, text: 'Number of guest per week' },
    },
  };

  return <Bar data={data} options={options} className='bg-white p-2 rounded w-100'/>;
}

export default guestPerWeek;

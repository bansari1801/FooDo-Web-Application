// ==========================================
//  Author: Khushalkumar Gondaliya
// ==========================================

import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(...registerables);

const BarChart = (props) => {
  const state = {
    labels: props.labels,
    datasets: [
      {
        label: props.label,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: '  rgba(255, 99, 132, 1)',
        borderWidth: 2,
        data: props.data,
      },
    ],
  };

  return (
    <Bar
      data={state}
      width="inherit"
      height="inherit"
      options={{
        title: {
          display: true,
          text: 'Average Rainfall per month',
          fontSize: 20,
        },
        legend: {
          display: true,
          position: 'right',
        },

        maintainAspectRatio: false,
      }}
    />
  );
};

export default BarChart;

// ==========================================
//  Author: Khushalkumar Gondaliya
// ==========================================

import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(...registerables);

const LineChart = (props) => {
  const state = {
    labels: props.labels,
    datasets: [
      {
        label: props.label,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        responsive: true,
        borderWidth: 2,
        data: props.data,
      },
    ],
  };

  return (
    <Line
      data={state}
      width="inherit"
      height="inherit"
      options={{
        title: {
          display: true,
          text: 'Daily Sales for a last week',
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

export default LineChart;

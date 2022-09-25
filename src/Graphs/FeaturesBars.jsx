import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  zoomPlugin,
  Title,
  Tooltip,
  Legend
);
const FeaturesBars = ({
  dataSource = [],
}) => {
  console.log({dataSource})
  const options = {
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true
          },
          mode: 'xy',
        }
      }
    },
    scales:{
      y:{
          beginAtZero: true,
          max: 1, // values over 1 will be hidden, OR
          min: 0,
          suggestedMax: 1, // maximum will be 1, unless there is a higher value
          suggestedMin: 0,
      },
  }
  };
  
  const datasets = dataSource.map(dataset => ({
    data: dataset.values,
    label: dataset.name,
    backgroundColor: '#' + Math.random().toString(16).substr(-6)
  }))

  const labels = dataSource[0]?.keys || []

  const data = {
    labels,
    datasets,
  }

  return (
    <div style={{height: '650px'}}>
      <Bar options={options} data={data} />
    </div>
  )
}

export default FeaturesBars

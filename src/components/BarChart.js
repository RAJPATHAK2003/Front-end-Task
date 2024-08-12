
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ month }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Number of Items',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  });

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/bar-chart', {
          params: {
            month
          }
        });

        const data = response.data;
        
        // Define price ranges
        const priceRanges = [
          '0 - 100', '101 - 200', '201 - 300', '301 - 400', '401 - 500',
          '501 - 600', '601 - 700', '701 - 800', '801 - 900', '901 - above'
        ];

        // Initialize count array with zeros
        const counts = new Array(priceRanges.length).fill(0);

        // Count items in each price range
        data.forEach(item => {
          const price = item.price;
          if (price <= 100) counts[0]++;
          else if (price <= 200) counts[1]++;
          else if (price <= 300) counts[2]++;
          else if (price <= 400) counts[3]++;
          else if (price <= 500) counts[4]++;
          else if (price <= 600) counts[5]++;
          else if (price <= 700) counts[6]++;
          else if (price <= 800) counts[7]++;
          else if (price <= 900) counts[8]++;
          else counts[9]++;
        });

        setChartData({
          labels: priceRanges,
          datasets: [
            {
              label: 'Number of Items',
              data: counts,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };

    if (month) {
      fetchBarChartData();
    }
  }, [month]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-2">Price Range Distribution</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Number of Items by Price Range'
            }
          }
        }}
      />
    </div>
  );
};

export default BarChart;

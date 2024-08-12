// Statistics.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Statistics = ({ month }) => {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/statistics', {
          params: {
            month
          }
        });
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    if (month) {
      fetchStatistics();
    }
  }, [month]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-2">Statistics for Selected Month</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="text-lg font-medium">Total Sale Amount</h3>
          <p className="text-2xl font-bold">${statistics.totalSaleAmount.toFixed(2)}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="text-lg font-medium">Total Sold Items</h3>
          <p className="text-2xl font-bold">{statistics.totalSoldItems}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg">
          <h3 className="text-lg font-medium">Total Not Sold Items</h3>
          <p className="text-2xl font-bold">{statistics.totalNotSoldItems}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

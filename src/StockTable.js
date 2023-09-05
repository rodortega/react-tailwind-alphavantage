import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockTable = () => {
  const [stockData, setStockData] = useState([]);
  const apiKey = 'RIBXT3XYLI69PC0Q';

  useEffect(() => {
    const symbol = 'AAPL';

    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`
      )
      .then((response) => {
        const intradayData = response.data['Time Series (5min)'];
        const stockDataArray = Object.entries(intradayData).map(([timestamp, data]) => ({
          timestamp,
          open: parseFloat(data['1. open']),
          high: parseFloat(data['2. high']),
          low: parseFloat(data['3. low']),
          close: parseFloat(data['4. close']),
          volume: parseInt(data['5. volume']),
        }));
        setStockData(stockDataArray);
      })
      .catch((error) => {
        console.error('Error fetching stock data:', error);
      });
  }, [apiKey]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Stock Intraday Data</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100">Timestamp</th>
              <th className="py-2 px-4 bg-gray-100">Open</th>
              <th className="py-2 px-4 bg-gray-100">High</th>
              <th className="py-2 px-4 bg-gray-100">Low</th>
              <th className="py-2 px-4 bg-gray-100">Close</th>
              <th className="py-2 px-4 bg-gray-100">Volume</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((dataPoint, index) => (
              <tr key={index}>
                <td className="py-2 px-4">{dataPoint.timestamp}</td>
                <td className="py-2 px-4">${dataPoint.open.toFixed(2)}</td>
                <td className="py-2 px-4">${dataPoint.high.toFixed(2)}</td>
                <td className="py-2 px-4">${dataPoint.low.toFixed(2)}</td>
                <td className="py-2 px-4">${dataPoint.close.toFixed(2)}</td>
                <td className="py-2 px-4">{dataPoint.volume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTable;





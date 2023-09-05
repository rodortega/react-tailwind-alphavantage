import React from 'react';
import StockTable from './StockTable';

function App() {
  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md w-96">
        <header className="bg-blue-500 text-white py-4 px-6">
          <h1 className="text-2xl font-semibold">AlphaVantage Intraday Stock Data</h1>
        </header>
        <main>
          <StockTable />
        </main>
      </div>
    </div>
  );
}

export default App;

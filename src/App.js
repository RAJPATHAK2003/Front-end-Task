import logo from './logo.svg';
import './App.css';
import TransactionTable from './components/TransactionTable';
import Statistics from './components/Statistics';
import { useState } from 'react';
import BarChart from './components/BarChart';
function App() {
  const [month, setMonth] = useState('03');

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };
  return (
    <div className="App">
      <TransactionTable/>
      <Statistics/>
      <div className="container mx-auto p-4">
      <select
        value={month}
        onChange={handleMonthChange}
        className="p-2 border rounded-md mb-4"
      >
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={(i + 1).toString().padStart(2, '0')}>
            {new Date(0, i).toLocaleString('en-US', { month: 'long' })}
          </option>
        ))}
      </select>
      <BarChart month={month} />
      <TransactionTable month={month} />
    </div>
    </div>
  );
}

export default App;

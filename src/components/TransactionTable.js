import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState('03'); 
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTransactions();
  }, [month, search, page]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/transactions', {
        params: {
          page,
          perPage: 10,
          search,
          month,
        },
      });
      setTransactions(response.data.transactions);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
    setPage(1); // Reset to first page when month changes
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1); // Reset to first page when search changes
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row md:justify-between mb-4">
        <select
          value={month}
          onChange={handleMonthChange}
          className="p-2 border rounded-md mb-2 md:mb-0 md:w-1/4"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={(i + 1).toString().padStart(2, '0')}>
              {new Date(0, i).toLocaleString('en-US', { month: 'long' })}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search transactions"
          className="p-2 border rounded-md mb-2 md:mb-0 md:w-1/4"
        />
      </div>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border-b">Transaction ID</th>
            <th className="p-2 border-b">Product ID</th>
            <th className="p-2 border-b">User ID</th>
            <th className="p-2 border-b">Amount</th>
            <th className="p-2 border-b">Date</th>
            <th className="p-2 border-b">Title</th>
            <th className="p-2 border-b">Description</th>
            <th className="p-2 border-b">Price</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.transactionId} className="hover:bg-gray-50">
              <td className="p-2 border-b">{transaction.transactionId}</td>
              <td className="p-2 border-b">{transaction.productId}</td>
              <td className="p-2 border-b">{transaction.userId}</td>
              <td className="p-2 border-b">{transaction.amount}</td>
              <td className="p-2 border-b">{new Date(transaction.date).toLocaleDateString()}</td>
              <td className="p-2 border-b">{transaction.title}</td>
              <td className="p-2 border-b">{transaction.description}</td>
              <td className="p-2 border-b">{transaction.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={page <= 1}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={page >= totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionTable;

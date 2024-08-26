'use client';

import { useEffect, useState } from 'react';
import api from '../lib/api';

const Page: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionsResponse = await api.get('/transaction.getAllTransactions');
        setTransactions(transactionsResponse.data);

        const usersResponse = await api.get('/user.getAllUsers');
        setUsers(usersResponse.data);
      } catch (err) {
        setError('An error occurred while fetching data');
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Transaction and User Test</h1>
      {error && <p>{error}</p>}
      <h2>Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions found</p>
      ) : (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <p>ID: {transaction.id}</p>
              <p>Amount: {transaction.amount}</p>
              <p>Currency: {transaction.currency}</p>
            </li>
          ))}
        </ul>
      )}
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <p>ID: {user.id}</p>
              <p>Email: {user.emailAddress}</p>
              <p>Country: {user.country}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;
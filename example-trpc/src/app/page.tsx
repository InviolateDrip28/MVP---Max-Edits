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
        // Fetch transactions
        const transactionsResponse = await api.get('/transaction.getAllTransactions');
        const transactionsData = transactionsResponse.data?.result?.data;
        // Check if transactionsData is an array
        if (Array.isArray(transactionsData)) {
          setTransactions(transactionsData);
        } else {
          console.error('Expected an array for transactions but received:', transactionsData);
          setError('An error occurred while fetching transactions');
        }

        // Fetch users
        const usersResponse = await api.get('/user.getAllUsers');
        const usersData = usersResponse.data?.result?.data;
        // Check if usersData is an array
        if (Array.isArray(usersData)) {
          setUsers(usersData);
        } else {
          console.error('Expected an array for users but received:', usersData);
          setError('An error occurred while fetching users');
        }
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
          {transactions.map((transaction: any) => (
            <li key={transaction.id}>
              <p>ID: {transaction.id}</p>
              <p>User ID: {transaction.userId}</p>
              <p>Amount: {transaction.amount}</p>
              <p>Currency: {transaction.currency}</p>
              <p>Exchange Rate: {transaction.exchangeRate}</p>
              <p>Fees: {transaction.fees}</p>
              <p>Processing Time: {transaction.processingTime} seconds</p>
              <p>Transfer Method: {transaction.transferMethod}</p>
              <p>Purpose of Transfer: {transaction.purposeOfTransfer}</p>
              <p>Status: {transaction.status}</p>
              <p>Timestamp: {new Date(transaction.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map((user: any) => (
            <li key={user.id}>
              <p>ID: {user.id}</p>
              <p>Email: {user.emailAddress}</p>
              <p>Country: {user.country}</p>
              <p>City: {user.city}</p>
              <p>Age: {user.age}</p>
              <p>Gender: {user.gender}</p>
              <p>Occupation: {user.occupation}</p>
              <p>Nationality: {user.nationality}</p>
              <p>Device Used: {user.deviceUsed}</p>
              <p>Internet Access: {user.internetAccess ? 'Yes' : 'No'}</p>
              <p>Mobile Penetration: {user.mobilePenetration}</p>
              <p>Account Creation Date: {new Date(user.accountCreationDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;

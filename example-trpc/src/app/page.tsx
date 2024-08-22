
'use client';

import { useEffect, useState } from 'react';
import api from '../lib/api';

const Page = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/trpc/user.getAllUsers'); 
        setData(response.data);
      } catch (err) {
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Data from Backend</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Page;

// Example 2

// import { trpc } from '../lib/trpc';

// const HomePage = () => {
//   const { data: transactions, error: transactionsError, isLoading: transactionsLoading } = trpc.transaction.getAllTransactions.useQuery();
//   const { data: users, error: usersError, isLoading: usersLoading } = trpc.user.getAllUsers.useQuery();

//   if (transactionsLoading || usersLoading) return <p>Loading...</p>;
//   if (transactionsError || usersError) return <p>Error loading data</p>;

//   return (
//     <div>
//       <h1>Transactions</h1>
//       <ul>
//         {transactions?.map(transaction => (
//           <li key={transaction.id}>
//             {transaction.amount} {transaction.currency}
//           </li>
//         ))}
//       </ul>
//       <h1>Users</h1>
//       <ul>
//         {users?.map(user => (
//           <li key={user.id}>
//             {user.emailAddress} - {user.country}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default HomePage;

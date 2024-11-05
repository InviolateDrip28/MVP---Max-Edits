'use client';

import { useEffect, useState } from 'react';
import api from '../lib/api'; 


const Page: React.FC = () => {
  const [xe, setXe] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = {
          sell: 'USD',           
          buy: 'INR',           
          amount: 500,         
          country: 'US',       
          destinationCountry: 'IN', 
          fixed_currency: 'sell',   
        };

        console.log('params:', params);

        const response = await api.get('/xe.getXeRate', {
          params: params,
        });

        const xeData = response.data;  
        setXe(xeData); 


      } catch (err) {
        setError('An error occurred while fetching data');  
        console.error(err);
      } finally {
        setLoading(false);  
      }
    };

    fetchData();
  }, []);

  return (
    <div> 
      <h2>XE Exchange Rate</h2>

      {loading && <p>Loading...</p>} 

      {error && <p style={{ color: 'red' }}>{error}</p>} 

      {xe ? (
        <pre>{JSON.stringify(xe, null, 2)}</pre>  
      ) : (
        <p>No XE data found</p> 
      )}
    </div>
  );
};

export default Page;
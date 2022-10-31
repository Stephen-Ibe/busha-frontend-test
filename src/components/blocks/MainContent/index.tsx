import React, { useEffect, useState } from 'react';
import Loader from '../../shared/Loader';

const MainContent = () => {
  const [accounts, setAccounts] = useState<{ [key: string]: any }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3090/accounts');
      const jsonResponse = await res.json();
      console.log(jsonResponse);
      setAccounts(jsonResponse);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div className='main__content'>
      <div className='heading'>
        <h2>Wallets</h2>
      </div>
      <div className='content'>
        {loading ? (
          <div className='center__element'>
            <Loader size={50} width={5} />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default MainContent;

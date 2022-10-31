import React, { useEffect } from 'react';

const MainContent = () => {
  const fetchAccounts = async () => {
    try {
      const res = await fetch('http://localhost:3090/accounts');
      const jsonResponse = await res.json();
      console.log(jsonResponse);
    } catch (err: any) {
      console.log(err);
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
      <div className='content'></div>
    </div>
  );
};

export default MainContent;

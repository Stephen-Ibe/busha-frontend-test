import React, { useEffect, useState } from 'react';
import Loader from '../../shared/Loader';

const MainContent = () => {
  const [accounts, setAccounts] = useState<{ [key: string]: any }[]>([
    {
      balance: '2499998700',
      currency: 'NGN',
      deposit: true,
      hold: '530000000',
      id: '977dacbb-95b4-4432-9dc9-b66f707b7043',
      imgURL:
        'https://res.cloudinary.com/dwoc5fknz/image/upload/v1593000379/alice_v3/NGN.svg',
      name: 'Naira',
      payout: true,
      pending_balance: '0',
      type: 'fiat',
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);

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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div className='main__content'>
      <div className='heading'>
        <h2>Wallets</h2>
        <div className='heading__cta'>+Add New Wallet</div>
      </div>
      <hr />
      <div className='content'>
        {loading ? (
          <div className='center__element'>
            <Loader size={50} width={5} />
          </div>
        ) : accounts.length > 0 ? (
          accounts.map((account: any) => (
            <div className='account' key={account.id}>
              <div className='currency'>
                <div className='currency__img'>
                  <img src={account.imgURL} alt={`${account.currency}_img`} />
                </div>
                <h4>{account.name}</h4>
              </div>
              <div className='balance'>
                {account.type === 'fiat'
                  ? `${account.currency} ${account.balance}`
                  : `${account.balance} ${account.currency}`}
              </div>
            </div>
          ))
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default MainContent;

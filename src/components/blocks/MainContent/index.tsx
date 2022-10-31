import React, { useEffect, useState } from 'react';
import Loader from '../../shared/Loader';
import ArrowLeft from '../../../assets/images/arr.png';
import AddAccount from './AddAccount';

const MainContent = () => {
  const [accounts, setAccounts] = useState<{ [key: string]: any }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalActions, setModalActions] = useState<boolean>(false);

  const handleShowModal = () => {
    setModalActions(true);
  };

  const handleCloseModal = () => {
    setModalActions(false);
  };

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3090/accounts');
      console.log(res);
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
    <>
      <div className='main__content'>
        <div className='heading'>
          <h2>Wallets</h2>
          <div className='heading__cta' role='button' onClick={handleShowModal}>
            +Add New Wallet
          </div>
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
                <div className='account__cta'>
                  <img src={ArrowLeft} alt='account_cta' />
                </div>
              </div>
            ))
          ) : (
            ''
          )}
        </div>
      </div>
      {modalActions && <AddAccount handleClose={handleCloseModal} />}
    </>
  );
};

export default MainContent;

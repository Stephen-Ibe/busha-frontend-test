import React, { useEffect, useState } from 'react';
import Loader from '../../shared/Loader';
import NetworkError from '../NetworkError';
import Account from './Account';
import AddAccount from './AddAccount';

const MainContent = () => {
  const [accounts, setAccounts] = useState<{ [key: string]: any }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalActions, setModalActions] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleShowModal = () => {
    setModalActions(true);
  };

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3090/accounts');
      if (res.status !== 200) {
        setHasError(true);
      } else {
        const jsonResponse = await res.json();
        setAccounts(jsonResponse);
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalActions(false);
    fetchAccounts();
  };

  useEffect(() => {
    fetchAccounts();
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <>
      <div className='main__content'>
        <div className='heading'>
          <h2>Wallets</h2>
          {!hasError && (
            <div
              className='heading__cta'
              role='button'
              onClick={handleShowModal}
            >
              + Add New Wallet
            </div>
          )}
        </div>
        <hr />

        <div className='content'>
          {loading ? (
            <div className='center__element'>
              <Loader size={50} width={5} />
            </div>
          ) : hasError ? (
            <NetworkError retry={fetchAccounts} />
          ) : accounts.length > 0 ? (
            accounts.map((account: any) => (
              <Account account={account} key={account?.id} />
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

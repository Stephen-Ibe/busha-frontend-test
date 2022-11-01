import React, { useEffect, useState } from 'react';
import Loader from '../../shared/Loader';
import Modal from '../../shared/Modal';
import NetworkError from '../NetworkError';
import ErrorImg from '../../../assets/images/error.png';
import CloseError from '../../../assets/images/errClose.png';

type Props = {
  handleClose: () => void;
};

const AddAccount = ({ handleClose }: Props) => {
  const [wallets, setWallets] = useState<any>([]);
  const [formData, setFormData] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [hasError, setHasError] = useState<{ [key: string]: any }>({
    fetch: false,
    submit: false,
  });

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    setFormData(value);
    setError('');
  };

  const addWallet = async (currency: string) => {
    const payload = {
      currency,
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    };
    try {
      const res = await fetch('http://localhost:3090/account', requestOptions);
      console.log(res);
      if (res.status < 200 || res.status > 299) {
        setHasError({
          fetch: false,
          submit: false,
        });
        await res.json();
        handleClose();
      } else {
        setHasError({
          fetch: false,
          submit: true,
        });
        Promise.reject(error);
      }
    } catch (err) {
      setHasError({
        ...hasError,
        submit: true,
      });
      console.error(err);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (formData === 'Choose a wallet' || formData === '') {
      setError('Please choose an option');
    } else {
      setError('');
      addWallet(formData);
    }
  };

  const fetchWallets = async (ab?: any) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3090/wallets', {
        signal: ab.signal,
      });
      if (res.status !== 200) {
        setHasError({
          submit: false,
          fetch: true,
        });
      } else {
        const jsonResponse = await res.json();
        setWallets(jsonResponse);
        setHasError({
          submit: false,
          fetch: false,
        });
      }
    } catch (err) {
      setHasError({
        submit: false,
        fetch: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetchWallets(abortController);

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <Modal isOpen>
      {loading ? (
        <div className='center__element'>
          <Loader size={50} width={5} />
        </div>
      ) : hasError.fetch ? (
        <NetworkError retry={fetchWallets} />
      ) : (
        <div className='addWallet'>
          <div className='addAccount__heading'>
            <h2>Add New Wallet</h2>
            <div onClick={handleClose}>X</div>
          </div>
          <div className='desc'>
            <p>
              The crypto wallet will be created instantly and be available in
              your list of wallets.
            </p>
          </div>
          <div>
            <form>
              <div className='select-field'>
                <label>Select Wallet</label>
                <select
                  value={formData}
                  onChange={handleInputChange}
                  name='wallet'
                >
                  <option>Choose a wallet</option>
                  {wallets.length > 0 &&
                    wallets.map(({ currency, name }: any) => (
                      <option id={currency} value={currency} key={name}>
                        {name}
                      </option>
                    ))}
                </select>
                <p className='error__msg'>{error}</p>
              </div>
              <div className='button' onClick={handleSubmit}>
                <button type='submit'>Create Wallet</button>
              </div>
              {hasError.submit && (
                <div className='submit__err'>
                  <div className='err__desc'>
                    <img src={ErrorImg} alt='error_img' loading='lazy' />
                    <p>Network Error</p>
                  </div>
                  <div
                    className='close'
                    role='button'
                    onClick={() => setHasError({ fetch: false, submit: false })}
                  >
                    <img src={CloseError} alt='close_img' />
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AddAccount;

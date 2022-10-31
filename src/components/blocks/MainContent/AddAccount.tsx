import React, { useEffect, useState } from 'react';
import Modal from '../../shared/Modal';

type Props = {
  handleClose: () => void;
};

const AddAccount = ({ handleClose }: Props) => {
  const [wallets, setWallets] = useState<any>([]);
  const [formData, setFormData] = useState('');
  const [error, setError] = useState<string>('');

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
      const res = await fetch('http://localhost:3090/accounts', requestOptions);
      await res.json();
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (formData === 'Choose a wallet' || formData === '') {
      setError('Please choose an option');
    } else {
      setError('');
      console.log(formData);
      addWallet(formData);
    }
  };

  const fetchWallets = async () => {
    try {
      const res = await fetch('http://localhost:3090/wallets');
      const jsonResponse = await res.json();
      setWallets(jsonResponse);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  return (
    <Modal isOpen>
      <div className='addWallet'>
        <div className='addAccount__heading'>
          <h2>Add New Wallet</h2>
          <div onClick={handleClose}>X</div>
        </div>
        <div className='desc'>
          <p>
            The crypto wallet will be created instantly and be available in your
            list of wallets.
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
                defaultValue={'default'}
              >
                <option>Choose a wallet</option>
                {wallets.length > 0 &&
                  wallets.map(({ currency, name }: any) => (
                    <option id={currency} value={currency}>
                      {name}
                    </option>
                  ))}
              </select>
              <p className='error__msg'>{error}</p>
            </div>
            <div className='button' onClick={handleSubmit}>
              <button type='submit'>Create Wallet</button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddAccount;

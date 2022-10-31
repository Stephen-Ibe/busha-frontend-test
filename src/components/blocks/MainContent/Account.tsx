import React from 'react';
import ArrowLeft from '../../../assets/images/arr.png';

type Props = {
  account: { [key: string]: any };
};

const Account = ({ account }: Props) => {
  return (
    <div className='account'>
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
  );
};

export default Account;

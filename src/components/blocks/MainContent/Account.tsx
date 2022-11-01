import React from 'react';
import ArrowLeft from '../../../assets/images/arr.png';

type Props = {
  account: { [key: string]: any };
};

const Account = ({
  account: { imgURL, currency, name, type, balance },
}: Props) => {
  return (
    <div className='account'>
      <div className='currency'>
        <div className='currency__img'>
          <img src={imgURL} alt={`${currency}_img`} />
        </div>
        <h4>{name}</h4>
      </div>
      <div className='balance'>
        {type === 'fiat' ? `${currency} ${balance}` : `${balance} ${currency}`}
      </div>
      <div className='account__cta'>
        <img src={ArrowLeft} alt='account_cta' />
      </div>
    </div>
  );
};

export default Account;

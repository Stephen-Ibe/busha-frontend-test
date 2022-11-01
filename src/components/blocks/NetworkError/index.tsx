import React from 'react';
import ErrorImg from '../../../assets/images/warn.png';

type Props = {
  retry: () => void;
};

const NetworkError = ({ retry }: Props) => (
  <div className='center__element'>
    <div className='network__error'>
      <div className='error__img '>
        <img src={ErrorImg} alt='error__img' />
      </div>
      <div className='error__desc'>
        <p>Network Error</p>
        <button onClick={retry}>Try Again</button>
      </div>
    </div>
  </div>
);

export default NetworkError;

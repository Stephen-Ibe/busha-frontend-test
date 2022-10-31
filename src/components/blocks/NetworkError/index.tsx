import React from 'react';
import ErrorImg from '../../../assets/images/warn.png';

const NetworkError = () => (
  <div className='network__error center__element'>
    <div className='error__img '>
      <img src={ErrorImg} alt='error__img' />
    </div>
    <div className='error__desc'>
      <p>Network Error</p>
      <button>Try Again</button>
    </div>
  </div>
);

export default NetworkError;

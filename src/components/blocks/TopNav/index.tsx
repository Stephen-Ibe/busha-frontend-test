import React from 'react';
import Logo from '../../../assets/images/logo.png';

const TopNav = () => {
  return (
    <div className='topbar'>
      <div className='container mx-auto topbar__content'>
        <div className='logo'>
          <img src={Logo} alt='busha_logo' loading='lazy' />
        </div>
        <div className='active__user'>
          <h4 className='avatar'>O</h4>
          <h4>Oluwatobi Akindunjoye</h4>
        </div>
      </div>
    </div>
  );
};

export default TopNav;

import React from 'react';

const SideBar = () => {
  const navItems = [
    { id: 0, name: 'Wallets', isActive: true },
    { id: 1, name: 'Prices' },
    { id: 2, name: 'Peer2Peer' },
    { id: 3, name: 'Activity' },
    { id: 4, name: 'Settings' },
  ];

  return (
    <div className='sidebar'>
      <ul>
        {navItems.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;

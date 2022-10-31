import React from 'react';
import Modal from '../../shared/Modal';

type Props = {
  handleClose: () => void;
};

const AddAccount = ({ handleClose }: Props) => {
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
              <select>
                <option>Hello</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddAccount;

import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

function SignupFormModal(info) {
  const [showModal, setShowModal] = useState(false);
  console.log("info", info);
  
  return (
    <>
      <button  className = {info.styling}
      onClick={() => setShowModal(true)}>{info.text}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;

// ForgotPasswordModal.js
import React from 'react';
import './ForgotPasswordModal.css'; // Add styles for the modal

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Forgot Password</h2>
        <p>It looks like you didn't forget your password. If you need help with your account, please contact support.</p>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;

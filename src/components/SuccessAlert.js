// SuccessAlert.js
import React from 'react';
import './SuccessAlert.css'; // Create this CSS file for styling

const SuccessAlert = ({ message, onClose }) => {
  return (
    <div className="success-alert">
      <span className="success-icon">✔️</span> {/* You can use a different icon or image here */}
      <span className="success-message">{message}</span>
      <button className="success-close" onClick={onClose}>Close</button>
    </div>
  );
};

export default SuccessAlert;

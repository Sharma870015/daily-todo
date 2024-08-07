import React from 'react';
import './DeleteConfirmationModal.css';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="delete-confirmation-overlay">
      <div className="delete-confirmation-modal">
        <h3 className="delete-confirmation-title">Delete Task</h3>
        <p className="delete-confirmation-message">Are you sure you want to delete this task?</p>
        <div className="delete-confirmation-actions">
          <button className="delete-confirmation-button cancel" onClick={onClose}>No</button>
          <button className="delete-confirmation-button confirm" onClick={onConfirm}>Yes</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;

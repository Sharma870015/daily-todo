// ReminderAlert.js
import React from 'react';
import './ReminderAlert.css';

const ReminderAlert = ({ title, description, onClose }) => {
  return (
    <div className="reminder-alert-overlay">
      <div className="reminder-alert-content">
        <h2 className="reminder-alert-title">Reminder</h2>
        <p className="reminder-alert-message">{title}</p>
        <p className="reminder-alert-description">{description}</p>
        <button className="reminder-alert-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ReminderAlert;

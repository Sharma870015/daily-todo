import React, { useState, useEffect } from 'react';

const ReminderNotification = ({ title, description, onClose }) => {
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(title, { body: description });

      notification.onclick = () => {
        window.focus();
        onClose();
      };

      notification.onclose = () => {
        onClose();
      };
    } else if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          const notification = new Notification(title, { body: description });

          notification.onclick = () => {
            window.focus();
            onClose();
          };

          notification.onclose = () => {
            onClose();
          };
        }
      });
    } else {
      console.warn('Notifications are not supported by this browser.');
    }
  }, [title, description, onClose]);

  return null; // This component does not render anything
};

export default ReminderNotification;

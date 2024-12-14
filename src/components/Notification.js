import React from 'react';
import './Notification.css';

const Notification = ({ message, onClose }) => {
   return (
      <div className='notification'>
         <span>{message}</span>
         <button className='close_button' onClick={onClose}>×</button>
      </div>
   );
};

export default Notification;
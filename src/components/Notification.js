import React from 'react';
import './Notification.css';

const Notification = ({ message, onClose, isSuccess }) => {
   return (
      <div className={`notification ${isSuccess ? 'success' : 'error'}`}>
         <span>{message}</span>
         <button className='close_button' onClick={onClose}>×</button>
      </div>
   );
};

export default Notification;
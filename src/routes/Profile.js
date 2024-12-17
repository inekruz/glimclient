import React, { useState, useEffect, useCallback } from 'react';
import './Routes.css';
import Notification from '../components/Notification';
import DefaultProfileImage from '../icons/photo.svg';
import CrossImage from '../icons/cross.svg';

function Profile() {
   const [popup, setPopup] = useState(false);
   const [userData, setUserData] = useState(null);
   const username = localStorage.getItem('username');
   const [fullname, setFullname] = useState('');
   const [address, setAddress] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [successMessage, setSuccessMessage] = useState('');
   const [error, setError] = useState('');
   const [showError, setShowError] = useState(false);
   const [showSuccess, setShowSuccess] = useState(false);
   const [favCount, setFavCount] = useState(0);
   const [deliveryCount, setDeliveryCount] = useState(0);
   
   useEffect(() => {
      const fetchUserData = async () => {
         try {
            const response = await fetch('https://api.glimshop.ru/getUser', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                  login: username
               }),
            });
            if (!response.ok) {
               throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUserData(data);
            setFullname(data.fullname);
            setAddress(data.address);
            setPhoneNumber(data.phone_number);
         } catch (error) {
            console.error('Error fetching user data:', error);
         }
      };

      fetchUserData();
   }, [username]);

   const validateForm = () => {
      if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(fullname)) {
         return 'ФИО должно содержать только буквы.';
      }
      if (!/^\d+$/.test(phoneNumber)) {
         return 'Номер телефона должен содержать только цифры.';
      }
      if (password.length < 6) {
         return 'Пароль должен содержать более 6 символов.';
      }
      if (password !== confirmPassword) {
         return 'Пароли не совпадают.';
      }
      return '';
   };

   const handleUpdateUser  = async (e) => {
      e.preventDefault();

      const validationError = validateForm();
      if (validationError) {
         setError(validationError);
         setShowError(true);
         return;
      }

      try {
         const response = await fetch('https://api.glimshop.ru/updUser', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               login: username,
               fullname,
               address,
               phone_number: phoneNumber,
               password,
            }),
         });

         if (!response.ok) {
            throw new Error('Network response was not ok');
         }
         setSuccessMessage("Данные успешно обновлены!");
         setShowSuccess(true);
         setPopup(false);
         setUserData((prevData) => ({
            ...prevData,
            fullname,
            address,
            phone_number: phoneNumber,
         }));
         setError('');
      } catch (error) {
         console.error('Error updating user data:', error);
         setError('Ошибка при обновлении данных!');
         setShowError(true);
      }
   };

   const getFavCount = useCallback(async () => { 
      try {
         const response = await fetch('https://api.glimshop.ru/getCountDeferred', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login: username }),
         });
   
         if (!response.ok) {
            throw new Error('Ошибка при получении товаров');
         }
   
         const data = await response.json();
         setFavCount(data.count);
      } catch (error) {
         setError('Ошибка:', error);
      }
   }, [username]);

   const getDeliveryCount = useCallback(async () => { 
      try {
         const response = await fetch('https://api.glimshop.ru/getCountDelivery', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login: username }),
         });
   
         if (!response.ok) {
            throw new Error('Ошибка при получении товаров');
         }
   
         const data = await response.json();
         setDeliveryCount(data.count);
      } catch (error) {
         setError('Ошибка:', error);
      }
   }, [username]);

   useEffect(() => {
      getFavCount();
      getDeliveryCount();
   }, [username, getFavCount, getDeliveryCount]);

   return (
      <div className='route'>
         <h2 className='route_title'>Профиль</h2>
         {showError && <Notification message={error} onClose={() => setShowError(false)} isSuccess={false} />}
         {showSuccess && <Notification message={successMessage} onClose={() => setShowSuccess(false)} isSuccess={true} />}
         <div className='profile_container'>
            <div className='profile_container_header'></div>

            <div className='profile_info_container'>
               <div className='profile_card'>
                  <img alt='profile_photo' src={DefaultProfileImage} className='profile_photo' />

                  <div className='about'>
                     <p className='profile_name'>{userData ? userData.fullname : 'Загрузка...'}</p>
                     <p className='profile _status'>
                        {userData
                           ? (userData.role === 1 ? 'Продавец' : userData.role === 0 ? 'Покупатель' : 'Неизвестная роль')
                           : 'Загрузка...'}
                     </p>
                  </div>

                  <div className='profile_statistics'>
                     <div className='profile_statistics_item'>
                        <p className='profile_stat_name'>Товаров в избранном:</p>
                        <div>
                           <p className='profile_status'>{favCount !== null ? favCount : 'Загрузка...'}</p>
                        </div>
                     </div>

                     <div className='profile_statistics_item'>
                        <p className='profile_stat_name'>Купленно товаров: </p>
                        <div>
                           <p className='profile_status'>{deliveryCount !== null ? deliveryCount : 'Загрузка...'}</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className='profile_settings'>
                  <div className='profile_settings_header'>
                     <h2>Персональная информация</h2>
                  </div>

                  <div className='profile_settings_container'>
                     <div className='profile_settings_column'>
                        <div className='profile_settings_column_param'>
                           <p>ФИО</p>
                           <span>{userData ? userData.fullname : 'Загрузка...'}</span>
                        </div>

                        <div className='profile_settings_column_param'>
                           <p>Логин</p>
                           <span>{userData ? userData.login : 'Загрузка...'}</span>
                        </div>

                        <div className='profile_settings_column_param'>
                           <p>Адрес</p>
                           <span>{userData ? userData.address : 'Загрузка...'}</span>
                        </div>
                     </div>

                     <div className='profile_settings_column'>
                        <div className='profile_settings_column_param'>
                           <p>Номер телефона</p>
                           <span>{userData ? userData.phone_number : 'Загрузка...'}</span>
                        </div>

                        <div className='profile_settings_column_param'>
                           <p>Роль</p>
                           <span>
                              {userData
                                 ? (userData.role === 1 ? 'Продавец' : userData.role === 0 ? 'Покупатель' : 'Неизвестная роль')
                                 : 'Загрузка...'}
                           </span>
                        </div>
                     </div>
                  </div>

                  <div className='edit_button' onClick={() => setPopup(true)}>
                     Изменить
                  </div>
               </div>
            </div>
         </div>

         <div className={`edit_acc ${popup ? 'active' : ''}`} onClick={() => setPopup(false)}>
            <div className='edit_acc_container' onClick={e => e.stopPropagation()}>
               <div className='edit_acc_header'>
                  <img alt='cross' src={CrossImage} onClick={() => setPopup(false)} />
               </div>
               <form onSubmit={handleUpdateUser }>
                  <h2 className='form_title edit_profile_title'>Изменение профиля</h2>
                  <div className='form_container'>

                     <legend>ФИО</legend>
                     <input
                        placeholder=''
                        type='text'
                        required
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                     />

                     <legend>Домашний адрес</legend>
                     <input
                        placeholder=''
                        type='text'
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                     />

                     <legend>Номер телефона</legend>
                     <input
                        placeholder=''
                        type='number'
                        required
                        pattern="\d*"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                     />

                     <legend>Пароль</legend>
                     <input
                        placeholder=''
                        type='password'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />

                     <legend>Подтвердите пароль</legend>
                     <input
                        placeholder=''
                        type='password'
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}/>
                  </div>

                  <button type='submit' className='auth_button'>Изменить</button>
               </form>
            </div>
         </div>
      </div>
   );
}

export default Profile;
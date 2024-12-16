import React, { useState, useEffect } from 'react';
import './Routes.css';

import DefaultProfileImage from '../icons/photo.svg';
import CrossImage from '../icons/cross.svg';

function Profile() {
   const [popup, setPopup] = useState(false);
   const [userData, setUserData] = useState(null);
   const username = useState(localStorage.getItem('username'));

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
         } catch (error) {
            console.error('Error fetching user data:', error);
         }
      };

      fetchUserData();
   }, [username]);

   return (
      <div className='route'>
         <h2 className='route_title'>Профиль</h2>

         <div className='profile_container'>
            <div className='profile_container_header'></div>

            <div className='profile_info_container'>
               <div className='profile_card'>
                  <img alt='profile_photo' src={DefaultProfileImage} className='profile_photo' />

                  <div className='about'>
                     <p className='profile_name'>{userData ? userData.fullName : 'Загрузка...'}</p>
                     <p className='profile_status'>{userData ? userData.role : 'Загрузка...'}</p>
                  </div>

                  <div className='profile_statistics'>
                     <div className='profile_statistics_item'>
                        <p className='profile_stat_name'>Товаров в избранном: </p>
                        <div>
                           <p className='profile_status'>{userData ? userData.favoriteItemsCount : 'Загрузка...'}</p>
                        </div>
                     </div>

                     <div className='profile_statistics_item'>
                        <p className='profile_stat_name'>Товаров в пути: </p>
                        <div>
                           <p className='profile_status'>{userData ? userData.itemsInTransitCount : 'Загрузка...'}</p>
                        </div>
                     </div>

                     <div className='profile_statistics_item'>
                        <p className='profile_stat_name'>Ещё что-то: </p>
                        <div>
                           <p className='profile_status'>{userData ? userData.otherCount : 'Загрузка...'}</p>
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
                           <span>{userData ? userData.fullName : 'Загрузка...'}</span>
                        </div>

                        <div className='profile_settings_column_param'>
                           <p>Логин</p>
                           <span>{userData ? userData.username : 'Загрузка...'}</span>
                        </div>

                        <div className='profile_settings_column_param'>
                           <p>Адрес</p>
                           <span>{userData ? userData.address : 'Загрузка...'}</span>
                        </div>
                     </div>

                     <div className='profile_settings_column'>
                        <div className='profile_settings_column_param'>
                           <p>Номер телефона</p>
                           <span>{userData ? userData.phone : 'Загрузка...'}</span>
                        </div>

                        <div className='profile_settings_column_param'>
                           <p>Роль</p>
                           <span>{userData ? userData.role : 'Загрузка...'}</span>
                        </div>
                     </div>
                  </div>

                  <div className='edit_button' onClick={setPopup}>
                     Изменить
                  </div>
               </div>
            </div>
         </div>

         <div className={`edit_acc ${popup ? 'active' : ''}`} onClick={() => setPopup(false )}>
            <div className='edit_acc_container' onClick={e => e.stopPropagation()}>
               <div className='edit_acc_header'>
                  <img alt='cross' src={CrossImage} onClick={() => setPopup(false)} />
               </div>
               <form>
                  <h2 className='form_title edit_profile_title'>Изменение профиля</h2>
                  <div className='form_container'>

                     <legend>ФИО</legend>
                     <input
                       placeholder=''
                       type='text'
                       required
                       defaultValue={userData ? userData.fullName : ''}
                     />

                     <legend>Домашний адрес</legend>
                     <input
                       placeholder=''
                       type='text'
                       required
                       defaultValue={userData ? userData.address : ''}
                     />

                     <legend>Номер телефона</legend>
                     <input
                       placeholder=''
                       type='number'
                       required
                       pattern="\d*"
                       defaultValue={userData ? userData.phone : ''}
                     />

                     <legend>Пароль</legend>
                     <input
                       placeholder=''
                       type='password'
                       required
                     />

                     <legend>Подтвердите пароль</legend>
                     <input
                       placeholder=''
                       type='password'
                       required
                     />

                     <legend>Роль</legend>
                     <select className='role_select' defaultValue={userData ? userData.role : 'Покупатель'}>
                       <option>Покупатель</option>
                       <option>Продавец</option>
                     </select>
                  </div>

                  <button className='auth_button'>Изменить</button>
               </form>
            </div>
         </div>
      </div>
   );
}

export default Profile;
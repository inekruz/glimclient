import React, { useState } from 'react';
import './Routes.css';

import DefaultProfileImage from '../icons/photo.svg';
import CrossImage from '../icons/cross.svg';

function Profile() {

   const [popup, setPopup] = useState(false);

   return (
      <div className='route'>
         <h2 className='route_title'>Профиль</h2>

         <div className='profile_container'>
            <div className='profile_container_header'></div>

            <div className='profile_info_container'>
               <div className='profile_card'>
                  <img alt='profile_photo' src={DefaultProfileImage} className='profile_photo' />

                  <div className='about'>
                     <p className='profile_name'>Некруз Икромов</p>
                     <p className='profile_status'>Покупатель</p>
                  </div>

                  <div className='profile_statistics'>
                     <div className='profile_statistics_item'>
                        <p className='profile_stat_name'>Товаров в избранном: </p>
                        <div>
                           <p className='profile_status'>17</p>
                        </div>
                     </div>

                     <div className='profile_statistics_item'>
                        <p className='profile_stat_name'>Товаров в пути: </p>
                        <div>
                           <p className='profile_status'>4</p>
                        </div>
                     </div>

                     <div className='profile_statistics_item'>
                        <p className='profile_stat_name'>Ещё что-то: </p>
                        <div>
                           <p className='profile_status'>44</p>
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
                           <span>Некруз Икромов</span>
                        </div>

                        <div className='profile_settings_column_param'>
                           <p>Логин</p>
                           <span>@inekruz</span>
                        </div>

                        <div className='profile_settings_column_param'>
                           <p>Адрес</p>
                           <span>ул. Фабричая, 9</span>
                        </div>
                     </div>

                     <div className='profile_settings_column'>
                        <div className='profile_settings_column_param'>
                           <p>Номер телефона</p>
                           <span>+723455667</span>
                        </div>

                        <div className='profile_settings_column_param'>
                           <p>Роль</p>
                           <span>Покупатель</span>
                        </div>

                        <div className='profile_settings_column_param'>
                           <p>Пароль</p>
                           <span>12416135612</span>
                        </div>
                     </div>
                  </div>

                  <div className='edit_button' onClick={setPopup}>
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
               <form>
                  <h2 className='form_title edit_profile_title'>Изменение профиля</h2>
                  <div className='form_container'>

                     <legend>ФИО</legend>
                     <input
                       placeholder=''
                       type='text'
                       required
                     />

                     <legend>Домашний адрес</legend>
                     <input
                       placeholder=''
                       type='text'
                       required
                     />

                     <legend>Номер телефона</legend>
                     <input
                       placeholder=''
                       type='number'
                       required
                       pattern="\d*"
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
                     <select className='role_select'>
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

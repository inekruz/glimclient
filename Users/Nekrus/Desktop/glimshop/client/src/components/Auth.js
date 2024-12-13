import React from 'react';
import '../App.css';


function Auth() {
   return (
      <div className='enter_acc'>
         <div className='enter_acc_container'>
            <form>
               <h2 className='form_title'>Регистрация</h2>
               <div className='form_container'>
      
                  <legend>Логин</legend>
                  <input
                    placeholder=''
                    type='text'
                    required
                  />

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

               <button className='auth_button'>Регистрация</button>
            </form>
         </div>
      </div>
   );
}

export default Auth;

import React, { useState } from 'react';
import '../App.css';
import Notification from './Notification';

function Auth() {
   const [isLogin, setIsLogin] = useState(false);
   const [formData, setFormData] = useState({
      username: '',
      fullName: '',
      address: '',
      phone: '',
      password: '',
      confirmPassword: '',
      role: 'Покупатель',
   });
   const [error, setError] = useState('');
   const [showError, setShowError] = useState(false);
   const [successMessage, setSuccessMessage] = useState('');
   const [showSuccess, setShowSuccess] = useState(false);

   const toggleForm = () => {
      setIsLogin(!isLogin);
      setError('');
      setSuccessMessage('');
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   const validateForm = () => {
      const { fullName, phone, password, confirmPassword } = formData;

      if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(fullName)) {
         return 'ФИО должно содержать только буквы.';
      }
      if (!/^\d+$/.test(phone)) {
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

   const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
       setError(validationError);
       setShowError(true);
    } else {
       try {
          const response = await fetch('https://api.glimshop.ru/addUser  ', {
             method: 'POST',
             headers: {
                'Content-Type': 'application/json',
             },
             body: JSON.stringify({
                login: formData.username,
                fullname: formData.fullName,
                address: formData.address,
                phone_number: formData.phone,
                password: formData.password,
                role: formData.role,
             }),
          });
 
          if (!response.ok) {
             const errorData = await response.json();
             throw new Error(errorData.error || 'Ошибка при регистрации');
          }
 
          setSuccessMessage('Регистрация прошла успешно!');
          setShowSuccess(true);
          setFormData({
             username: '',
             fullName: '',
             address: '',
             phone: '',
             password: '',
             confirmPassword: '',
             role: 'Покупатель',
          });
          setShowError(false);
       } catch (error) {
          setError(error.message);
          setShowError(true);
       }
    }
 };

   return (
      <div className='enter_acc'>
         <div className='enter_acc_container'>
            {showError && <Notification message={error} onClose={() => setShowError(false)} />}
            {showSuccess && <Notification message={successMessage} onClose={() => setShowSuccess(false)} />}
            <form onSubmit={handleSubmit}>
               <h2 className='form_title'>{isLogin ? 'Вход' : 'Регистрация'}</h2>
               <div className='form_container'>
                  {isLogin ? (
                     <>
                        <legend>Логин</legend>
                        <input
                           name='username'
                           value={formData.username}
                           onChange={handleChange}
                           placeholder=''
                           type='text'
                           required
                        />

                        <legend>Пароль</legend>
                        <input
                           name='password'
                           value={formData.password}
                           onChange={handleChange}
                           placeholder=''
                           type='password'
                           required
                        />
                     </>
                  ) : (
                     <>
                        <legend>Логин</legend>
                        <input
                           name='username'
                           value={formData.username}
                           onChange={handleChange}
                           placeholder=''
                           type='text'
                           required
                        />

                        <legend>ФИО</legend>
                        <input
                           name='fullName'
                           value={formData.fullName}
                           onChange={handleChange}
                           placeholder=''
                           type='text'
                           required
                        />

                        <legend>Домашний адрес</legend>
                        <input
                           name='address'
                           value={formData.address}
                           onChange={handleChange}
                           placeholder=''
                           type='text'
                           required
                        />

                        <legend>Номер телефона</legend>
                        <input
                           name='phone'
                           value={formData.phone}
                           onChange={handleChange}
                           placeholder=''
                           type='text'
                           required
                        />

                        <legend>Пароль</legend>
                        <input
                           name='password'
                           value={formData.password}
                           onChange={handleChange}
                           placeholder=''
                           type='password'
                           required
                        />

                        <legend>Подтвердите пароль</legend>
                        <input
                           name='confirmPassword'
                           value={formData.confirmPassword}
                           onChange={handleChange}
                           placeholder=''
                           type='password'
                           required
                        />

                        <legend>Роль</legend>
                        <select name='role' value={formData.role} onChange={handleChange} className='role _select'>
                           <option>Покупатель</option>
                           <option>Продавец</option>
                        </select>
                     </>
                  )}
               </div>

               <button className='auth_button'>{isLogin ? 'Войти' : 'Регистрация'}</button>
               <p className='toggle_form' onClick={toggleForm}>
                  {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
               </p>
            </form>
         </div>
      </div>
   );
}

export default Auth;
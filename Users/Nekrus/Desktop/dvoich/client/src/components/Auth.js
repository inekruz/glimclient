import React, { useState } from 'react';
import axios from 'axios';

const Auth = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(true); // Переключение между формой входа и регистрации
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Функция для обработки формы регистрации или входа
  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = isLogin ? 'https://api.dvoich.ru/login' : 'https://api.dvoich.ru/register';
    const data = { login, password };

    try {
      const response = await axios.post(url, data);
      if (isLogin) {
        // Если вход успешен, сохраняем токен в localStorage
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token); // Передаем токен в родительский компонент
        setMessage('Успешный вход!');
      } else {
        setMessage('Пользователь успешно зарегистрирован!');
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response ? error.response.data.message : 'Ошибка сервера');
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Логин</label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
      </form>
      <p>{message}</p>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Не зарегистрированы? Зарегистрируйтесь' : 'Есть аккаунт? Войдите'}
      </button>
    </div>
  );
};

export default Auth;

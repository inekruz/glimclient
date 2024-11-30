import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('https://api.dvoich.ru/auth/login', { login, password });
      setSuccess('Успешная авторизация! Токен: ' + response.data.token);
      setLogin('');
      setPassword('');
    } catch (error) {
      setError(error.response?.data?.message || 'Ошибка авторизации');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Авторизация</h1>
      {error && <div className="login-error">{error}</div>}
      {success && <div className="login-success">{success}</div>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login">Логин</label>
          <input
            type="text"
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Введите логин"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;

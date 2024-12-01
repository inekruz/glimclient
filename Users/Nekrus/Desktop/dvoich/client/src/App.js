import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')); // Храним токен в state

  // Проверяем, если токен уже в localStorage, восстанавливаем его в state
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div>
      {token ? (
        <div>
          <h1>Добро пожаловать!</h1>
          <button onClick={logout}>Выйти</button>
        </div>
      ) : (
        <Auth setToken={setToken} />
      )}
    </div>
  );
};

export default App;

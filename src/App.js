import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, Route, Routes, useLocation } from 'react-router-dom';

import Auth from './components/Auth';
import Main from './routes/Main';
import Basket from './routes/Basket';
import Profile from './routes/Profile';
import Favorite from './routes/Favorite';
import Delivery from './routes/Delivery';
import Control from './routes/Control';

import ProfileIcon from './icons/profile.svg';
import BasketIcon from './icons/basket.svg';
import LocationIcon from './icons/location.svg';
import MenuMain from './icons/main_menu.svg';
import MenuDelivery from './icons/delivery_menu.svg';
import MenuLike from './icons/menu_like.svg';
import MenuAdd from './icons/menu_add.svg';
import ExitIcon from './icons/exit.svg';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const location = useLocation();
  const [locationPopup, setLocationPopup] = useState(false);
  const [address, setAddress] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    setToken(null);
    setUsername(null);
    setRole(null);
  };

  const roleText = role === '1' ? 'Продавец' : role === '0' ? 'Покупатель' : '';

  useEffect(() => {
    const fetchAddress = async () => {
      if (username) {
        try {
          console.log("adrrsss:", username);
          const response = await fetch('https://api.glimshop.ru/getAddress', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login: username }),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          if (data.length > 0) {
            setAddress(data[0].address);
            console.log("add", data[0].address);
          } else {
            setAddress('Адрес не найден');
          }
        } catch (error) {
          console.error('Error fetching address:', error);
          setAddress('Ошибка при получении адреса');
        }
      }
    };

    fetchAddress();
  }, [username]);

  if (!token) {
    return <Auth setToken={setToken} setUsername={setUsername} setRole={setRole} />;
  } else {
    console.log("Получен роль: ", roleText);
    return (
      <div className="App">
        <header>
          <div className='header_container'>
            <div>
              <Link to='/'>
                <p className='logo'>Glim Shop</p>
              </Link>
            </div>

            <input 
              placeholder='Поиск' 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div>
              <Link to='/profile'>
                <img src={ProfileIcon} alt='profile' className='profile_button' />
              </Link>
              <img src={LocationIcon} alt='location' className='profile_button' onClick={() => setLocationPopup(prev => !prev)} />
              <Link to='/basket'>
                <img src={BasketIcon} alt='basket' className='profile_button' />
              </Link>
              <img src={ExitIcon} alt='exit' className='profile_button' onClick={handleLogout} />
            </div>
          </div>
        </header>

        <div className='nav_menu'>
          <ul className='nav_menu_list'>
            <Link to='/' className={`nav_menu_list_item ${location.pathname === '/' ? 'active' : ''}`}>
              <li className='nav_menu_list_item_container'>
                <div className='menu_icon_container'>
                  <img alt='Иконка меню' src={MenuMain} className='menu_icon' />
                </div>
                <p>Главная</p>
              </li>
            </Link>

            <Link to='/favorite' className={`nav_menu_list_item ${location.pathname === '/favorite' ? 'active' : ''}`}>
              <li className='nav_menu_list_item_container'>
                <div className='menu_icon_container'>
                  <img alt='Иконка меню' src={MenuLike} className='menu_icon' />
                </div>
                <p>Отложенное</p>
              </li>
            </Link>

            <Link to='/delivery' className={`nav_menu_list_item ${location.pathname === '/delivery' ? 'active' : ''}`}>
              <li className='nav_menu_list_item_container'>
                <div className='menu_icon_container'>
                  <img alt='Иконка меню' src={MenuDelivery} className='menu_icon' />
                </div>
                <p>Доставки</p>
              </li>
            </Link>

            {roleText === 'Продавец' && (
              <Link to='/control' className={`nav_menu_list_item ${location.pathname === '/control' ? 'active' : ''}`}>
                <li className='nav_menu_list_item_container'>
                  <div className='menu_icon_container'>
                    <img alt='Иконка меню' src={MenuAdd} className='menu_icon' />
                  </div>
                  <p>Управление</p>
                </li>
              </Link>
            )}
          </ul>
        </div>

        <div className='content'>
          <div className={`location_popup ${locationPopup ? 'active' : ''}`}>
            <p className='fix_position' />
            <p>{address}</p>
            <Link to='/profile' className='location_popup_link'>
              Изменить?
            </Link>
          </div>
          <Routes>
            <Route path='/profile' element={<Profile username={username} />} />
            <Route path='/' element={<Main searchQuery={searchQuery} />} /> 
            <Route path='/basket' element={<Basket />} />
            <Route path='/favorite' element={<Favorite />} />
            <Route path='/delivery' element={<Delivery />} />
            <Route path='/control' element={<Control username={username} />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
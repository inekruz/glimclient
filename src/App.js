import React, { useState } from 'react';
import './App.css';
import { Link, Route, Routes, useLocation } from 'react-router-dom';

import Auth from './components/Auth';
import Main from './routes/Main';
import Basket from './routes/Basket';
import Profile from './routes/Profile';
import Favorite from './routes/Favorite';
import Delivery from './routes/Delivery';
import AddProduct from './routes/AddProduct';

import ProfileIcon from './icons/profile.svg';
import BasketIcon from './icons/basket.svg';
import LocationIcon from './icons/location.svg';
import MenuMain from './icons/main_menu.svg';
import MenuDelivery from './icons/delivery_menu.svg';
import MenuLike from './icons/menu_like.svg';
import MenuAdd from './icons/menu_add.svg';
import ExitIcon from './icons/exit.svg';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token')); // Получаем токен из localStorage
  const [username, setUsername] = useState(localStorage.getItem('username')); // Получаем логин из localStorage
  const location = useLocation();
  const [locationPopup, setLocationPopup] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
    setUsername(null);
  };

  if (!token) {
    return <Auth setToken={setToken} setUsername={setUsername} />;
  } else {
    return (
      <div className="App">
        <header>
          <div className='header_container'>
            <div>
              <Link to='/'>
                <p className='logo'>Stecenco</p>
              </Link>
            </div>

            <input placeholder='Поиск' />

            <div>
              <Link to='/profile'>
                <img src={ProfileIcon} alt='profile' className='profile_button' />
              </Link>
              <img src={LocationIcon} alt='location' className='profile_button' onClick={() => setLocationPopup(prev => !prev)} />
              <Link to='/basket'>
                <img src={BasketIcon} alt='basket' className='profile_button' />
              </Link>
              <button onClick={handleLogout} className='profile_button'>
                <img src={ExitIcon} alt='exit' className='profile_button' /> {/* Используем иконку вместо текста */}
              </button>
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

            <Link to='/addproduct' className={`nav_menu_list_item ${location.pathname === '/addproduct' ? 'active' : ''}`}>
              <li className='nav_menu_list_item_container'>
                <div className='menu_icon_container'>
                  <img alt='Иконка меню' src={MenuAdd} className='menu _icon' />
                </div>
                <p>Добавить товар (это для продавцов)</p>
              </li>
            </Link>
          </ul>
        </div>

        <div className='content'>
          <div className={`location_popup ${locationPopup ? 'active' : ''}`}>
            <p></p>
            <p>ул. Фабричная, 9</p>
            <Link to='/profile' className='location_popup _link'>
              Изменить?
            </Link>
          </div>
          <Routes>
            <Route path='/profile' element={<Profile username={username} />} />
            <Route path='/' element={<Main />} />
            <Route path='/basket' element={<Basket />} />
            <Route path='/favorite' element={<Favorite />} />
            <Route path='/delivery' element={<Delivery />} />
            <Route path='/addproduct' element={<AddProduct />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
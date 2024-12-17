import React, { useState, useEffect } from 'react';
import './Routes.css';
import { Link } from 'react-router-dom';

import NoDelivery from '../icons/no_delivery.svg';
import Example from '../images/primer.png';


function Delivery() {
  const [delivery, setDelivery] = useState([]);
  const [error, setError] = useState(null);
  const login = localStorage.getItem('username');

  useEffect(() => {
    const getDelivery = async () => {
      try {
        const response = await fetch('https://api.glimshop.ru/getDelivery', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ login }),
        });

        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }

        const data = await response.json();
        setDelivery(data);
      } catch (error) {
        setError(error.message);
      }
    };

    getDelivery();
  }, [login]);

  if (error) {
    return (
      <div className='route no_delivery_route'>
        <h2 className='route_title'>Доставки</h2>
        <div className='no_delivery'>
          <div>
            <img src={NoDelivery} alt='Машина' />
            <h2>Ошибка при получении данных</h2>
            <p>{error}</p>
            <Link to='/' className='buy_button new_link'>Посмотреть товары</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!delivery.length) {
    return (
      <div className='route no_delivery_route'>
        <h2 className='route_title'>Доставки</h2>
        <div className='no_delivery'>
          <div>
            <img src={NoDelivery} alt='Машина' />
            <h2>Здесь ничего нет</h2>
            <Link to='/' className='buy_button new_link'>Посмотреть товары</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='route'>
      <h2 className='route_title'>Доставки</h2>

      <ul className='main_products_list'>
        {delivery.map((product, index) => (
          <li key={index} className='delivery_list_item'>
            <div className='fav_list_item_container'>
              <img className='main_products_image fav_products_image' alt='Изображение товара' src={Example} />
              <div className='fav_list_item_desc'>
                <div>
                  <p className='fav_product_name white'>{product.product_name}</p>
                  <p className='product_category orng'>{product.product_category}</p>
                </div>
                <p className='price white'>{product.product_price} ₽</p>
              </div>
              <div className='white'>
                <p className='status_display'>{product.status}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Delivery;
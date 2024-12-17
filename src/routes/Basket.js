import React, { useState, useEffect } from 'react';
import './Routes.css';
import Example from '../images/primer.png';
import { Link } from 'react-router-dom';

import BasketIcon from '../icons/basket.svg';

function Basket() {
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const login = localStorage.getItem('username');
   const [deferredItems, setDeferredItems] = useState([]);
   const [totalSum, setTotalSum] = useState(0);

   const handleDelete = async (product_id) => {
      try {
         const response = await fetch('https://api.glimshop.ru/delBasket', {
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, product_id }),
         });

         if (!response.ok) {
            throw new Error('Ошибка при удалении товара');
         }

         setDeferredItems(prevItems => prevItems.filter(item => item.product_id !== product_id));

         const updatedTotal = totalSum - (deferredItems.find(item => item.product_id === product_id)?.product_price || 0);
         setTotalSum(updatedTotal);
      } catch (error) {
         console.error('Ошибка:', error);
      }
   };

   const handleAddToBasket = async (item) => {
      try {
         const response = await fetch('https://api.glimshop.ru/addDelivery', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               login,
               product_id: item.product_id,
               product_name: item.product_name,
               product_price: item.product_price,
               product_category: item.product_category
            }),
         });

         if (!response.ok) {
            throw new Error('Ошибка при добавлении товара в корзину');
         }

         const data = await response.json();
         console.log(data.message);
      } catch (error) {
         console.error('Ошибка:', error);
      }
   };

   useEffect(() => {
      const fetchBasket = async () => {
         try {
            const response = await fetch('https://api.glimshop.ru/getBasket', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({ login }),
            });

            if (!response.ok) {
               throw new Error('Ошибка при получении данных корзины');
            }

            const data = await response.json();
            setDeferredItems(data);
         } catch (error) {
            setError(error.message);
         } finally {
            setLoading(false);
         }
      };

      if (login) {
         fetchBasket();
      }
   }, [login]);

   if (loading) {
      return <p>Загрузка...</p>;
   }

   if (error) {
      return <p>Ошибка: {error}</p>;
   }

   if (!deferredItems.length)
   {
      return (
         <div className='route no_delivery_route'>
            <h2 className='route_title'>Корзина</h2>
            <div className='no_delivery'>
               <div>
                 <img src={BasketIcon} alt='Машина' />
                 <h2>Здесь ничего нет</h2>
                 <Link to='/' className='buy_button new_link'>Посмотреть товары</Link>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className='route'>
         <h2 className='route_title'>Корзина</h2>

         <ul className='main_products_list'>
            {deferredItems.map(item => (
               <li key={item.id} className='fav_list_item'>
                  <div className='fav_list_item_container'>
                     <img className='main_products_image fav_products_image' alt='Изображение товара' src={Example} />
                     <div className='fav_list_item_desc'>
                        <div>
                           <p className='fav_product_name white'>{item.product_name}</p>
                           <p className='product_category orng'>{item.product_category}</p>
                        </div>
                        <p className='price white'>{item.product_price} ₽</p>
                     </div>
                     <span/>
                  </div>
                  <div className='basket_list_item_button_container'>
                     <button className='buy_button' onClick={() => handleAddToBasket(item)}>Купить</button>
                     <button className='buy_button delete_button' onClick={() => handleDelete(item.product_id)}>Удалить</button>
                  </div>
               </li>
            ))}
         </ul>
      </div>
   );
}

export default Basket;
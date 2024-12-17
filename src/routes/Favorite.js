import React, { useState, useEffect } from 'react';
import './Routes.css';
import Example from '../images/primer.png';

function Favorite() {
   const [likedProducts, setLikedProducts] = useState({});
   const [deferredItems, setDeferredItems] = useState([]);
   const [totalSum, setTotalSum] = useState(0);
   const login = localStorage.getItem('username');

   const setLike = (id) => {
      setLikedProducts(prev => ({
         ...prev,
         [id]: !prev[id],
      }));
   };

   useEffect(() => {
      const fetchDeferredItems = async () => {
         try {
            const response = await fetch('https://api.glimshop.ru/getDeferred', {
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
            setDeferredItems(data);

            // Вычисляем общую сумму
            const total = data.reduce((sum, item) => {
               const productPrice = item.product ? parseFloat(item.product.price) : 0; // Проверка на наличие продукта
               const count = item.count;
               return sum + (productPrice * count);
            }, 0);
            setTotalSum(total);
         } catch (error) {
            console.error('Ошибка:', error);
         }
      };

      if (login) {
         fetchDeferredItems();
      }
   }, [login]);

   return (
      <div className='route'>
         <h2 className='route_title'>Отложенное</h2>
         <p className='total_sum'>Общая сумма: {totalSum} ₽</p>

         <ul className='main_products_list'>
            {deferredItems.map(item => (
               <li key={item.product ? item.product.id : item.count} className='fav_list_item'>
                  <div className='fav_list_item_container'>
                     <img className='main_products_image fav_products_image' alt='Изображение товара' src={Example} />
                     <div className='fav_list_item_desc'>
                        <div>
                           <p className='fav_product_name white'>{item.product ? item.product.name : 'Неизвестный товар'}</p>
                           <p className='product_category orng'>{item.product ? item.product.category : 'Неизвестная категория'}</p>
                           <p className='count'>Количество: {item.count}</p> {/* Показываем количество */}
                        </div>
                        <p className='price white'>{item.product ? `${item.product.price} ₽` : 'Цена недоступна'}</p>
                     </div>
                     <span
                        className={`like_button ${likedProducts[item.product ? item.product.id : ''] ? '' : 'liked'}`}
                        onClick={() => setLike(item.product ? item.product.id : '')}
                        title='Отложить'
                     />
                  </div>
                  <div className='fav_list_item_button_container'>
                     <button className='buy_button'>Добавить в корзину</button>
                  </div>
               </li>
            ))}
         </ul>
      </div>
   );
}

export default Favorite;
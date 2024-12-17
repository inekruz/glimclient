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

   const handleDelete = async (product_id) => {
      try {
         const response = await fetch('https://api.glimshop.ru/delDeferred', {
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
         const response = await fetch('https://api.glimshop.ru/addBasket', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               login,
               product_id: item.product_id,
               product_name: item.product_name,
               product_price: item.product_price,
               product_category: item.product_category,
               product_photo_id: item.product_photo_id,
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

            const total = data.reduce((sum, item) => {
               const productPrice = item.product_price ? parseFloat(item.product_price) : 0;
               const count = item.count ? parseInt(item.count, 10) : 0;
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
               <li key={item.id} className='fav_list_item'>
                  <div className='fav_list_item_container'>
                     <img className='main_products_image fav_products_image' alt='Изображение товара' src={Example} />
                     <div className='fav_list_item_desc'>
                        <div>
                           <p className='fav_product_name white'>{item.product_name || 'Неизвестный товар'}</p>
                           <p className='product_category orng'>{item.product_category || 'Неизвестная категория'}</p>
                           <p className='count'>Количество: {item.count}</p>
                        </div>
                        <p className='price white'>{item.product_price ? `${item.product_price} ₽` : 'Цена недоступна'}</p>
                     </div>
                     <span
                        className={`like_button ${likedProducts[item.id] ? '' : 'liked'}`}
                        onClick={() => setLike(item.id)}
                        title='Отложить'
                     />
                  </div>
                  <div className='fav_list_item_button_container'>
                     <button className='buy_button' onClick={() => handleAddToBasket(item)}>Добавить в корзину</button>
                     <button className='buy_button delete_button' onClick={() => handleDelete(item.product_id)}>Удалить</button>
                  </div>
               </li>
            ))}
         </ul>
      </div>
   );
}

export default Favorite;
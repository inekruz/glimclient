import React, { useState, useEffect } from 'react';
import './Routes.css';
import Example from '../images/primer.png';

function Basket() {
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const login = localStorage.getItem('username');
   const [status, setStatus] = useState("В обработке");

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
            setProducts(data);
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

   return (
      <div className='route'>
         <h2 className='route_title'>Корзина</h2>

         <ul className='main_products_list'>
            {products.map(product => (
               <li key={product.id} className='fav_list_item'>
                  <div className='fav_list_item_container'>
                     <img className='main_products_image fav_products_image' alt='Изображение товара' src={Example} />
                     <div className='fav_list_item_desc'>
                        <div>
                           <p className='fav_product_name white'>{product.product_name}</p>
                           <p className='product_category orng'>{product.product_category}</p>
                        </div>
                        <p className='price white'>{product.product_price} ₽</p>
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
import React, { useState, useEffect } from 'react';
import './Routes.css';
import Example from '../images/primer.png';

function Main() {
   const [products, setProducts] = useState([]);
   const [likedProducts, setLikedProducts] = useState({});

   const setLike = (id) => {
      setLikedProducts(prev => ({
         ...prev,
         [id]: !prev[id],
      }));
   };

   const fetchProducts = async () => {
      try {
         const response = await fetch('https://api.glimshop.ru/getProducts', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
         });

         if (!response.ok) {
            throw new Error('Ошибка при получении товаров');
         }

         const data = await response.json();
         setProducts(data);
      } catch (error) {
         console.error('Ошибка:', error);
      }
   };

   useEffect(() => {
      fetchProducts();
   }, []);

   return (
      <div className='route main_route'>
         <h2 className='route_title'>Товары</h2>

         <ul className='main_products_list'>
            {products.map(product => (
               <li key={product.id} className='main_products_list_item'>
                  <img className='main_products_image' alt='Изображение товара' src={Example} /> {/* Замените на product.photo_id, если у вас есть URL изображения */}

                  <div className='product_info'>
                     <div className='product_info_container'>
                        <p className='price'>{product.price} ₽</p>
                        <span
                           className={`like_button ${likedProducts[product.id] ? 'liked' : ''}`}
                           onClick={() => setLike(product.id)}
                           title='Отложить'
                        />
                     </div>
                     <p className='product_name'>{product.name} <b className='product_category orng'>/ {product.category}</b></p>
                  </div>

                  <div className='buy_button_container'>
                     <button className='buy_button'>Добавить в корзину</button>
                  </div>
               </li>
            ))}
         </ul>
      </div>
   );
}

export default Main;
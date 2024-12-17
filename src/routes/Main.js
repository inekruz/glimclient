import React, { useState, useEffect } from 'react';
import './Routes.css';
import Example from '../images/primer.png';

function Main() {
   const [products, setProducts] = useState([]);
   const [likedProducts, setLikedProducts] = useState({});
   const [sortOrder, setSortOrder] = useState({ key: '', direction: 'asc' });

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

   const sortProducts = (key) => {
      const direction = sortOrder.key === key && sortOrder.direction === 'asc' ? 'desc' : 'asc';
      setSortOrder({ key, direction });

      const sortedProducts = [...products].sort((a, b) => {
         if (direction === 'asc') {
            return a[key] > b[key] ? 1 : -1;
         } else {
            return a[key] < b[key] ? 1 : -1;
         }
      });

      setProducts(sortedProducts);
   };

   return (
      <div className='route main_route'>
         <h2 className='route_title'>Товары</h2>

         <div className='main_header'>
            <p>Сортировать по:</p>
            <p className='main_header_item' onClick={() => sortProducts('name')}>Названию</p>
            <p className='main_header_item' onClick={() => sortProducts('price')}>Цене</p>
            <p className='main_header_item' onClick={() => sortProducts('category')}>Категории</p>
         </div>

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
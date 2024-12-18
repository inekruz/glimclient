import React, { useState, useEffect } from 'react';
import './Routes.css';
import Example from '../images/primer.png';
import Notification from '../components/Notification';

function Main({ searchQuery }) {
   const [products, setProducts] = useState([]);
   const [likedProducts, setLikedProducts] = useState({});
   const [sortOrder, setSortOrder] = useState({ key: '', direction: 'asc' });
   const login = localStorage.getItem('username');
   const [showError, setShowError] = useState(false);
   const [showSuccess, setShowSuccess] = useState(false);
   const [successMessage, setSuccessMessage] = useState('');
   const [error, setError] = useState('');
   const setLike = async (product) => {
      try {
         const response = await fetch('https://api.glimshop.ru/setDeferred', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               login,
               product_id: product.id,
               product_name: product.name,
               product_price: product.price,
               product_category: product.category,
               product_photo_id: product.photo_id,
            }),
         });
   
         if (!response.ok) {
            throw new Error('Ошибка при отправке запроса');
         }
   
         setSuccessMessage("Успешно добавлено в отложенное!");
         setLikedProducts(prev => ({
            ...prev,
            [product.id]: !prev[product.id],
         }));
         setShowSuccess(true);
      } catch (error) {
         console.error('Ошибка:', error);
         setError('Ошибка при добавлении в отложенные');
         setShowError(true);
      }
   };

   const handleAddToBasket = async (product) => {
      try {
         const response = await fetch('https://api.glimshop.ru/addBasket', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               login,
               product_id: product.id,
               product_name: product.name,
               product_price: product.price,
               product_category: product.category,
               product_photo_id: product.photo_id,
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
         setError('Ошибка:', error);
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

   const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
   );

   return (
      <div className='route main_route'>
         <h2 className='route_title'>Товары</h2>
         {showError && <Notification message={error} onClose={() => setShowError(false)} isSuccess={false} />}
         {showSuccess && <Notification message={successMessage} onClose={() => setShowSuccess(false)} isSuccess={true} />}
         <div className='main_header'>
            <p>Сортировать по:</p>
            <p className='main_header_item' onClick={() => sortProducts('name')}>Названию</p>
            <p className='main_header_item' onClick={() => sortProducts('price')}>Цене</p>
            <p className='main_header_item' onClick={() => sortProducts('category')}>Категории</p>
         </div>

         <ul className='main_products_list'>
            {filteredProducts.map(product => (
               <li key={product.id} className='main_products_list_item'>
                  <img className='main_products_image' alt='Изображение товара' src={Example} />

                  <div className='product_info'>
                     <div className='product_info_container'>
                        <p className='price'>{product.price} ₽</p>
                        <span
                           className={`like_button${likedProducts[product.id] ? ' liked' : ''}`}
                           onClick={() => setLike(product)}
                           title='Отложить'
                        />
                     </div>
                     <p className='product_name'>{product.name} <b className='product_category orng'>/ {product.category}</b></p>
                  </div>

                  <div className='buy_button_container'>
                     <button className='buy_button' onClick={() => handleAddToBasket(product)}>Добавить в корзину</button>
                  </div>
               </li>
            ))}
         </ul>
      </div>
   );
}

export default Main;

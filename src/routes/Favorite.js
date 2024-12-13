import React, { useState } from 'react';
import './Routes.css';

import Example from '../images/primer.png';

const products = [
   {
      id: 1,
      image: Example,
      price: '392',
      name: 'Корзина еды',
      category: 'Еда',
   }
];

function Favorite() {
   const [likedProducts, setLikedProducts] = useState({});

   const setLike = (id) => {
      setLikedProducts(prev => ({
         ...prev,
         [id]: !prev[id],
      }));
   };

   return (
      <div className='route'>
         <h2 className='route_title'>Отложенное</h2>

         <ul className='main_products_list'>
            {products.map(product => (
               <li key={product.id} className='fav_list_item'>
                  <div className='fav_list_item_container'>
                     <img className='main_products_image fav_products_image' alt='Изображение товара' src={product.image} />
                     <div className='fav_list_item_desc'>
                        <div>
                           <p className='fav_product_name white'>{product.name}</p>
                           <p className='product_category orng'>{product.category}</p>
                        </div>
                        <p className='price white'>{product.price} ₽</p>
                     </div>
                     <span
                        className={`like_button ${likedProducts[product.id] ? '' : 'liked'}`}
                        onClick={() => setLike(product.id)}
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
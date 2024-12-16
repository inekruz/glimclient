import React from 'react';
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

function Basket() {
   return (
      <div className='route'>
         <h2 className='route_title'>Корзина</h2>

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
                     <span/>
                  </div>
                  <div className='basket_list_item_button_container'>
                     <button className='buy_button'>Купить</button>
                     <button className='buy_button delete_button'>Удалить из корзины</button>
                  </div>
               </li>
            ))}
         </ul>
      </div>
   );
}

export default Basket;
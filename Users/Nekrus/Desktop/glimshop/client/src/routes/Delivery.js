import React from 'react';
import './Routes.css';
import { Link } from 'react-router-dom';

import NoDelivery from '../icons/no_delivery.svg';
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

function Delivery() {

   const delivery = true;

   if (delivery === false) {
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
   else {
      return (
         <div className='route'>
            <h2 className='route_title'>Доставки</h2>

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
                     <div className='white'>
                        <p>В пути</p>
                     </div>
                  </div>
               </li>
            ))}
         </ul>
         </div>
      );
   }
}

export default Delivery;
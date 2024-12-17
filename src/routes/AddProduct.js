import React, { useState } from 'react';
import './Routes.css';

import Example from '../images/primer.png';

function AddProduct() {
   const [productName, setProductName] = useState('Eda');
   const [productCategory, setProductCategory] = useState('Еда');
   const [productPrice, setProductPrice] = useState(392);

   return (
      <div className='route'>
         <h2 className='route_title'>Добавление товара</h2>

         <div className='profile_container'>
            <div className='profile_container_header'></div>

            <div className='profile_info_container'>
               <div className='profile_card pre_watch'>
                  <h3 className='pre_watch_title'>Предпросмотр</h3>
                  <div className='main_products_list_item'>
                     <img className='main_products_image' alt='Изображение товара' src={Example} />

                     <div className='product_info'>
                        <div className='product_info_container'>
                           <p className='price'>{productPrice} ₽</p>
                        </div>
                        <p className='product_name'>{productName} <b className='product_category orng'>/ {productCategory}</b></p>
                     </div>

                     <div className='buy_button_container'>
                        <button className='pre_watch_button'>Добавить в корзину</button>
                     </div>
                  </div>
               </div>

               <div className='profile_settings'>
                  <div className='profile_settings_header'>
                     <h2>Информация о товаре</h2>
                  </div>

                  <div className='profile_settings_container'>
                     <div className='profile_settings_column'>
                        <div className='profile_settings_column_param'>
                           <p>Название</p>
                           <input 
                              type='text' 
                              value={productName} 
                              className='add_product_param' 
                              onChange={(e) => setProductName(e.target.value)} 
                           />
                        </div>

                        <div className='profile_settings_column_param'>
                           <p>Категория</p>
                           <input 
                              type='text' 
                              value={productCategory} 
                              className='add_product_param' 
                              onChange={(e) => setProductCategory(e.target.value)} 
                           />
                        </div>

                        <div className='profile_settings_column_param'>
                           <p>Цена</p>
                           <input 
                              type='number' 
                              value={productPrice} 
                              className='add_product_param' 
                              onChange={(e) => setProductPrice(e.target.value)} 
                           />
                        </div>
                     </div>

                  </div>

                  <div className='edit_button'>
                     Добавить
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default AddProduct;
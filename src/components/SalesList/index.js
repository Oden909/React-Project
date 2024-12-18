import React from 'react';
import style from '../CategoryProducts/CategoryProducts.module.css';
import { NavLink } from 'react-router-dom';

const SalesList = ({ products }) => {
  return (
    <div className={style.productList}>
      {products.map((product) => {
        const finalPrice = product.discont_price !== null ? product.discont_price : product.price;
        const discount = product.price - finalPrice;
        const discountPercentage = discount > 0 ? Math.round((discount / product.price) * 100) : 0;
        return (
          <div key={product.id} className={style.productCard}>
            <NavLink to={`/products/${product.id}`} className={style.productLink}>
              <div className={style.productImageContainer}>
                <img 
                  src={`http://localhost:3333${product.image}`} 
                  alt={product.title} 
                  className={style.productImage} 
                />
                {discount > 0 && (
                  <span className={style.discountBadge}>{discountPercentage}%</span>
                )}
                <button className={style.addToCartButton}>Add to cart</button>
              </div>
              <h3 className={style.productTitle}>{product.title}</h3>
              <div className={style.priceContainer}>
                <p className={style.productPrice}>${finalPrice}</p>
                {discount > 0 && (
                  <p className={style.oldPrice}>${product.price}</p>
                )}
              </div>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};

export default SalesList;

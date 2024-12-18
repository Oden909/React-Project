import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/productSlice';
import CategoryProducts from '../../components/CategoryProducts';
import FilterProducts from '../../components/FilterProducts';
import style from './DiscountedProductsPage.module.css';

const DiscountedProductsPage = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  const productsStatus = useSelector((state) => state.products.status);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);

  useEffect(() => {
    if (productsStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, productsStatus]);

  useEffect(() => {
    const discountedProducts = products.filter((product) => product.discont_price !== null);
    setOriginalProducts([...discountedProducts]);
    setFilteredProducts([...discountedProducts]);
  }, [products]);

  const applyFilters = ({ priceFrom, priceTo }) => {
    let updatedProducts = [...originalProducts];

    if (priceFrom) {
      updatedProducts = updatedProducts.filter((product) => product.price >= priceFrom);
    }
    if (priceTo) {
      updatedProducts = updatedProducts.filter((product) => product.price <= priceTo);
    }

    setFilteredProducts(updatedProducts);
  };

  const handleSortChange = (option) => {
    let sortedProducts = [...filteredProducts];

    if (option === 'newest') {
      sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } 
    else if (option === 'price-desc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } 
    else if (option === 'price-asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } 
    else if (option === 'default') {
      sortedProducts = [...originalProducts];
    }
    setFilteredProducts(sortedProducts);
  };

  if (productsStatus === 'loading') return <div>Loading discounted products...</div>;

    return (
        <div className={style.discountedProductsPage}>
            <h1>Discounted items</h1>
            <FilterProducts 
                onFilterChange={applyFilters} 
                onSortChange={handleSortChange} 
                hideDiscountFilter={true} 
            />
            <CategoryProducts products={filteredProducts} />
        </div>
    );
};

export default DiscountedProductsPage;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/productSlice';
import { fetchCategories } from '../../store/categorySlice';
import CategoryProducts from '../../components/CategoryProducts';
import FilterProducts from '../../components/FilterProducts';
import style from './AllProductsPage.module.css';

const AllProductsPage = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  const productsStatus = useSelector((state) => state.products.status);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);

  useEffect(() => {
    if (productsStatus === 'idle') {
      dispatch(fetchProducts());
    }
    dispatch(fetchCategories());
  }, [dispatch, productsStatus]);

  useEffect(() => {
    if (products.length > 0) {
      setOriginalProducts([...products]);
      setFilteredProducts([...products]);
    }
  }, [products]);

  const applyFilters = ({ priceFrom, priceTo, onlyDiscounted }) => {
    let updatedProducts = [...originalProducts];

    if (priceFrom) {
      updatedProducts = updatedProducts.filter((product) => product.price >= priceFrom);
    }
    if (priceTo) {
      updatedProducts = updatedProducts.filter((product) => product.price <= priceTo);
    }
    if (onlyDiscounted) {
      updatedProducts = updatedProducts.filter(
        (product) => product.discont_price !== null
      );
    }

    setFilteredProducts(updatedProducts);
  };

  const handleSortChange = (option) => {
    let sortedProducts = [...filteredProducts];

    if (option === 'price-desc') {
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

  if (productsStatus === 'loading') return <div>Loading products...</div>;

  return (
    <div className={style.allProductsPage}>
      <h1>All products</h1>
      <FilterProducts 
        onFilterChange={applyFilters} 
        onSortChange={handleSortChange} 
      />
      <CategoryProducts products={filteredProducts}/>
    </div>
  );
};

export default AllProductsPage;

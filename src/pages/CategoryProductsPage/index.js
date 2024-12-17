import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../../store/productSlice';
import { fetchCategories } from '../../store/categorySlice';
import CategoryProducts from '../../components/CategoryProducts';
import FilterProducts from '../../components/FilterProducts';
import style from './CategoryProductsPage.module.css';

const CategoryProductsPage = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.categories);
  const products = useSelector((state) => state.products.products);
  const productsStatus = useSelector((state) => state.products.status);
  const currentCategory = categories.find((category) => category.id === Number(categoryId));

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (productsStatus === 'idle') {
      dispatch(fetchProducts());
    }
    dispatch(fetchCategories());
  }, [dispatch, productsStatus]);

  const applyFilters = ({ priceFrom, priceTo, onlyDiscounted }) => {
    let updatedProducts = products.filter(
      (product) => product.categoryId === Number(categoryId)
    );
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

    if (option === 'newest') {
      sortedProducts = sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } 
    else if (option === 'price-desc') {
      sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
    } 
    else if (option === 'price-asc') {
      sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
    }
    setFilteredProducts(sortedProducts);
  };

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) => product.categoryId === Number(categoryId))
    );
  }, [products, categoryId]);

  if (productsStatus === 'loading') return <div>Loading products...</div>;

  return (
    <div className={style.categoryProductsPage}>
      <h1>{currentCategory.title}</h1>
      <FilterProducts onFilterChange={applyFilters} onSortChange={handleSortChange} />
      <CategoryProducts products={filteredProducts} />
    </div>
  );
};

export default CategoryProductsPage;
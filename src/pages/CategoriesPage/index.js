import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/categorySlice';
import CategoryList from '../../components/CategoryList';
import style from './CategoriesPage.module.css';

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const status = useSelector((state) => state.categories.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  return (
    <div className={style.categoriesPage}>
      <h1>Categories</h1>
      <CategoryList categories={categories} />
    </div>
  );
};

export default CategoriesPage;

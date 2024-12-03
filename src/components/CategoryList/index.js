import React from 'react';
import style from './CategoryList.module.css';

const CategoryList = ({ categories }) => {
  return (
    <div className={style.categoryList}>
      {categories.map((category) => (
        <div key={category.id} className={style.categoryCard}>
          <img src={category.image} alt={category.title} className={style.categoryImage} />
          <h3 className={style.categoryTitle}>{category.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;

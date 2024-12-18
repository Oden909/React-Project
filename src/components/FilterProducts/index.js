import React, { useState } from 'react';
import style from './FilterProducts.module.css';

const FilterProducts = ({ onFilterChange, onSortChange, hideDiscountFilter }) => {
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [sortOption, setSortOption] = useState('default');

  const handleFilterChange = (updatedFilters) => {
    onFilterChange(updatedFilters);
  };

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    setSortOption(selectedSort);
    onSortChange(selectedSort);
  };

  return (
    <div className={style.filters}>
      <div className={style.filterBlock}>
        <label className={style.filterLabel}>Price</label>
        <input
          type="number"
          value={priceFrom}
          onChange={(e) => {
            setPriceFrom(e.target.value);
            handleFilterChange({
              priceFrom: e.target.value,
              priceTo,
              onlyDiscounted,
            });
          }}
          placeholder="from"
        />
      </div>
      
      <div className={style.filterBlock}>
        <label className={style.filterLabel}></label>
        <input
          type="number"
          value={priceTo}
          onChange={(e) => {
            setPriceTo(e.target.value);
            handleFilterChange({
              priceFrom,
              priceTo: e.target.value,
              onlyDiscounted,
            });
          }}
          placeholder="to"
        />
      </div>
      {!hideDiscountFilter && (
        <div className={style.filterBlock}>
          <label className={style.filterLabel}>Discounted items</label>
          <input
            type="checkbox"
            checked={onlyDiscounted}
            onChange={(e) => {
              setOnlyDiscounted(e.target.checked);
              handleFilterChange({
                priceFrom,
                priceTo,
                onlyDiscounted: e.target.checked,
              });
            }}
          />
        </div>
      )}

      <div className={style.filterBlock}>
        <label className={style.filterLabel}>Sorted</label>
        <select onChange={handleSortChange} value={sortOption}>
          <option value="default">by default</option>
          <option value="newest">newest</option>
          <option value="price-desc">price: high-low</option>
          <option value="price-asc">price: low-high</option>
        </select>
      </div>
    </div>
  );
};

export default FilterProducts;

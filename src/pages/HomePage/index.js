import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/categorySlice';
import CategoryList from '../../components/CategoryList';
import style from './HomePage.module.css';
import homepageBanner from '../../assets/homepage_banner.jpg';
import formBackgroundImg from '../../assets/form_back.png';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const status = useSelector((state) => state.categories.status);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    alert('Форма успешно отправлена!');
    reset();
  };

  return (
    <div className={style.homepage}>
      <section className={style.banner}>
        <div className={style.overlay}></div>
        <img src={homepageBanner} alt="Banner" className={style.bannerImage} />
        <div className={style.bannerContent}>
          <h1>Amazing Discounts on Garden Products!</h1>
          <button className={style.checkOutButton}>Check Out</button>
        </div>
      </section>

      <section className={style.categories}>
        <div className={style.categoriesTopMenu}>
          <h1>Categories</h1>
          <NavLink to="/categories">
            <button className={style.viewAllButton}>All Categories</button>
          </NavLink>
        </div>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>Error loading categories</p>}
        {status === 'succeeded' && <CategoryList categories={categories.slice(0, 4)} />}
      </section>

      <section className={style.discountForm}>
        <h3>5% off on the first order</h3>
        <div className={style.formContainer}>
          <img src={formBackgroundImg} alt="FormPhoto" className={style.formImage} />
          <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
            <div className={style.formGroup}>
              <input
                type="text"
                placeholder="Name"
                {...register('name', {
                  required: 'Имя обязательно',
                  minLength: { value: 2, message: 'Имя должно быть не короче 2 символов' },
                })}
              />
              {errors.name && <p className={style.error}>{errors.name.message}</p>}
            </div>

            <div className={style.formGroup}>
              <input
                type="tel"
                placeholder="Phone"
                {...register('phone', {
                  required: 'Телефон обязателен',
                  pattern: {
                    value: /^[0-9]{10,}$/,
                    message: 'Телефон должен содержать только цифры',
                  },
                })}
              />
              {errors.phone && <p className={style.error}>{errors.phone.message}</p>}
            </div>

            <div className={style.formGroup}>
              <input
                type="email"
                placeholder="Email"
                {...register('email', {
                  required: 'Email обязателен',
                  pattern: {
                    value: /^([A-z])+([0-9-_.])*([A-z0-9-_.])*@([A-z])+([0-9-_.])*([A-z0-9-_.])*[.]([A-z]){2,6}$/,
                    message: 'Указан некорректный email',
                  },
                })}
              />
              {errors.email && <p className={style.error}>{errors.email.message}</p>}
            </div>
            <button type="submit" className={style.submitButton}>
              Get a discount
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};

export default HomePage;

import React from 'react';
import { NavLink } from 'react-router-dom';
import NotFoundImg from '../../assets/NotFoundImg.png';
import style from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <div className={style.container}>
      <img width={690} src={NotFoundImg} alt="Not Found" />
      <h1 className={style.title}>Page Not Found</h1>
      <p className={style.text}>
        We’re sorry, the page you requested could not be found. 
        <br/>
        Please go back to the homepage.
      </p>
      <NavLink to='/'>
        <button className={style.button}>Go Home</button>
      </NavLink>
    </div>
  );
}

export default NotFoundPage;

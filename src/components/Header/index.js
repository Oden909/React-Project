import { NavLink } from 'react-router-dom';
import style from './Header.module.css';
import logo from '../../assets/logo.svg';
import cartIcon from '../../assets/cart.svg';

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.logo}>
        <NavLink to='/'>
            <img src={logo} alt="Logo" className={style.logoImage} />
        </NavLink>
      </div>
      <nav className={style.nav}>
        <NavLink className={({ isActive }) => isActive ? style.activeLink : style.link} to="/">Main Page</NavLink>
        <NavLink className={({ isActive }) => isActive ? style.activeLink : style.link} to="/categories">Categories</NavLink>
        <NavLink className={({ isActive }) => isActive ? style.activeLink : style.link} to="/products">All Products</NavLink>
        <NavLink className={({ isActive }) => isActive ? style.activeLink : style.link} to="/sales">All Sales</NavLink>
      </nav>
      <div className={style.icons}>
        <button className={style.cart}>
            <NavLink to='cart'>
                <img src={cartIcon} alt="Cart" className={style.cartIcon} />
            </NavLink>
        </button>
      </div>
    </header>
  );
};

export default Header;

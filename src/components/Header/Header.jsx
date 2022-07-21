import React from 'react';
import style from './Header.module.css';
import { ReactComponent as LogoIcon } from './image/logo.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Layout } from '../Layout/Layout';
import { Currencies } from '../Currencies/Currencies';
import { Exchange } from '../Exchange/Exchange';
// import { Auth } from '../Auth/Auth';
import { ReactComponent as ExitIcon } from './image/arrow.svg';

export const Header = props => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.setItem('token', '');
    navigate('/auth');
  };

  return (
    <div className={style.header}>
      <Layout>
        <div className={style.container}>
          <Link to='/auth'>
            <LogoIcon className={style.logo}/>
          </Link>
          {token && (
            <ul className={style.nav}>
              <NavLink to='/currencies' element={<Currencies/>}>Счета</NavLink>
              <NavLink to='/exchange' element={<Exchange/>}>Обмен</NavLink>
              <button
                className={style.exit}
                onClick={logOut}>
                Выйти <ExitIcon className={style.arrow}/>
              </button>
            </ul>
          )}
        </div>
      </Layout>
    </div>
  );
};


import React from 'react';
import style from './Header.module.css';
import { ReactComponent as LogoIcon } from './image/logo.svg';
import { Link, NavLink } from 'react-router-dom';
import { Layout } from '../Layout/Layout';
import { Currencies } from '../Currencies/Currencies';
import { Exchange } from '../Exchange/Exchange';
import { Auth } from '../Auth/Auth';
import { ReactComponent as ExitIcon } from './image/arrow.svg';

export const Header = props => {
  const token = localStorage.getItem('token');

  return (
    <div className={style.header}>
      <Layout>
        <div className={style.container}>
          <Link to='/auth'>
            <LogoIcon/>
          </Link>
          {token && (
            <ul className={style.nav}>
              <NavLink to='/currencies' element={<Currencies/>}>Счета</NavLink>
              <NavLink to='/exchange' element={<Exchange/>}>Обмен</NavLink>
              <Link
                className={style.exit}
                to='/auth' element={<Auth/>}>Выйти <ExitIcon/></Link>
            </ul>
          )}
        </div>
      </Layout>
    </div>
  );
};


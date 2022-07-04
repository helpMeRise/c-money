import React from 'react';
import style from './Header.module.css';
import { ReactComponent as LogoIcon } from './image/logo.svg';
import { Link } from 'react-router-dom';
import { Layout } from '../Layout/Layout';

export const Header = props => (
  <div className={style.header__container}>
    <Layout>
      <Link to='/'>
        <LogoIcon/>
      </Link>
    </Layout>
  </div>
);

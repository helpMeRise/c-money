import React from 'react';
import style from './Footer.module.css';
import { ReactComponent as LogoIcon } from '../Header/image/logo.svg';
import { Link } from 'react-router-dom';
import { Layout } from '../Layout/Layout';

export const Footer = props => (
  <Layout>
    <div className={style.footer}>
      <Link to='/'>
        <LogoIcon className={style.logo}/>
      </Link>
      <span className={style.copy}>© C-Money, 2022</span>
    </div>
  </Layout>
);

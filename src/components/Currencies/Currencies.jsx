import React, { useEffect, useState } from 'react';
import style from './Currencies.module.css';
import { Layout } from '../Layout/Layout';
import { Card } from './Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { currenciesSlice } from '../../store/currencies/currenciesSlice';
import axios from 'axios';
import { URL_API } from '../../api/const';
import CircleLoader from 'react-spinners/CircleLoader';

export const Currencies = () => {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const currenciesList = useSelector(state => state.currenciesReducer.data);
  const [arr, setArr] = useState([]);
  const loading = useSelector(state => state.currenciesReducer.loading);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    dispatch(currenciesSlice.actions.currenciesRequest());
  }, [selected, currenciesList.length]);

  const sort = () => {
    const select = document.querySelector(`.${style.select}`);
    const indexSelected = select.selectedIndex;
    const option = select.querySelectorAll('option')[indexSelected];
    const selectedId = option.getAttribute('id');
    const newArr = [...currenciesList.payload];

    if (selectedId === 'account') {
      newArr.sort((a, b) => a.account - b.account);
      setSelected(selectedId);
    }
    if (selectedId === 'balance') {
      newArr.sort((a, b) => b.balance - a.balance);
      setSelected(selectedId);
    }
    if (selectedId === 'date') {
      newArr.sort((a, b) => b.date - a.date);
      setSelected(selectedId);
    }
    if (selectedId === 'last') {
      newArr.sort((a, b) => b.transactions.date - a.transactions.date);
      setSelected(selectedId);
    }
    setArr(newArr);
  };

  const newAccount = () => {
    axios(`${URL_API}/create-account`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${token}`,
      }
    })
      .then(() => dispatch(currenciesSlice.actions.currenciesRequest()));
  };

  return (
    <Layout>
      {loading ? (
        <div className={style.preloader__container}>
          <CircleLoader color='tomato' size={150}/>
        </div>
      ) : (
        <div className={style.container}>
          <h2 className={style.title}>????????????????????????, ??????????????????!</h2>
          <button
            className={style.button + ' button'}
            onClick={newAccount}
          >
            ?????????????? ?????????? ????????
          </button>
          <div className={style.currencies}>
            <h3 className={style.currencies__title}>?????? ??????????</h3>
            <div className={style.sort}>
              <span className={style.sort__title}>????????????????????:</span>
              <select className={style.select} onChange={sort}>
                <option id='account'>?????????? ??????????</option>
                <option id='balance'>????????????</option>
                <option id='date'>???????? ????????????????</option>
                <option id='last'>???????? ?????????????????? ??????????????????????</option>
              </select>
            </div>
            <ul className={style.list}>
              {arr.length ? arr.map(item => (
                <Card className={style.card} key={item.account} data={item} />
              )) : currenciesList.payload.map(item => (
                <Card key={item.account} data={item} />
              ))
              }
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
};

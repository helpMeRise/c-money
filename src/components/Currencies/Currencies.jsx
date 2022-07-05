import React, { useEffect } from 'react';
import style from './Currencies.module.css';
import { Layout } from '../Layout/Layout';
import { Card } from './Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { currenciesSlice } from '../../store/currencies/currenciesSlice';

export const Currencies = () => {
  const dispatch = useDispatch();
  const currenciesList = useSelector(state => state.currenciesReducer.data);
  const loading = useSelector(state => state.currenciesReducer.loading);

  useEffect(() => {
    dispatch(currenciesSlice.actions.currenciesRequest());
  }, []);

  return (
    <Layout>
      <div className={style.container}>
        <h2 className={style.title}>Здравствуйте, Александр!</h2>
        <button
          className={style.button + ' button'}>
          Открыть новый счет
        </button>
        <div className={style.currencies}>
          <h3 className={style.currencies__title}>Мои счета</h3>
          <div className={style.sort}>
            <span className={style.sort__title}>Сортировка:</span>
            <select className={style.select}>
              <option>Номер счёта</option>
              <option>Баланс</option>
              <option>Дата открытия счета</option>
              <option>Последней транзакции</option>
            </select>
          </div>
          {loading ? (
            <h2>Загрузка...</h2>
          ) : (
            <ul className={style.list}>
              {currenciesList.payload.map(item => (
                <Card key={item.account} data={item} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
};

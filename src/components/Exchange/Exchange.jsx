import React, { useEffect } from 'react';
import style from './Exchange.module.css';
import { Layout } from '../Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { accountSlice } from '../../store/account/accountSlice';
import { numberWithSpaces } from '../../utils/numberWithSpaces';
import { myCurrenciesSlice } from '../../store/myCurrencies/myCurrenciesSlice';

export const Exchange = () => {
  const dispatch = useDispatch();
  const accountData = useSelector(state => state.accountReducer.data.payload);
  const currencies = useSelector(
    state => state.myCurrenciesReducer.data
  );
  const loading = useSelector(state => state.accountReducer.loading);
  const currenciesLoading = useSelector(state =>
    state.myCurrenciesReducer.loading);
  useEffect(() => {
    dispatch(accountSlice.actions.accountRequest('24051911200915061003240821'));
    dispatch(myCurrenciesSlice.actions.myCurrenciesRequest());
  }, []);
  const arr = [];
  if (!currenciesLoading) {
    // eslint-disable-next-line guard-for-in
    for (const key in currencies) {
      arr.push(currencies[key]);
    }
  }

  return (
    <Layout>
      <div className={style.container}>
        <h2 className={style.title}>Обмен валюты</h2>
        <span className={style.text}>Счет</span>
        <span className={style.text_white}>
          {!loading && accountData.account}
        </span>
        <br/>
        <span className={style.text}>Баланс </span>
        <span className={style.text_white + ' ' + style.balance}>
          {!loading && numberWithSpaces(accountData.balance)}
        </span>
        <div className={style.wrapper}>
          <div className={style.rates__wrapper}>
            <table>
              <thead>
                <tr>
                  <th
                    className={style.rates__title}
                    colSpan={3}>
                    Изменение курса в режиме реального времени
                  </th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
          <div className={style.right__wrapper}>
            <div className={style.exchange__wrapper}>
              <h3 className={style.exchange__title}>Обмен валюты</h3>
              <form className={style.form}>
                <div className={style.inputs__wrapper}>
                  <div className={style['input-wrapper']}>
                    <label className={style.label}>Откуда</label>
                    <select className={style.input}>
                      {arr.map(item => (
                        <option key={item.code}>{item.code}</option>
                      ))}
                    </select>
                  </div>
                  <div className={style['input-wrapper']}>
                    <label className={style.label}>Куда</label>
                    <input className={style.input}/>
                  </div>
                  <div className={style['input-wrapper']}>
                    <label className={style.label}>Сумма</label>
                    <input className={style.input}/>
                  </div>
                </div>
                <button className={style.button + ' button'}>Обменять</button>
              </form>
            </div>
            <div className={style.currency}>
              <table>
                <thead>
                  <tr>
                    <th className={style.currency__title} colSpan={2}>
                      Мои валюты
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {arr.map(item => (
                    <tr className={style.tr} key={item.code}>
                      <td className={style.td__code}>{item.code}</td>
                      <td className={style.td__amount}>
                        {numberWithSpaces(item.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

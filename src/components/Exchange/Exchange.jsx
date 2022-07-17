import React, { useEffect, useState } from 'react';
import style from './Exchange.module.css';
import { Layout } from '../Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { accountSlice } from '../../store/account/accountSlice';
import { numberWithSpaces } from '../../utils/numberWithSpaces';
import { myCurrenciesSlice } from '../../store/myCurrencies/myCurrenciesSlice';
import { URL_API, URL_API_WS } from '../../api/const';
import { ReactComponent as ArrowUp } from './image/up.svg';
import { ReactComponent as ArrowDown } from './image/down.svg';
import axios from 'axios';
import { useForm } from 'react-hook-form';

let socetData = {};
export const socket = new WebSocket(`${URL_API_WS}/currency-feed`);

export const Exchange = () => {
  const token = localStorage.getItem('token');
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
  const [body, setBody] = useState([]);


  useEffect(() => {
    socket.addEventListener('message', message => {
      socetData = JSON.parse(message.data);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setBody([...body, socetData]);
      if (body.length > 7) {
        setBody(body.slice(-7));
      }
    }, 1000);
  }, [socetData]);

  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    axios(`${URL_API}/currency-buy`, {
      data,
      method: 'POST',
      headers: {
        Authorization: `Basic ${token}`,
      }
    })
      .then(() => {
        dispatch(myCurrenciesSlice.actions.myCurrenciesRequest());
      })
      .catch(error => alert(error));
    reset();
  };

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
            <h3
              className={style.rates__title}>
              Изменение курса в режиме реального времени
            </h3>
            <div className={style.tbody}>
              {body.map((item, index) => (
                <div className={style.tr_e} key={index}>
                  <span
                    className={style.td__first}>{item.from}/{item.to}</span>
                  <span className={style.td__second}/>
                  <span className={style.td__third}>
                    {item.rate}{item.change === 1 ? (<ArrowUp/>) :
                    (<ArrowDown/>)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className={style.right__wrapper}>
            <div className={style.exchange__wrapper}>
              <h3 className={style.exchange__title}>Обмен валюты</h3>
              <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.inputs__wrapper}>
                  <div className={style['input-wrapper']}>
                    <label className={style.label}>Откуда</label>
                    <select className={style.input}
                      {...register('from')}
                    >
                      {arr.map(item => (
                        <option key={item.code}>{item.code}</option>
                      ))}
                    </select>
                  </div>
                  <div className={style['input-wrapper']}>
                    <label className={style.label}>Куда</label>
                    <select className={style.input}
                      {...register('to')}
                    >
                      {arr.map(item => (
                        <option key={item.code}>{item.code}</option>
                      ))}
                    </select>
                  </div>
                  <div className={style['input-wrapper']}>
                    <span className={style.form__error}>
                      {errors?.amount && (errors?.amount?.message || 'Error')}
                    </span>
                    <label className={style.label}>Сумма</label>
                    <input className={style.input}
                      {...register('amount', {
                        required: 'Поле обязательно к заполнению',
                        min: {
                          value: 1,
                          message: 'Сумма больше 1'
                        }
                      })}
                    />
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
                        {Number.isInteger(item.amount) ?
                          numberWithSpaces(item.amount) :
                          numberWithSpaces((item.amount).toFixed(2))}
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

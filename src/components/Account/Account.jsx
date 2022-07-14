import React, { useEffect } from 'react';
import style from './Account.module.css';
import { Layout } from '../Layout/Layout';
import { useLocation } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { defaults } from 'chart.js';
import { Chart as ChartJS,
  Tooltip,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { accountSlice } from '../../store/account/accountSlice';
import { Table } from './Table/Table';
import { ReactComponent as ArrowIcon } from './image/arrow.svg';
import CircleLoader from 'react-spinners/CircleLoader';
import { Link } from 'react-router-dom';
import { Currencies } from '../Currencies/Currencies';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { URL_API } from '../../api/const';

ChartJS.register(
  Tooltip, LineElement,
  CategoryScale, LinearScale, PointElement
);
defaults.color = `#C6B6D7`;


export const Account = () => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  const { id } = location.state;
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

  const dispatch = useDispatch();
  const accountData = useSelector(state => state.accountReducer.data.payload);
  const loading = useSelector(state => state.accountReducer.loading);
  useEffect(() => {
    dispatch(accountSlice.actions.accountRequest(id));
  }, []);

  const dataForChart = () => {
    const transactions = {
      decemberTransactions: 0,
      novemberTransactions: 0,
      octoberTransactions: 0,
      septemberTransactions: 0,
      augustTransactions: 0,
      julyTransactions: 0,
      juneTransactions: 0,
      mayTransactions: 0,
      aprilTransactions: 0,
      marchTransactions: 0,
      februaryTransactions: 0,
      januaryTransactions: 0,
    };
    accountData.transactions.forEach(item => {
      if (new Date().getFullYear() === new Date(item.date).getFullYear()) {
        if (new Date(item.date).getMonth() === 11) {
          if (item.from === id) {
            transactions.decemberTransactions -= item.amount;
          } else {
            transactions.decemberTransactions += item.amount;
          }
        }
        if (new Date(item.date).getMonth() === 10) {
          if (item.from === id) {
            transactions.novemberTransactions -= item.amount;
          } else {
            transactions.novemberTransactions += item.amount;
          }
        }
        if (new Date(item.date).getMonth() === 9) {
          if (item.from === id) {
            transactions.octoberTransactions -= item.amount;
          } else {
            transactions.octoberTransactions += item.amount;
          }
        }
        if (new Date(item.date).getMonth() === 8) {
          if (item.from === id) {
            transactions.septemberTransactions -= item.amount;
          } else {
            transactions.septemberTransactions += item.amount;
          }
        }
        if (new Date(item.date).getMonth() === 7) {
          if (item.from === id) {
            transactions.augustTransactions -= item.amount;
          } else {
            transactions.augustTransactions += item.amount;
          }
        }
        if (new Date(item.date).getMonth() === 6) {
          if (item.from === id) {
            transactions.julyTransactions -= item.amount;
          } else {
            transactions.julyTransactions += item.amount;
          }
        }
        if (new Date(item.date).getMonth() === 5) {
          if (item.from === id) {
            transactions.juneTransactions -= item.amount;
          } else {
            transactions.juneTransactions += item.amount;
          }
        }
        if (new Date(item.date).getMonth() === 4) {
          if (item.from === id) {
            transactions.mayTransactions -= item.amount;
          } else {
            transactions.mayTransactions += item.amount;
          }
        }
        if (new Date(item.date).getMonth() === 3) {
          if (item.from === id) {
            transactions.aprilTransactions -= item.amount;
          } else {
            transactions.aprilTransactions += item.amount;
          }
        }
        if (new Date(item.date).getMonth() === 2) {
          if (item.from === id) {
            transactions.marchTransactions -= item.amount;
          } else {
            transactions.marchTransactions += item.amount;
          }
        }
        if (new Date(item.date).getMonth() === 1) {
          if (item.from === id) {
            transactions.februaryTransactions -= item.amount;
          } else {
            transactions.februaryTransactions += item.amount;
          }
        }
        if (new Date(item.date).getMonth() === 0) {
          if (item.from === id) {
            transactions.januaryTransactions -= item.amount;
          } else {
            transactions.januaryTransactions += item.amount;
          }
        }
      }
    });

    const decemberBalance = transactions.decemberTransactions;
    const novemberBalance = transactions.novemberTransactions;
    const octoberBalance = transactions.octoberTransactions;
    const septemberBalance = transactions.septemberTransactions;
    const augustBalance = transactions.augustTransactions;
    const julyBalance = transactions.julyTransactions;
    const juneBalance = transactions.juneTransactions;
    const mayBalance = transactions.mayTransactions;
    const aprilBalance = transactions.aprilTransactions;
    const marchBalance = transactions.marchTransactions;
    const februaryBalance = transactions.februaryTransactions;
    const januaryBalance = transactions.januaryTransactions;
    return {
      decemberBalance,
      novemberBalance,
      octoberBalance,
      septemberBalance,
      augustBalance,
      julyBalance,
      juneBalance,
      mayBalance,
      aprilBalance,
      marchBalance,
      februaryBalance,
      januaryBalance
    };
  };

  let data = null;
  if (!loading) {
    const currentMonth = new Date().getMonth();
    const monthsBalance = [
      dataForChart().januaryBalance,
      dataForChart().februaryBalance,
      dataForChart().marchBalance,
      dataForChart().aprilBalance,
      dataForChart().mayBalance,
      dataForChart().juneBalance,
      dataForChart().julyBalance,
      dataForChart().augustBalance,
      dataForChart().septemberBalance,
      dataForChart().octoberBalance,
      dataForChart().novemberBalance,
      dataForChart().decemberBalance,
    ];
    const arr = [];
    const reversed = [...monthsBalance].reverse();
    let currentBalance = accountData.balance;
    reversed.forEach((item, index) => {
      if (item === 0) return;
      arr.unshift(currentBalance);
      currentBalance -= item;
    });
    if (arr.length < currentMonth) {
      for (let i = 0; i < currentMonth; i++) {
        arr.unshift(0);
      }
    }
    const currentMonthsBalance = arr.slice(0, currentMonth + 1);

    data = {
      labels: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь',
        'Июль', 'Август', 'Сен', 'Окт', 'Ноя', 'Дек'],
      datasets: [
        {
          datasets: 'First Dataset',
          data: currentMonthsBalance,
          borderWidth: 5,
          borderColor: '#B865D6',
        }
      ]
    };
  }

  const onSubmit = data => {
    axios(`${URL_API}/transfer-funds`, {
      data: {
        from: accountData.account,
        amount: data.amount,
        to: data.to,
      },
      method: 'POST',
      headers: {
        Authorization: `Basic ${token}`
      }
    })
      .then(({ data }) => {
        if (!data.payload) {
          alert(data.error);
        } else {
          alert('Перевод успешно завершен');
        }
      })
      .catch(error => alert(error));
    reset();
  };

  return (
    <Layout>
      {loading ? (
        <div className={style.preloader__container}>
          <CircleLoader color='tomato' size={150}/>
        </div>
      ) : (
        <div className={style.container}>
          <div className={style.container__header}>
            <h2 className={style.title}>Счет №{id}</h2>
            <Link className={style.button + ' button'}
              to={'/currencies'} element={<Currencies/>}>
              <ArrowIcon/>Вернуться
            </Link>
          </div>
          <div className={style.dynamic}>
            <div className={style.dynamic__header}>
              <h3 className={style.dynamic__title}>Динамика</h3>
              <span className={style.dynamic__year}>2022</span>
              <select className={style.dynamic__select}>
                <option hidden>Год</option>
                <option>2022</option>
                <option>2021</option>
                <option>2020</option>
              </select>
            </div>
            {data && <Line data={data}/>}
          </div>
          <div className={style.history}>
            <h3 className={style.history__title}>История переводов</h3>
            {accountData && (<Table data={accountData}/>)}
          </div>
          <div className={style.transaction}>
            <h3 className={style.title + ' ' + style.transaction__title}>
              Перевод
            </h3>
            <form className={style.transaction__form}
              onSubmit={handleSubmit(onSubmit)}>
              <div className={style['transaction__input-wrap']}>
                <span className={style.form__error}>
                  {errors?.to && (errors?.to?.message || 'Error')}
                </span>
                <label className={style.transaction__label}>Счет</label>
                <input className={style.transaction__input}
                  {...register('to', {
                    required: 'Поле обязательно к заполнению',
                  })}
                />
              </div>
              <div className={style['transaction__input-wrap']}>
                <span className={style.form__error}>
                  {errors?.amount && (errors?.amount?.message || 'Error')}
                </span>
                <label className={style.transaction__label}>Сумма</label>
                <input className={style.transaction__input}
                  {...register('amount', {
                    required: 'Поле обязательно к заполнению',
                    min: {
                      value: 1,
                      message: 'Сумма не меньше 1'
                    },
                  })}
                />
              </div>
              <button className={style.button + ' button'}>Перевести</button>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

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
ChartJS.register(
  Tooltip, LineElement,
  CategoryScale, LinearScale, PointElement
);
defaults.color = `#C6B6D7`;


export const Account = () => {
  const location = useLocation();
  const { id } = location.state;

  const dispatch = useDispatch();
  const accountData = useSelector(state => state.accountReducer.data.payload);
  const loading = useSelector(state => state.accountReducer.loading);
  useEffect(() => {
    dispatch(accountSlice.actions.accountRequest(id));
  }, []);

  const dataForChart = () => {
    const transactions = {
      juneTransactions: 0,
      mayTransactions: 0,
      aprilTransactions: 0,
      marchTransactions: 0,
      februaryTransactions: 0,
      januaryTransactions: 0,
    };
    accountData.transactions.forEach(item => {
      if (new Date().getFullYear() === new Date(item.date).getFullYear()) {
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

    const mayBalance = accountData.balance - transactions.juneTransactions;
    const aprilBalance = transactions.juneTransactions - mayBalance;
    const marchBalance = mayBalance - aprilBalance;
    const februaryBalance = aprilBalance - marchBalance;
    const januaryBalance = marchBalance - februaryBalance;
    return {
      mayBalance,
      aprilBalance,
      marchBalance,
      februaryBalance,
      januaryBalance
    };
  };

  let data = null;
  if (!loading) {
    data = {
      labels: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь',
        'Июль', 'Август', 'Сен', 'Окт', 'Ноя', 'Дек'],
      datasets: [
        {
          datasets: 'First Dataset',
          data: [
            dataForChart().januaryBalance,
            dataForChart().februaryBalance,
            dataForChart().marchBalance,
            dataForChart().aprilBalance,
            dataForChart().mayBalance,
            accountData.balance
          ],
          borderWidth: 5,
          borderColor: '#B865D6',
        }
      ]
    };
  }
  return (
    <Layout>
      <div className={style.container}>
        <h2 className={style.title}>Счет №{id}</h2>
        <button className={style.button + ' button'}>
         Открыть новый счет
        </button>
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
    </Layout>
  );
};

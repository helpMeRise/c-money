import React, { useEffect } from 'react';
import style from './Table.module.css';
import { PropTypes } from 'prop-types';
import formatDate from '../../../utils/formatDate';
import { useSelector } from 'react-redux';

export const Table = ({ data }) => {
  const loading = useSelector(state => state.accountReducer.loading);
  const {
    account,
    transactions,
  } = data;

  const colorAmount = () => {
    const td = document.querySelectorAll('td');
    td.forEach(item => {
      if (item.classList.contains(`${style.td_middle}`) &&
        item.textContent < 0) {
        item.style.color = '#B865D6';
      }
    });
  };
  useEffect(() => {
    colorAmount();
  }, [loading]);

  return (
    <div className={style.table__container}>
      <table className={style.table}>
        <thead className={style.thead}>
          <tr>
            <th className={style.th}>Счет</th>
            <th className={style.th}>Сумма</th>
            <th className={style.th}>Дата</th>
          </tr>
        </thead>
        <tbody className={style.tbody}>
          {transactions.length ? (
            [...transactions]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((item, index) => (
                <tr key={index} className={style.tr}>
                  <td className={style.td + ' ' + style.td__account}>
                    {item.from === account ? item.to : item.from}
                  </td>
                  <td className={style.td + ' ' + style.td_middle}>
                    {item.from === account ? item.amount * -1 : item.amount}
                  </td>
                  <td className={style.td + ' ' + style.td__date}>
                    {formatDate(item.date).replace(/,.*/, '')}
                  </td>
                </tr>
              ))
        ) : (
          <tr>
            <td className={style.td}></td>
            <td className={style.td}></td>
            <td className={style.td}></td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.object,
};

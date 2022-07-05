import React from 'react';
import style from './Card.module.css';
import { PropTypes } from 'prop-types';
import formatDate from '../../../utils/formatDate';

export const Card = ({ data }) => {
  const {
    account,
    balance,
    transactions,
  } = data;

  return (
    <div className={style.card}>
      <p className={style.id}>{account}</p>
      <p className={style.balance}>{balance}</p>
      <div className={style.info}>
        <div className={style.created}>
          <p>открыт</p>
          <p>10.03.2016</p>
        </div>
        <div className={style.transaction}>
          <p>последняя операция</p>
          <time dateTime={transactions[0].date}>
            {formatDate(transactions[0].date)}
          </time>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  data: PropTypes.object,
};

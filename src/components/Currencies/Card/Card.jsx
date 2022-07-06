import React from 'react';
import style from './Card.module.css';
import { PropTypes } from 'prop-types';
import formatDate from '../../../utils/formatDate';
import { numberWithSpaces } from '../../../utils/numberWithSpaces';
import { Link } from 'react-router-dom';
import { Account } from '../../Account/Account';

export const Card = ({ data }) => {
  const {
    account,
    balance,
    transactions,
  } = data;

  return (
    <li className={style.card}>
      <Link to='/account' element={<Account/>} className={style.link}
        state={{ id: account }}
      >
        <p className={style.id}>{account}</p>
        <p className={style.balance}>{numberWithSpaces(balance)}</p>
        <div className={style.info}>
          <div className={style.created}>
            <p>открыт</p>
            <p>10.03.2016</p>
          </div>
          <div className={style.transaction}>
            <p>последняя операция</p>
            {transactions.length ? (
              <time dateTime={transactions[0].date}>
                {formatDate(transactions[0].date)}
              </time>
            ) : (
              <span>Транзакций не было</span>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};

Card.propTypes = {
  data: PropTypes.object,
};

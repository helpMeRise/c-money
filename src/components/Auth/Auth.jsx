import React from 'react';
import style from './Auth.module.css';
import { Layout } from '../Layout/Layout';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL_API } from '../../api/const';

export const Auth = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
  });


  const onSubmit = data => {
    axios(`${URL_API}/login`, {
      data,
      method: 'POST',
    })
      .then(({ data }) => {
        if (!data.payload) {
          alert(data.error);
        } else {
          localStorage.setItem('token', data.payload.token);
          navigate('/currencies');
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <Layout>
      <div>
        <p>login: developer</p>
        <p>password: methed</p>
      </div>
      <div className={style.auth__container}>
        <div className={style.auth__wrapper}>
          <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <legend className={style.form__title}>Вход в аккаунт</legend>
            <div className={style['form__input-wrapper']}>
              <span className={style.form__error}>
                {errors?.login && (errors?.login?.message || 'Error')}
              </span>
              <label className={style.form__label}>Логин</label>
              <input className={style.form__input}
                {...register('login', {
                  required: 'Поле обязательно к заполнению',
                  pattern: {
                    value: /(^[A-Za-z]+$)/g,
                    message: 'Только латиница. Без пробелов.'
                  },
                  minLength: {
                    value: 6,
                    message: 'Не менее 6 символов',
                  },
                })}/>
            </div>

            <div className={style['form__input-wrapper']}>
              <span className={style.form__error}>
                {errors?.password && (errors?.password?.message || 'Error')}
              </span>
              <label className={style.form__label}>Пароль</label>
              <input type='password' className={style.form__input}
                {...register('password', {
                  required: 'Поле обязательно к заполнению',
                  minLength: {
                    value: 6,
                    message: 'Минимум 6 символов'
                  }
                })}/>
            </div>
            <button
              className={style.form__button + ' button'}
              type='submit'
            >Перевести</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

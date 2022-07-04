import React from 'react';
import style from './Auth.module.css';
import { Layout } from '../Layout/Layout';
import { useForm } from 'react-hook-form';

export const Auth = () => {
  const {
    register,
    formState: {
      errors,
    },
    reset,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = data => {
    alert(JSON.stringify(data));
    reset();
  };

  return (
    <Layout>
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

import { URL_API } from '../../api/const';
import { currenciesSlice } from './currenciesSlice';
import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';


function* fetchCurrencies() {
  const token = localStorage.getItem('token');

  try {
    const request = yield call(axios, `${URL_API}/accounts`, {
      headers: {
        Authorization: `Basic ${token}`
      }
    });

    yield put(currenciesSlice.actions.currenciesRequestSuccess(request.data));
  } catch (e) {
    yield put(currenciesSlice.actions.currenciesRequestError(e));
  }
}

export function* watchCurrencies() {
  yield takeEvery(currenciesSlice.actions.currenciesRequest, fetchCurrencies);
}

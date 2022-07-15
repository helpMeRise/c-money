import { URL_API } from '../../api/const';
import { myCurrenciesSlice } from './myCurrenciesSlice';
import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';


function* fetchMyCurrencies() {
  const token = localStorage.getItem('token');

  try {
    const request = yield call(axios, `${URL_API}/currencies`, {
      headers: {
        Authorization: `Basic ${token}`
      }
    });

    yield put(
      myCurrenciesSlice.actions.myCurrenciesRequestSuccess(request.data)
    );
  } catch (e) {
    yield put(myCurrenciesSlice.actions.myCurrenciesRequestError(e));
  }
}

export function* watchMyCurrencies() {
  yield takeEvery(myCurrenciesSlice.actions.myCurrenciesRequest,
    fetchMyCurrencies);
}

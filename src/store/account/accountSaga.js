import { URL_API } from '../../api/const';
import { accountSlice } from './accountSlice';
import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';


function* fetchAccount(id) {
  const token = localStorage.getItem('token');

  try {
    const request = yield call(axios, `${URL_API}/account/${id.payload}`, {
      headers: {
        Authorization: `Basic ${token}`
      }
    });

    yield put(accountSlice.actions.accountRequestSuccess(request.data));
  } catch (e) {
    yield put(accountSlice.actions.accountRequestError(e));
  }
}

export function* watchAccount() {
  yield takeEvery(accountSlice.actions.accountRequest, fetchAccount);
}

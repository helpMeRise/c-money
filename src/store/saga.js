import { all } from 'redux-saga/effects';
import { watchCurrencies } from './currencies/currenciesSaga';
import { watchAccount } from './account/accountSaga';


export default function* rootSaga() {
  yield all([
    watchCurrencies(),
    watchAccount(),
  ]);
}

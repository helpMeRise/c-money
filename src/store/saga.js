import { all } from 'redux-saga/effects';
import { watchCurrencies } from './currencies/currenciesSaga';


export default function* rootSaga() {
  yield all([
    watchCurrencies(),
  ]);
}

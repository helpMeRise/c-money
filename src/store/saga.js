import { all } from 'redux-saga/effects';
import { watchCurrencies } from './currencies/currenciesSaga';
import { watchAccount } from './account/accountSaga';
import { watchMyCurrencies } from './myCurrencies/myCurrenciesSaga';


export default function* rootSaga() {
  yield all([
    watchCurrencies(),
    watchAccount(),
    watchMyCurrencies(),
  ]);
}

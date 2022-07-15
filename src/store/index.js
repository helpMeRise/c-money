import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import currenciesReducer from './currencies/currenciesSlice';
import accountReducer from './account/accountSlice';
import myCurrenciesReducer from './myCurrencies/myCurrenciesSlice';


const sagaMiddleWare = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    currenciesReducer,
    accountReducer,
    myCurrenciesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleWare),
});

sagaMiddleWare.run(rootSaga);

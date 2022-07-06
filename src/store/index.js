import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import currenciesReducer from './currencies/currenciesSlice';
import accountReducer from './account/accountSlice';


const sagaMiddleWare = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    currenciesReducer,
    accountReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleWare),
});

sagaMiddleWare.run(rootSaga);

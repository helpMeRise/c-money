import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';


const sagaMiddleWare = createSagaMiddleware();

export const store = configureStore({
  reducer: {
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleWare),
});

sagaMiddleWare.run(rootSaga);

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';
import reducer from './reducer';

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

store.subscribe(() => {
  console.log('state=', store.getState());
});

sagaMiddleware.run(rootSaga);

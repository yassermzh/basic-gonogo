import { put } from 'redux-saga/effects';

export function* rootSaga() {
  console.log('root saga!');
  yield put({ type: 'start' });
}

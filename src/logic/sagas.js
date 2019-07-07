import {
  takeEvery,
  all,
  put,
  take,
  race,
  call,
  delay,
  select,
} from 'redux-saga/effects';
import types from './types';
import routes from './routes';
import { fetchRandomDelay } from './api';
import navigate from './navigate';
import config from './config';
import * as selectors from './selectors';

export function* roundSaga() {
  const randomDelay = yield call(fetchRandomDelay);
  yield call(navigate, routes.ROUND_RED);
  const { redTimeout } = yield race({
    result: take(types.ROUND_CLICKED),
    redTimeout: delay(randomDelay),
  });
  if (!redTimeout) {
    return yield put({ type: types.ROUND_INVALID });
  }
  yield call(navigate, routes.ROUND_GREEN);
  const { greenTimeout } = yield race({
    result: take(types.ROUND_CLICKED),
    greenTimeout: delay(config.ROUND_TIMEOUT),
  });
  if (!greenTimeout) {
    yield put({ type: types.ROUND_VALID });
  }
}

export function* roundsSaga(isRoundsCompleted) {
  yield call(navigate, routes.ROUNDS_INTRO);

  while (true) {
    yield put({ type: types.ROUND_START });
    yield take([types.ROUND_VALID, types.ROUND_INVALID]);
    const state = yield select();
    if (isRoundsCompleted(state)) {
      yield put({ type: types.ROUNDS_END });
      break;
    }
  }
  yield call(navigate, routes.ROUNDS_REPORT);
}

export function* roundSagaWatch() {
  yield takeEvery(types.ROUND_START, roundSaga);
}

export function* roundsSagaWatch() {
  yield takeEvery(types.ROUNDS_START, roundsSaga, selectors.isRoundsCompleted);
}

export function* gameSaga() {
  while (true) {
    yield put({ type: types.ROUNDS_START });
    yield take(types.ROUNDS_END);
  }
}

export function* rootSaga() {
  yield all([gameSaga(), roundSagaWatch, roundsSagaWatch]);
}

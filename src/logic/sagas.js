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
import config from './config';
import * as selectors from './selectors';

function* navigate({ payload: path }) {
  const { history } = yield select();
  yield call(history.replace, path);
}

function* navigateWatch() {
  yield takeEvery(types.NAVIGATE, navigate);
}

export function* roundSaga() {
  const randomDelay = yield call(fetchRandomDelay);
  yield put({ type: types.NAVIGATE, payload: routes.ROUND_RED });
  const { redTimeout } = yield race({
    result: take(types.ROUND_CLICKED),
    redTimeout: delay(randomDelay),
  });
  if (!redTimeout) {
    return yield put({ type: types.ROUND_INVALID });
  }
  yield put({ type: types.NAVIGATE, payload: routes.ROUND_GREEN });
  const { greenTimeout, result } = yield race({
    result: take(types.ROUND_CLICKED),
    greenTimeout: delay(config.ROUND_TIMEOUT),
  });
  if (!greenTimeout) {
    yield put({ type: types.ROUND_VALID, responseTime: result.payload });
  } else {
    yield put({ type: types.ROUND_INVALID });
  }
}

export function* roundsSaga(isRoundsCompleted) {
  yield put({ type: types.NAVIGATE, payload: routes.ROUNDS_INTRO });
  yield take(types.ROUNDS_INTRO_END);

  while (true) {
    yield put({ type: types.ROUND_START });
    yield take([types.ROUND_VALID, types.ROUND_INVALID]);
    const state = yield select();
    if (isRoundsCompleted(state)) {
      yield put({ type: types.ROUNDS_END });
      break;
    }
  }
  yield put({ type: types.NAVIGATE, payload: routes.ROUNDS_REPORT });
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
    yield take(types.ROUNDS_REPORT_END);
  }
}

export function* rootSaga() {
  yield take(types.INIT);
  yield all([gameSaga(), roundSagaWatch(), roundsSagaWatch(), navigateWatch()]);
}

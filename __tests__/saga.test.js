import * as effects from 'redux-saga/effects';
import { roundSaga, roundsSaga } from '../src/logic/sagas';
import types from '../src/logic/types';
import routes from '../src/logic/routes';

describe('round saga', () => {
  let g, next;

  beforeEach(() => {
    const randomDelay = 1001;
    g = roundSaga();
    next = x => g.next(x).value;
    next();
    next(randomDelay);
    next();
  });

  it('valid try', () => {
    expect(next({ redTimeout: true })).toStrictEqual(
      effects.put({ type: types.NAVIGATE, payload: routes.ROUND_GREEN })
    );
    next();
    expect(
      next({ greenTimeout: false, result: { payload: 100 } })
    ).toStrictEqual(
      effects.put({ type: types.ROUND_VALID, responseTime: 100 })
    );
    expect(next()).toBe(undefined);
  });

  it('invalid try', () => {
    expect(next({ redTimeout: false })).toStrictEqual(
      effects.put({ type: types.ROUND_INVALID })
    );
    expect(next()).toBe(undefined);
  });
});

describe('rounds saga', () => {
  it('reports after two valid tries', () => {
    const isRoundsCompleted = jest
      .fn()
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);

    const g = roundsSaga(isRoundsCompleted);
    const next = x => g.next(x).value;

    expect(next()).toStrictEqual(
      effects.put({ type: types.NAVIGATE, payload: routes.ROUNDS_INTRO })
    );
    next();
    expect(next()).toStrictEqual(effects.put({ type: types.ROUND_START }));
    next();
    next();
    expect(next()).toStrictEqual(effects.put({ type: types.ROUND_START }));
    next();
    next();
    expect(next()).toStrictEqual(effects.put({ type: types.ROUNDS_END }));
    expect(next()).toStrictEqual(
      effects.put({ type: types.NAVIGATE, payload: routes.ROUNDS_REPORT })
    );
  });
});

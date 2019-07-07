import reducer from '../src/logic/reducer';
import types from '../src/logic/types';

test('reducer report', () => {
  const state = {
    roundsStatus: 'STARTED',
    rounds: [{ id: 1, responseTime: 2 }, { id: 2, responseTime: 4 }],
    roundsReport: undefined,
  };

  expect(reducer(state, { type: types.ROUNDS_END })).toStrictEqual({
    ...state,
    roundsStatus: 'DONE',
    roundsReport: 3,
  });
});

import types from './types';
import produce from 'immer';
import * as selectors from './selectors';
import { avg, compose, prop, map, last } from './helpers';

const initialState = {
  roundsStatus: undefined,
  rounds: [],
  roundsReport: undefined,
  history: undefined,
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    console.log('dispatch: ', action);
    if (action.type === types.INIT) {
      draft.history = action.history;
    }
    if (action.type === types.ROUNDS_START) {
      draft.roundsStatus = 'STARTED';
      draft.rounds = [];
    }
    if (action.type === types.ROUND_START) {
      const round = { id: Date.now() };
      draft.rounds.push(round);
    }
    if (action.type === types.ROUND_VALID) {
      const round = last(draft.rounds);
      round.responseTime = action.responseTime;
    }
    if (action.type === types.ROUNDS_END) {
      draft.roundsStatus = 'DONE';
      draft.roundsReport = compose(
        avg,
        map(prop('responseTime')),
        selectors.validRounds
      )(draft);
    }
  });

export default reducer;

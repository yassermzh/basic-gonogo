import types from './types';
import produce from 'immer';
import * as selectors from './selectors';
import { avg, compose, prop, map } from './helpers';

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
    if (action.types === types.ROUND_START) {
      const round = { id: Date.now() };
      draft.rounds.push(round);
    }
    if (action.types === types.ROUND_VALID) {
      const round = draft.rounds.find(r => r.id === action.id);
      round.responseTime = action.payload.responseTime;
    }
    if (action.types === types.ROUNDS_END) {
      draft.roundsStatus = 'DONE';
      draft.roundsReport = compose(
        avg,
        map(prop('responseTime')),
        selectors.validRounds
      )(draft);
    }
  });

export default reducer;

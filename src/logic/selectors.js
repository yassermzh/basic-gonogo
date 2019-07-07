import config from './config';

export const validRounds = state =>
  state.rounds.filter(round => round.responseTime);

export const isRoundsCompleted = draft =>
  validRounds(draft).length >= config.MAX_VALID_ROUND;

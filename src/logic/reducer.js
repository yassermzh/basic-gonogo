const initialState = { started: false };
const reducer = (state = initialState, action) => {
  if (action.type === 'start') {
    return { started: true };
  }
  return state;
};

export default reducer;

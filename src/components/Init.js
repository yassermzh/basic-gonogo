import { useEffect } from 'react';
import { connect } from 'react-redux';
import types from '../logic/types';

const Init = ({ history, dispatch }) => {
  useEffect(() => {
    dispatch({ type: types.INIT, history });
  }, []);
  return null;
};

export default connect()(Init);

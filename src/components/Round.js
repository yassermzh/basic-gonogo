/* eslint react-native/no-inline-styles: 0 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import types from '../logic/types';
import colors from './colors';

const Round = ({ isGreen = false, dispatch }) => {
  const [startTime, setStartTime] = useState();
  useEffect(() => {
    setStartTime(new Date());
  }, [isGreen]);
  const handleClick = () => {
    const now = new Date();
    dispatch({
      type: types.ROUND_CLICKED,
      payload: now - startTime,
    });
  };

  return (
    <TouchableWithoutFeedback style={styles.container} onPress={handleClick}>
      <View
        style={[
          styles.container,
          { backgroundColor: isGreen ? colors.green : colors.red },
        ]}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect()(Round);

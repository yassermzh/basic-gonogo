import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Button } from 'react-native';
import types from '../logic/types';

const Report = ({ roundsReport, rounds, dispatch }) => {
  const handleStart = () => {
    dispatch({ type: types.ROUNDS_REPORT_END });
  };
  return (
    <View style={styles.container}>
      <Text>Report!</Text>
      <Text>Avg: {roundsReport}ms</Text>
      {rounds.map((round, idx) => (
        <Text key={round.id}>
          {`#${idx}: `}
          {round.responseTime ? `${round.responseTime}ms` : 'invalid'}
        </Text>
      ))}
      <Button title="ok" onPress={handleStart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
});

const mapStateToProps = state => ({
  rounds: state.rounds,
  roundsReport: state.roundsReport,
});
export default connect(mapStateToProps)(Report);

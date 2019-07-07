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
      <Text style={styles.title}>Report</Text>
      <Text style={styles.avg}>Avg: {roundsReport}ms</Text>
      {rounds.map((round, idx) => (
        <Text key={round.id} style={styles.round}>
          {`#${idx}: `}
          {round.responseTime ? `${round.responseTime}ms` : 'invalid'}
        </Text>
      ))}
      <View style={styles.button}>
        <Button title="Try Again" onPress={handleStart} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 120,
    paddingLeft: 30,
    paddingRight: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  avg: {
    fontSize: 21,
    marginBottom: 10,
  },
  round: {
    fontSize: 14,
    color: 'grey',
    marginTop: 8,
  },
  button: {
    marginTop: 60,
  },
});

const mapStateToProps = state => ({
  rounds: state.rounds,
  roundsReport: state.roundsReport,
});
export default connect(mapStateToProps)(Report);

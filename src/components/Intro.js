import React from 'react';
import { connect } from 'react-redux';
import { Text, Button, View, StyleSheet } from 'react-native';
import types from '../logic/types';
import config from '../logic/config';
import colors from './colors';

const Rect = ({ color, size }) => (
  <View style={{ width: size, height: size, backgroundColor: color }} />
);

const Intro = ({ dispatch }) => (
  <View style={styles.container}>
    <View style={styles.block}>
      <Rect color={colors.red} size={60} />
      <Text style={styles.text}>On RED page, Do nothing!</Text>
    </View>
    <View style={styles.block}>
      <Rect color={colors.green} size={60} />
      <Text style={styles.text}>On GREEN page, Click!</Text>
    </View>
    <Text style={styles.info}>Too slow? another round starts!</Text>
    <Text style={styles.info}>
      It's done after #{config.MAX_VALID_ROUND} valid rounds!
    </Text>
    <View style={styles.button}>
      <Button
        title="Start"
        onPress={() => {
          dispatch({ type: types.ROUNDS_INTRO_END });
        }}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 30,
    paddingRight: 30,
  },
  block: {
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 3,
  },
  info: {
    marginTop: 10,
    color: 'grey',
    alignSelf: 'center',
  },
  button: {
    marginTop: 30,
    alignSelf: 'center',
  },
});

export default connect()(Intro);

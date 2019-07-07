import React from 'react';
import { connect } from 'react-redux';
import { Text, Button, View, StyleSheet } from 'react-native';
import types from '../logic/types';
import config from '../logic/config';

const Intro = ({ dispatch }) => (
  <View style={styles.container}>
    <Text>On RED page, do nothing!</Text>
    <Text>As soon as you see the GREEN page, click!</Text>
    <Text>When you are too slow, another round starts!</Text>
    <Text>It's done after #{config.MAX_VALID_ROUND} valid rounds!</Text>
    <Button
      title="Start"
      onPress={() => {
        dispatch({ type: types.ROUNDS_INTRO_END });
      }}
    />
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
});

export default connect()(Intro);

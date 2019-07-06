import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import './logic';

const App = () => {
  return (
    <View style={styles.body}>
      <Text style={styles.title}>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: 'red',
  },
});

export default App;

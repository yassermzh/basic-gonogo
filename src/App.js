import React from 'react';
import { NativeRouter as Router, Route } from 'react-router-native';
import { Provider } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import routes from './logic/routes';
import { store } from './logic';
import Init from './components/Init';
import Intro from './components/Intro';
import Report from './components/Report';
import Round from './components/Round';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <View style={styles.body}>
          <Route path="/" component={Init} />
          <Route path={routes.ROUNDS_INTRO} component={Intro} />
          <Route path={routes.ROUNDS_REPORT} component={Report} />
          <Route path={routes.ROUND_RED} render={() => <Round />} />
          <Route path={routes.ROUND_GREEN} render={() => <Round isGreen />} />
        </View>
      </Router>
    </Provider>
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

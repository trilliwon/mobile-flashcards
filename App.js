import React from 'react';
import { View } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import TabNav from './components/TabNav'
import Constants from 'expo-constants';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1, marginTop: Constants.statusBarHeight}}>
          <TabNav />
        </View>
      </Provider>
    );
  }
}
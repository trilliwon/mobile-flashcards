import React from 'react'
import { View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import TabNav from './components/TabNav'
import AppStatusBar from './components/AppStatusBar'
import { main } from './utils/colors'
import middleware from './middleware'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={{ flex: 1 }}>
          <AppStatusBar backgroundColor={main} barStyle="light-content" />
          <TabNav />
        </View>
      </Provider>
    );
  }
}
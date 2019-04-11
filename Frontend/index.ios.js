import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

import App from './App';

export default class myapp extends Component {
  render() {
    return (
      <View>
        <App />
      </View>
    )
  }
}
AppRegistry.registerComponent('myapp', () => myapp);

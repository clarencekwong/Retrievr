import React from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Linking, Image, Switch } from 'react-native';
import { ExpoLinksView } from '@expo/samples';



export default class ToggleMissing extends React.Component {

  state = {
    test: false
  }

  render() {
    return (
      <SafeAreaView style={{marginTop: 18, alignItems: 'center'}}>
        <Text style={{fontSize: 18, paddingBottom: 5}}>
          {this.state.test ? 'My pet is missing!😟' : 'Safe and sound 😃'}
        </Text>
        <Switch
         onValueChange = {()=> this.setState({ test: !this.state.test})}
         value = {this.state.test}
         style={styles.toggleMissing}
         ios_backgroundColor={this.state.test ? 'red' : 'green'}
         trackColor={{false: 'green', true: 'red'}}/>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  toggleMissing: {
    width: 200
  },
});

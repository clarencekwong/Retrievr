import React from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { createStackNavigator, navigate, NavigationActions } from 'react-navigation';

import Store from './Store';
import MissingPetsList from './MissingPetsList'


export default class BottomButtons extends React.Component {


  render() {
    return (
      <View style={styles.bottomButtons}>
        <Store />
        <MissingPetsList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomButtons: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    width: '90%',
  },
});

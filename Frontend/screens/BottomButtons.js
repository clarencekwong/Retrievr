import React, {Fragment} from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Linking, KeyboardAvoidingView } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { createStackNavigator, navigate, NavigationActions } from 'react-navigation';
import {connect} from 'react-redux'
import Store from './Store';
import MissingPetsList from './MissingPetsList'
import MissingPetPoster from './MissingPetPoster'


export default class BottomButtons extends React.Component {

  render() {
    return (
      <Fragment>
        <View style={styles.bottomButtons}>
          <Store />
          <MissingPetsList />
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  bottomButtons: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 25,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    width: '90%',
  },
  missingPoster: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 2,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: '90%',
  },
});

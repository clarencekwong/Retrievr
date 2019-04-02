import React from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
// import { createStackNavigator, navigate, NavigationActions } from 'react-navigation';

import PetCard from './PetCard';
import ToggleMissing from './ToggleMissing'
import ScheduleVetAppt from './ScheduleVetAppt'


export default class PetCardContainer extends React.Component {


  render() {
    return (
      <View style={styles.petCardContainer}>
        <PetCard />
        <ToggleMissing />
        <ScheduleVetAppt />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  petCardContainer: {
    height: '70%',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    marginHorizontal: 20,
  },
});

import React from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Linking, Image, Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
// import { createStackNavigator, navigate, NavigationActions } from 'react-navigation';
// import { BarCodeScanner, Camera, Permissions } from 'expo';


export default class ScheduleVetAppt extends React.Component {

  render() {
    return (
      <SafeAreaView style={styles.vetApptContainer}>
        <Button
          onPress={null}
          title="Schedule Vet Appointment"
          color='black'
          accessibilityLabel="Schedule an appointment with your vet"
          style={styles.vetApptButton}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  vetApptContainer: {
    justifyContent: 'center',
    marginTop: 18,
    backgroundColor: 'lightgrey',
    height: 50,
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'green',
  },
  vetApptButton: {
    fontSize: 16,
  },
});

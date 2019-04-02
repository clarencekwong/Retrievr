import React from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Linking, Image } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
// import { createStackNavigator, navigate, NavigationActions } from 'react-navigation';
// import { BarCodeScanner, Camera, Permissions } from 'expo';


export default class PetCard extends React.Component {

  render() {
    return (
      <SafeAreaView style={styles.petCardContainer}>
        <Text style={{color: 'black', paddingLeft: 10, paddingTop: 10, fontSize: 22}}>Pet's Name</Text>
        <Image
          source={{uri: 'https://vetstreet-brightspot.s3.amazonaws.com/ec/edb760a8af11e0a0d50050568d634f/file/nova-scotia-duck-tolling-retriever-5-645mk070411.jpg'}}
          style={styles.petImage}
        />
        <Text style={{paddingLeft: 10, paddingTop: 10, fontSize: 16}}>Pet's Breed</Text>
        <Text style={{paddingLeft: 10, paddingTop: 5, fontSize: 16}}>Pet's Age</Text>
        <Text style={{paddingLeft: 10, paddingTop: 5, fontSize: 16}}>Most Recent Vet Appointment: mm/dd/yyyy</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  petCardContainer: {
    height: '62%',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 10,
  },
  petImage: {
    marginTop: 5,
    marginLeft: 10,
    height: 114,
    width: 172,
    borderRadius: 5,

  },
});

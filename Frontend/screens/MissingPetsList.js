import React from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Linking, Image } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { createStackNavigator, navigate, NavigationActions } from 'react-navigation';
// import { BarCodeScanner, Camera, Permissions } from 'expo';


export default class MissingPetsList extends React.Component {

  render() {
    return (
      <SafeAreaView style={styles.missingPetsListIcon}>
        <TouchableOpacity
          onPress={ ()=>{ Linking.openURL('http://retrievr-api.herokuapp.com/missing-posters')}}
          style={styles.missingPetsContainer}
          >
          <Image
            source={require('../assets/images/missing_pets.png')}
            style={styles.missingPetsImg}
          />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  missingPetsListIcon: {
    height: '100%',
    width: '100%',
    // width: 140,
    borderWidth: 2,
    borderColor: '#d63031',
    borderRadius: 10,
    marginHorizontal: 10

  },
  missingPetsContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    alignItems: 'center',
  },
  missingPetsImg: {
    marginTop: 5,
    width: 136,
    height: 136,
    alignItems: 'center',
    borderRadius: 15
  },
});

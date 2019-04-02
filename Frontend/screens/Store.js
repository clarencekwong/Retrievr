import React from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Linking, Image } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
// import { createStackNavigator, navigate, NavigationActions } from 'react-navigation';
// import { BarCodeScanner, Camera, Permissions } from 'expo';


export default class Store extends React.Component {

  render() {
    return (
      <SafeAreaView style={styles.storeIcon}>
        <TouchableOpacity
          onPress={null}
          style={styles.chewyContainer}>
          <Image
            source={{uri: 'https://pngimage.net/wp-content/uploads/2018/05/cart-icon-white-png-2.png'}}
            style={styles.chewyImg}
          />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  storeIcon: {
    height: '100%',
    width: 140,
    marginHorizontal: 10
  },
  chewyContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'dodgerblue',
    borderRadius: 10,
    alignItems: 'center',

  },
  chewyImg: {
    marginTop: 5,
    width: 136,
    height: 136,
    alignItems: 'center',
  },
});

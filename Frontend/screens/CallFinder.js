import React from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Linking, Image, Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
// import { createStackNavigator, navigate, NavigationActions } from 'react-navigation';
// import { BarCodeScanner, Camera, Permissions } from 'expo';


export default class CallFinder extends React.Component {

  render() {
    return (
      <SafeAreaView style={styles.vetApptContainer}>
        <Button
          onPress={()=> Linking.openURL(`tel:${this.props.number}`)}
          title="Call Retrievr 📞"
          color='white'
          accessibilityLabel="Call person who found your pet"
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
    backgroundColor: '#00b894',
    height: 50,
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'white',
  },
  vetApptButton: {
    fontSize: 16,
  },
});

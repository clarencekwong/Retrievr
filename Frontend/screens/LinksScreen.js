import React from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Linking, Alert, Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { createStackNavigator, navigate, NavigationActions, navigation } from 'react-navigation';
import { BarCodeScanner, Camera, Permissions } from 'expo';
import {connect} from 'react-redux'

import MessagePetOwner from './MessagePetOwner';
import {sendFinderInfo, toggleMissingPetFound, fetchFoundPet, setFinderLoc} from '../Redux/actions'


class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Scan Tag!',
  };

  state = {
    hasCameraPermission: null,
    scanned: false
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted'  });
    geolocation.requestAuthorization();
  }

  runBarCodeScanner = () => {
    if (this.state.scanned === false) {
      return <BarCodeScanner
        onBarCodeScanned={this.handleBarCodeScanned}
        style={StyleSheet.absoluteFill}
      />
    }
  }

  render() {
    const { navigate } = this.props.navigation
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Request for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <SafeAreaView style={styles.container}>
        {this.runBarCodeScanner()}
        <TouchableOpacity style={styles.refreshCameraButton}>
          <Button
            onPress={()=>this.setState({ scanned: false })}
            title="Refresh"
            color='black'
            accessibilityLabel="Refresh camera"
          />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    let petId = data.split(" ").pop()
    this.props.setFinderLoc(petId)
    this.setState({ scanned: true })
    this.props.fetchFoundPet(petId)
    this.props.sendFinderInfo(this.props.currentUser)
    let pos = {
      finder_name: this.props.finderName,
      finder_phone_number: this.props.finderPhone,
      found_latitude: this.props.foundPetLat,
      found_longitude: this.props.foundPetLon,
    }
    fetch(`http://10.9.105.14:3000/api/v1/pets/${petId}`, {
      method: "PATCH",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pos)
    })
    Alert.alert(
      'Owner Found!',
      "Let them know you found their pet...",
      [
        {text: 'OK', onPress: () => this.props.navigation.navigate('Main'),
      },
      ],
      {cancelable: false},
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  refreshCameraButton: {
    textAlign: 'right',
    marginLeft: 250,
    width: 120,
    height: 45,
    backgroundColor: 'lightgrey',
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: 'darkgrey',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,

  }
});

function mapStateToProps(state) {
  return {
    foundPet: state.pet.foundPet,
    ownerName: state.pet.ownerName,
    foundPetMissing: state.pet.foundPetMissing,
    foundPetLat: state.pet.foundPetLat,
    foundPetLon: state.pet.foundPetLon,
    currentUser: state.user.currentUser,
    finderName: state.pet.finderName,
    finderPhone: state.pet.finderPhone,

  }
}


export default connect(mapStateToProps, {fetchFoundPet, toggleMissingPetFound, setFinderLoc, sendFinderInfo})(LinksScreen)

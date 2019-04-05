import React from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Linking, Alert, Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { createStackNavigator, navigate, NavigationActions, navigation } from 'react-navigation';
import { BarCodeScanner, Camera, Permissions } from 'expo';
import {connect} from 'react-redux'

import MessagePetOwner from './MessagePetOwner';
import {toggleMissingPetFound, fetchFoundPet} from '../Redux/actions'


class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Scan Tag!',
  };

  state = {
    hasCameraPermission: null,
    scanned: false,
  }
  handleMissingToggleScan = (data) => {
    this.props.toggleMissingPetFound(data, this.props.foundPetMissing)
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted'  });
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
    this.setState({ scanned: true })
    this.props.fetchFoundPet(data)
    this.handleMissingToggleScan()
    Alert.alert(
      'Owner Found!',
      "Let them know you found their pet...",
      [
        {text: 'OK', onPress: () => this.props.navigation.navigate('Message', {
          user: this.props.ownerName,
        }),
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
    foundPet: state.foundPet,
    ownerName: state.ownerName,
    foundPetMissing: state.foundPetMissing
  }
}


export default connect(mapStateToProps, {fetchFoundPet, toggleMissingPetFound})(LinksScreen)

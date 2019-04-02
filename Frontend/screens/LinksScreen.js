import React from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Linking, Alert, Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { createStackNavigator, navigate, NavigationActions, navigation } from 'react-navigation';
import { BarCodeScanner, Camera, Permissions } from 'expo';

import MessagePetOwner from './MessagePetOwner';


export default class LinksScreen extends React.Component {
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
    Alert.alert(
      'Owner Found!',
      `${data}`,
      [
        {text: 'OK', onPress: () => this.props.navigation.navigate('Message', {
          user: data,
        }),
      },
      ],
      {cancelable: false},
    );
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

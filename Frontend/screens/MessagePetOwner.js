//////////////////////////////////////////////////////////////
//                                                          //
//                      Has ONE fetch                       //
//                                                          //
//////////////////////////////////////////////////////////////

import React from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Linking, TextInput, Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { createStackNavigator, navigate, NavigationActions, navigation } from 'react-navigation';
import { BarCodeScanner, Camera, Permissions } from 'expo';
import {connect} from 'react-redux'



class MessagePetOwner extends React.Component {
  static navigationOptions = {
    title: 'Message',
  };

  componentDidMount(){
    location = {
      found_latitude: String(this.props.coords.coords.latitude),
      found_longitude: String(this.props.coords.coords.longitude),
    }
    fetch(`http://retrievr-api.herokuapp.com/api/v1/pets/${this.props.foundPet.id}`, {
      method: "PATCH",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(location)
    })
  }

  render() {
    const { navigation } = this.props;
    const user = navigation.getParam('user', 'No name specified');
    const latitude = navigation.getParam('latitude', 'No location specified')
    const longitude = navigation.getParam('longitude', 'No location specified')
    const error = navigation.getParam('error', 'No error specified')
    return (
      <ScrollView keyboardShouldPersistTaps='handled' style={styles.container1}>
        <Text style={styles.prompt}>Let the owner know you've found their pet!</Text>
        <TextInput value={user} style={styles.ownerName} editable={false}/>
        <TextInput value={latitude} style={styles.ownerName} editable={false}/>
        <TextInput value={longitude} style={styles.ownerName} editable={false}/>
        <TextInput value={error} style={styles.ownerName} editable={false}/>
        <TouchableOpacity style={styles.submitMessageButton}>
          <Button
            onPress={()=>console.log("message sent")}
            title="Send"
            color='black'
            accessibilityLabel="Submit your message to the pet's owner"
          />
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
  },
  prompt: {
    paddingHorizontal: 30,
    justifyContent: 'center',
    maxWidth: '80%',
    fontSize: 20
  },
  ownerName: {
    paddingLeft: 5,
    marginTop: 10,
    height: 40,
    marginHorizontal: 30,
    width: '85%',
    borderColor: 'grey',
    borderWidth: 4,
    borderRadius: 10,
    fontSize: 18,
    color: 'green',
  },
  messageBody: {
    marginTop: 10,
    marginHorizontal: 30,
    height: 400,
    width: '85%',
    borderColor: 'grey',
    borderWidth: 4,
    borderRadius: 10,
    fontSize: 20
  },
  submitMessageButton: {
    width: 100,
    marginLeft: '66%',
    borderWidth: 2,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: 'lightgrey',

  },
});

function mapStateToProps(state) {
  return {
    coords: state.user.coords,
    foundPet: state.pet.foundPet,
  }
}

export default connect(mapStateToProps)(MessagePetOwner)

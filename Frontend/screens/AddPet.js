//////////////////////////////////////////////////////////////
//                                                          //
//                      Has ONE fetch                       //
//                                                          //
//////////////////////////////////////////////////////////////

import React from 'react'
import { View, Button, TextInput, StyleSheet, AsyncStorage, KeyboardAvoidingView, TouchableOpacity, Text, ScrollView, Alert } from 'react-native'
import {connect} from 'react-redux'
import { ImagePicker, Permissions } from 'expo';
import { createStackNavigator, navigate, NavigationActions, navigation } from 'react-navigation';
import PetAdapter from '../Redux/PetAdapter';
import {onChangeTextInstagram, onChangeTextPetName, onChangeTextPetAge, onChangeTextPetBreed, onChangeTextImage, clearAddPet} from '../Redux/actions'

class AddPet extends React.Component {

  state = {
    addPetImage: null
  }

  addPetToMyProfile = () => {
    let petAttr = {
      name: this.props.addPetName,
      age: parseInt(this.props.addPetAge),
      breed: this.props.addPetBreed,
      image: this.state.addPetImage,
      user_id: this.props.currentUser,
      instagram: this.props.addInstagram
    }
    if (this.props.addPetName && this.props.addPetAge && this.props.addPetBreed && this.state.addPetImage) {
      fetch('http://retrievr-api.herokuapp.com/api/v1/pets/', {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(petAttr)
      })
      .then(() => {
        this.props.clearAddPet()
        this.props.toggleAddPetState()
        Alert.alert(
          'Pet Added!',
          "You successfully added your furry friend",
          [
            {text: 'OK', onPress: () => console.log("added"),
          },
          ],
          {cancelable: false},
        )
      })
    } else {
      this.props.clearAddPet()
      Alert.alert(
        'Pet Not added',
        "Please be sure to fill in all fields",
        [
          {text: 'OK', onPress: () => console.log("fill it out"),
        },
        ],
        {cancelable: false},
      )
    }
  }

  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ addPetImage: result.uri });
    }
  };

  render() {
    return (
      <ScrollView contentContainerStyle={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00b894'}}>
        <KeyboardAvoidingView style={styles.signUpContainer}>
          <TextInput
            style={styles.input}
            placeholder='Name'
            autoCapitalize="none"
            placeholderTextColor='#00b894'
            onChangeText={event => this.props.onChangeTextPetName(event)}
          />
          <TextInput
            style={styles.input}
            placeholder='Age'
            autoCapitalize="none"
            placeholderTextColor='#00b894'
            onChangeText={event => this.props.onChangeTextPetAge(event)}
          />
          <TextInput
            style={styles.input}
            placeholder='Breed'
            autoCapitalize="none"
            placeholderTextColor='#00b894'
            onChangeText={event => this.props.onChangeTextPetBreed(event)}
          />
          <TouchableOpacity
            style={styles.input}
            title="Add photo"
            onPress={this.pickImage}>
            <Text style={{color: '#00b894', fontSize: 18, marginTop: 8, fontWeight: '500'}}>Add Image</Text>
            </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder='Instagram'
            autoCapitalize="none"
            placeholderTextColor='#00b894'
            onChangeText={event => this.props.onChangeTextInstagram(event)}
          />
          <TouchableOpacity
            onPress={() => this.addPetToMyProfile()}
            style={styles.submit}>
            <Text style={{color: '#00b894', fontSize: 18, marginTop: 5, textAlign: 'center'}}>Add Pet</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 275,
    height: 55,
    backgroundColor: 'white',
    opacity: 0.8,
    margin: 10,
    padding: 8,
    color: '#00b894',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  signUpContainer: {
    flex: 1,
    alignItems: 'center'
  },
  submit: {
    width: 200,
    height: 55,
    backgroundColor: 'white',
    margin: 10,
    padding: 8,
    color: '#00b894',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  backButton: {
    width: 100,
    height: 55,
    backgroundColor: '#00b894',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  }
})

function mapStateToProps(state) {
  return {
    addPetName: state.pet.addPetName,
    addPetAge: state.pet.addPetAge,
    addPetBreed: state.pet.addPetBreed,
    currentUser: state.user.currentUser,
    addInstagram: state.pet.addInstagram,
  }
}

export default connect(mapStateToProps, {onChangeTextInstagram, onChangeTextPetName, onChangeTextPetAge, onChangeTextPetBreed, onChangeTextImage, clearAddPet})(AddPet);

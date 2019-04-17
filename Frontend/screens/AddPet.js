import React from 'react'
import { View, Button, TextInput, StyleSheet, AsyncStorage, KeyboardAvoidingView, TouchableOpacity, Text, ScrollView, Alert } from 'react-native'
import {connect} from 'react-redux'
import { createStackNavigator, navigate, NavigationActions, navigation } from 'react-navigation';
import PetAdapter from '../Redux/PetAdapter';
import {onChangeTextInstagram, onChangeTextPetName, onChangeTextPetAge, onChangeTextPetBreed, onChangeTextImage, clearAddPet} from '../Redux/actions'


class AddPet extends React.Component {

  addPetToMyProfile = () => {
    let petAttr = {
      name: this.props.addPetName,
      age: parseInt(this.props.addPetAge),
      breed: this.props.addPetBreed,
      image: this.props.addPetImage,
      user_id: this.props.currentUser,
      instagram: this.props.addInstagram
    }
    if (this.props.addPetName && this.props.addPetAge && this.props.addPetBreed && this.props.addPetImage) {
      fetch('http://10.9.110.252:3000/api/v1/pets/', {
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
          <TextInput
            style={styles.input}
            placeholder='Image URL'
            autoCapitalize="none"
            placeholderTextColor='#00b894'
            onChangeText={event => this.props.onChangeTextImage(event)}
          />
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
    addPetImage: state.pet.addPetImage,
    currentUser: state.user.currentUser,
    addInstagram: state.pet.addInstagram,
  }
}

export default connect(mapStateToProps, {onChangeTextInstagram, onChangeTextPetName, onChangeTextPetAge, onChangeTextPetBreed, onChangeTextImage, clearAddPet})(AddPet);

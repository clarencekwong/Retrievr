import React from 'react'
import { View, Button, TextInput, StyleSheet, AsyncStorage, Image, KeyboardAvoidingView, TouchableOpacity, Text, Alert} from 'react-native'
import { createStackNavigator, navigate, NavigationActions, navigation } from 'react-navigation';
import {connect} from 'react-redux'
import {setUser, onChangeTextName, onChangeTextEmail, onChangeTextPassword, onChangeTextPasswordConfirmation, onChangeTextPhone, onSignUp} from '../Redux/actions'
import PetAdapter from '../Redux/PetAdapter';
import * as EmailValidator from 'email-validator';


class SignUp extends React.Component {

  signUp = (e) => {
    e.preventDefault()
    let signUpData = {
      name: this.props.name,
      email: this.props.email,
      password: this.props.password,
      phone: this.props.phone,
    }
    if (this.props.password === this.props.passwordConfirmation && EmailValidator.validate(this.props.email) && (this.props.phone.length === 10) && (this.props.name !== null)) {
      PetAdapter.postToUsers(signUpData)
      this.props.setUser(this.props.email)
      this.props.navigation.navigate('Main')
    } else {
      Alert.alert(
      'Invalid Credentials',
      'Please verify your information is correct and unique',
      [
        {
          text: 'OK',
          onPress: () => console.log('Ok Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    )
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.signUpContainer} behavior='padding'>
        <View style={styles.welcomeContainer}>
          <Image
            source={require('../assets/images/bouncing-dog.gif')}
            style={styles.welcomeImage}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder='Name'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={event => this.props.onChangeTextName(event)}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={event => this.props.onChangeTextEmail(event)}
        />
          <TextInput
            style={styles.input}
            placeholder='Password'
            secureTextEntry={true}
            autoCapitalize="none"
            placeholderTextColor='white'
            onChangeText={event => this.props.onChangeTextPassword(event)}
          />
          <TextInput
            style={styles.input}
            placeholder='Confirm Password'
            secureTextEntry={true}
            autoCapitalize="none"
            placeholderTextColor='white'
            onChangeText={event => this.props.onChangeTextPasswordConfirmation(event)}
          />
          <TextInput
            style={styles.input}
            placeholder='Phone Number'
            autoCapitalize="none"
            placeholderTextColor='white'
            onChangeText={event => this.props.onChangeTextPhone(event)}
          />
          <TouchableOpacity
            onPress={e => this.signUp(e)}
            style={styles.submit}>
            <Text style={{color: 'white', fontSize: 18, marginTop: 5, textAlign: 'center'}}>Sign Up</Text>
          </TouchableOpacity>
          <Button
            title="< Back to Log In"
            onPress={() => this.props.navigation.navigate('LogIn')}
            style={{paddingTop: 100}}
          />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#00b894',
    opacity: 0.6,
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  submit: {
    width: 300,
    height: 55,
    backgroundColor: '#00b894',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  signUpContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  welcomeImage: {
    width: 200,
    height: 160,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
})

function mapStateToProps(state) {
  return {
    name: state.user.name,
    email: state.user.email,
    password: state.user.password,
    passwordConfirmation: state.user.passwordConfirmation,
    phone: state.user.phone,
  }
}

export default connect(mapStateToProps, {setUser, onChangeTextName, onChangeTextEmail, onChangeTextPassword, onChangeTextPasswordConfirmation, onChangeTextPhone})(SignUp);

/**************************************************
- get redirected here on /sign up/ button click from LogIn page
- user fills out username, email, password, and phone number
- validations for information
- post user inputs to database
- redirect to add pets page
*/

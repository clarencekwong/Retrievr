import React from 'react'
import { View, Button, TextInput, StyleSheet, AsyncStorage, Image, KeyboardAvoidingView, TouchableOpacity, Text, SafeAreaView} from 'react-native'
import { createStackNavigator, navigate, NavigationActions, navigation } from 'react-navigation';
import {connect} from 'react-redux'
import {onChangeTextEmail, onChangeTextPassword, setCurrentUser} from '../Redux/actions'



class LogIn extends React.Component {

  logIn = () => {
    this.props.setCurrentUser(this.props.email, this.props.password, this.props.navigation)
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.props.navigation.navigate('Main')
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.signUpContainer} behavior='padding'>
        <SafeAreaView>
          <View style={styles.welcomeContainer}>
            <Image
                source={require('../assets/images/bouncing-dog.gif')}
                style={styles.welcomeImage}
              />
          </View>
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
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity
                  onPress={this.logIn}
                  style={styles.logInSignUp}>
              <Text style={{color: 'white', fontSize: 18, marginTop: 5, textAlign: 'center'}}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('SignUp')}
                  style={styles.logInSignUp}>
              <Text style={{color: 'white', fontSize: 18, marginTop: 5, textAlign: 'center'}}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
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
  logInSignUp: {
    width: 150,
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
    marginTop: 75,
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
    email: state.user.email,
    password: state.user.password,
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps, {onChangeTextEmail, onChangeTextPassword, setCurrentUser})(LogIn);

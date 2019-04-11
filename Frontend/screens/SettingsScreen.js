import React from 'react';
import { View, Button, TextInput, StyleSheet, AsyncStorage, Image, KeyboardAvoidingView, TouchableOpacity, Text, ScrollView} from 'react-native'
import { ExpoConfigView } from '@expo/samples';
import { createStackNavigator, navigate, NavigationActions, navigation } from 'react-navigation';
import {connect} from 'react-redux'
import {logOutCurrentUser} from '../Redux/actions'
import PetEditButtons from './PetEditButtons'
import AddPet from './AddPet'


class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  state = {
    myPetsButtonPress: false,
    addPetButtonPress: false,
    youSure: false,
  }

  logOut = () => {
    this.props.logOutCurrentUser()
    this.props.navigation.navigate('LogIn')
  }

  renderPetList = () => {
    if (this.state.myPetsButtonPress) {
      return this.props.selectedPetArray.map(pet => {
        return <PetEditButtons key={pet.id} pet={pet}/>
      })
    }
  }

  renderAddPet = () => {
    if (this.state.addPetButtonPress) {
      return <AddPet />
    }
  }

  renderYouSure = () => {
    if (this.state.youSure) {
      return (<View style={{backgroundColor: '#00b894'}}>
          <Text style={{color: 'white', fontSize: 18, marginTop: 5, textAlign: 'center'}}>Are you sure?</Text>
          <TouchableOpacity
            onPress={() => this.setState({ myPetsButtonPress: false, addPetButtonPress: false, youSure: false})}
            style={styles.logoutButtons}>
            <Text style={{color: '#00b894', fontSize: 18, marginTop: 5, textAlign: 'center'}}>Stay logged in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.logOut}
            style={styles.logoutButtons}>
            <Text style={{color: '#00b894', fontSize: 18, marginTop: 5, textAlign: 'center'}}>Log Out</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }


  render() {
    return(
      <ScrollView>
        <TouchableOpacity
          onPress={() => this.setState({ myPetsButtonPress: false, addPetButtonPress: false, youSure: !this.state.youSure})}
          style={styles.logInSignUp}>
          <Text style={{color: 'white', fontSize: 18, marginTop: 5, textAlign: 'center'}}>Log Out</Text>
        </TouchableOpacity>
        {this.renderYouSure()}
        <TouchableOpacity
          onPress={() => this.setState({ myPetsButtonPress: false, addPetButtonPress: !this.state.addPetButtonPress, youSure: false})}
          style={styles.logInSignUp}>
          <Text style={{color: 'white', fontSize: 18, marginTop: 5, textAlign: 'center'}}>Add Pet ➕</Text>
        </TouchableOpacity>
        {this.renderAddPet()}
        <TouchableOpacity
          onPress={() => this.setState({ myPetsButtonPress: !this.state.myPetsButtonPress, addPetButtonPress: false, youSure: false})}
          style={styles.logInSignUp}>
          <Text style={{color: 'white', fontSize: 18, marginTop: 5, textAlign: 'center'}}>My Pets</Text>
        </TouchableOpacity>
        {this.renderPetList()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  logInSignUp: {
    width: '95%',
    height: 55,
    backgroundColor: '#00b894',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 20,
    fontWeight: '500',
  },
  petButtons: {
    width: '95%',
    height: 55,
    backgroundColor: 'white',
    opacity: 0.8,
    margin: 10,
    padding: 8,
    color: '#00b894',
    borderRadius: 14,
    fontSize: 20,
    fontWeight: '500',
  },
  logoutButtons: {
    width: '95%',
    height: 55,
    backgroundColor: 'white',
    margin: 10,
    padding: 8,
    color: '#00b894',
    borderRadius: 14,
    fontSize: 20,
    fontWeight: '500',
  },
});

function mapStateToProps(state) {
  return {
    currentUser: state.user.currentUser,
    selectedPetArray: state.pet.selectedPetArray,
  }
}

export default connect(mapStateToProps, {logOutCurrentUser})(SettingsScreen);

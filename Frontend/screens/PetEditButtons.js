import React from 'react';
import { View, Button, TextInput, StyleSheet, AsyncStorage, Image, KeyboardAvoidingView, TouchableOpacity, Text} from 'react-native'
import { ExpoConfigView } from '@expo/samples';
import { createStackNavigator, navigate, NavigationActions, navigation } from 'react-navigation';
import {connect} from 'react-redux'
import {logOutCurrentUser} from '../Redux/actions'
import EditPet from './EditPet'


export default class PetEditButtons extends React.Component {

  state = {
    renderPetEditor: false,
  }


  renderEditPet = () => {
    if (this.state.renderPetEditor) {
      return <EditPet pet={this.props.pet} />
    }
  }

  render() {
    return(
      <View style={{backgroundColor: '#00b894'}}>
        <TouchableOpacity
          onPress={() => {this.setState({renderPetEditor: !this.state.renderPetEditor })}}
          style={styles.petButtons}>
          <Text style={{color: '#00b894', fontSize: 18, marginTop: 5, textAlign: 'center'}}>{this.props.pet.name}</Text>
        </TouchableOpacity>
        {this.renderEditPet()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
});

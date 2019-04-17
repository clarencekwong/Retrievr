import React from 'react'
import { View, Button, TextInput, StyleSheet, AsyncStorage, KeyboardAvoidingView, TouchableOpacity, Text, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import PetAdapter from '../Redux/PetAdapter';
import {onChangeTextPetName, onChangeTextPetAge, onChangeTextPetBreed, onChangeTextImage} from '../Redux/actions'

import ScheduleVetAppointment from './ScheduleVetAppointment'
import VetDropdown from './VetDropdown'

class EditPet extends React.Component {

  state = {
    vet: { },
    vets: null,
    scheduler: false,
    vetSelector: false,
  }

  vetSelectorToggle = () => {
    this.setState({vetSelector: !this.state.vetSelector})
  }

  componentDidMount() {
    fetch(`http://10.9.110.252:3000/api/v1/pets/${this.props.pet.id}`)
    .then(r=>r.json())
    .then(pet => {
      this.setState({ vet: pet.vet})
    })
    fetch("http://10.9.110.252:3000/api/v1/vets")
    .then(res => res.json())
    .then(vets => {
      this.setState({ vets: vets })
    })
  }

  renderDatePicker = () => {
    if (this.state.scheduler) {
      return <ScheduleVetAppointment pet={this.props.pet} vet={this.state.vet}/>
    } else if (this.state.vetSelector) {
      return <VetDropdown vets={this.state.vets} vetSelectorToggle={this.vetSelectorToggle}/>
    }
  }


  render() {
    return (
      <ScrollView contentContainerStyle={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00b894'}}>
        <KeyboardAvoidingView style={styles.signUpContainer}>
          <TouchableOpacity style={styles.input} onPress={this.state.vet? () => this.setState({ scheduler: !this.state.scheduler, vetSelector: false}) : () => this.setState({ scheduler: false, vetSelector: !this.state.vetSelector })}>
            <Text style={{color: '#00b894', textAlign: 'center', fontSize: 16}}>{this.state.vet ? `Schedule appointment with Dr. ${this.state.vet.name}` : `Add your pet's vet`}</Text>
          </TouchableOpacity>
          {this.renderDatePicker()}
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
    margin: 10,
    padding: 8,
    color: '#00b894',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  signUpContainer: {
    flex: 1,
    // justifyContent: 'center',
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
  }
}

export default connect(mapStateToProps, {onChangeTextPetName, onChangeTextPetAge, onChangeTextPetBreed, onChangeTextImage})(EditPet);

import React from 'react'
import { View, Button, TextInput, StyleSheet, AsyncStorage, KeyboardAvoidingView, TouchableOpacity, Text, ScrollView, Picker, Alert} from 'react-native'
import {connect} from 'react-redux'
import PetAdapter from '../Redux/PetAdapter';
import {onChangeTextPetName, onChangeTextPetAge, onChangeTextPetBreed, onChangeTextImage} from '../Redux/actions'
import ScheduleVetAppointment from './ScheduleVetAppointment'

class VetDropdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedVet: null,
    }
  }
  renderPickers = () => {
    return this.props.vets.map(vet=> {
      return <Picker.Item key={vet.id} label={vet.name} value={vet.id} />
    })
  }

  addVetToPet = () => {
    let petVet = {
      vet_id: this.state.selectedVet
    }
    fetch(`http://10.9.110.252:3000/api/v1/pets/${this.props.selectedPet.id}`, {
      method: "PATCH",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(petVet)
    })
    Alert.alert(
      `Success!`,
      `Your vet has been added`,
      [
        {text: 'OK', onPress: () => this.props.vetSelectorToggle()},
      ],
      {cancelable: false},
    )
  }

  render() {
    return (
      <View>
        <View style={{height: 200, width: 300, backgroundColor: 'white', borderRadius: 14}}>
          <Picker
            selectedValue={this.state.selectedVet}
            style={{ marginHorizontal: 20, height: 50, width: 260}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({selectedVet: itemValue})
            }>
            {this.renderPickers()}
          </Picker>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => this.addVetToPet()}
            style={styles.submit}>
            <Text style={{color: '#00b894', fontSize: 18, marginTop: 5, textAlign: 'center'}}>Add Your Vet</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    height: 50,
    backgroundColor: 'white',
    marginTop: 8,
    marginHorizontal: 50,
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
    selectedPet: state.pet.selectedPet
  }
}

export default connect(mapStateToProps)(VetDropdown)

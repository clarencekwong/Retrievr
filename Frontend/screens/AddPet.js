import React from 'react'
import { View, Button, TextInput, StyleSheet, AsyncStorage} from 'react-native'
import {connect} from 'react-redux'
import PetAdapter from '../Redux/PetAdapter';

class AddPet extends React.Component {



  addPetToMyProfile = () => {
    let dogAttr = {
      addPetName: this.props.addPetName,
      addPetAge: this.props.addPetAge,
      addPetBreed: this.props.addPetBreed,
      addPetImage: this.props.addPetImage,
      addPetUserId: this.props.currentUserId,
    }
  }

  render() {
    return (
      <View style={styles.signUpContainer}>
        <TextInput
          style={styles.input}
          placeholder='Name'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('name', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Age'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('age', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Breed'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('breed', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Image URL'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('image', val)}
        />
        <Button
          title='Sign Up'
          onPress={this.signUp}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
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
  }
})

function mapStateToProps(state) {
  return {
    addPetName: state.pet.addPetName,
    addPetAge: state.pet.addPetAge,
    addPetBreed: state.pet.addPetBreed,
    addPetImage: state.pet.addPetImage,
    addPetUserId: state.user.addPetUserId,
  }
}

export default connect(mapStateToProps)(AddPet);

/*
-

*/

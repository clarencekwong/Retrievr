//////////////////////////////////////////////////////////////
//                                                          //
//                      Has ONE fetch                       //
//                                                          //
//////////////////////////////////////////////////////////////

import React, {Fragment} from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Linking, TextInput, Button, Alert } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {connect} from 'react-redux'
import { createStackNavigator, navigate, NavigationActions, navigation } from 'react-navigation';
import {togglePoster} from '../Redux/actions'


class MissingPetPoster extends React.Component {

  state = {
    latitudeMissing: null,
    longitudeMissing: null,
    etDescriptors: " ",
    timeMissing: null,
    flipper: false,
  }

  setLostLocaiton = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        latitudeMissing: position.coords.latitude,
        longitudeMissing: position.coords.longitude,
        timeMissing: Date(),
        flipper: true,
      })
    })
  }

  componentDidMount(){
    Alert.alert(
    'Set time and place',
    'If your pet has just NOW gone missing from THIS location, select OK',
    [
      {text: 'Input Manually', onPress: () => console.log('Input manually pressed')},
      {
        text: 'OK',
        onPress: () => this.setLostLocaiton(),
        style: 'cancel',
      },
      {
        text: 'Cancel',
        onPress: () => this.props.togglePoster(),
        style: 'cancel',
      },
    ],
    {cancelable: true},
  )
  }

  renderPosterForm = () => {
    if (this.state.flipper) {
      return(
        <Fragment>
          <TextInput value={'Here'} style={styles.simpleInput} editable={this.state.missing_lat ? false : true}/>
          <TextInput value={'Now'} style={styles.simpleInput} editable={false}/>
          <TextInput placeholder={"descriptors"} style={styles.biggerInput} editable={true} onChange={event => this.setState({petDescriptors: event})}/>
        </Fragment>
      )
    } else {
      return(
        <Fragment>
          <TextInput placeholder={`Where did you last see ${this.props.selectedPet.name}?`} style={styles.simpleInput} editable={true} onChange={event => this.setState({missing_lat: event})}/>
          <TextInput placeholder={`When did you last see ${this.props.selectedPet.name}?`} style={styles.simpleInput} editable={true} onChange={event => this.setState({missing_time: event})}/>
          <TextInput placeholder={"descriptors"} style={styles.biggerInput} editable={true} onChange={event => this.setState({petDescriptors: event})}/>
        </Fragment>
      )
    }
  }


  createPoster = () => {
    if (this.state.latitudeMissing && this.state.petDescriptors) {
      let posterData = {
        missing_lat: String(this.state.latitudeMissing),
        missing_lon: String(this.state.longitudeMissing),
        missing_time: this.state.timeMissing,
        descriptors: this.state.etDescriptors,
        pet_id: this.props.selectedPet.id
      }
      fetch(`http://retrievr-api.herokuapp.com/api/v1/posters/`, {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(posterData)
      })
      Alert.alert(
      'Poster Created!',
      'Retrievrs near you will be notified that your pet is missing!',
      [
        {
          text: 'OK',
          onPress: () => this.props.togglePoster(),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    )
    this.setState({
      latitudeMissing: null,
      longitudeMissing: null,
      petDescriptors: " ",
      timeMissing: null,
    })
    }
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps='handled' style={styles.container1}>
        <Text style={styles.prompt}>Provide a little more information to help our community find your pet!</Text>
          {this.renderPosterForm()}
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity style={styles.submitMessageButton}>
            <Button
              onPress={()=>this.props.togglePoster()}
              title="Cancel"
              color='black'
              accessibilityLabel="Cancel"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitMessageButton}>
            <Button
              onPress={()=>this.createPoster()}
              title="Post"
              color='black'
              accessibilityLabel="Create a poster for your missing pet"
            />
          </TouchableOpacity>
        </View>
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
  simpleInput: {
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
  biggerInput: {
    paddingLeft: 5,
    marginTop: 10,
    height: 80,
    marginHorizontal: 30,
    width: '85%',
    borderColor: 'grey',
    borderWidth: 4,
    borderRadius: 10,
    fontSize: 18,
    color: 'green',
  },
  submitMessageButton: {
    width: 100,
    marginHorizontal: '12%',
    borderWidth: 2,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: 'lightgrey',

  },
});

function mapStateToProps(state) {
  return {
    currentUser: state.user.currentUser,
    selectedPet: state.pet.selectedPet,
  }
}

export default connect(mapStateToProps, {togglePoster})(MissingPetPoster)

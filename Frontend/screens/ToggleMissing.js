import React from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Linking, Image, Switch, Button, Alert } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {connect} from 'react-redux'
import createOpenLink from 'react-native-open-maps';
import { toggleMissing} from '../Redux/actions'


class ToggleMissing extends React.Component {

  state = {
    petHasBeenLocated: false
  }

  componentDidMount() {
    this.setState({ petHasBeenLocated: false })
    this.interval = setInterval(()=> this.getItems(), 3000);
  }

  getItems() {
    fetch(`http://10.9.107.37:3000/api/v1/pets/${this.props.selectedPet.id}`)
    .then(result => result.json())
    .then(pet => {
      if (pet.found_latitude !== null) {
        this.setState({ petHasBeenLocated: true })
        Alert.alert(
          `${this.props.selectedPet.name} has been found!`,
          `Your pet was located by ${this.props.selectedPet.finder_name}`,
          [
            {text: 'OK', onPress: ()=>this.stopInt,
          },
          ],
          {cancelable: false},
        )
        this.stopInt()
      }
    })
  }

  stopInt = () => {
    clearInterval(this.interval)
  }

  renderLostPetLocButton = () => {
    if (this.props.selectedPet.missing) {
      if (!this.state.petHasBeenLocated) {
        return <SafeAreaView style={{flex: 1, flexDirection: 'row'}}>
          <View>
            <Text style={{fontSize: 18, paddingBottom: 5, textAlign: 'center'}}>
              {this.props.selectedPet.missing ? 'My pet is missing!😟' : 'Safe and sound 😃'}
            </Text>
            <Switch
             onValueChange = {() => {this.props.toggleMissing(this.props.selectedPet)}}
             value = {this.props.selectedPet.missing}
             style={styles.toggleMissing}
             ios_backgroundColor={this.props.selectedPet.missing ? '#d63031' : '#00b894'}
             trackColor={{false: '#00b894', true: '#d63031'}}/>
           </View>
           <TouchableOpacity style={styles.mapButton} onPress={this.goToLoc}>
            <Image
              style={{width: 70, height: 60}}
              source={{uri: 'https://s3.amazonaws.com/iconbros/icons/icon_pngs/000/000/355/original/map.png?1510933432'}}
            />
           </TouchableOpacity>
        </SafeAreaView>
      } else {
        return <SafeAreaView style={{flex: 1, flexDirection: 'row'}}>
          <View>
            <Text style={{fontSize: 18, paddingBottom: 5, textAlign: 'center'}}>
              {this.props.selectedPet.missing ? 'My pet is missing!😟' : 'Safe and sound 😃'}
            </Text>
            <Switch
             onValueChange = {() => {this.props.toggleMissing(this.props.selectedPet)}}
             value = {this.props.selectedPet.missing}
             style={styles.toggleMissing}
             ios_backgroundColor={this.props.selectedPet.missing ? '#d63031' : '#00b894'}
             trackColor={{false: '#00b894', true: '#d63031'}}/>
           </View>
           <TouchableOpacity style={styles.mapButtonLocated} onPress={this.goToLoc}>
            <Image
              style={{width: 70, height: 60}}
              source={{uri: 'https://s3.amazonaws.com/iconbros/icons/icon_pngs/000/000/355/original/map.png?1510933432'}}
            />
           </TouchableOpacity>
        </SafeAreaView>
      }
    } else {
      return <SafeAreaView>
        <Text style={{fontSize: 18, paddingBottom: 5, textAlign: 'center'}}>
          {this.props.selectedPet.missing ? 'My pet is missing!😟' : 'Safe and sound 😃'}
        </Text>
        <Switch
          onValueChange = {() => {this.props.toggleMissing(this.props.selectedPet)}}
          value = {this.props.selectedPet.missing}
          style={styles.toggleMissing}
          ios_backgroundColor={this.props.selectedPet.missing ? '#d63031' : '#00b894'}
          trackColor={{false: '#00b894', true: '#d63031'}}/>
      </SafeAreaView>
    }
  }

  goToLoc = () => {
    createOpenLink({ latitude: parseFloat(this.props.foundPetLat), longitude: parseFloat(this.props.foundPetLon), query: `${this.props.selectedPet.name}` });
  }

  render() {
    return (
      <SafeAreaView style={{marginTop: 18, alignItems: 'center', height: 60}}>
        {this.renderLostPetLocButton()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  toggleMissing: {
    width: 200
  },
  mapButton: {
    marginHorizontal: 18,
    width: 120,
    height: 70,
    backgroundColor: 'lightgrey',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapButtonLocated: {
    marginHorizontal: 18,
    width: 120,
    height: 70,
    backgroundColor: '#00b894',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

function mapStateToProps(state) {
  return {
    passiveTrigger: state.pet.passiveTrigger,
    selectedPet: state.pet.selectedPet,
    foundPetLat: state.pet.selectedPet.found_latitude,
    foundPetLon: state.pet.selectedPet.found_longitude,
  }
}

export default connect(mapStateToProps, { toggleMissing})(ToggleMissing);

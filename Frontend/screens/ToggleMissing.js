import React from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Linking, Image, Switch, Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {connect} from 'react-redux'
import openMap from 'react-native-open-maps';
import {toggleMissing} from '../Redux/actions'



class ToggleMissing extends React.Component {

  handleMissingToggle = () => {
    this.props.toggleMissing(this.props.selectedPet, this.props.selectedPetMissing)
  }

  renderLostPetLocButton = () => {
    if (this.props.selectedPetMissing) {
      if (!this.props.coords) {
        return <SafeAreaView style={{flex: 1, flexDirection: 'row'}}>
          <View>
            <Text style={{fontSize: 18, paddingBottom: 5}}>
              {this.props.selectedPetMissing ? 'My pet is missing!😟' : 'Safe and sound 😃'}
            </Text>
            <Switch
             onValueChange = {this.handleMissingToggle}
             value = {this.props.selectedPetMissing}
             style={styles.toggleMissing}
             ios_backgroundColor={this.props.selectedPetMissing ? 'red' : 'green'}
             trackColor={{false: 'green', true: 'red'}}/>
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
            <Text style={{fontSize: 18, paddingBottom: 5}}>
              {this.props.selectedPetMissing ? 'My pet is missing!😟' : 'Safe and sound 😃'}
            </Text>
            <Switch
             onValueChange = {this.handleMissingToggle}
             value = {this.props.selectedPetMissing}
             style={styles.toggleMissing}
             ios_backgroundColor={this.props.selectedPetMissing ? 'red' : 'green'}
             trackColor={{false: 'green', true: 'red'}}/>
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
        <Text style={{fontSize: 18, paddingBottom: 5}}>
          {this.props.selectedPetMissing ? 'My pet is missing!😟' : 'Safe and sound 😃'}
        </Text>
        <Switch
          onValueChange = {this.handleMissingToggle}
          value = {this.props.selectedPetMissing}
          style={styles.toggleMissing}
          ios_backgroundColor={this.props.selectedPetMissing ? 'red' : 'green'}
          trackColor={{false: 'green', true: 'red'}}/>
      </SafeAreaView>
    }
  }

  goToLoc = () => {
    openMap({ latitude: this.props.coords.coords.latitude, longitude: this.props.coords.coords.longitude });
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
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapButtonLocated: {
    marginHorizontal: 18,
    width: 120,
    height: 70,
    backgroundColor: 'green',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

function mapStateToProps(state) {
  return {
    selectedPet: state.pet.selectedPet,
    selectedPetMissing: state.pet.selectedPetMissing,
    coords: state.user.coords
  }
}

export default connect(mapStateToProps, {toggleMissing})(ToggleMissing);

import React from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Linking, Image, Switch, Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {connect} from 'react-redux'
import createOpenLink from 'react-native-open-maps';
import {toggleOptimisticRender, toggleMissing} from '../Redux/actions'



class ToggleMissing extends React.Component {


  // componentDidMount(){
  //   console.log("updating", this.props.selectedPet);
  //   this.props.toggleOptimisticRender(this.props.selectedPet)
  // }

  renderLostPetLocButton = () => {
    // console.log("line 19", this.props.selectedPet.missing);
    if (this.props.toggle) {
      // console.log("line 21", this.props.toggle);
      if (!this.props.foundPetLat) {
        return <SafeAreaView style={{flex: 1, flexDirection: 'row'}}>
          <View>
            <Text style={{fontSize: 18, paddingBottom: 5, textAlign: 'center'}}>
              {this.props.toggle ? 'My pet is missing!😟' : 'Safe and sound 😃'}
            </Text>
            <Switch
             onValueChange = {() => {this.props.toggleMissing(this.props.selectedPet); this.props.flipToggle()}}
             value = {this.props.toggle}
             style={styles.toggleMissing}
             ios_backgroundColor={this.props.toggle ? '#d63031' : '#00b894'}
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
              {this.props.toggle ? 'My pet is missing!😟' : 'Safe and sound 😃'}
            </Text>
            <Switch
             onValueChange = {() => {this.props.toggleMissing(this.props.selectedPet); this.props.flipToggle()}}
             value = {this.props.toggle}
             style={styles.toggleMissing}
             ios_backgroundColor={this.props.toggle ? '#d63031' : '#00b894'}
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
          {this.props.toggle ? 'My pet is missing!😟' : 'Safe and sound 😃'}
        </Text>
        <Switch
          onValueChange = {() => {this.props.toggleMissing(this.props.selectedPet); this.props.flipToggle()}}
          value = {this.props.toggle}
          style={styles.toggleMissing}
          ios_backgroundColor={this.props.toggle ? '#d63031' : '#00b894'}
          trackColor={{false: '#00b894', true: '#d63031'}}/>
      </SafeAreaView>
    }
  }

  goToLoc = () => {
    createOpenLink({ latitude: this.props.foundPetLat, longitude: this.props.foundPetLon, query: `${this.props.selectedPet.name}` });
  }

  render() {
    console.log("Toggle props", this.props.selectedPet);
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
  console.log("MAP STATE", state);
  return {
    selectedPet: state.pet.selectedPet,
    petMissingToggle: state.pet.petMissingToggle,
    // selectedPet.missing: state.pet.selectedPet.missing,
    foundPetLat: state.pet.foundPetLat,
    foundPetLon: state.pet.foundPetLon,
  }
}

export default connect(mapStateToProps, {toggleOptimisticRender, toggleMissing})(ToggleMissing);

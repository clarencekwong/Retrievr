import React from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {fetchMyPets, cycleMyPets} from "../Redux/actions";
import {connect} from 'react-redux'
import {toggleMissing} from '../Redux/actions'


import PetCard from './PetCard';
import ToggleMissing from './ToggleMissing'
import ScheduleVetAppt from './ScheduleVetAppt'


class PetCardContainer extends React.Component {

  lastTap = null

  doubleTap = () => {
    const now = Date.now()
    const DOUBLE_PRESS_DELAY = 300
    if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY) {
      this.props.cycleMyPets(this.props.selectedPetIndex, this.props.selectedPetArray.length)
    } else {
      this.lastTap = now
    }
  }

  componentDidMount(){
    this.props.fetchMyPets(this.props.currentUser)
  }

  state = {
    toggle: this.props.selectedPet.missing
  }

  flipToggle = () => {
    this.setState({
      toggle: !this.state.toggle
    })
  }

  render() {
    console.log("pet card container");
    return (
      <TouchableOpacity style={styles.petCardContainer} onPress={this.doubleTap}>
        <PetCard selectedPet={this.props.selectedPet} />
        <ToggleMissing toggle={this.state.toggle} flipToggle={this.flipToggle}/>
        <ScheduleVetAppt selectedPet={this.props.selectedPet}/>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  petCardContainer: {
    height: '70%',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    marginHorizontal: 20,
  },
});

function mapStateToProps(state) {
  return {
    selectedPetArray: state.pet.selectedPetArray,
    selectedPetIndex: state.pet.selectedPetIndex,
    selectedPet: state.pet.selectedPet,
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps, {fetchMyPets, cycleMyPets, toggleMissing} )(PetCardContainer)

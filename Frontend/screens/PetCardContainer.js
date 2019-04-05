import React from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {fetchMyPets} from "../Redux/actions";
import {connect} from 'react-redux'

import PetCard from './PetCard';
import ToggleMissing from './ToggleMissing'
import ScheduleVetAppt from './ScheduleVetAppt'


class PetCardContainer extends React.Component {

  componentDidMount(){
    this.props.fetchMyPets()
  }

  render() {
    return (
      <View style={styles.petCardContainer}>
        <PetCard selectedPet={this.props.selectedPet}/>
        <ToggleMissing selectedPet={this.props.selectedPet}/>
        <ScheduleVetAppt selectedPet={this.props.selectedPet}/>
      </View>
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
    selectedPet: state.pet.selectedPet
  }
}

export default connect(mapStateToProps, {fetchMyPets})(PetCardContainer)

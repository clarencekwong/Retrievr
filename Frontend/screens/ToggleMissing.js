import React from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Linking, Image, Switch } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {connect} from 'react-redux'

import {toggleMissing} from '../Redux/actions'



class ToggleMissing extends React.Component {

  handleMissingToggle = () => {
    this.props.toggleMissing(this.props.selectedPet, this.props.selectedPetMissing)
  }

  render() {
    return (
      <SafeAreaView style={{marginTop: 18, alignItems: 'center'}}>
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
    );
  }
}

const styles = StyleSheet.create({
  toggleMissing: {
    width: 200
  },
});

function mapStateToProps(state) {
  return {
    selectedPet: state.selectedPet,
    selectedPetMissing: state.selectedPetMissing
  }
}

export default connect(mapStateToProps, {toggleMissing})(ToggleMissing);

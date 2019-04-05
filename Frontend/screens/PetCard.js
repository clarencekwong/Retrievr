import React from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Linking, Image, Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';



export default class PetCard extends React.Component {

  render() {
    return (
      <SafeAreaView style={styles.petCardContainer}>
        <Text style={{color: 'black', paddingLeft: 10, paddingTop: 10, fontSize: 22}}>{this.props.selectedPet.name}</Text>
        <Image
          source={{uri: `${this.props.selectedPet.image}`}}
          style={styles.petImage}
        />
        <Text style={{paddingLeft: 10, paddingTop: 10, fontSize: 16}}>{this.props.selectedPet.breed}</Text>
        <Text style={{paddingLeft: 10, paddingTop: 5, fontSize: 16}}>{this.props.selectedPet.age}</Text>
        <Text style={{paddingLeft: 10, paddingTop: 5, fontSize: 16}}>Last Vet Visit: {this.props.selectedPet.last_vet_visit}</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  petCardContainer: {
    height: '62%',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 10,
  },
  petImage: {
    marginTop: 5,
    marginLeft: 10,
    height: 114,
    width: 172,
    borderRadius: 5,

  },
});

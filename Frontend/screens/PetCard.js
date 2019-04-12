import React from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Linking, Image, Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import ToggleMissing from './ToggleMissing'
import dateFormat from 'dateformat';


export default class PetCard extends React.Component {


  render() {
    return (
        <View style={styles.petCardContainer}>
          <Text style={{color: 'white', paddingLeft: 10, paddingTop: 10, fontSize: 22}}>{this.props.selectedPet.name}</Text>
          <Image
            source={{uri: `${this.props.selectedPet.image}`}}
            style={styles.petImage}
          />
          <Text style={{color: 'white', paddingLeft: 10, paddingTop: 10, fontSize: 16}}>{this.props.selectedPet.breed}</Text>
          <Text style={{color: 'white', paddingLeft: 10, paddingTop: 5, fontSize: 16}}>{this.props.selectedPet.age}</Text>
          <Text style={{color: 'white', paddingLeft: 10, paddingTop: 5, fontSize: 16}}>Next Vet Visit: {this.props.selectedPet.last_vet_visit ? dateFormat(this.props.selectedPet.last_vet_visit, "mmmm dS, yyyy") : "Not scheduled yet"}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  petCardContainer: {
    height: '70%',
    backgroundColor: '#00b894',
    // borderWidth: 2,
    borderColor: 'white',
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

// export default connect(mapStateToProps)(PetCard)

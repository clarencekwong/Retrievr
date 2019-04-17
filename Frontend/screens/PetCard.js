import React from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Linking, Image, Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import ToggleMissing from './ToggleMissing'
import dateFormat from 'dateformat';


export default class PetCard extends React.Component {

  renderInstagramButton = () => {
    if (this.props.selectedPet.instagram) {
      return (<View style={{flex: 1, flexDirection: 'row'}}>
        <Image
          source={{uri: `${this.props.selectedPet.image}`}}
          style={styles.petImage}
        />
        <TouchableOpacity style={{height:45, width: 45, marginLeft: 90}} onPress={()=> Linking.openURL(`http://instagram.com/${this.props.selectedPet.instagram}`)}>
        <Image
          source={{uri: `https://cdn.pixabay.com/photo/2016/09/17/07/03/instagram-1675670_960_720.png`}}
          style={{height: 45, width: 45}}
        />
        </TouchableOpacity>
      </View>
    )
  } else {
    return (<View style={{flex: 1, flexDirection: 'row'}}>
        <Image
          source={{uri: `${this.props.selectedPet.image}`}}
          style={styles.petImage}
        />
      </View>
    )
  }
  }


  render() {
    return (
        <View style={styles.petCardContainer}>
          <Text style={{color: 'white', paddingLeft: 10, paddingTop: 10, fontSize: 22}}>{this.props.selectedPet.name}</Text>
          {this.renderInstagramButton()}
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

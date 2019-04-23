import React from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Linking, Image, Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import ToggleMissing from './ToggleMissing'
import dateFormat from 'dateformat';
import QRCode from 'react-native-qrcode';

export default class PetCard extends React.Component {

  state = {
    qrOrImgToggle: false
  }

  lastTap = null

  doubleTap = () => {
    const now = Date.now()
    const DOUBLE_PRESS_DELAY = 300
    if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY) {
      this.setState({ qrOrImgToggle: !this.state.qrOrImgToggle })
    } else {
      this.lastTap = now
    }
  }

  renderInstagramButton = () => {
    if (this.props.selectedPet.instagram) {
      if (this.state.qrOrImgToggle) {
        return (<View style={{flex: 1, flexDirection: 'row', marginTop: 10, marginLeft: 10}}>
            <QRCode
            value={`retrievr-api.herokuapp.com/missing-pets ${this.props.selectedPet.id}`}
            size={140}
            bgColor='black'
            fgColor='#00b894'
            />
          <TouchableOpacity style={{height:45, width: 45, marginLeft: 130, marginTop: -10}} onPress={()=> Linking.openURL(`http://instagram.com/${this.props.selectedPet.instagram}`)}>
          <Image
            source={{uri: `https://image.flaticon.com/icons/png/512/174/174855.png`}}
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
        <TouchableOpacity style={{height:45, width: 45, marginLeft: 70}} onPress={()=> Linking.openURL(`http://instagram.com/${this.props.selectedPet.instagram}`)}>
        <Image
          source={{uri: `https://image.flaticon.com/icons/png/512/174/174855.png`}}
          style={{height: 45, width: 45}}
        />
        </TouchableOpacity>
      </View>
    )
    }
  } else {
    if (this.state.qrOrImgToggle) {
      return (<View style={{flex: 1, flexDirection: 'row', marginTop: 10, marginLeft: 10}}>
          <QRCode
          value={`retrievr-api.herokuapp.com/missing-pets ${this.props.selectedPet.id}`}
          size={140}
          bgColor='black'
          fgColor='#00b894'
          />
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
  }


  render() {
    return (
        <TouchableOpacity style={styles.petCardContainer} onPress={this.doubleTap}>
          <Text style={{color: 'white', paddingLeft: 10, paddingTop: 10, fontSize: 22}}>{this.props.selectedPet.name}</Text>
          {this.renderInstagramButton()}
          <Text style={{color: 'white', paddingLeft: 10, paddingTop: 5, fontSize: 16}}>{this.props.selectedPet.breed}</Text>
          <Text style={{color: 'white', paddingLeft: 10, paddingTop: 5, fontSize: 16}}>{this.props.selectedPet.age}</Text>
          <Text style={{color: 'white', paddingLeft: 10, paddingTop: 5, paddingBottom: 10, fontSize: 16}}>Next Vet Visit: {this.props.selectedPet.last_vet_visit ? dateFormat(this.props.selectedPet.last_vet_visit, "mmmm dS, yyyy") : "Not scheduled yet"}</Text>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  petCardContainer: {
    height: '74%',
    backgroundColor: '#00b894',
    // borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
  },
  petImage: {
    marginTop: 5,
    marginLeft: 10,
    width: 200,
    height: 140,
    borderRadius: 5,

  },
});

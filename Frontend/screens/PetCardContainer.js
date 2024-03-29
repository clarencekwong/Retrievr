import React from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Linking, Fragment } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {fetchMyPets, cycleMyPets} from "../Redux/actions";
import {connect} from 'react-redux'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';



import PetCard from './PetCard';
import ToggleMissing from './ToggleMissing'


class PetCardContainer extends React.PureComponent {
  state = {
    defaultPet: {
      name: "Your Pet",
      age: 0,
      breed: "??",
      last_vet_visit: "2019-01-01",
      image: "https://m.media-amazon.com/images/M/MV5BN2Y1ZGY0OWMtMWJlNy00MTcyLWI0YzktNTIyZDQ0Y2Y5MTEzXkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_CR0,45,480,270_AL_UX477_CR0,0,477,268_AL_.jpg",
      missing: false,
      missing_latitude: null,
      missing_longitude: null,
      found_latitude: null,
      found_longitude: null,
      finder_name: null,
      finder_phone: null,
    }
  }

  onSwipeRight = gestureState => {
    this.props.cycleMyPets(this.props.selectedPetIndex, this.props.selectedPetArray.length, 'right')
  }

  onSwipeLeft = gestureState => {
    this.props.cycleMyPets(this.props.selectedPetIndex, this.props.selectedPetArray.length, 'left')
  }


  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.selectedPetArray !== this.props.selectedPetArray) {
      this.setState({
        anotherFlipper: !this.state.anotherFlipper
      })
    }
  }

  componentDidMount(){
    this.intervalFetch = setInterval(()=> this.props.fetchMyPets(this.props.currentUser), 3000);
  }

  renderDefaultPet = () => {
    if (!this.props.selectedPet) {
      return (<View>
        <PetCard selectedPet={this.state.defaultPet} />
        <ToggleMissing selectedPet={this.state.defaultPet}/>
      </View>
      )
    } else {
      return (<View>
        <PetCard selectedPet={this.props.selectedPet} />
        <ToggleMissing />
      </View>
      )
    }
  }


  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    }
    return (
      <GestureRecognizer
        onSwipeRight={(state) => this.onSwipeRight(state)}
        onSwipeLeft={(state) => this.onSwipeLeft(state)}
        config={config}
        style={styles.petCardContainer}
      >
        {this.renderDefaultPet()}
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  petCardContainer: {
    height: '70%',
    borderRadius: 10,
    // borderTopEndRadius: 10,
    // borderTopStartRadius: 10,
    marginHorizontal: 20,
  },
});

function mapStateToProps(state) {
  return {
    selectedPetArray: state.pet.selectedPetArray,
    selectedPetIndex: state.pet.selectedPetIndex,
    selectedPet: state.pet.selectedPet,
    currentUser: state.user.currentUser,
    toggleAptChange: state.pet.toggleAptChange,
  }
}

export default connect(mapStateToProps, {fetchMyPets, cycleMyPets} )(PetCardContainer)

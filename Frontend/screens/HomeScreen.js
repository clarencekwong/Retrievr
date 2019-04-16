import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, RefreshControl, KeyboardAvoidingView } from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import {connect} from 'react-redux'

import PetCardContainer from './PetCardContainer';
import BottomButtons from './BottomButtons';
import MissingPetPoster from './MissingPetPoster';
import {togglePoster} from '../Redux/actions'


class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount(){
    this.props.togglePoster()
  }

  toggleButtons = () => {
    if (this.props.toggleMissingPetPoster && this.props.selectedPet.missing) {
      return (
        <ScrollView style={styles.missingPoster}>
          <MissingPetPoster />
        </ScrollView>
      )
    } else {
      return (
        <SafeAreaView style={styles.aContainer}>
          <PetCardContainer />
          <BottomButtons />
        </SafeAreaView>
      )
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <TouchableOpacity style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/running-dog.gif')
                  : require('../assets/images/bouncing-dog.gif')
              }
              style={styles.welcomeImage}
            />
          </TouchableOpacity>
          {this.toggleButtons()}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

}

function mapStateToProps(state) {
  return {
    toggleMissingPetPoster: state.pet.toggleMissingPetPoster,
    selectedPet: state.pet.selectedPet,
  }
}

export default connect(mapStateToProps, {togglePoster})(HomeScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
    height: '100%'
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  aContainer: {
    height: '80%'
  }
});

import { View, AsyncStorage, Alert } from 'react-native';
import { createStackNavigator, navigate, NavigationActions, navigation } from 'react-navigation';

import { TOGGLE_MISSING, GET_MY_PETS, FOUND_A_PET, TOGGLE_MISSING_PET_FOUND, LOCATION, GET_TOKEN, SAVE_TOKEN, REMOVE_TOKEN, LOADING, ERROR, EMAIL_INPUT, PASSWORD_INPUT, PASSWORD_CONFIRMATION, PHONE_INPUT, ADD_PET_NAME, ADD_PET_AGE, ADD_PET_BREED, ADD_PET_IMAGE, ADD_PET_USER_ID, INCREMENT_MY_PET_INDEX, SET_USER, OPTIMISTIC_TOGGLE, LOG_OUT, FINDER_INFO } from './types';
import PetAdapter from './PetAdapter';


//////////////////////////////////////////////////////////////
//                                                          //
// Letting front and back end know the pet's missing state  //
//                                                          //
//////////////////////////////////////////////////////////////
export function toggleMissing(pet) {
  return dispatch => {
    let data = {
      missing: !pet.missing,
      finder_name: null,
      finder_phone_number: null,
      found_latitude: null,
      found_longitude: null,
    }
    fetch(`http://10.9.105.231:3000/api/v1/pets/${pet.id}`, {
      method: "PATCH",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(r=>r.json())
    .then(petObj=> {
       dispatch({type: TOGGLE_MISSING, payload: petObj})
    })
  }
}
export function toggleOptimisticRender(pet) {
  return {
    type: OPTIMISTIC_TOGGLE,
    payload: pet.missing
  }
}

//////////////////////////////////////////////////////////////
//                                                          //
//       Rendering user's pets to the home screen           //
//                                                          //
//////////////////////////////////////////////////////////////

// make this work where a double tap can cycle through the user's pets
export function filterPets(userObj) {
  return {
    type: GET_MY_PETS,
    payload: userObj.pets
  }
}
///////////////// make this dynamic so the number that gets passed in is based
//////////////// who is currently logged in
export function fetchMyPets(id) {
  return (dispatch) => {
    PetAdapter.getMyPets(id)
    .then(userObj => {
      dispatch(filterPets(userObj))
    })
  }
}

//////////////////////////////////////////////////////////////
//                                                          //
//          Handling finding/scanning a pet's tag           //
//                                                          //
//////////////////////////////////////////////////////////////
export function findPetsOwner(petObj){
  return {
    type: FOUND_A_PET,
    payload: petObj
  }
}
export function fetchFoundPet(id){
  return dispatch => {
    PetAdapter.getFoundPet(id)
    .then(pet => {
      dispatch(findPetsOwner(pet))
    })
  }
}

export function sendFinderInfo(userId) {
  return dispatch => {
    PetAdapter.getMyPets(userId)
    .then(user => {
      dispatch({
        type: FINDER_INFO,
        payload: user
      })
    })
  }
}


//////////////////////////////////////////////////////////////
//                                                          //
//                  Cycle through my pets                   //
//                                                          //
//////////////////////////////////////////////////////////////

export function cycleMyPets(index, length) {
  if (index > (length - 2)) {
    index = 0
    return {
      type: INCREMENT_MY_PET_INDEX,
      payload: index
    }
  } else {
    index ++
    return {
      type: INCREMENT_MY_PET_INDEX,
      payload: index
    }
  }
}

//////////////////////////////////////////////////////////////
//                                                          //
//                 Set the Current user                     //
//                                                          //
//////////////////////////////////////////////////////////////
export function setCurrentUser(email, password, nav) {
  return dispatch => {
    PetAdapter.getUsers()
    .then(users => {
      let userAttempt = users.filter(user => user.email === email)
      let foundUser = userAttempt[0]
      let userId = foundUser.id
      if (foundUser.password === String(password)) {

        dispatch({
          type: SET_USER,
          payload: userId
        })
        nav.navigate('Main')
      } else {
        Alert.alert(
        'Invalid Credentials',
        'Please verify your log in information is correct',
        [
          {
            text: 'OK',
            onPress: () => console.log('Ok Pressed'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      )
      }
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
        throw error;})
  }
}

//////////////////////////////////////////////////////////////
//                                                          //
//                      Logging out                         //
//                                                          //
//////////////////////////////////////////////////////////////
export function logOutCurrentUser() {
  return {
    type: LOG_OUT
  }
}


//////////////////////////////////////////////////////////////
//                                                          //
//               Set the FINDER's Location                  //
//                                                          //
//////////////////////////////////////////////////////////////
export function setFinderLoc() {
  return dispatch => {
    const geolocation = navigator.geolocation;
    geolocation.getCurrentPosition((position) => {
      dispatch({
        type: LOCATION,
        payload: position
      });
    });
  }
}

//////////////////////////////////////////////////////////////
//                                                          //
//                     User Sign Up                         //
//                                                          //
//////////////////////////////////////////////////////////////

export function onChangeTextName(event) {
  return {
    type: NAME_INPUT,
    payload: event
  }
}
export function onChangeTextEmail(event) {
  return {
    type: EMAIL_INPUT,
    payload: event
  }
}
export function onChangeTextPassword(event) {
  return {
    type: PASSWORD_INPUT,
    payload: event
  }
}
export function onChangeTextPasswordConfirmation(event) {
  return {
    type: PASSWORD_CONFIRMATION,
    payload: event
  }
}
export function onChangeTextPhone(event) {
  return {
    type: PHONE_INPUT,
    payload: event
  }
}

//////////////////////////////////////////////////////////////
//                                                          //
//                     Adding a pet                         //
//                                                          //
//////////////////////////////////////////////////////////////
export function onChangeTextPetName(event) {
  return {
    type: ADD_PET_NAME,
    payload: event
  }
}
export function onChangeTextPetAge(event) {
  return {
    type: ADD_PET_AGE,
    payload: event
  }
}
export function onChangeTextPetBreed(event) {
  return {
    type: ADD_PET_BREED,
    payload: event
  }
}
export function onChangeTextImage(event) {
  return {
    type: ADD_PET_IMAGE,
    payload: event
  }
}

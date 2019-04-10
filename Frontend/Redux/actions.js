import { View, AsyncStorage, Alert } from 'react-native';
import { createStackNavigator, navigate, NavigationActions, navigation } from 'react-navigation';

import { TOGGLE_MISSING, GET_MY_PETS, FOUND_A_PET, TOGGLE_MISSING_PET_FOUND, LOCATION, GET_TOKEN, SAVE_TOKEN, REMOVE_TOKEN, LOADING, ERROR, EMAIL_INPUT, PASSWORD_INPUT, PASSWORD_CONFIRMATION, PHONE_INPUT, ADD_PET_NAME, ADD_PET_AGE, ADD_PET_BREED, ADD_PET_IMAGE, ADD_PET_USER_ID, INCREMENT_MY_PET_INDEX, SET_USER, OPTIMISTIC_TOGGLE } from './types';
import PetAdapter from './PetAdapter';


//////////////////////////////////////////////////////////////
//                                                          //
// Letting front and back end know the pet's missing state  //
//                                                          //
//////////////////////////////////////////////////////////////
export function toggleMissing(pet) {
  return dispatch => {
    let data = {
      missing: !pet.missing
    }
    fetch(`http://10.9.107.202:3000/api/v1/pets/${pet.id}`, {
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

export function toggleMissingPetFound(petPage, missingBool) {
  let data = {
    missing: !missingBool
  }
  fetch(`http://10.9.107.202:3000/api/v1/pets/${petPage}`, {
    method: "PATCH",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  return {
    type: TOGGLE_MISSING_PET_FOUND,
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
export function onChangeTextPetName(name) {
  return {
    type: ADD_PET_NAME,
    payload: name
  }
}
export function onChangeTextPetAge(age) {
  return {
    type: ADD_PET_AGE,
    payload: age
  }
}
export function onChangeTextPetBreed(breed) {
  return {
    type: ADD_PET_BREED,
    payload: breed
  }
}
export function onChangeTextImage(image) {
  return {
    type: ADD_PET_IMAGE,
    payload: image
  }
}
export function onChangeTextPetUserId(id) {
  return {
    type: ADD_PET_USER_ID,
    payload: id
  }
}

//////////////////////////////////////////////////////////////
//                                                          //
//           Persisting user authentication                 //
//                                                          //
//////////////////////////////////////////////////////////////
export const getToken = (token) => ({
    type: GET_TOKEN,
    payload: token
});

export const saveToken = token => ({
    type: SAVE_TOKEN,
    payload: token
});

export const removeToken = () => ({
    type: REMOVE_TOKEN,
});

export const loading = bool => ({
  type: LOADING,
  payload: isLoading.bool,
})

export const error = error => ({
  type: ERROR,
  payload: error
})

export const getUserToken = () => dispatch =>
AsyncStorage.getItem('userToken')
  .then((data) => {
      dispatch(loading(false));
      dispatch(getToken(data));
  })
  .catch((err) => {
      dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
  })



export const saveUserToken = (data) => dispatch =>
AsyncStorage.setItem('userToken', 'abc')
  .then((data) => {
      dispatch(loading(false));
      dispatch(saveToken('token saved'));
  })
  .catch((err) => {
      dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
  })


export const removeUserToken = () => dispatch =>
  AsyncStorage.removeItem('userToken')
  .then((data) => {
      dispatch(loading(false));
      dispatch(removeToken(data));
  })
  .catch((err) => {
      dispatch(loading(false));
      dispatch(error(err.message || 'ERROR'));
  })

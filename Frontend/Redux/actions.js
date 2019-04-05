
import React, { Component } from 'react';
import { View  } from 'react-native';

import { TOGGLE_MISSING, GET_MY_PETS, FOUND_A_PET, TOGGLE_MISSING_PET_FOUND, LOCATION } from './types';
import PetAdapter from './PetAdapter';


//////////////////////////////////////////////////////////////
//                                                          //
// Letting front and back end know the pet's missing state  //
//                                                          //
//////////////////////////////////////////////////////////////
export function toggleMissing(pet, missingBool) {
  let data = {
    missing: !missingBool
  }
  fetch(`http://10.9.108.209:3000/api/v1/pets/${pet.id}`, {
    method: "PATCH",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  return {
    type: TOGGLE_MISSING,
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
    payload: userObj.pets[1]
  }
}
///////////////// make this dynamic so the number that gets passed in is based
//////////////// who is currently logged in
export function fetchMyPets() {
  return (dispatch) => {
    PetAdapter.getMyPets(1)
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
  fetch(`http://10.9.108.209:3000/api/v1/pets/${petPage}`, {
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

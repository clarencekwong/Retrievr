import { TOGGLE_MISSING, GET_MY_PETS, FOUND_A_PET, SET_MY_PET, TOGGLE_MISSING_PET_FOUND, LOCATION, GET_TOKEN, SAVE_TOKEN, REMOVE_TOKEN, LOADING, ERROR, EMAIL_INPUT, PASSWORD_INPUT, PASSWORD_CONFIRMATION, PHONE_INPUT, ADD_PET_NAME, ADD_PET_AGE, ADD_PET_BREED, ADD_PET_IMAGE, ADD_PET_USER_ID, INCREMENT_MY_PET_INDEX, SET_USER, OPTIMISTIC_TOGGLE } from './types';
import { combineReducers } from 'redux';

const initialPetState = {
  selectedPetArray: [],
  selectedPetIndex: 0,
  selectedPet: { },
  selectedPetMissing: false,
  ownerName: null,
  foundPet: null,
  foundPetMissing: null,
  foundPetLat: null,
  foundPetLon: null,
  addPetName: null,
  addPetAge: null,
  addPetBreed: null,
  addPetImage: null,
  addPetUserId: null,
  // petMissingToggle: null
};


function petReducer(state = initialPetState, action) {
  switch(action.type) {
    case TOGGLE_MISSING:
    let newArr = [...state.selectedPetArray]
    let newPetObj = newArr.find(pet => pet.id === action.payload.id)
    newPetObj.missing = action.payload.missing
      return { ...state,
        selectedPetArray: newArr,
        selectedPet: newPetObj,
        selectedPetIndex: newArr.indexOf(newPetObj)
      }
    break;
    case INCREMENT_MY_PET_INDEX:
      return {...state,
        selectedPetIndex: action.payload,
        selectedPet: state.selectedPetArray[action.payload],
        selectedPetMissing: state.selectedPetArray[action.payload].missing
      }
    break;
    case GET_MY_PETS:
      return {...state,
        selectedPetArray: action.payload,
        selectedPet: action.payload[state.selectedPetIndex],
      }
    break;
    case FOUND_A_PET:
      return {...state,
        foundPet: action.payload,
        foundPetMissing: !state.foundPetMissing,
        ownerName: action.payload.user.name}
    break;
    case TOGGLE_MISSING_PET_FOUND:
      return {...state,
        foundPetMissing: !state.foundPetMissing,
      }
    break;
    case LOCATION:
      return {
        ...state,
        foundPetLat: action.payload.coords.latitude,
        foundPetLon: action.payload.coords.longitude,
        };
    break;
    case ADD_PET_NAME:
      return {...state,
        addPetName: action.payload,
      }
    break;
    case ADD_PET_AGE:
      return {...state,
        addPetAge: action.payload,
      }
    break;
    case ADD_PET_BREED:
      return {...state,
        addPetBreed: action.payload,
      }
    break;
    case ADD_PET_IMAGE:
      return {...state,
        addPetImage: action.payload,
      }
    break;
    case ADD_PET_USER_ID:
      return {...state,
        addPetUserId: action.payload,
      }
    break;
    default:
      return state;
  }
}

const initialUserState = {
  currentUser: 0,
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  phone: "",
  coords: null,
  token: { },
  loading: true,
  error: null,
}

function userReducer(state = initialUserState, action) {
  switch(action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
      }
    break;
    case EMAIL_INPUT:
      return {
        ...state,
        email: action.payload,
        };
    break;
    case PASSWORD_INPUT:
      return {
        ...state,
        password: action.payload,
        };
    break;
    case PASSWORD_CONFIRMATION:
      return {
        ...state,
        passwordConfirmation: action.payload,
        };
    break;
    case PHONE_INPUT:
      return {
        ...state,
        phone: action.payload,
        };
    break;
    case GET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        };
    break;
    case SAVE_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        };
    break;
    case REMOVE_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        };
    break;
    case LOADING:
      return {
        ...state,
        loading: action.payload.isLoading.bool,
      };
    break;
    case ERROR:
      return {
        ...state,
        error: action.payload.error,
        };
    break;
    default:
      return state;
  }
}

// export default petReducer

export default combineReducers({
  pet: petReducer,
  user: userReducer,
})

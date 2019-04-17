import { TOGGLE_MISSING, GET_MY_PETS, FOUND_A_PET, SET_MY_PET, TOGGLE_MISSING_PET_FOUND, LOCATION, GET_TOKEN, SAVE_TOKEN, REMOVE_TOKEN, LOADING, ERROR, EMAIL_INPUT, PASSWORD_INPUT, PASSWORD_CONFIRMATION, PHONE_INPUT, ADD_PET_NAME, ADD_PET_AGE, ADD_PET_BREED, ADD_PET_IMAGE, ADD_PET_USER_ID, INCREMENT_MY_PET_INDEX, SET_USER, OPTIMISTIC_TOGGLE, LOG_OUT, FINDER_INFO, NAME_INPUT, CLEAR_ADD_PET, CHANGE_APPOINTMENT, TOGGLE_POSTER, ADD_PET_INSTAGRAM } from './types';
import { combineReducers } from 'redux';

const initialPetState = {
  selectedPetArray: [],
  selectedPetIndex: 0,
  selectedPet: { },
  ownerName: null,
  foundPet: null,
  foundPetMissing: null,
  foundPetLat: null,
  foundPetLon: null,
  addPetName: null,
  addPetAge: null,
  addPetBreed: null,
  addPetImage: null,
  addInstagram: null,
  passiveTrigger: false,
  toggleAptChange: false,
  toggleMissingPetPoster: false,
};


function petReducer(state = initialPetState, action) {
  switch(action.type) {
    case TOGGLE_MISSING:
    let newArr = [...state.selectedPetArray]
    let newPetObj = newArr.find(pet => pet.id === action.payload.id)
    newPetObj.missing = action.payload.missing
    let currentVal = !state.passiveTrigger
      return { ...state,
        passiveTrigger: currentVal,
        selectedPetArray: newArr,
        selectedPet: newPetObj,
        selectedPetIndex: newArr.indexOf(newPetObj),
        toggleMissingPetPoster: state.selectedPet.missing ? true : false,
      }
    break;
    case TOGGLE_POSTER:
      return {...state,
        toggleMissingPetPoster: false,
      }
    break;
    case INCREMENT_MY_PET_INDEX:
      return {...state,
        selectedPetIndex: action.payload,
        selectedPet: state.selectedPetArray[action.payload],
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
        passiveTrigger: !state.passiveTrigger,
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
    case ADD_PET_INSTAGRAM:
      return {...state,
        addPetImage: action.payload,
      }
    break;
    case CLEAR_ADD_PET:
    return {...state,
      addPetName: null,
      addpetage: null,
      addPetBreed: null,
      addPetImage: null,
      addInstagram: null,
    }
    case FINDER_INFO:
      return {
        ...state,
        finderName: action.payload.name,
        finderPhone: action.payload.phone
      }
    break;
    case CHANGE_APPOINTMENT:
      return {...state,
        toggleAptChange: !state.toggleAptChange,
      }
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
    case NAME_INPUT:
      return {
        ...state,
        name: action.payload,
        };
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
    case LOG_OUT:
      return {
        ...state,
        currentUser: null
      }
    break;
    default:
      return state;
  }
}

export default combineReducers({
  pet: petReducer,
  user: userReducer,
})

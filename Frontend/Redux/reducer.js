import { TOGGLE_MISSING, GET_MY_PETS, FOUND_A_PET, SET_MY_PET, TOGGLE_MISSING_PET_FOUND } from './types';
import { combineReducers } from 'redux';

const initialPetState = {
  pets: [],
  selectedPet: [],
  selectedPetMissing: null,
  ownerName: null,
  foundPet: null,
  foundPetMissing: null,
};

function petReducer(state = initialPetState, action) {
  switch(action.type) {
    case TOGGLE_MISSING:
      return { ...state,
        selectedPetMissing: !state.selectedPetMissing}
    break;
    case GET_MY_PETS:
      return {...state,
        selectedPet: action.payload,
        selectedPetMissing: action.payload.missing
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
    default:
      return state;
  }
}

// const initialUserState = {
//   currentUser: null,
//   name: "",
//   email: "",
//   password: "",
// }
//
// function userReducer(state = initialUserState, action) {
//   switch(action.type) {
//     case :
//       return { ...state, };
//     break;
//     default:
//       return state;
//   }
// }

export default petReducer

// export default combineReducers({
//   animal: petReducer,
//   user: userReducer,
// })

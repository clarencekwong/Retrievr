import { createStore, applyMiddleware } from 'redux';
import {AsyncStorage} from 'react-native'
import petReducer from './reducer'; // trick with imports
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from './reducer'


const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
let store = createStore(persistedReducer)
let persistor = persistStore(store)

export default { store, persistor}
// export default  {
//   console.log("in store.js", store);
//   return { store, persistor }
// }

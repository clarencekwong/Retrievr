import { createStore, applyMiddleware } from 'redux';
import petReducer from './reducer'; // trick with imports
import thunk from 'redux-thunk';

const store = createStore(petReducer, applyMiddleware(thunk));

export default store;

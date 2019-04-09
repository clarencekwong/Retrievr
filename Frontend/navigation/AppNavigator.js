import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import SignUp from '../screens/SignUp'
import LogIn from '../screens/LogIn'
import HomeScreen from '../screens/HomeScreen'

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  LogIn: LogIn,
  SignUp: SignUp,
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
}));

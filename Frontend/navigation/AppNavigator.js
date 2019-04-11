import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import SignUp from '../screens/SignUp'
import LogIn from '../screens/LogIn'
import HomeScreen from '../screens/HomeScreen'
import AuthLoading from '../screens/AuthLoading'
import AddPet from '../screens/AddPet'
import SettingsScreen from '../screens/SettingsScreen'

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  LogIn: LogIn,
  SignUp: SignUp,
  AddPet: AddPet,
  SettingsScreen: SettingsScreen,
  Main: MainTabNavigator,
}));

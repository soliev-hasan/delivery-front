import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ScreensParams} from './navigation.types';
import SingUp from '../pages/sign-up/sign-up.component';
import Main from '../pages/main/main.component';

const MainNavigation = () => {
  const Stack = createNativeStackNavigator<ScreensParams>();

  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SingUp}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreensParams } from './navigation.types';
import SingUp from '../pages/sign-up/sign-up.component';
import Main from '../pages/main/main.component';
import BottomTabNavigation from './bottom-tab.navigation';
import editProfileStyle from '../pages/profile/editProfile.component';

const MainNavigation = () => {
  const Stack = createNativeStackNavigator<ScreensParams>();

  return (
    <Stack.Navigator
      initialRouteName="BottomTab"
      screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen
        name="BottomTab"
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SingUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={editProfileStyle}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;

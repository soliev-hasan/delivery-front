import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SingUp from '../pages/sign-up/sign-up.component';
import Otp from '../pages/OTP/otp.component';
import {ScreensParams} from './navigation.types';
import Main from '../pages/main/main.component';
import BottomTabNavigation from './bottom-tab.navigation';
const Stack = createNativeStackNavigator<ScreensParams>();
const SingUpNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTab"
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen
        name="SignUp"
        component={SingUp}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Otp" component={Otp} options={{headerShown: false}} />
      <Stack.Screen
        name="Main"
        component={Main}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BottomTab"
        component={BottomTabNavigation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SingUpNavigation;

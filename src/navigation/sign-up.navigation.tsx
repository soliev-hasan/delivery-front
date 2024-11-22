import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SingUp from '../pages/sign-up/sign-up.component';
const Stack = createNativeStackNavigator();
const SingUpNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'SplashScreen'}
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen
        name="SignUp"
        component={SingUp}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SingUpNavigation;

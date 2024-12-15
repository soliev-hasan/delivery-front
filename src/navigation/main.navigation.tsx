import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreensParams } from './navigation.types';
import SingUp from '../pages/sign-up/sign-up.component';
import Main from '../pages/main/main.component';
import BottomTabNavigation from './bottom-tab.navigation';
import EditProfile from '../pages/profile/editProfile.component';
import Map from '../ui-components/map/map.component';
import ProductDetail from '../pages/product/product.component';

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
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Map" component={Map} options={{ headerShown: false }} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;

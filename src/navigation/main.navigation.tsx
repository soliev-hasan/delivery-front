import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ScreensParams} from './navigation.types';
import SingUp from '../pages/sign-up/sign-up.component';
import Main from '../pages/main/main.component';
import BottomTabNavigation from './bottom-tab.navigation';
import EditProfile from '../pages/profile/editProfile.component';
import Map from '../ui-components/map/map.component';
import ProductDetail from '../pages/product/product.component';
import SubCategory from '../pages/subcategory/subcategory.component';
import Payment from '../pages/payment/payment.component';
import MyOrders from '../pages/my-orders/my-orders.component';
import DetailOrder from '../pages/my-orders/detail-order.component';

const MainNavigation = () => {
  const Stack = createNativeStackNavigator<ScreensParams>();

  return (
    <Stack.Navigator
      initialRouteName="BottomTab"
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen
        name="BottomTab"
        component={BottomTabNavigation}
        options={{headerShown: false}}
      />
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
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Map" component={Map} options={{headerShown: false}} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SubCategory"
        component={SubCategory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyOrders"
        component={MyOrders}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailOrder"
        component={DetailOrder}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;

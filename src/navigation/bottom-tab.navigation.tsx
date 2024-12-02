import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {ScreensParams} from './navigation.types';
import Main from '../pages/main/main.component';
import colors from '../helper/colors';
import {
  Home,
  Search as SearchIcon,
  ShoppingCart,
  User,
} from 'lucide-react-native';
import Cart from '../pages/cart/cart.component';
import Search from '../pages/search/search.component';
import Profile from '../pages/profile/profile.component';
const BottomTab = createBottomTabNavigator<ScreensParams>();

const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Main"
      screenOptions={{
        tabBarActiveTintColor: colors.white,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          height: 100,
        },
      }}>
      <BottomTab.Screen
        name="Main"
        component={Main}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tab}>
              <Home color={focused ? colors.main : colors.grayDark} size={23} />
              <Text style={{color: focused ? colors.main : colors.grayDark}}>
                Главная
              </Text>
            </View>
          ),
          tabBarLabel: '',
          tabBarLabelStyle: {
            paddingTop: 0,
            fontSize: 14,
            color: colors.black,

            // marginTop: 8,
          },
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tab}>
              <ShoppingCart
                color={focused ? colors.main : colors.grayDark}
                size={23}
              />
              <Text style={{color: focused ? colors.main : colors.grayDark}}>
                Карзина
              </Text>
            </View>
          ),
          tabBarLabel: '',
          tabBarLabelStyle: {
            paddingTop: 0,
            fontSize: 14,
            color: colors.main,

            // marginTop: 8,
          },
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tab}>
              <SearchIcon
                color={focused ? colors.main : colors.grayDark}
                size={23}
              />
              <Text
                style={{
                  color: focused ? colors.main : colors.grayDark,
                  marginLeft: 10,
                }}>
                Поиск
              </Text>
            </View>
          ),
          tabBarLabel: '',
          tabBarLabelStyle: {
            paddingTop: 0,
            fontSize: 14,
            color: colors.main,

            // marginTop: 8,
          },
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tab}>
              <User color={focused ? colors.main : colors.grayDark} size={23} />
              <Text style={{color: focused ? colors.main : colors.grayDark}}>
                Профиль
              </Text>
            </View>
          ),
          tabBarLabel: '',
          tabBarLabelStyle: {
            paddingTop: 0,
            fontSize: 14,
            color: colors.main,

            // marginTop: 8,
          },
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({
  tab: {
    alignItems: 'center',
    gap: 5,
    marginTop: 20,
  },
});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ScreensParams} from './navigation.types';
const BottomTab = createBottomTabNavigator<ScreensParams>();

const BottomTabNavigation = () => {
  return (
    <View>
      <Text>BottomTabNavigation</Text>
    </View>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({});

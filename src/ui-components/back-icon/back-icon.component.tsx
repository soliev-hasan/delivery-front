import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ChevronLeft} from 'lucide-react-native';
import colors from '../../helper/colors';
import {useNavigation} from '@react-navigation/native';

const BackIcon = () => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.goBack()} style={styles.container}>
      <ChevronLeft color={colors.black} size={25} />
    </Pressable>
  );
};

export default BackIcon;

const styles = StyleSheet.create({
  container: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.grayLight,
    borderRadius: 90,
  },
});

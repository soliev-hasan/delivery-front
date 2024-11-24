import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import styles from './button.style';
const Button = ({children}: {children: string}) => {
  return (
    <View style={styles.btn}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

export default Button;

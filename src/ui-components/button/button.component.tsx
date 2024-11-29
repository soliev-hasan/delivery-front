import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import colors from '../../helper/colors';
import styles from './button.style';
export const Button = ({
  children,
  onPress,
  loading,
  disabled,
}: {
  children: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}) => {
  return (
    <TouchableOpacity
      disabled={!disabled}
      onPress={onPress}
      style={disabled ? styles.btn : styles.disabled}>
      {loading ? (
        <ActivityIndicator size={'small'} color={colors.white} />
      ) : (
        <Text style={styles.text}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

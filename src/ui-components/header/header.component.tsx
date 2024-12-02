import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './header.style';
import BackIcon from '../back-icon/back-icon.component';

export const Header = ({
  title,
  backIcon = false,
}: {
  title?: string;
  backIcon?: boolean;
}) => {
  return (
    <View style={styles.header}>
      {backIcon ? (
        <View style={styles.backIconContainer}>
          <BackIcon />
        </View>
      ) : null}

      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

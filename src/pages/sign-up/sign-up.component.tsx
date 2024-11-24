import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import styles from './sign-up.module';
import {Input} from '../../ui-components/input/input.component';
import Button from '../button/button.component';
const SingUp = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.titlesContent}>
          <Text style={styles.title}>Вход/Регистрация</Text>
          <Text style={styles.desc}>Введите ваш номер</Text>
        </View>
        <View style={styles.form}>
          <Input />
          <Button>Sign in</Button>
        </View>
        <View style={styles.rowLine}>
          <View style={styles.line} />
          <Text style={styles.desc}>Or sign in with</Text>
          <View style={styles.line} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SingUp;

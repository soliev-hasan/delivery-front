import {SafeAreaView, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import styles from './sign-up.module';
import {Input} from '../../ui-components/input/input.component';
import {Button} from '../../ui-components/button/button.component';
import {useApiRequest} from '../../hooks/useRequest';
import {ALERT_TYPE, Dialog, Toast} from 'react-native-alert-notification';
import AuthContext from '../../contexts/AuthContext';
import {RootNavigationProps} from '../../navigation/navigation.types';
const SingUp = ({navigation}: RootNavigationProps<'SignUp'>) => {
  const {phone, setPhone} = useContext(AuthContext);
  const {sendRequest, loading, error, data} = useApiRequest();
  async function sendOtp() {
    try {
      const result = await sendRequest('post', 'auth/send-otp', {
        phone: `+992${phone}`,
      });

      if (result.status == 200) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Код авторизации отпрален на номер ' + phone,
        });
        navigation.navigate('Otp');
      }
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Ошибка',
        textBody: 'Попоробуйте позже',
      });
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.titlesContent}>
          <Text style={styles.title}>Вход/Регистрация</Text>
          <Text style={styles.desc}>Введите ваш номер</Text>
        </View>
        <View style={styles.form}>
          <Input
            value={phone}
            onChangeText={(text: string) => setPhone(text)}
            maxLength={9}
          />
          <Button
            disabled={phone.length === 9}
            loading={loading}
            onPress={sendOtp}>
            Sign in
          </Button>
        </View>
        <View style={styles.rowLine}>
          <View style={styles.line} />
          <Text style={styles.desc}>Или войдите через</Text>
          <View style={styles.line} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SingUp;

import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import styles from './otp.style';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import BackIcon from '../../ui-components/back-icon/back-icon.component';
import AuthContext from '../../contexts/AuthContext';
import {Button} from '../../ui-components/button/button.component';
import {useApiRequest} from '../../hooks/useRequest';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootNavigationProps} from '../../navigation/navigation.types';
const Otp = ({navigation}: RootNavigationProps<'Otp'>) => {
  const {phone} = useContext(AuthContext);
  const {sendRequest, loading, error, data} = useApiRequest();
  const [password, setPassword] = useState('');

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

  async function verifyOtp() {
    try {
      const result = await sendRequest('post', 'auth/verify-otp', {
        phone: `+992${phone}`,
        code: password,
      });

      if (result.status == 200) {
        let data = await sendRequest(
          'get',
          `auth/refresh-token?refreshToken=${result.data.refreshToken}`,
        );

        await AsyncStorage.setItem('refreshToken', data.data.refreshToken);
        await AsyncStorage.setItem('token', data.data.token);

        navigation.navigate('BottomTab');
      }
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Ошибка',
        textBody: 'Вы ввели неверный код',
      });
    }
  }
  useEffect(() => {
    if (password.length === 4) {
      verifyOtp();
    }
  }, [password]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackIcon />
        <View>
          <Text style={styles.title}>Код из смс</Text>
          <Text style={styles.desc}>Отправили на {`+992 ${phone}`}</Text>
        </View>
        <CodeField
          InputComponent={TextInput}
          value={password}
          onChangeText={(text: string) => {
            setPassword(text);
          }}
          cellCount={4}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete={Platform.OS === 'android' ? 'sms-otp' : 'one-time-code'}
          testID="my-code-input"
          autoFocus={true}
          renderCell={({index, symbol, isFocused}) => (
            <Text key={index} style={[styles.cell]}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <Text style={styles.noCode}>
          Не получили код?{' '}
          <Text onPress={sendOtp} style={styles.resend}>
            Отпавить ещё раз
          </Text>
        </Text>
      </View>

      <View style={styles.sendButton}>
        <Button
          disabled={password.length === 4}
          onPress={verifyOtp}
          loading={loading}>
          Далее
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Otp;

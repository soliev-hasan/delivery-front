import { Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './sign-up.module';
import { Input } from '../../ui-components/input/input.component';
import Button from '../button/button.component';
import { GoogleSignin, SignInResponse, statusCodes } from '@react-native-google-signin/google-signin';
import SVGGoogle from '../../assets/icons/google-icon.svg'

const SingUp = () => {
  const webClientId = "147215434915-99vsopuod3ek3hsl99jee5a9b1q9biil.apps.googleusercontent.com"; 

    useEffect(()=>{
        GoogleSignin.configure({
            webClientId: webClientId,
        })
    },[])

    const googleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log("userinfo", userInfo);

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log(error)
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log(error)
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log(error)
            } else {
            }
        }
      };

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
        <View style={styles.googleAuthContainer}>
          <TouchableOpacity style={styles.googleAuthIcon} onPress={googleLogin}>
            <SVGGoogle width={25} height={25} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SingUp;



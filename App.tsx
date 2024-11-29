import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import SingUpNavigation from './src/navigation/sign-up.navigation';
import useAuth from './src/hooks/useAuth';
import AuthContext from './src/contexts/AuthContext';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import MainNavigation from './src/navigation/main.navigation';
import {ActivityIndicator} from 'react-native';
import colors from './src/helper/colors';

function App() {
  const {token, setToken, phone, setPhone, address, setAddress, isLoading} =
    useAuth();

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        phone,
        setPhone,
        address,
        setAddress,
      }}>
      <AlertNotificationRoot>
        <Provider store={store}>
          {!isLoading ? (
            <ActivityIndicator size={'large'} color={colors.black} />
          ) : (
            <NavigationContainer>
              {token ? <MainNavigation /> : <SingUpNavigation />}
            </NavigationContainer>
          )}
        </Provider>
      </AlertNotificationRoot>
    </AuthContext.Provider>
  );
}

export default App;
